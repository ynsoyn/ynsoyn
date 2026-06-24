"use client";

import { useState } from "react";

const NEU_INSET = "inset 4px 4px 10px rgba(155,135,115,0.2), inset -3px -3px 8px rgba(255,255,255,0.88)";
const NEU_RAISED = "5px 5px 14px rgba(155,135,115,0.26), -4px -4px 10px rgba(255,255,255,0.92)";
const NEU_BTN = "5px 5px 14px rgba(61,53,48,0.28), -3px -3px 10px rgba(255,255,255,0.55)";
const NEU_BTN_HOVER = "7px 7px 18px rgba(61,53,48,0.34), -4px -4px 12px rgba(255,255,255,0.6)";

export default function ContactPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("메시지가 전송됐습니다.");
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "16px 20px",
    fontSize: "0.875rem",
    outline: "none",
    borderRadius: "14px",
    border: "none",
    background: "#f4f4f2",
    color: "#3d3530",
    caretColor: "#3d3530",
    boxShadow: NEU_INSET,
    transition: "box-shadow 0.2s",
  };

  return (
    <div className="min-h-screen flex items-start justify-center" style={{ padding: "96px 32px 120px" }}>
      <div style={{ width: "100%", maxWidth: "520px" }}>

        <h1
          className="text-5xl font-light tracking-tight"
          style={{ color: "#3d3530", marginBottom: "14px", fontFamily: "'SchoolSafetyNotification', sans-serif", fontWeight: 700 }}
        >
          Contact
        </h1>
        <p
          className="text-sm"
          style={{ color: "#b5a99e", marginBottom: "60px", lineHeight: "1.8" }}
        >
          질문이나 협업 제안을 남겨주세요.
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

          {/* Name row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            {[
              { key: "firstName", label: "이름", placeholder: "Jane" },
              { key: "lastName",  label: "성",   placeholder: "Smitherton" },
            ].map(({ key, label, placeholder }) => (
              <div key={key}>
                <label style={{ display: "block", fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#a09088", marginBottom: "10px" }}>
                  {label}
                </label>
                <input
                  type="text"
                  placeholder={placeholder}
                  value={form[key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  style={inputStyle}
                  onFocus={(e) => ((e.currentTarget as HTMLInputElement).style.boxShadow = "inset 5px 5px 12px rgba(155,135,115,0.25), inset -3px -3px 9px rgba(255,255,255,0.9)")}
                  onBlur={(e) => ((e.currentTarget as HTMLInputElement).style.boxShadow = NEU_INSET)}
                />
              </div>
            ))}
          </div>

          {/* Email + Phone row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#a09088", marginBottom: "10px" }}>
                이메일 주소
              </label>
              <input
                type="email"
                placeholder="email@domain.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                style={inputStyle}
                onFocus={(e) => ((e.currentTarget as HTMLInputElement).style.boxShadow = "inset 5px 5px 12px rgba(155,135,115,0.25), inset -3px -3px 9px rgba(255,255,255,0.9)")}
                onBlur={(e) => ((e.currentTarget as HTMLInputElement).style.boxShadow = NEU_INSET)}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#a09088", marginBottom: "10px" }}>
                전화번호
              </label>
              <input
                type="tel"
                placeholder="010-0000-0000"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                style={inputStyle}
                onFocus={(e) => ((e.currentTarget as HTMLInputElement).style.boxShadow = "inset 5px 5px 12px rgba(155,135,115,0.25), inset -3px -3px 9px rgba(255,255,255,0.9)")}
                onBlur={(e) => ((e.currentTarget as HTMLInputElement).style.boxShadow = NEU_INSET)}
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label style={{ display: "block", fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#a09088", marginBottom: "10px" }}>
              메시지
            </label>
            <textarea
              placeholder="질문이나 메시지를 입력하세요"
              rows={7}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              style={{ ...inputStyle, resize: "none" }}
              onFocus={(e) => ((e.currentTarget as HTMLTextAreaElement).style.boxShadow = "inset 5px 5px 12px rgba(155,135,115,0.25), inset -3px -3px 9px rgba(255,255,255,0.9)")}
              onBlur={(e) => ((e.currentTarget as HTMLTextAreaElement).style.boxShadow = NEU_INSET)}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full text-sm tracking-widest uppercase rounded-full transition-all"
            style={{
              background: "#3d3530",
              color: "#f0ebe3",
              padding: "18px",
              border: "none",
              marginTop: "8px",
              boxShadow: NEU_BTN,
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.boxShadow = NEU_BTN_HOVER)}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.boxShadow = NEU_BTN)}
          >
            제출
          </button>
        </form>

      </div>
    </div>
  );
}
