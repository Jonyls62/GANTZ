// src/components/sistema/SeccionBase.jsx


const atributos = [
  { nombre: 'Fuerza',       desc: 'Combate, carga, destrucción física' },
  { nombre: 'Destreza',     desc: 'Reflejos, sigilo, puntería, esquivar, correr' },
  { nombre: 'Constitución', desc: 'resistencia, venenos, caídas' },
  { nombre: 'Inteligencia', desc: 'Análisis, tecnología, memoria' },
  { nombre: 'Percepción',   desc: 'Detección, rastreo, vigilancia' },
  { nombre: 'Voluntad',     desc: 'Pánico, horror, presión mental' },
  { nombre: 'Puntos de vida', desc: 'Resistencia a daños físicos' },
  { nombre: 'Puntos de resistencia', desc: 'resistencia a efectos físicos' },
  { nombre: 'velocidad', desc: 'Cuánto puede moverse un personaje en combate' },
  { nombre: 'esencias', desc: 'Puntos de energía para habilidades especiales' },
];

export default function SeccionBase() {
  return (
    <>
      {/* MECÁNICA CENTRAL */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <div className="system-label mb-3">MECÁNICA CENTRAL</div>
            <h2 className="display-5">Resolución de acciones</h2>
            <p className="terminal-text mt-3">d20 + Modificador + Habilidad vs CD del DJ</p>
          </div>

          <div className="row g-3 justify-content-center mb-5">
            {[
              { cd: 'CD 10', label: 'Fácil',   color: 'border-secondary text-secondary' },
              { cd: 'CD 15', label: 'Normal',  color: 'border-warning text-warning' },
              { cd: 'CD 20', label: 'Difícil', color: 'border-danger text-danger' },
              { cd: 'CD 25+',label: 'Extremo', color: 'border-danger text-danger' },
            ].map((c, i) => (
              <div key={i} className="col-6 col-md-3">
                <div className={`card gantz-feature-card h-100 p-3 text-center border ${c.color}`}
                     style={{ borderWidth: '1px !important' }}>
                  <div className={`display-6 fw-bold mb-1 ${c.color.split(' ')[1]}`}>{c.cd}</div>
                  <div className="terminal-text">{c.label}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="row g-4">
                        <div className="col-md-6">
              <div className="card gantz-feature-card h-100 p-4">
                <p className="system-label mb-3">ATRIBUTOS</p>
                <div className="row g-2">
                  {atributos.map((a, i) => (
                    <div key={i} className="col-6">
                      <div className="d-flex align-items-start gap-2">
                        <span className="text-danger" style={{ marginTop: '2px' }}>▸</span>
                        <div>
                          <div className="fw-bold" style={{ fontSize: '.85rem' }}>{a.nombre}</div>
                          <div className="text-secondary" style={{ fontSize: '.75rem' }}>{a.desc}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card gantz-feature-card h-100 p-4">
                <div className="system-label mb-3">Calculo de Atributos</div>
                <p className="mb-0">
                 ver el manual de creacion o de arquetipos de AFMBE.
                </p>
                <span className="text-danger">Importante: </span>
                ¿Quién eras antes de morir?, quien te espera, que te motiva, que te asusta, que te hace seguir adelante? Todo esto se refleja en tu arquetipo y si eres capas de usarlo a tu favor. El sistema de juego te recompensa por interpretación.
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ARQUETIPOS */}
      <section className="py-1">
        <div className="container">
                <div className="quote-panel text-center mt-1">
            <p className="terminal-text">
              // El sistema no usa niveles de d20. Los personajes son humanos normales
              que crecen comprando mejoras con Puntos Gantz entre misiones.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
