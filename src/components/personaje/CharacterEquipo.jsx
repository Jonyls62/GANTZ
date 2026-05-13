// CharacterEquipo.jsx
// Lista reutilizable con edición individual por item

import { useState } from "react";
import { CSS, inputStyle } from "./CharacterAtoms";

export default function CharacterEquipo({
  label,
  items,
  onAdd,
  onRemove,
  onUpdate,
}) {
  const [editingId, setEditingId] = useState(null);

  return (
    <div
      className="p-3 mb-3"
      style={{
        background: CSS.card,
        border: `1px solid ${CSS.border}`,
        borderRadius: 8,
      }}
    >
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: ".1em",
              textTransform: "uppercase",
              color: CSS.dim,
            }}
          >
            {label}
          </span>
        </div>

        <button
          className="btn btn-sm py-0 px-2"
          style={{
            fontSize: 11,
            color: CSS.dim,
            border: `1px solid ${CSS.border}`,
            background: CSS.surface,
          }}
          onClick={onAdd}
        >
          + Agregar
        </button>
      </div>

      {/* VACÍO */}
      {items.length === 0 && <p style={{ fontSize: 12, color: CSS.dim }}>—</p>}

      {/* LISTA */}
      {items.map((item) => (
        <div
          key={item.id}
          className="d-flex gap-2 mb-1 px-2 py-1"
          style={{
            background: editingId === item.id ? CSS.surface : "transparent",
            border: `1px solid ${editingId === item.id ? CSS.border : "transparent"}`,
            borderRadius: 5,
            minHeight: 56,
          }}
        >
          {/* CONTENIDO */}
          <div className="flex-fill">
            {editingId === item.id ? (
              <input
                value={item.nombre}
                placeholder="Nombre"
                onChange={(e) => onUpdate(item.id, "nombre", e.target.value)}
                style={{ ...inputStyle, width: "100%" }}
                autoFocus
              />
            ) : (
              <div
                onClick={() => setEditingId(item.id)}
                style={{
                  cursor: "pointer",
                  fontSize: 13,
                  color: CSS.text,
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                  padding: "4px 0",
                }}
              >
                {item.nombre || "—"}
              </div>
            )}
          </div>

          {/* BOTONES */}
          <div
            className="d-flex flex-column justify-content-between align-items-end"
            style={{
              minHeight: 40,
            }}
          >
            {/* ELIMINAR */}
            <button
              className="btn btn-sm py-0 px-1"
              style={{
                color: CSS.red,
                border: "none",
                background: "transparent",
                fontSize: 14,
                lineHeight: 1,
              }}
              onClick={() => onRemove(item.id)}
            >
              ×
            </button>

            {/* OK */}
            {editingId === item.id && (
              <button
                className="btn btn-sm py-0 px-2"
                style={{
                  fontSize: 10,
                  color: CSS.dim,
                  border: `1px solid ${CSS.border}`,
                  background: CSS.surface,
                }}
                onClick={() => setEditingId(null)}
              >
                OK
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
