// CharacterAtoms.jsx — Componentes atómicos reutilizables

export const CSS = {
  bg: "#0a0a0e",
  surface: "#111118",
  card: "#14141e",
  border: "#252534",
  dim: "#70708a",
  red: "#e03c3c",
  redDim: "rgba(224,60,60,.35)",
  gold: "#d4a020",
  teal: "#1aae82",
  amber: "#e09c20",
  text: "#e2e0f0",
};

export const inputStyle = {
  background: CSS.surface,
  border: `1px solid ${CSS.border}`,
  borderRadius: 5,
  color: CSS.text,
  fontFamily: "inherit",
  fontSize: 13,
  padding: "5px 5px",
  outline: "none",
  width: "100%",
};

export const inputSmStyle = { ...inputStyle, width: 56, textAlign: "center" };

export const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
export const uid = () => crypto.randomUUID().slice(0, 8);

/** Etiqueta uppercase pequeña */
export function MicroLabel({ children }) {
  return (
    <div
      style={{
        fontSize: 9,
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: CSS.dim,
        marginBottom: 3,
      }}
    >
      {children}
    </div>
  );
}

/** Input de texto o textarea editable / texto plano */
export function Field({
  value,
  onChange,
  editing,
  multiline,
  placeholder,
  className = "",
  style = {},
}) {
  if (!editing) {
    return (
      <p
        className={`mb-0 ${className}`}
        style={{
          fontSize: 13,
          color: value ? CSS.text : CSS.dim,
          lineHeight: 1.6,
          ...style,
        }}
      >
        {value || placeholder || "—"}
      </p>
    );
  }
  const shared = {
    ...inputStyle,
    ...(multiline ? { resize: "vertical" } : {}),
    ...style,
  };
  return multiline ? (
    <textarea
      rows={3}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      style={shared}
    />
  ) : (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      style={inputStyle}
    />
  );
}

/** Barra de progreso con controles +/− */
export function BarTracker({ label, value, max, color, onChange }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className="mb-3">
      <div className="d-flex justify-content-between align-items-center mb-1">
        <MicroLabel>{label}</MicroLabel>
        <div className="d-flex align-items-center gap-1">
          {
            <button
              className="btn btn-sm py-0 px-1"
              style={{
                color: CSS.dim,
                border: `1px solid ${CSS.border}`,
                background: CSS.surface,
                lineHeight: 1.6,
              }}
              onClick={() => onChange(clamp(value - 1, 0, max))}
            >
              −
            </button>
          }
          <span
            style={{
              fontSize: 12,
              color: CSS.text,
              minWidth: 38,
              textAlign: "center",
            }}
          >
            {value} / {max}
          </span>
          {
            <button
              className="btn btn-sm py-0 px-1"
              style={{
                color: CSS.dim,
                border: `1px solid ${CSS.border}`,
                background: CSS.surface,
                lineHeight: 1.6,
              }}
              onClick={() => onChange(clamp(value + 1, 0, max))}
            >
              +
            </button>
          }
        </div>
      </div>
      <div
        style={{
          height: 7,
          background: CSS.border,
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            background: color,
            borderRadius: 4,
            transition: "width .3s",
          }}
        />
      </div>
    </div>
  );
}

/** Dots de tokens clickeables */
export function TokenDots({ value, max, onChange, color = CSS.amber }) {
  return (
    <div className="d-flex gap-2 align-items-center flex-wrap">
      {Array.from({ length: max }).map((_, i) => (
        <div
          key={i}
          onClick={() => onChange(i < value ? i : i + 1)}
          style={{
            width: 17,
            height: 17,
            borderRadius: "50%",
            flexShrink: 0,
            border: `2px solid ${i < value ? color : CSS.border}`,
            background: i < value ? color : "transparent",
            cursor: "pointer",
            transition: "all .15s",
          }}
        />
      ))}

      <span style={{ fontSize: 12, color: CSS.dim }}>
        {value}/{max}
      </span>
    </div>
  );
}
/** Caja de atributo */
export function AttrBox({ label, value, onChange, editing }) {
  return (
    <div
      className="d-flex flex-column align-items-center p-2"
      style={{
        background: CSS.surface,
        border: `1px solid ${CSS.border}`,
        borderRadius: 6,
      }}
    >
      <MicroLabel>{label}</MicroLabel>
      {editing ? (
        <input
          type="number"
          min={1}
          max={6}
          value={value}
          onChange={(e) => onChange(clamp(parseInt(e.target.value) || 1, 1, 6))}
          style={{
            width: 40,
            textAlign: "center",
            fontSize: 18,
            fontWeight: 700,
            background: "transparent",
            border: "none",
            color: CSS.red,
            outline: "none",
          }}
        />
      ) : (
        <span style={{ fontSize: 18, fontWeight: 700, color: CSS.red }}>
          {value}
        </span>
      )}
    </div>
  );
}

/** Stat secundario (PV, PR, Vel, Esencia) */
export function StatCell({ label, field, data, onChange, editing }) {
  return (
    <div
      className="text-center p-2"
      style={{
        background: CSS.surface,
        border: `1px solid ${CSS.border}`,
        borderRadius: 6,
      }}
    >
      <MicroLabel>{label}</MicroLabel>
      {editing ? (
        <input
          type="number"
          min={0}
          value={data[field]}
          onChange={(e) => onChange(field, parseInt(e.target.value) || 0)}
          style={{
            width: "100%",
            textAlign: "center",
            fontSize: 18,
            fontWeight: 700,
            background: "transparent",
            border: "none",
            color: CSS.text,
            outline: "none",
          }}
        />
      ) : (
        <div style={{ fontSize: 18, fontWeight: 700, color: CSS.text }}>
          {data[field]}
        </div>
      )}
    </div>
  );
}
