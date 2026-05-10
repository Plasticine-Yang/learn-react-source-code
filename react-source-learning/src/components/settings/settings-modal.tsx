import { useState } from "react";
import { useSettingsStore } from "@/stores/useSettingsStore";
import type { ApiSettings } from "@/lib/db-types";
import { X } from "@/lib/icons";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const settings = useSettingsStore((s) => s.settings);
  const saveSettings = useSettingsStore((s) => s.saveSettings);
  const resetSettings = useSettingsStore((s) => s.resetSettings);

  const [form, setForm] = useState<ApiSettings>(settings);
  const [showToken, setShowToken] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    saveSettings(form);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-50" style={{ backgroundColor: "rgba(0,0,0,0.5)" }} onClick={onClose} />
      <div
        className="fixed top-1/2 left-1/2 z-50 flex flex-col rounded-2xl overflow-hidden"
        style={{
          width: 460,
          marginLeft: -230,
          marginTop: -280,
          backgroundColor: "var(--bg-primary)",
          border: "1px solid var(--border-color)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between shrink-0"
          style={{ padding: "18px 22px", borderBottom: "1px solid var(--border-color)" }}
        >
          <span style={{ fontSize: "var(--font-size-md)", fontWeight: 700, color: "var(--font-primary)" }}>
            设置
          </span>
          <div
            className="flex items-center justify-center rounded cursor-pointer"
            style={{ width: 26, height: 26 }}
            onClick={onClose}
          >
            <X size={14} style={{ color: "var(--font-secondary)" }} />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col" style={{ padding: "20px 22px", gap: 20 }}>
          {/* API config */}
          <div className="flex flex-col" style={{ gap: 10 }}>
            <span style={{ fontSize: "var(--font-size-sm)", fontWeight: 600, color: "var(--font-primary)" }}>
              API 配置
            </span>

            <div className="flex flex-col" style={{ gap: 4 }}>
              <label style={{ fontSize: "var(--font-size-xs)", fontWeight: 600, color: "var(--font-primary)" }}>
                ANTHROPIC_BASE_URL
              </label>
              <input
                className="rounded-md outline-none"
                style={{
                  padding: "10px 14px",
                  backgroundColor: "var(--bg-secondary)",
                  border: "1px solid var(--border-color)",
                  fontSize: "var(--font-size-xs)",
                  color: "var(--font-primary)",
                }}
                value={form.baseUrl}
                onChange={(e) => setForm({ ...form, baseUrl: e.target.value })}
              />
            </div>

            <div className="flex flex-col" style={{ gap: 4 }}>
              <label style={{ fontSize: "var(--font-size-xs)", fontWeight: 600, color: "var(--font-primary)" }}>
                ANTHROPIC_AUTH_TOKEN
              </label>
              <div className="flex gap-2">
                <input
                  className="flex-1 rounded-md outline-none"
                  type={showToken ? "text" : "password"}
                  style={{
                    padding: "10px 14px",
                    backgroundColor: "var(--bg-secondary)",
                    border: "1px solid var(--border-color)",
                    fontSize: "var(--font-size-xs)",
                    color: "var(--font-primary)",
                  }}
                  value={form.authToken}
                  onChange={(e) => setForm({ ...form, authToken: e.target.value })}
                />
                <div
                  className="flex items-center justify-center rounded-md cursor-pointer shrink-0"
                  style={{
                    padding: "8px 14px",
                    border: "1px solid var(--border-color)",
                    fontSize: "var(--font-size-xs)",
                    color: "var(--font-secondary)",
                  }}
                  onClick={() => setShowToken(!showToken)}
                >
                  {showToken ? "隐藏" : "显示"}
                </div>
              </div>
            </div>

            <div className="flex flex-col" style={{ gap: 4 }}>
              <label style={{ fontSize: "var(--font-size-xs)", fontWeight: 600, color: "var(--font-primary)" }}>
                ANTHROPIC_MODEL
              </label>
              <input
                className="rounded-md outline-none"
                style={{
                  padding: "10px 14px",
                  backgroundColor: "var(--bg-secondary)",
                  border: "1px solid var(--border-color)",
                  fontSize: "var(--font-size-xs)",
                  color: "var(--font-primary)",
                }}
                value={form.model}
                onChange={(e) => setForm({ ...form, model: e.target.value })}
              />
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, backgroundColor: "var(--border-color)" }} />

          {/* Data management */}
          <div className="flex flex-col" style={{ gap: 8 }}>
            <span style={{ fontSize: "var(--font-size-sm)", fontWeight: 600, color: "var(--font-primary)" }}>
              学习数据管理
            </span>
            <div className="flex gap-2">
              <div
                className="rounded-md cursor-pointer"
                style={{
                  padding: "8px 14px",
                  border: "1px solid var(--border-color)",
                  fontSize: "var(--font-size-xs)",
                  color: "var(--font-primary)",
                }}
              >
                导出学习记录 (JSON)
              </div>
              <div
                className="rounded-md cursor-pointer"
                style={{
                  padding: "8px 14px",
                  border: "1px solid var(--accent-pink)",
                  fontSize: "var(--font-size-xs)",
                  color: "var(--accent-pink)",
                }}
                onClick={() => {
                  if (confirm("确认重置所有学习进度？此操作不可撤销。")) {
                    resetSettings();
                  }
                }}
              >
                重置进度
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-end shrink-0"
          style={{ padding: "14px 22px", borderTop: "1px solid var(--border-color)", gap: 10 }}
        >
          <div
            className="rounded-md cursor-pointer"
            style={{ padding: "8px 14px", border: "1px solid var(--border-color)", fontSize: "var(--font-size-xs)", color: "var(--font-primary)" }}
            onClick={onClose}
          >
            取消
          </div>
          <div
            className="rounded-md cursor-pointer"
            style={{ padding: "8px 18px", backgroundColor: "var(--accent-blue)", color: "var(--bg-primary)", fontSize: "var(--font-size-xs)", fontWeight: 600 }}
            onClick={handleSave}
          >
            保存
          </div>
        </div>
      </div>
    </>
  );
}
