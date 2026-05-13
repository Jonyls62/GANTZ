// src/pages/EquipoPage.jsx
import { useState } from 'react';
import SeccionArmasBase       from '../components/armas/SeccionArmasBase';
import SeccionArmasEspeciales from '../components/armas/SeccionArmasEspeciales';
import SeccionArmasMedia from '../components/armas/SeccionArmasMedia';

export default function EquipoPage() {
  const [active, setActive] = useState('base');

  const showComponent = (componentName) => {
    setActive(componentName);
    setTimeout(() => {
      const el = document.getElementById(componentName);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  };

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="hero-section d-flex align-items-center"
               style={{ minHeight: '40vh' }}>
        <div className="container">
          <div className="row align-items-center py-5">
            <div className="col-lg-8">
              <div className="system-label mb-4">
                GANTZ SYSTEM // ARSENAL
              </div>
              <h1 className="display-1 fw-bold mb-4" style={{ lineHeight: 0.95 }}>
                EQUIPO
                <br />
                <span className="text-danger">& ARMAMENTO</span>
              </h1>
              <p className="fs-4 terminal-text mb-0" style={{ maxWidth: '600px' }}>
                Arsenal de combate avanzado con armamento no convencional, equipo especializado
                y módulos de mejora adaptables. Todo lo que necesitás para sobrevivir.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ÍNDICE RÁPIDO ─────────────────────────────────────── */}
      <section className="py-4 botonera"
               style={{ borderTop: '1px solid rgba(220,53,69,.2)',
                        borderBottom: '1px solid rgba(220,53,69,.2)' }}>
        <div className="container">
          <div className="d-flex flex-wrap gap-3 align-items-center">
            <span className="system-label mb-0">SECCIONES:</span>
            {[
              { label: 'Arsenal Base',     name: 'base' },
              { label: 'Arsenal Intermedio', name: 'media' },
              { label: 'Armas Especiales', name: 'especiales' },
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

      {/* ── SECCIONES (render condicional) ────────────────────── */}
      <div className="container mt-5">
        {active === 'base'       && <div id="base"><SeccionArmasBase /></div>}
        {active === 'media'      && <div id="media"><SeccionArmasMedia /></div>}
        {active === 'especiales' && <div id="especiales"><SeccionArmasEspeciales /></div>}
      </div>
    </>
  );
}