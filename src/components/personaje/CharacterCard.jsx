// CharacterCard.jsx
import "@tabler/icons-webfont/dist/tabler-icons.css";
import { useNavigate } from "react-router-dom";

const OLAS = [
  "M0,30 C60,55 120,5 180,30 C240,55 280,15 300,25 L300,60 L0,60 Z",
  "M0,20 C50,45 110,10 170,35 C220,55 270,20 300,30 L300,60 L0,60 Z",
  "M0,40 C70,10 130,50 190,25 C240,5 275,35 300,20 L300,60 L0,60 Z",
];

const ICONO_ATRIBUTO = {
  Fue: "ti-barbell",
  Des: "ti-run",
  Con: "ti-heart-rate-monitor",
  Int: "ti-brain",
  Per: "ti-eye",
  Vol: "ti-flame",
};

function Pill({ children, color }) {
  const colors = {
    green: { color: "#22c55e", borderColor: "#14532d44" },
    red: { color: "#e63946", borderColor: "#7f1d1d44" },
    gold: { color: "#c9a227", borderColor: "#2a220044" },
  };
  return (
    <span
      style={{
        fontSize: 10,
        background: "#111",
        border: `1px solid ${colors[color]?.borderColor ?? "#1e1e1e"}`,
        borderRadius: 20,
        padding: "2px 10px",
        color: colors[color]?.color ?? "#555",
      }}
    >
      {children}
    </span>
  );
}

export default function CharacterCard({ char, index = 0 }) {
  const navigate = useNavigate();
  const atributoTop = char.atributos
    ? Object.entries(char.atributos).sort(([, a], [, b]) => b - a)[0][0]
    : null;

  const icono = atributoTop
    ? (ICONO_ATRIBUTO[atributoTop] ?? "ti-user")
    : "ti-user";
  const ola = OLAS[index % OLAS.length];
  const heridas = char.heridas?.length ?? 0;

  return (
    <div
      style={{
        background: "#0d0d0d",
        borderRadius: 16,
        overflow: "hidden",
        cursor: "pointer",
        border: "1px solid #1f1f1f",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow =
          "0 16px 48px rgba(255,255,255,0.08), 0 4px 16px rgba(0,0,0,0.8)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
      //onClick={() => onSelect?.(char)}
      onClick={() => navigate(`/character/${char.id}`)}
    >
      {/* ── IMAGEN ── */}
      <div style={{ position: "relative", height: 260, overflow: "hidden" }}>
        {char.foto ? (
          <img
            src={char.foto}
            alt={char.nombre}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "#141414",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <i
              className="ti ti-user"
              style={{ fontSize: 56, color: "#1e1e1e" }}
              aria-hidden="true"
            />
          </div>
        )}

        {/* OLA */}
        <svg
          style={{ position: "absolute", bottom: -1, left: 0, width: "100%" }}
          viewBox="0 0 300 60"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path d={ola} fill="#0d0d0d" />
        </svg>
      </div>

      {/* ── BODY ── */}
      <div style={{ padding: 16 }}>
        {/* NOMBRE + ICONO */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 8,
            marginBottom: 8,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#fff",
                letterSpacing: "-0.01em",
                lineHeight: 1.2,
              }}
            >
              {char.nombre}
            </div>
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "gold",
                marginTop: 3,
              }}
            >
              {char.arquetipo}
            </div>
          </div>

          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "#141414",
              border: "1px solid #2a2a2a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <i
              className={`ti ${icono}`}
              style={{ fontSize: 18, color: "gold" }}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* DIVIDER */}
        <div style={{ height: 1, background: "#1f1f1f", marginBottom: 10 }} />

        {/* MUERTE COMO */}
        {char.muerteComo && (
          <div
            style={{
              fontSize: 11,
              color: "rgb(226, 224, 240)",
              fontStyle: "italic",
              marginBottom: 12,
              lineHeight: 1.4,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            "{char.muerteComo}"
          </div>
        )}

        {/* STATS */}
        <div
          style={{
            display: "flex",
            gap: 6,
            flexWrap: "wrap",
            marginBottom: 12,
          }}
        >
          <Pill color="green">
            PV {char.pv}/{char.pvMax}
          </Pill>
          <Pill>
            SP {char.sp}/{char.spMax}
          </Pill>
          <Pill color="gold">PG {char.pg}</Pill>
          {heridas > 0 && (
            <Pill color="red">
              <span
                style={{
                  display: "inline-block",
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#e63946",
                  marginRight: 4,
                  verticalAlign: "middle",
                }}
              />
              {heridas} {heridas === 1 ? "herida" : "heridas"}
            </Pill>
          )}
        </div>

        {/* BOTÓN */}
        <button
          style={{
            width: "100%",
            padding: 8,
            borderRadius: 8,
            border: "1px solid #2a2a2a",
            background: "#111",
            color: "#555",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "background 0.2s, color 0.2s, border-color 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#e63946";
            e.currentTarget.style.color = "#fff";
            e.currentTarget.style.borderColor = "#e63946";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#111";
            e.currentTarget.style.color = "#555";
            e.currentTarget.style.borderColor = "#2a2a2a";
          }}
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/character/${char.id}`);
          }}
        >
          Seleccionar
        </button>
      </div>
    </div>
  );
}
