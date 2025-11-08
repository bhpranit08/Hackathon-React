import { useState, useMemo } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

/**
 * PrizeDonut
 *
 * Props:
 * - total (number) default 50000
 * - data (array of {name, value}) values are fractions (0-1) or absolute if useAbsolute=true
 * - gradients (array) each: { id, colors: [c1,c2,c3] }
 * - labels (object) e.g. { "1st": "🥇 1st Place", ... }
 * - size (number | string) default 350 -> sets wrapper size (px if number)
 * - innerRadius (string|number) default "40%" (percent or px)
 * - outerRadius (string|number) default "70%"
 * - primary (string) css var or color for inner circle background (default "var(--primary)")
 * - accentVar (string) money color var (default "var(--accent-alt)")
 * - useAbsolute (boolean) if true, `data.value` is taken as absolute numbers; otherwise treated as fractions of `total`
 */

const defaultData = [
  { name: "1st", value: 0.5 },
  { name: "2nd", value: 0.3 },
  { name: "3rd", value: 0.2 },
];

const defaultGradients = [
  { id: "grad1", colors: ["#EE4A4D", "#EFC107", "#FFCD07"] }, // Gold-ish blend
  { id: "grad2", colors: ["#fae0e0", "#C0C0C0", "#EE4A4D"] }, // Silver-ish blend
  { id: "grad3", colors: ["#EE4A4D", "#873306", "#A15600"] }, // Bronze-ish blend
];

const defaultLabels = {
  "1st": "🥇 1st Place",
  "2nd": "🥈 2nd Place",
  "3rd": "🥉 3rd Place",
};

export default function PrizeDonut({
  total = 50000,
  data = defaultData,
  gradients = defaultGradients,
  labels = defaultLabels,
  size = 350,
  innerRadius = "40%",
  outerRadius = "70%",
  primary = "var(--primary)",
  accentVar = "var(--accent-alt)",
  useAbsolute = false, // if true, data.value are actual numbers
}) {
  const [active, setActive] = useState(null);
  const isTouch =
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0);

  // compute chartData (absolute values)
  const chartData = useMemo(() => {
    if (useAbsolute) return data.map((d) => ({ ...d }));
    return data.map((d) => ({ ...d, value: (d.value || 0) * total }));
  }, [data, total, useAbsolute]);

  const activeItem = active ? chartData.find((d) => d.name === active) : null;

  // size style
  const wrapperSizeStyle =
    typeof size === "number"
      ? { width: size, height: size }
      : { width: size, height: size };

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        ...wrapperSizeStyle,
        maxWidth: "100%",
      }}
    >
      {/* Force Recharts tooltip wrapper to sit above the inner circle */}
      <style>{`
        .recharts-tooltip-wrapper { z-index: 9999 !important; pointer-events: auto; }
      `}</style>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          {/* defs: per-slice 3-stop gradients */}
          <defs>
            {gradients.map((g) => (
              <linearGradient
                key={g.id}
                id={g.id}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                {g.colors.map((c, i) => (
                  <stop
                    key={i}
                    offset={`${Math.round((i / (g.colors.length - 1)) * 100)}%`}
                    stopColor={c}
                  />
                ))}
              </linearGradient>
            ))}
          </defs>

          <Pie
            data={chartData}
            dataKey="value"
            cx="50%"
            cy="50%"
            // allow props to be string percent or number px
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={2}
            isAnimationActive={true}
            // hover & tap handlers
            onMouseEnter={
              isTouch
                ? undefined
                : (_, index) => setActive(chartData[index].name)
            }
            onMouseLeave={isTouch ? undefined : () => setActive(null)}
            onClick={
              isTouch
                ? (_, index) => setActive(chartData[index].name)
                : undefined
            }
          >
            {chartData.map((_, i) => (
              <Cell
                key={i}
                fill={`url(#${gradients[i % gradients.length].id})`}
              />
            ))}
          </Pie>

          <Tooltip
            formatter={(value, name) => [
              `Rs. ${value.toLocaleString()}`,
              labels[name],
            ]}
            contentStyle={{
              backgroundColor: "var(--secondary)",
              border: "none",
              color: "var(--text)",
              borderRadius: 8,
              padding: "8px 12px",
            }}
            itemStyle={{ color: "var(--text)" }}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Center circle overlay. pointer-events none prevents blocking tooltip/clicks.
          zIndex is intentionally low (0) so tooltip wrapper (z-index:9999) appears above it.
          Background uses primary var. Make transparent by passing primary='transparent'. */}
      <div
        style={{
          position: "absolute",
          inset: "0", // lets centering be simpler
          display: "grid",
          placeItems: "center",
          pointerEvents: "none", // critical so tooltip/clicks are not blocked
          zIndex: 0,
        }}
      >
        <div
          aria-hidden="true"
          style={{
            width: "45%", // inner circle size relative to outer container
            aspectRatio: "1 / 1",
            borderRadius: "50%",
            background: primary,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            boxSizing: "border-box",
            padding: "0.5rem",
            gap: "0.18rem",
          }}
        >
          {/* Text must not capture pointer events either */}
          <div style={{ textAlign: "center", pointerEvents: "none" }}>
            {activeItem ? (
              <>
                <div
                  style={{
                    fontFamily: '"Cubano", sans-serif',
                    fontSize: "clamp(12px, 2.2vw, 18px)",
                    color: "var(--text)",
                    lineHeight: 1,
                  }}
                >
                  {labels[active]}
                </div>
                <div
                  style={{
                    fontFamily: '"Cubano", sans-serif',
                    fontSize: "clamp(14px, 3vw, 22px)",
                    color: accentVar,
                    fontWeight: 700,
                    lineHeight: 1,
                  }}
                >
                  Rs. {activeItem.value.toLocaleString()}!
                </div>
              </>
            ) : (
              <>
                <div
                  style={{
                    fontFamily: '"Cubano", sans-serif',
                    fontSize: "clamp(12px, 2.2vw, 18px)",
                    color: "var(--text)",
                    lineHeight: 1,
                  }}
                >
                  Prize Pool of
                </div>
                <div
                  style={{
                    fontFamily: '"Cubano", sans-serif',
                    fontSize: "clamp(14px, 3vw, 22px)",
                    color: accentVar,
                    fontWeight: 700,
                    lineHeight: 1,
                  }}
                >
                  Rs. {total.toLocaleString()}!
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
