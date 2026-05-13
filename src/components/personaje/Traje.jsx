import { useEffect, useMemo } from "react";
import trajeMSvg from "../../assets/img/trajem.svg";
import trajeFSvg from "../../assets/img/trajef.svg"; // ← corregido (estaba igual que M)
import { CSS, inputSmStyle, MicroLabel, BarTracker } from "./CharacterAtoms";

const parts = [
  { id: "head", label: "Cabeza" },
  { id: "core", label: "Núcleo" },
  { id: "l_arm", label: "Brazo Izq" },
  { id: "r_arm", label: "Brazo Der" },
  { id: "l_leg", label: "Pierna Izq" },
  { id: "r_leg", label: "Pierna Der" },
];

export default function Traje({ data, update, editing }) {
  const visibleParts = useMemo(() => data.traje ?? [], [data.traje]);
  const genero = data.trajeGenero ?? "M"; // ← nuevo: "M" por defecto
  const trajeSvg = genero === "F" ? trajeFSvg : trajeMSvg; // ← nuevo

  const togglePart = (id) => {
    const next = visibleParts.includes(id)
      ? visibleParts.filter((p) => p !== id)
      : [...visibleParts, id];
    update("traje", next);
  };

  useEffect(() => {
    const svgObject = document.getElementById("traje-svg");
    if (!svgObject) return;

    const handleLoad = () => {
      const svgDoc = svgObject.contentDocument;
      if (!svgDoc) return;
      parts.forEach((part) => {
        const el = svgDoc.getElementById(part.id);
        if (!el) return;
        el.setAttribute(
          "display",
          visibleParts.includes(part.id) ? "block" : "none"
        );
      });
    };

    svgObject.addEventListener("load", handleLoad);
    handleLoad();
    return () => svgObject.removeEventListener("load", handleLoad);
  }, [visibleParts]);

  return (
    <div className="container">
      <div className="card bg-black text-light border-secondary p-3">
        <div className="row g-4 align-items-center">
          {/* ── PANEL IZQUIERDO ── */}
          <div className="col-12 col-lg-5 d-flex flex-column align-items-center text-center">
            <div
              className="terminal-text mb-3"
              style={{ fontSize: 12, letterSpacing: ".08em" }}
            >
              ESTADO DEL TRAJE
            </div>

            <div className="d-flex flex-column gap-2">
              {parts.map((part) => {
                const active = visibleParts.includes(part.id);
                return (
                  <div
                    key={part.id}
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <button
                      onClick={() => togglePart(part.id)}
                      title={part.label}
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 6,
                        border: "1px solid #333",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 13,
                        fontWeight: "bold",
                        padding: 0,
                        transition: "0.15s",
                        background: active ? "#ff1a1a" : "#0f0f0f",
                        color: active ? "#fff" : "#444",
                        boxShadow: active
                          ? "0 0 10px rgba(255,0,0,0.7)"
                          : "none",
                      }}
                    >
                      ✕
                    </button>
                    <span
                      style={{
                        fontSize: 12,
                        color: active ? "#fff" : "#666",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {part.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* SP */}
            <div className="mt-4 w-100">
              <div
                className="terminal-text mb-2"
                style={{ fontSize: 11, letterSpacing: ".08em" }}
              >
                SUIT POWER
              </div>

              <BarTracker
                label={`SP ${data.sp}/${data.spMax}`}
                value={data.sp}
                max={data.spMax}
                color={CSS.red}
                onChange={(v) => update("sp", Math.min(v, data.spMax))}
                editing={editing}
              />

              <div className="mt-3">
                <MicroLabel>SP Máximo</MicroLabel>
                <input
                  type="number"
                  className="no-spinner"
                  min={1}
                  value={data.spMax}
                  onChange={(e) => {
                    const newMax = Number(e.target.value);
                    update("spMax", newMax);
                    if (data.sp > newMax) update("sp", newMax);
                  }}
                  style={{ ...inputSmStyle, width: 80, textAlign: "center" }}
                />
              </div>
            </div>
          </div>

          {/* ── TRAJE SVG ── */}
          <div className="col-12 col-lg-7 d-flex flex-column align-items-center">
            <object
              id="traje-svg"
              type="image/svg+xml"
              data={trajeSvg}
              className="w-100"
              style={{
                maxWidth: 220,
                filter: "drop-shadow(0 0 8px rgba(0,180,255,0.35))",
              }}
            />

            {/* ── PILL TOGGLE GÉNERO ── */}
            <div
              style={{
                display: "inline-flex",
                background: "#111",
                border: "1px solid #333",
                borderRadius: 8,
                padding: 3,
                marginTop: 12,
                gap: 4,
              }}
            >
              {["M", "F"].map((g) => (
                <button
                  key={g}
                  onClick={() => update("trajeGenero", g)}
                  style={{
                    width: 32,
                    height: 24,
                    borderRadius: 6,
                    border: "none",
                    cursor: "pointer",
                    fontSize: 11,
                    fontWeight: "bold",
                    letterSpacing: "0.05em",
                    transition: "0.15s",
                    background: genero === g ? "#0a84ff" : "transparent",
                    color: genero === g ? "#fff" : "#555",
                    boxShadow:
                      genero === g ? "0 0 8px rgba(10,132,255,0.6)" : "none",
                  }}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
