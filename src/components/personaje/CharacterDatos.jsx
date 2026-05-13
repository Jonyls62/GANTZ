// CharacterDatos.jsx
import { useState } from "react";
import { CSS, MicroLabel, TokenDots } from "./CharacterAtoms";

export default function CharacterDatos({ data, update }) {
  const [editingNotaId, setEditingNotaId] = useState(null);
  const [editingField, setEditingField] = useState(null);

  // ── notas ──
  const addNota = () => {
    const newId = crypto.randomUUID();
    update("notas", [...data.notas, { id: newId, texto: "" }]);
    setEditingNotaId(newId);
  };

  const removeNota = (id) => {
    update(
      "notas",
      data.notas.filter((n) => n.id !== id)
    );
    if (editingNotaId === id) setEditingNotaId(null);
  };

  const updateNota = (id, value) => {
    update(
      "notas",
      data.notas.map((n) => (n.id === id ? { ...n, texto: value } : n))
    );
  };

  // ── campo clickeable ──
  const campoEditable = (label, field) => {
    const isEditing = editingField === field;
    return (
      <div className="mb-3">
        <MicroLabel>{label}</MicroLabel>
        {isEditing ? (
          <>
            <textarea
              value={data[field]}
              placeholder={label}
              onChange={(e) => update(field, e.target.value)}
              autoFocus
              style={{
                width: "75%",
                minHeight: 30,
                resize: "vertical",
                background: CSS.surface,
                border: `1px solid ${CSS.border}`,
                borderRadius: 6,
                color: CSS.text,
                padding: 8,
                fontSize: 12,
              }}
            />
            <div className="d-flex justify-content-end mt-1">
              <button
                className="btn btn-sm py-0 px-2"
                style={{
                  fontSize: 10,
                  color: CSS.dim,
                  border: `1px solid ${CSS.border}`,
                  background: CSS.surface,
                }}
                onClick={() => setEditingField(null)}
              >
                OK
              </button>
            </div>
          </>
        ) : (
          <div
            onClick={() => setEditingField(field)}
            style={{
              fontSize: 12,
              color: CSS.text,
              whiteSpace: "pre-wrap",
              cursor: "pointer",
              padding: "4px 0",
            }}
          >
            {data[field] || "—"}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className="p-3 mb-3"
      style={{
        background: CSS.card,
        border: `1px solid ${CSS.border}`,
        borderRadius: 8,
      }}
    >
      <div className="mb-3">
        <MicroLabel>Traumas</MicroLabel>
        <TokenDots
          value={data.traumas ?? 0}
          max={3}
          color="rgb(224, 60, 60)"
          onChange={(v) => update("traumas", v)}
        />
      </div>

      {campoEditable("Ventajas / Desventajas", "ventajas")}
      {campoEditable("Habilidades", "habilidades")}
      {campoEditable("Personalidad / Historia", "personalidad")}
      {/* NOTAS */}
      <div className="mt-4">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <MicroLabel>Notas</MicroLabel>
          <button
            className="btn btn-sm py-0 px-2"
            style={{
              fontSize: 11,
              color: CSS.dim,
              border: `1px solid ${CSS.border}`,
              background: CSS.surface,
            }}
            onClick={addNota}
          >
            + Agregar
          </button>
        </div>

        {data.notas?.length === 0 && (
          <p style={{ fontSize: 12, color: CSS.dim }}>Sin notas.</p>
        )}

        {data.notas?.map((nota) => (
          <div
            key={nota.id}
            className="d-flex gap-1 mb-0"
            style={{ minHeight: 30 }}
          >
            {/* CONTENIDO */}
            <div className="flex-fill">
              {editingNotaId === nota.id ? (
                <textarea
                  value={nota.texto}
                  placeholder="Nueva nota..."
                  onChange={(e) => updateNota(nota.id, e.target.value)}
                  autoFocus
                  style={{
                    width: "100%",
                    minHeight: 60,
                    resize: "vertical",
                    background: CSS.surface,
                    border: `1px solid ${CSS.border}`,
                    borderRadius: 6,
                    color: CSS.text,
                    padding: 5,
                    fontSize: 12,
                  }}
                />
              ) : (
                <div
                  onClick={() => setEditingNotaId(nota.id)}
                  style={{
                    fontSize: 15,
                    color: CSS.text,
                    whiteSpace: "pre-wrap",
                    cursor: "pointer",
                    padding: "0px 0",
                  }}
                >
                  {nota.texto || "—"}
                </div>
              )}
            </div>

            {/* BOTONES */}
            <div
              className="d-flex flex-column justify-content-between align-items-end"
              style={{ minHeight: 60 }}
            >
              <button
                className="btn btn-sm py-0 px-1"
                style={{
                  color: CSS.red,
                  border: "none",
                  background: "transparent",
                  fontSize: 14,
                }}
                onClick={() => removeNota(nota.id)}
              >
                ×
              </button>

              {editingNotaId === nota.id && (
                <button
                  className="btn btn-sm py-0 px-2"
                  style={{
                    fontSize: 10,
                    color: CSS.dim,
                    border: `1px solid ${CSS.border}`,
                    background: CSS.surface,
                  }}
                  onClick={() => setEditingNotaId(null)}
                >
                  OK
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
