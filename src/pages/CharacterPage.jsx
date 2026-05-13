// CharacterPage.jsx
import { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { uid } from "../components/personaje/CharacterAtoms";
import CharacterHeader from "../components/personaje/CharacterHeader";
import CharacterHeridas from "../components/personaje/CharacterHeridas";
import CharacterEquipo from "../components/personaje/CharacterEquipo";
import CharacterDatos from "../components/personaje/CharacterDatos";
import { getCharacter, updateCharacter } from "../services/characterService";

export default function CharacterPage() {
  const { id } = useParams();

  const [char, setChar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(null);

  // ── CARGA INICIAL ──
  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getCharacter(id);
        if (!data) {
          setError("Personaje no encontrado.");
          return;
        }
        setChar(data);
      } catch (e) {
        console.error(e);
        setError("Error al cargar el personaje.");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  const update = useCallback((field, value) => {
    setChar((prev) => ({ ...prev, [field]: value }));
  }, []);

  // ── EQUIPO ──
  const equipoAdd = () =>
    update("equipo", [...char.equipo, { id: uid(), nombre: "" }]);
  const equipoRemove = (id) =>
    update(
      "equipo",
      char.equipo.filter((e) => e.id !== id)
    );
  const equipoUpdate = (id, f, v) =>
    update(
      "equipo",
      char.equipo.map((e) => (e.id === id ? { ...e, [f]: v } : e))
    );

  // ── MEJORAS ──
  const mejoraAdd = () =>
    update("mejoras", [...char.mejoras, { id: uid(), nombre: "", pg: 0 }]);
  const mejoraRemove = (id) =>
    update(
      "mejoras",
      char.mejoras.filter((m) => m.id !== id)
    );
  const mejoraUpdate = (id, f, v) =>
    update(
      "mejoras",
      char.mejoras.map((m) => (m.id === id ? { ...m, [f]: v } : m))
    );

  const pgGastado =
    char?.mejoras.reduce((a, m) => a + (parseInt(m.pg) || 0), 0) ?? 0;

  // ── EDICIÓN ──
  const handleEdit = () => {
    setSaved(char);
    setEditing(true);
  };
  const handleCancel = () => {
    setChar(saved);
    setEditing(false);
  };
  const handleSave = async () => {
    try {
      await updateCharacter(id, char);
      setEditing(false);
      setSaved(null);
    } catch (e) {
      console.error(e);
      alert("Error al guardar.");
    }
  };

  // ── ESTADOS DE CARGA ──
  if (loading)
    return (
      <div className="text-center text-light mt-5">Cargando personaje...</div>
    );

  if (error) return <div className="text-center text-danger mt-5">{error}</div>;

  return (
    <div>
      <div className="d-flex justify-content-end px-3 pt-2">
        {editing && (
          <button
            className="btn btn-outline-secondary btn-sm px-3 m-1"
            onClick={handleCancel}
          >
            Cancelar
          </button>
        )}

        <button
          className="btn btn-outline-danger btn-sm px-3 m-1"
          onClick={handleEdit}
        >
          ✏️ Editar
        </button>
        <button
          className="btn btn-outline-danger btn-sm px-3 m-1"
          onClick={handleSave}
        >
          💾 Guardar
        </button>
      </div>

      <div className="container-xxl px-3 py-3">
        <div className="row g-3">
          <div className="col-12">
            <CharacterHeader data={char} update={update} editing={editing} />
          </div>

          <div className="col-12 col-md-6">
            <CharacterHeridas data={char} update={update} editing={editing} />
            <CharacterEquipo
              label="Equipo"
              items={char.equipo}
              onAdd={equipoAdd}
              onRemove={equipoRemove}
              onUpdate={equipoUpdate}
              editing={editing}
            />
            <CharacterEquipo
              label="Mejoras compradas"
              items={char.mejoras}
              pgTotal={pgGastado}
              onAdd={mejoraAdd}
              onRemove={mejoraRemove}
              onUpdate={mejoraUpdate}
              editing={editing}
            />
          </div>

          <div className="col-12 col-md-6">
            <CharacterDatos data={char} update={update} editing={editing} />
          </div>
        </div>
      </div>
    </div>
  );
}
