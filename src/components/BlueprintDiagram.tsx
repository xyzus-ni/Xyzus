/**
 * Diagram arsitektur blueprint sederhana (SVG inline).
 * Alur generik sensor-to-dashboard; label bisa dioverride lewat props.
 */
export function BlueprintDiagram({
  labels = ["SENSOR", "MCU / EDGE", "CLOUD / DB", "DASHBOARD"],
}: {
  labels?: [string, string, string, string];
}) {
  const nodes = [
    { x: 24, label: labels[0], sub: "INPUT" },
    { x: 196, label: labels[1], sub: "PROCESS" },
    { x: 368, label: labels[2], sub: "STORE" },
    { x: 540, label: labels[3], sub: "OUTPUT" },
  ];

  return (
    <svg
      viewBox="0 0 640 180"
      role="img"
      aria-label="Diagram arsitektur sistem: sensor, pemroses, cloud, dashboard"
      className="h-auto w-full"
    >
      {/* Garis koordinat latar */}
      <g stroke="rgb(var(--stone) / 0.5)" strokeWidth="1">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <line key={`v${i}`} x1={i * 128} y1="0" x2={i * 128} y2="180" />
        ))}
        {[0, 1, 2, 3, 4].map((i) => (
          <line key={`h${i}`} x1="0" y1={i * 45} x2="640" y2={i * 45} />
        ))}
      </g>

      {/* Panah antar node */}
      <g stroke="rgb(var(--teal-ink))" strokeWidth="1.5" fill="none">
        {[0, 1, 2].map((i) => {
          const x1 = nodes[i].x + 72;
          const x2 = nodes[i + 1].x - 8;
          const y = 78;
          return (
            <g key={i}>
              <line x1={x1} y1={y} x2={x2 - 6} y2={y} />
              <path d={`M ${x2 - 6} ${y} l -6 -4 v 8 z`} fill="rgb(var(--teal-ink))" stroke="none" />
            </g>
          );
        })}
      </g>

      {/* Node */}
      {nodes.map((n) => (
        <g key={n.label}>
          <rect
            x={n.x}
            y="46"
            width="72"
            height="64"
            rx="4"
            fill="rgb(var(--surface))"
            stroke="rgb(var(--teal-ink) / 0.6)"
            strokeWidth="1.5"
          />
          <rect x={n.x} y="46" width="72" height="14" rx="4" fill="rgb(var(--stone) / 0.6)" />
          <text
            x={n.x + 36}
            y="56.5"
            textAnchor="middle"
            fontSize="8"
            fontFamily="var(--font-mono)"
            fill="rgb(var(--graphite) / 0.7)"
            letterSpacing="1"
          >
            {n.sub}
          </text>
          <text
            x={n.x + 36}
            y="92"
            textAnchor="middle"
            fontSize="9"
            fontFamily="var(--font-mono)"
            fill="rgb(var(--graphite))"
            letterSpacing="0.5"
          >
            {n.label}
          </text>
        </g>
      ))}

      {/* Label gambar */}
      <text
        x="8"
        y="168"
        fontSize="9"
        fontFamily="var(--font-mono)"
        fill="rgb(var(--teal-ink))"
        letterSpacing="2"
      >
        FIG. 02 — SYSTEM ARCHITECTURE / SENSOR-TO-DASHBOARD
      </text>
    </svg>
  );
}
