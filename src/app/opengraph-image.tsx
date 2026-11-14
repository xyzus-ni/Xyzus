import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "XYZUS — Independent Engineering Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F5F5F0",
          padding: "64px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 7,
              background: "#426B78",
            }}
          />
          <span style={{ fontSize: 28, letterSpacing: 6, color: "#171A19", fontWeight: 700 }}>
            XYZUS
          </span>
          <span style={{ fontSize: 16, color: "#737873", letterSpacing: 2 }}>
            / INDEPENDENT ENGINEERING STUDIO
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 64, fontWeight: 700, color: "#171A19", lineHeight: 1.1, maxWidth: 1000 }}>
            Engineering intelligence.
            <br />
            Building independence.
          </div>
          <div style={{ fontSize: 26, color: "#426B78" }}>
            Sistem cerdas untuk dunia fisik.
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 18, color: "#737873", letterSpacing: 3 }}>
          XYZUS.MY.ID — INDONESIA
        </div>
      </div>
    ),
    size,
  );
}
