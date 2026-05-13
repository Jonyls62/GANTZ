// CharacterHeader.jsx
// Sección superior: foto, nombre, arquetipo y atributos

import Traje from "./Traje";
import TallyCounter from "./TallyCounter";
import { uploadImage } from "../../services/imageService";
import { useState } from "react";

import {
  CSS,
  MicroLabel,
  Field,
  AttrBox,
  clamp,
  TokenDots,
  StatCell,
} from "./CharacterAtoms";

export default function CharacterHeader({ data, update, editing }) {
  const pgPct = Math.min(data.pg, 100);

  // dentro del componente, agregás estado:
  const [uploading, setUploading] = useState(false);

  const handleFoto = async (file) => {
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file);
      update("foto", url);
    } catch (e) {
      console.error(e);
      alert("Error al subir imagen.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      className="row p-3 mb-3 align-items-start "
      style={{
        background: CSS.card,
        border: `1px solid ${CSS.border}`,
        borderRadius: 8,
      }}
    >
      {/* ───────────────────────── IZQUIERDA ───────────────────────── */}
      <div className="col-12 col-lg-3 d-flex flex-column align-items-center ">
        {/* EN MOBILE: foto+nombre+arquetipo | contador — EN DESKTOP: columna normal */}
        <div className="d-flex flex-row flex-lg-column align-items-start align-items-lg-center gap-3 w-100 mb-2">
          {/* FOTO + NOMBRE + ARQUETIPO */}
          <div className="d-flex flex-column align-items-center">
            {/* FOTO */}
            <div
              style={{
                width: 154,
                height: 196,
                border: `2px solid ${CSS.border}`,
                borderRadius: 8,
                background: CSS.surface,
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                cursor: editing ? "pointer" : "default",
              }}
              onClick={() =>
                editing && document.getElementById("foto-edit-input").click()
              }
            >
              {editing && (
                <input
                  id="foto-edit-input"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => handleFoto(e.target.files[0])}
                />
              )}

              {uploading ? (
                <span style={{ fontSize: 11, color: CSS.dim }}>
                  Subiendo...
                </span>
              ) : data.foto ? (
                <>
                  <img
                    src={data.foto}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  {editing && (
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "rgba(0,0,0,0.5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <i
                        className="ti ti-camera"
                        style={{ fontSize: 24, color: "#fff" }}
                      />
                    </div>
                  )}
                </>
              ) : (
                <span style={{ fontSize: 42, color: CSS.dim }}>👤</span>
              )}
            </div>

            {/* NOMBRE */}
            <div className="text-center mb-1">
              <Field
                value={data.nombre}
                onChange={(v) => update("nombre", v)}
                editing={editing}
                placeholder="Nombre del personaje"
                className="fw-bold fs-4"
              />
            </div>

            {/* ARQUETIPO */}
            <div className="text-center">
              <Field
                value={data.arquetipo}
                onChange={(v) => update("arquetipo", v)}
                editing={editing}
                placeholder="Arquetipo del personaje"
                style={{
                  fontSize: 12,
                  color: CSS.gold,
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              />
            </div>
          </div>
          {/* CONTADOR — al lado en mobile, abajo en desktop */}
          <div className="col-6">
            <TallyCounter />
          </div>
        </div>

        {/* TOKENS | SP — lado a lado siempre */}
        <div className="d-flex flex-row gap-3 w-100 mb-3 mt-3">
          <div className="flex-grow-1">
            <MicroLabel>Tokens de tensión</MicroLabel>
            <TokenDots
              value={data.tokens}
              max={data.tokensMax}
              onChange={(v) => update("tokens", v)}
            />
          </div>
          {/* contador PG */}
          <div
            className="p-3 w-100"
            style={{
              background: CSS.surface,
              border: `1px solid ${CSS.border}`,
              borderRadius: 6,
            }}
          >
            <div className="d-flex justify-content-between align-items-center mb-2">
              <MicroLabel>Puntos Gantz (PG)</MicroLabel>
              <div className="d-flex align-items-center gap-1">
                <button
                  className="btn btn-sm py-0 px-1"
                  style={{
                    color: CSS.dim,
                    border: `1px solid ${CSS.border}`,
                    background: CSS.card,
                    lineHeight: 1.6,
                  }}
                  onClick={() => update("pg", clamp(data.pg - 1, 0, 9999))}
                >
                  −
                </button>
                <span
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: CSS.gold,
                    fontFamily: "monospace",
                  }}
                >
                  {data.pg}
                </span>
                <button
                  className="btn btn-sm py-0 px-1"
                  style={{
                    color: CSS.dim,
                    border: `1px solid ${CSS.border}`,
                    background: CSS.card,
                    lineHeight: 1.6,
                  }}
                  onClick={() => update("pg", data.pg + 1)}
                >
                  +
                </button>
              </div>
            </div>
            <div
              style={{
                height: 6,
                background: CSS.border,
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${pgPct}%`,
                  height: "100%",
                  background: data.pg >= 100 ? CSS.teal : CSS.gold,
                  borderRadius: 3,
                  transition: "width .4s",
                }}
              />
            </div>
            <div
              className="text-end mt-1"
              style={{ fontSize: 10, color: CSS.dim }}
            >
              {data.pg >= 100
                ? "🟢 Libertad disponible"
                : `${100 - data.pg} PG para libertad`}
            </div>
          </div>
        </div>
      </div>
      {/* ───────────────────────── DERECHA ───────────────────────── */}
      <div className="col-12 col-lg-9 d-flex flex-column text-center ">
        {/* TITULO */}
        <MicroLabel className="mb-2">ATRIBUTOS</MicroLabel>

        {/* FILA PRINCIPAL */}
        <div
          className="d-flex flex-wrap gap-2 justify-content-center"
          style={{ flexWrap: "nowrap", overflowX: "auto" }}
        >
          {/* ATRIBUTOS */}
          {Object.entries(data.atributos).map(([attr, val]) => (
            <AttrBox
              key={attr}
              label={attr}
              value={val}
              onChange={(v) =>
                update("atributos", {
                  ...data.atributos,
                  [attr]: v,
                })
              }
              editing={editing}
            />
          ))}

          {/* STATS */}
          {[
            ["PV", "pvMax"],
            ["PR", "pr"],
            ["VEL", "vel"],
            ["ES", "esencia"],
          ].map(([label, field]) => (
            <StatCell
              key={field}
              label={label}
              field={field}
              data={data}
              onChange={(f, v) => update(f, v)}
              editing={editing}
            />
          ))}
        </div>

        {/* ───── ESPACIO FUTURO ───── */}
        <div className="row justify-content-center g-3 mt-1 w-100">
          <div className="col-md-8">
            <Traje data={data} update={update} editing={editing} />
          </div>
        </div>
      </div>
    </div>
  );
}
