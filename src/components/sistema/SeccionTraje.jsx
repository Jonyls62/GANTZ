// src/components/sistema/SeccionTraje.jsx

const acciones = [
  { costo: '0 (pasivo)', label: 'gray',   accion: 'Modo standby',          efecto: '+1 CA, +1 a tiradas de Fuerza',                       dur: 'Siempre activo' },
  { costo: '1 SP',       label: 'teal',   accion: 'Refuerzo rápido',        efecto: '+3 CA contra un ataque (reacción)',                    dur: '1 ataque' },
  { costo: '1 SP',       label: 'teal',   accion: 'Burst de velocidad',     efecto: '+10 pies de movimiento, ventaja en Destreza',          dur: '1 ronda' },
  { costo: '2 SP',       label: 'amber',  accion: 'Amplificación muscular', efecto: '+1d6 daño cuerpo a cuerpo, ventaja en Fuerza',         dur: '1 ronda' },
  { costo: '3 SP (pasivo)',       label: 'amber',  accion: 'Absorción de impacto',   efecto: 'Reducís el daño de un golpe a la mitad',               dur: '1 golpe' },
   { costo: 'SP Variable', label: 'amber', accion: 'potenciación de arma', efecto: 'Canalizás energía al arma activa. Consultar costos y efectos en Armamento.',
  dur: 'Variable'
},
  { costo: '4 SP',       label: 'coral',  accion: 'Modo combate',           efecto: '+2 CA, +1d4 daño, +10 pies de movimiento',             dur: '1 combate' },
  { costo: '5 SP (pasivo)',       label: 'red',    accion: 'Límite del traje',       efecto: 'Ignorás un golpe letal — quedás en 1 HP',  dur: '1 vez/misión' },
 
];

const danio = [
  { d: '1–2', tipo: 'secondary', label: 'Aguanta',         res: 'El traje absorbe el golpe sin consecuencias.' },
  { d: '3–4', tipo: 'warning',   label: 'Daño superficial',res: 'Perdés 2 SP máximos.' },
  { d: '5',   tipo: 'danger',    label: 'Sección dañada',  res: 'Perdés 3 SP y el bono pasivo en esa zona corporal.' },
  { d: '6',   tipo: 'danger',    label: 'Falla crítica',   res: 'traje desactivado' },
];

const unlock = [
  { costo: '30 PG', color: 'text-info',    hab: 'Sensor de movimiento', desc: 'Detectás aliens en 30 pies aunque no los veas' },
  { costo: '30 PG', color: 'text-info',    hab: 'Refuerzo estructural',  desc: 'La tabla de daño al traje tira con desventaja' },
  { costo: '50 PG', color: 'text-warning', hab: 'Modo Berserker',        desc: '5 SP: ventaja en todos los ataques por 3 rondas, traje se apaga al terminar' },
  { costo: '50 PG', color: 'text-warning', hab: 'Reserva de emergencia', desc: '+3 SP máximos permanentes al pool del traje' },
  { costo: '80 PG', color: 'text-danger',  hab: 'Modo Invisible',        desc: 'Solo 1 PJ en toda la campaña — decisión de mesa' },
];

const pillBg = {
  gray: 'bg-secondary bg-opacity-25 text-secondary',
  teal: 'bg-info bg-opacity-25 text-info',
  amber: 'bg-warning bg-opacity-25 text-warning',
  coral: 'bg-danger bg-opacity-25 text-warning',
  red: 'bg-danger bg-opacity-25 text-danger',
};

export default function SeccionTraje() {
  return (
    <>
      {/* STATS */}
      <section className="py-1">
        <div className="container">
          <div className="text-center mb-5">
            <div className="system-label mb-3">TRAJE</div>
            <h2 className="display-5">El traje no te hace invencible</h2>
            <p className="fs-5 terminal-text mt-3" style={{ maxWidth: '700px', margin: '1rem auto 0' }}>
              Es un recurso finito que gestionás durante toda la misión.
              Sin traje, cada golpe es potencialmente letal.
            </p>
          </div>

          <div className="row g-3 justify-content-center mb-5">
            {[
              { num: 'SP',  label: 'puntos del traje que potencian acciones, defensa, ataques' },
              { num: 'SP 10',    label: 'puntos de traje base por misión' },
              { num: 'SP 0',     label: 'Traje desactivado, puede recargarse.',
               desc: 'Si el daño destruye el traje, queda inutilizable hasta el final de la misión.'},
              { num: '+1 SP', label: 'regeneración de traje (por ronda)' },
            ].map((s, i) => (
              <div key={i} className="col-6 col-md-3">
                <div className="card gantz-feature-card h-100 p-1 text-center">
                  <div className="display-5 fw-bold text-danger mb-1">{s.num}</div>
                  <div className="terminal-text" style={{ fontSize: '1rem' }}>{s.label} <br /> {s.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* TABLA ACCIONES */}
          <div className="system-label mb-3">TABLA DE ACCIONES</div>
          <div className="table-responsive mb-5">
            <table className="table table-dark table-borderless align-middle" style={{ borderCollapse: 'separate', borderSpacing: '0 4px' }}>
              <thead>
                <tr style={{ color: 'var(--bs-secondary-color, #6c757d)', fontSize: '.75rem', letterSpacing: '.08em' }}>
                  <th>COSTO SP</th>
                  <th>ACCIÓN</th>
                  <th className="d-none d-sm-table-cell">EFECTO</th>
                  <th className="d-none d-md-table-cell">DURACIÓN</th>
                </tr>
              </thead>
              <tbody>
                {acciones.map((a, i) => (
                  <tr key={i} className="gantz-feature-card" style={{ borderRadius: '6px' }}>
                    <td style={{ borderRadius: '6px 0 0 6px', padding: '12px 16px' }}>
                      <span className={`badge rounded-pill px-3 py-2 ${pillBg[a.label]}`}>{a.costo}</span>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <strong>{a.accion}</strong>
                      <div className="d-sm-none text-secondary mt-1" style={{ fontSize: '.75rem' }}>{a.efecto}</div>
                    </td>
                    <td className="d-none d-sm-table-cell text-secondary" style={{ fontSize: '.85rem', padding: '12px 16px' }}>{a.efecto}</td>
                    <td className="d-none d-md-table-cell text-secondary" style={{ borderRadius: '0 6px 6px 0', fontSize: '.85rem', padding: '12px 16px' }}>{a.dur}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* DAÑO AL TRAJE */}
          <div className="row g-4 mb-5">
            <div className="col-12">
              <div className="system-label mb-3">DAÑO AL TRAJE (1d6)</div>
              <div className="card p-3" style={{ background: 'rgba(220,53,69,.06)', border: '1px solid rgba(220,53,69,.2)' }}>
                <p className="terminal-text mb-3" style={{ fontSize: '.8rem' }}>
                  // Se activa si recibís más de 15 de daño en un solo golpe
                </p>
                <div className="row g-3">
                  {danio.map((d, i) => (
                    <div key={i} className="col-12 col-sm-6">
                      <div className="d-flex gap-3 align-items-start">
                        <span className={`badge bg-${d.tipo} bg-opacity-25 text-${d.tipo} fs-6 px-3`}
                              style={{ minWidth: '52px', textAlign: 'center' }}>{d.d}</span>
                        <div>
                          <div className="fw-bold mb-1" style={{ fontSize: '.85rem' }}>{d.label}</div>
                          <div className="text-secondary" style={{ fontSize: '.8rem' }}>{d.res}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* DESBLOQUEOS */}
          <div className="system-label mb-3">MEJORAS DESBLOQUEABLES</div>
          <div className="row g-3">
            {unlock.map((u, i) => (
              <div key={i} className="col-md-6">
                <div className="card gantz-feature-card p-3 d-flex flex-row align-items-start gap-3">
                  <span className="badge bg-danger bg-opacity-25 text-danger px-3 py-2" style={{ minWidth: '60px', textAlign: 'center', fontSize: '.75rem' }}>{u.costo}</span>
                  <div>
                    <div className={`fw-bold mb-1 ${u.color}`}>{u.hab}</div>
                    <div className="text-secondary" style={{ fontSize: '.82rem' }}>{u.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
