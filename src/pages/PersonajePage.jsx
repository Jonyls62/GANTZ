import { useState } from "react";

import NuevoPersonaje from "../components/personaje/NuevoPersonaje";
import CharacterList from "../components/personaje/CharacterList";

function PersonajePage() {
  const [showCreate, setShowCreate] = useState(false);

  // fuerza refresco de CharacterList
  const [refreshKey, setRefreshKey] = useState(0);

  // se ejecuta cuando un personaje se guarda correctamente
  const handleCharacterCreated = () => {
    setShowCreate(false);

    // refresca lista
    setRefreshKey((prev) => prev + 1);

    // opcional: scroll automático hacia lista
    setTimeout(() => {
      const el = document.getElementById("character-list");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <>
      {/* ── HERO ───────────────────────────────── */}
      <section
        className="hero-section d-flex align-items-center"
        style={{ minHeight: "35vh" }}
      >
        <div className="container">
          <div className="row align-items-center py-5">
            <div className="col-lg-8">
              <div className="system-label mb-4">
                GANTZ SYSTEM // PERSONAJES
              </div>

              <h1
                className="display-2 fw-bold mb-4"
                style={{ lineHeight: 0.95 }}
              >
                OPERATIVOS
                <br />
                <span className="text-danger">GANTZ</span>
              </h1>

              <p
                className="fs-5 terminal-text mb-0"
                style={{ maxWidth: "650px" }}
              >
                Creá, administrá y gestioná los participantes enviados a las
                misiones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOTONERA ──────────────────────────── */}
      <section
        className="py-4 botonera"
        style={{
          borderTop: "1px solid rgba(220,53,69,.2)",
          borderBottom: "1px solid rgba(220,53,69,.2)",
        }}
      >
        <div className="container">
          <div className="d-flex flex-wrap gap-3 align-items-center">
            <span className="system-label mb-0">ACCIONES:</span>

            <button
              onClick={() => setShowCreate(!showCreate)}
              className={`btn ${
                showCreate ? "btn-danger" : "btn-outline-danger"
              } btn-sm px-3`}
            >
              {showCreate ? "Cancelar creación" : "Crear personaje"}
            </button>
          </div>
        </div>
      </section>

      {/* ── CONTENIDO ────────────────────────── */}
      <div className="container mt-5">
        {/* FORMULARIO */}
        {showCreate && (
          <div className="mb-4">
            <NuevoPersonaje onCreated={handleCharacterCreated} />
          </div>
        )}

        {/* LISTA */}
        <div id="character-list">
          <CharacterList refreshKey={refreshKey} />
        </div>
      </div>
    </>
  );
}

export default PersonajePage;
