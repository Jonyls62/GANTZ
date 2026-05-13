// CreateCharacter.jsx
import { useState } from "react";
import { createCharacter } from "../../services/characterService";

const INITIAL = {
  nombre: "",
  arquetipo: "",
  foto: "",
  muerteComo: "",
  atributos: { Fue: 1, Des: 1, Con: 1, Int: 1, Per: 1, Vol: 1 },
  pv: 10,
  pvMax: 10,
  pr: 10,
  vel: 20,
  esencia: 20,
  sp: 0,
  spMax: 10,
  pg: 0,
  tokens: 0,
  tokensMax: 3,
  ventajas: "",
  habilidades: "",
  personalidad: "",
  heridas: [],
  notas: [],
  equipo: [],
  mejoras: [],
  traje: [],
  traumas: 0,
};

const STATS = [
  ["PV", "pv"],
  ["PR", "pr"],
  ["VEL", "vel"],
  ["Esencia", "esencia"],
];

export default function CreateCharacter({ onCreated }) {
  const [char, setChar] = useState(INITIAL);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const update = (field, value) =>
    setChar((prev) => ({ ...prev, [field]: value }));

  const updateAtributo = (attr, value) => {
    const v = Math.max(0, Math.min(6, Number(value)));
    setChar((prev) => ({
      ...prev,
      atributos: { ...prev.atributos, [attr]: v },
    }));
  };

  const updateStat = (field, value) => {
    const v = Math.max(0, Number(value));
    // pv actualiza pvMax también
    if (field === "pv") {
      setChar((prev) => ({ ...prev, pv: v, pvMax: v }));
    } else {
      setChar((prev) => ({ ...prev, [field]: v }));
    }
  };

  const uploadFoto = async (file) => {
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "gantz_upload");
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dbzam0tvg/image/upload",
        { method: "POST", body: formData }
      );
      const data = await res.json();
      update("foto", data.secure_url);
    } catch (e) {
      console.error(e);
      setError("Error al subir la imagen.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!char.nombre.trim()) {
      setError("El nombre es obligatorio.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await createCharacter(char);
      setChar(INITIAL);
      // avisa al padre
      if (onCreated) {
        onCreated();
      }
    } catch (e) {
      console.error(e);
      setError("Error al guardar. Intentá de nuevo.");
    } finally {
      setSaving(false);
    }
  };

  const S = {
    input: {
      width: "100%",
      background: "#0d0d0d",
      border: "1px solid #2a2a2a",
      borderRadius: 8,
      color: "#fff",
      padding: "8px 12px",
      fontSize: 13,
    },
    label: {
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: "#555",
      marginBottom: 6,
      display: "block",
    },
    statBox: {
      background: "#111",
      border: "1px solid #1f1f1f",
      borderRadius: 8,
      padding: "10px 12px",
    },
    btn: (active) => ({
      background: "transparent",
      border: "1px solid #2a2a2a",
      color: active ? "#fff" : "#555",
      borderRadius: 6,
      width: 24,
      height: 24,
      cursor: "pointer",
      fontSize: 14,
      lineHeight: 1,
    }),
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-8">
          <div
            style={{
              background: "#0d0d0d",
              border: "1px solid #1f1f1f",
              borderRadius: 16,
              padding: 28,
            }}
          >
            <h1
              style={{
                color: "#e63946",
                fontSize: 22,
                fontWeight: 700,
                textAlign: "center",
                marginBottom: 24,
              }}
            >
              Nuevo personaje
            </h1>

            {error && (
              <div
                style={{
                  background: "#1a0000",
                  border: "1px solid #7f1d1d44",
                  borderRadius: 8,
                  padding: "10px 14px",
                  color: "#e63946",
                  fontSize: 12,
                  marginBottom: 16,
                }}
              >
                {error}
              </div>
            )}

            {/* ── FOTO ── */}
            <div className="mb-4">
              <label style={S.label}>Foto</label>

              {/* zona clickeable */}
              <div
                style={{
                  border: "1px dashed #2a2a2a",
                  borderRadius: 10,
                  padding: "20px",
                  textAlign: "center",
                  cursor: "pointer",
                  background: "#111",
                  transition: "border-color 0.2s",
                  position: "relative",
                }}
                onClick={() => document.getElementById("foto-input").click()}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = "#e63946")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "#2a2a2a")
                }
              >
                <input
                  id="foto-input"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => uploadFoto(e.target.files[0])}
                />

                {uploading ? (
                  <p style={{ color: "#c9a227", fontSize: 12, margin: 0 }}>
                    Subiendo imagen...
                  </p>
                ) : char.foto ? (
                  <img
                    src={char.foto}
                    alt="preview"
                    style={{
                      width: "100%",
                      height: 200,
                      objectFit: "cover",
                      borderRadius: 8,
                    }}
                  />
                ) : (
                  <>
                    <i
                      className="ti ti-camera"
                      style={{ fontSize: 28, color: "#333" }}
                    />
                    <p
                      style={{ color: "#444", fontSize: 12, margin: "8px 0 0" }}
                    >
                      Hacé click para subir una foto
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* ── NOMBRE ── */}
            <div className="mb-3">
              <label style={S.label}>Nombre *</label>
              <input
                type="text"
                style={S.input}
                value={char.nombre}
                onChange={(e) => update("nombre", e.target.value)}
                placeholder="Nombre del personaje"
              />
            </div>

            {/* ── ARQUETIPO ── */}
            <div className="mb-4">
              <label style={S.label}>Arquetipo</label>
              <input
                type="text"
                style={S.input}
                value={char.arquetipo}
                onChange={(e) => update("arquetipo", e.target.value)}
                placeholder="Ej: Atleta, Médico, Ex-policía..."
              />
            </div>

            {/* ── MUERTE COMO ── */}
            <div className="mb-4">
              <label style={S.label}>¿Cómo murió?</label>
              <textarea
                style={{ ...S.input, minHeight: 70, resize: "vertical" }}
                value={char.muerteComo}
                onChange={(e) => update("muerteComo", e.target.value)}
                placeholder="Describí la muerte del personaje..."
              />
            </div>

            {/* ── ATRIBUTOS ── */}
            <div className="mb-4">
              <label style={S.label}>Atributos (0 – 6)</label>
              <div className="row g-2">
                {Object.entries(char.atributos).map(([attr, val]) => (
                  <div key={attr} className="col-4 col-md-3 col-lg-2">
                    <div key={attr} style={S.statBox}>
                      <div style={{ ...S.label, marginBottom: 6 }}>{attr}</div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 6,
                        }}
                      >
                        <button
                          style={S.btn(true)}
                          onClick={() => updateAtributo(attr, val - 1)}
                        >
                          −
                        </button>
                        <span
                          style={{
                            color: "#fff",
                            fontWeight: 700,
                            fontSize: 16,
                            minWidth: 16,
                            textAlign: "center",
                          }}
                        >
                          {val}
                        </span>
                        <button
                          style={S.btn(true)}
                          onClick={() => updateAtributo(attr, val + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── STATS ── */}
            <div className="mb-4">
              <label style={S.label}>Stats</label>
              <div className="row g-2 justify-content-evenly">
                {STATS.map(([label, field]) => (
                  <div key={field} className="col-auto">
                    <div key={field} style={S.statBox}>
                      <div style={{ ...S.label, marginBottom: 6 }}>{label}</div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 6,
                        }}
                      >
                        <button
                          style={S.btn(true)}
                          onClick={() => updateStat(field, char[field] - 1)}
                        >
                          −
                        </button>
                        <span
                          style={{
                            color: "#fff",
                            fontWeight: 700,
                            fontSize: 16,
                            minWidth: 16,
                            textAlign: "center",
                          }}
                        >
                          {char[field]}
                        </span>
                        <button
                          style={S.btn(true)}
                          onClick={() => updateStat(field, char[field] + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── PERSONALIDAD ── */}
            <div className="mb-3">
              <label style={S.label}>Personalidad / Historia</label>
              <textarea
                style={{ ...S.input, minHeight: 70, resize: "vertical" }}
                value={char.personalidad}
                onChange={(e) => update("personalidad", e.target.value)}
                placeholder="Personalidad, historia, motivaciones..."
              />
            </div>

            {/* ── VENTAJAS ── */}
            <div className="mb-3">
              <label style={S.label}>Ventajas / Desventajas</label>
              <textarea
                style={{ ...S.input, minHeight: 60, resize: "vertical" }}
                value={char.ventajas}
                onChange={(e) => update("ventajas", e.target.value)}
                placeholder="Ej: Atlético 4, Reflejos rápidos 2..."
              />
            </div>

            {/* ── HABILIDADES ── */}
            <div className="mb-4">
              <label style={S.label}>Habilidades</label>
              <textarea
                style={{ ...S.input, minHeight: 60, resize: "vertical" }}
                value={char.habilidades}
                onChange={(e) => update("habilidades", e.target.value)}
                placeholder="Ej: Atletismo 4, Pelea 3..."
              />
            </div>

            {/* ── BOTÓN ── */}
            <button
              style={{
                width: "100%",
                padding: 12,
                borderRadius: 10,
                border: "none",
                background: saving ? "#333" : "#e63946",
                color: saving ? "#666" : "#fff",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                cursor: saving ? "not-allowed" : "pointer",
                transition: "background 0.2s",
              }}
              onClick={handleSubmit}
              disabled={saving || uploading}
            >
              {saving ? "Guardando..." : "Crear personaje"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
