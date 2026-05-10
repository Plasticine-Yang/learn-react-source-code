use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct ChatRequest {
    pub messages: Vec<ChatMessage>,
    pub model: String,
    pub base_url: String,
    pub auth_token: String,
    pub tools: Option<serde_json::Value>,
    pub system: Option<String>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct ChatMessage {
    pub role: String,
    pub content: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ChatChunk {
    pub content: String,
    pub done: bool,
}

/// Proxies a streaming chat request to the Anthropic API.
/// Returns SSE chunks over a Tauri IPC channel.
#[tauri::command]
pub async fn stream_chat(
    request: ChatRequest,
    on_chunk: tauri::ipc::Channel<ChatChunk>,
) -> Result<(), String> {
    let client = reqwest::Client::new();
    let url = format!("{}/v1/messages", request.base_url.trim_end_matches('/'));

    let mut body = serde_json::json!({
        "model": request.model,
        "max_tokens": 4096,
        "messages": request.messages.iter().map(|m| {
            serde_json::json!({
                "role": m.role,
                "content": m.content,
            })
        }).collect::<Vec<_>>(),
    });

    if let Some(system) = &request.system {
        body["system"] = serde_json::json!(system);
    }
    if let Some(tools) = &request.tools {
        body["tools"] = tools.clone();
    }

    let response = client
        .post(&url)
        .header("x-api-key", &request.auth_token)
        .header("anthropic-version", "2023-06-01")
        .header("content-type", "application/json")
        .json(&body)
        .send()
        .await
        .map_err(|e| format!("Request failed: {}", e))?;

    if !response.status().is_success() {
        let status = response.status();
        let text = response.text().await.unwrap_or_default();
        return Err(format!("API error {}: {}", status, text));
    }

    let mut stream = response.bytes_stream();
    use futures_util::StreamExt;

    while let Some(chunk) = stream.next().await {
        let chunk = chunk.map_err(|e| format!("Stream error: {}", e))?;
        let text = String::from_utf8_lossy(&chunk).to_string();

        for line in text.lines() {
            if let Some(data) = line.strip_prefix("data: ") {
                if data == "[DONE]" {
                    let _ = on_chunk.send(ChatChunk {
                        content: String::new(),
                        done: true,
                    });
                    return Ok(());
                }

                if let Ok(event) = serde_json::from_str::<serde_json::Value>(data) {
                    if let Some(delta) = event["delta"]["text"].as_str() {
                        let _ = on_chunk.send(ChatChunk {
                            content: delta.to_string(),
                            done: false,
                        });
                    }
                }
            }
        }
    }

    Ok(())
}
