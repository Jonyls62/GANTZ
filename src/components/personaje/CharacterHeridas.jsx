// CharacterHeridas.jsx

import { useState } from "react";
import { CSS, uid, inputStyle } from "./CharacterAtoms";

export default function CharacterHeridas({ data, update }) {
  const [editingId, setEditingId] = useState(null);

  const add = () => {
    const newId = uid();

    update("heridas", [
      ...data.heridas,
      {
        id: newId,
        nombre: "",
        efecto: "",
      },
    ]);

    setEditingId(newId);
  };

  const remove = (id) => {
    update(
      "heridas",
      data.heridas.filter((h) => h.id !== id)
    );

    if (editingId === id) {
      setEditingId(null);
    }
  };

  const edit = (id, field, value) => {
    update(
      "heridas",
      data.heridas.map((h) => (h.id === id ? { ...h, [field]: value } : h))
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
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div className="d-flex align-items-center gap-2">
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: ".1em",
              textTransform: "uppercase",
              color: CSS.dim,
            }}
          >
            Heridas activas
          </span>

          {data.heridas.length > 0 && (
            <span
              style={{
                fontSize: 11,
                color: CSS.red,
              }}
            >
              ⚠ {data.heridas.length}
            </span>
          )}
        </div>

        <button
          className="btn btn-sm py-0 px-2"
          style={{
            fontSize: 11,
            color: CSS.dim,
            border: `1px solid ${CSS.border}`,
            background: CSS.surface,
          }}
          onClick={add}
        >
          + Agregar
        </button>
      </div>

      {/* VACIO */}
      {data.heridas.length === 0 && (
        <p
          style={{
            fontSize: 12,
            color: CSS.dim,
          }}
        >
          Sin heridas activas.
        </p>
      )}

      {/* LISTA */}
      {data.heridas.map((h) => (
        <div
          key={h.id}
          className="d-flex align-items-start gap-2 px-2 py-2 mb-1"
          style={{
            border: `1px solid ${CSS.redDim}`,
            borderRadius: 5,
          }}
        >
          <div className="flex-fill">
            {editingId === h.id ? (
              <>
                <input
                  value={h.nombre}
                  placeholder="Nombre de herida"
                  onChange={(e) => edit(h.id, "nombre", e.target.value)}
                  style={{
                    ...inputStyle,
                    marginBottom: 4,
                    width: "100%",
                  }}
                  autoFocus
                />

                <input
                  value={h.efecto}
                  placeholder="Efecto"
                  onChange={(e) => edit(h.id, "efecto", e.target.value)}
                  style={{
                    ...inputStyle,
                    width: "100%",
                    fontSize: 12,
                  }}
                />
              </>
            ) : (
              <div
                onClick={() => setEditingId(h.id)}
                style={{
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: CSS.red,
                  }}
                >
                  {h.nombre || "—"}
                </div>

                <div
                  style={{
                    fontSize: 11,
                    color: CSS.dim,
                  }}
                >
                  {h.efecto || "—"}
                </div>
              </div>
            )}
          </div>

          <div
            className="d-flex flex-column justify-content-between align-items-end"
            style={{ minHeight: 56 }}
          >
            {" "}
            <button
              className="btn btn-sm py-0 px-1"
              style={{
                color: CSS.red,
                border: "none",
                background: "transparent",
                fontSize: 14,
                lineHeight: 1,
              }}
              onClick={() => remove(h.id)}
            >
              ×
            </button>
            {editingId === h.id && (
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
