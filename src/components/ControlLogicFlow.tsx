import React from "react";

/**
 * Flowchart ladder logic "Industrial Control Logic" (PRJ-009).
 * Dirender sebagai SVG teknik — readable first, sesuai BlueprintDiagram.
 */
export function ControlLogicFlow() {
  const node = (
    x: number,
    y: number,
    w: number,
    label: string,
    sub?: string,
    accent = false
  ) => (
    <g key={label}>
      <rect
        x={x}
        y={y}
        width={w}
        height={sub ? 44 : 34}
        rx={3}
        fill={accent ? "#263E49" : "none"}
        stroke={accent ? "#426B78" : "#426B78"}
        strokeWidth={1.2}
      />
      <text
        x={x + w / 2}
        y={y + (sub ? 19 : 21)}
        textAnchor="middle"
        fontFamily="monospace"
        fontSize={10}
        letterSpacing={1}
        fill={accent ? "#F0F2EE" : "#263E49"}
      >
        {label}
      </text>
      {sub && (
        <text
          x={x + w / 2}
          y={y + 34}
          textAnchor="middle"
          fontFamily="monospace"
          fontSize={8}
          fill={accent ? "#9AA29E" : "#737873"}
        >
          {sub}
        </text>
      )}
    </g>
  );

  const arrow = (x1: number, y1: number, x2: number, y2: number, label?: string) => (
    <g key={`${x1}-${y1}-${x2}-${y2}-${label}`}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#426B78" strokeWidth={1.2} markerEnd="url(#clf-arrow)" />
      {label && (
        <text
          x={(x1 + x2) / 2}
          y={(y1 + y2) / 2 - 5}
          textAnchor="middle"
          fontFamily="monospace"
          fontSize={9}
          fill="#737873"
        >
          {label}
        </text>
      )}
    </g>
  );

  return (
    <svg
      viewBox="0 0 720 560"
      className="h-auto w-full"
      role="img"
      aria-label="Flowchart logika kendali Industrial Control Logic"
    >
      <defs>
        <marker id="clf-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="#426B78" />
        </marker>
        <pattern id="clf-grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0V24" fill="none" stroke="#EBECE7" strokeWidth="0.6" />
        </pattern>
      </defs>
      <rect width="720" height="560" fill="url(#clf-grid)" />

      {/* Row 1: Input / Start */}
      {node(40, 40, 120, "TOMBOL START", "NO push-button")}
      {node(280, 40, 140, "SYSTEM RUN", "R1 — relay utama", true)}
      {node(520, 40, 160, "CONVEYOR + EMITTER", "CONV1/CONV2 aktif")}
      {arrow(160, 57, 280, 57)}
      {arrow(420, 57, 520, 57)}

      {/* Row 2: Safety interlock */}
      {node(280, 120, 200, "INTERLOCK AMAN", "STOP / ES / PINTU / RESET", false)}
      {arrow(360, 97, 360, 120, "jika aman")}
      {node(560, 120, 140, "STOP / ALARM", "R2 — stack merah", false)}
      {arrow(480, 137, 560, 137, "jika bahaya")}

      {/* Row 3: Sensor */}
      {node(40, 220, 150, "SENSOR WARNA", "V1/V2/V3 + Metal")}
      {node(280, 220, 160, "KLASIFIKASI", "Hijau / Biru / Metal")}
      {node(520, 220, 160, "PUSHER SORTIR", "SPushMetal / SGL / SBL")}
      {arrow(190, 237, 280, 237)}
      {arrow(440, 237, 520, 237)}
      {arrow(360, 97 + 40, 360, 220 - 10, "") /* vertical link run→sense area */}

      {/* Row 4: Counter + data */}
      {node(40, 330, 150, "STACK FISIK", "Green / Blue / Metal")}
      {node(280, 330, 160, "COUNTER C1–C4", "hitung per kategori")}
      {node(520, 330, 160, "DATA KE DISPLAY", "QW100–QW106 → HMI")}
      {arrow(190, 347, 280, 347)}
      {arrow(440, 347, 520, 347)}
      {arrow(360, 264, 360, 330, "")}

      {/* Row 5: Done */}
      {node(280, 430, 200, "SEMUA KATEGORI DONE?", "MDONE — timer T1/T2", false)}
      {node(560, 430, 140, "LAMPU HIJAU", "indikator selesai", true)}
      {arrow(360, 374, 360, 430)}
      {arrow(480, 447, 560, 447, "ya")}
      {arrow(560, 120 + 34 + 10, 560, 330, "") /* stop state line */}

      {/* Labels kaki */}
      <text x="40" y="520" fontFamily="monospace" fontSize={10} fill="#737873" letterSpacing={2}>
        LOGIKA: START → JALAN → BACA WARNA → SORTIR → HITUNG → TAMPILKAN → SELESAI
      </text>
      <text x="520" y="520" fontFamily="monospace" fontSize={10} fill="#737873" letterSpacing={2}>
        Sumber: OB1 — Main Program Sweep (Siemens)
      </text>
    </svg>
  );
}
