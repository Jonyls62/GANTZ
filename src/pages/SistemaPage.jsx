import { useState } from 'react';
import SeccionBase    from '../components/SeccionBase';
import SeccionTraje   from '../components/SeccionTraje';
import SeccionTension from '../components/SeccionTension';
import SeccionPuntos  from '../components/SeccionPuntos';
import SeccionHeridas from '../components/SeccionHeridas';

export default function SistemaPage() {
  const [active, setActive] = useState("base"); // sección por defecto

 const showComponent = (componentName) => {
  setActive(componentName);
  // espera que el componente se monte y luego hace scroll
  setTimeout(() => {
    const el = document.getElementById(componentName);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, 0);
};

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="hero-section d-flex align-items-center"
               style={{ minHeight: '40vh' }}>
        <div className="container">
          <div className="row align-items-center py-5">
            <div className="col-lg-8">
              <div className="system-label mb-4">
                GANTZ SYSTEM // REFERENCIA DE REGLAS
              </div>
              <h1 className="display-1 fw-bold mb-4" style={{ lineHeight: 0.95 }}>
                SISTEMA
                <br />
                <span className="text-danger">DE JUEGO</span>
              </h1>
              <p className="fs-4 terminal-text mb-0" style={{ maxWidth: '600px' }}>
                Fusión AFMBE · d20 · Mothership.
                Todo lo que necesitás saber para jugar, sobrevivir y mejorar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ÍNDICE RÁPIDO ────────────────────────────────────── */}
      <section className="py-4 botonera" style={{ borderTop: '1px solid rgba(220,53,69,.2)', borderBottom: '1px solid rgba(220,53,69,.2)' }}>
        <div className="container">
          <div className="d-flex flex-wrap gap-3 align-items-center ">
            <span className="system-label mb-0">SECCIONES:</span>
            {[
              { label: 'Base', name: 'base' },
              { label: 'Traje & SP',        name: 'traje' },
              { label: 'Tokens de Tensión', name: 'tension' },
              { label: 'Puntos Gantz',      name: 'puntos' },
              { label: 'Heridas',           name: 'heridas' },
            ].map((l, i) => (
              <button key={i}
                      onClick={() => showComponent(l.name)}
                      className="btn btn-outline-danger btn-sm px-3">
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECCIONES (render condicional) ───────────────────── */}
      <div className="container mt-5">
      {active === "base"    && <div id="base"><SeccionBase /></div>}
      {active === "traje"   && <div id="traje"><SeccionTraje /></div>}
      {active === "tension" && <div id="tension"><SeccionTension /></div>}
      {active === "puntos"  && <div id="puntos"><SeccionPuntos /></div>}
      {active === "heridas" && <div id="heridas"><SeccionHeridas /></div>}
      </div>

 
    </>
  );
}
