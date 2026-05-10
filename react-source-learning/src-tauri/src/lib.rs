use tauri_plugin_sql::{Migration, MigrationKind};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let migrations = vec![
        Migration {
            version: 1,
            description: "enable WAL mode and create learning_progress table",
            sql: "PRAGMA journal_mode=WAL;
                 CREATE TABLE IF NOT EXISTS learning_progress (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                module_id TEXT NOT NULL,
                section_id TEXT NOT NULL,
                status TEXT NOT NULL DEFAULT 'not_started',
                completed_at TEXT,
                time_spent_seconds INTEGER NOT NULL DEFAULT 0,
                created_at TEXT NOT NULL DEFAULT (datetime('now')),
                updated_at TEXT NOT NULL DEFAULT (datetime('now')),
                UNIQUE(module_id, section_id)
            )",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 2,
            description: "create conversations table",
            sql: "CREATE TABLE IF NOT EXISTS conversations (
                id TEXT PRIMARY KEY,
                module_id TEXT NOT NULL,
                title TEXT NOT NULL DEFAULT '',
                created_at TEXT NOT NULL DEFAULT (datetime('now')),
                updated_at TEXT NOT NULL DEFAULT (datetime('now'))
            )",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 3,
            description: "create messages table",
            sql: "CREATE TABLE IF NOT EXISTS messages (
                id TEXT PRIMARY KEY,
                conversation_id TEXT NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
                role TEXT NOT NULL CHECK(role IN ('user','assistant')),
                content TEXT NOT NULL DEFAULT '{}',
                tool_calls TEXT,
                created_at TEXT NOT NULL DEFAULT (datetime('now'))
            )",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 4,
            description: "create quiz_results table",
            sql: "CREATE TABLE IF NOT EXISTS quiz_results (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                module_id TEXT NOT NULL,
                score INTEGER NOT NULL,
                total INTEGER NOT NULL,
                answers TEXT NOT NULL DEFAULT '{}',
                completed_at TEXT NOT NULL DEFAULT (datetime('now'))
            )",
            kind: MigrationKind::Up,
        },
    ];

    tauri::Builder::default()
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations("sqlite:react-source-learning.db", migrations)
                .build(),
        )
        .plugin(tauri_plugin_store::Builder::default().build())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
