// src/components/sistema/SeccionTension.jsx

const gastos = [
  { costo: '1 Token',  color: 'info',    accion: 'Rerollear',              desc: 'Volvés a tirar cualquier dado — el tuyo o uno en tu contra.' },
  { costo: '2 Tokens', color: 'warning', accion: 'Sobrevivir lo imposible', desc: 'Un golpe que te mataría te deja en 1 HP en cambio.' },
  { costo: '3 Tokens', color: 'danger',  accion: 'Declarar hecho',          desc: 'Declarás algo menor del entorno: "hay una salida aquí", "hay un extintor".' },
];

const ganancias = [
  'Interpretaciones intensas o memorables del personaje',
  'Decisiones importantes que afecten la misión o la narrativa',
  'Momentos de tensión, miedo o desesperación bien interpretados',
  'Interacciones, descubrimientos o conversaciones relevantes para la trama',
  'Acciones dramáticas, emocionales o narrativamente impactantes',
  'Sacrificios personales o situaciones de alto riesgo voluntario',
  'El DJ puede otorgarlos en escenas especialmente inmersivas o significativas'
];

export default function SeccionTension() {
  return (
    <section className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <div className="system-label mb-3">TOKENS DE TENSIÓN</div>
          <h2 className="display-5">La capa narrativa del sistema</h2>
          <p className="fs-5 terminal-text mt-3" style={{ maxWidth: '700px', margin: '1rem auto 0' }}>
            Son escasos, pesan, y cada decisión de gastarlos importa.
          </p>
        </div>

        {/* STATS */}
        <div className="row g-3 justify-content-center mb-5">
          {[
            { num: 'PT', label: 'Superás temporalmente los límites humanos mediante tensión extrema' },
            { num: '1',     label: 'Token al inicio de misión' },
            { num: '+1→?',   label: 'Se ganan jugando' },
          ].map((s, i) => (
            <div key={i} className="col-6 col-md-4">
              <div className="card gantz-feature-card h-100 p-4 text-center">
                <div className="display-5 fw-bold text-danger mb-1">{s.num}</div>
                <div className="terminal-text" style={{ fontSize: '1rem' }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="row g-4">
          {/* GASTOS */}
          <div className="col-lg-6 ">
            <div className="system-label mb-3">CÓMO GASTARLOS</div>
            <div className="d-flex flex-column gap-3 ">
              {gastos.map((g, i) => (
                <div key={i} className="card gantz-feature-card p-4">
                  <div className="d-flex align-items-start gap-3">
                    <span className={`badge bg-${g.color} bg-opacity-25 text-${g.color} px-3 py-2`}
                          style={{ whiteSpace: 'nowrap', fontSize: '.78rem' }}>
                      {g.costo}
                    </span>
                    <div>
                      <div className="fw-bold mb-1">{g.accion}</div>
                      <div className="text-secondary" style={{ fontSize: '.85rem' }}>{g.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* GANANCIAS */}
          <div className="col-lg-6">
            <div className="system-label mb-3">CÓMO GANARLOS</div>
            <div className="card gantz-feature-card p-4 ">
              <ul className="list-unstyled mb-0 d-flex flex-column gap-3">
                {ganancias.map((g, i) => (
                  <li key={i} className="d-flex align-items-start gap-3">
                    <span className="text-success fw-bold mt-1" style={{ fontSize: '.9rem' }}>+1</span>
                    <span className="text-secondary" style={{ fontSize: '.9rem' }}>{g}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ADVERTENCIA */}
        <div className="quote-panel text-center mt-5">
          <p className="terminal-text">
             Los Tokens NO se recuperan entre misiones automáticamente.
            
          </p>
        </div>
      </div>
    </section>
  );
}
