// src/components/sistema/SeccionHeridas.jsx
const danio = [
  { d: '1–2', tipo: 'secondary', label: 'Aguanta',         res: 'El traje absorbe el golpe sin consecuencias.' },
  { d: '3', tipo: 'warning',   label: 'Daño superficial',res: 'Perdés 2 SP máximos.' },
  { d: '4',   tipo: 'danger',    label: 'Sección dañada',  res: 'Perdés 3 SP y el bono pasivo en esa zona corporal.' },
  { d: '5-6',   tipo: 'danger',    label: 'Falla crítica',   res: 'traje desactivado' },
];
const heridas = [
  { d: '1–2',  tipo: 'info',    h: 'Golpe aturdidor',     ei: 'Aturdido 1 ronda',                                ec: 'Ninguno' },
  { d: '3–4',  tipo: 'info',    h: 'Corte profundo',      ei: 'Perdés 2 HP por ronda',                           ec: 'Desventaja en Fuerza hasta curación' },
  { d: '5–6',  tipo: 'warning', h: 'Costillas rotas',     ei: 'Velocidad reducida a la mitad',                   ec: 'Desventaja en Constitución y atletismo' },
  { d: '7–8',  tipo: 'warning', h: 'Hemorragia interna',  ei: 'Perdés 1d4 HP por ronda hasta estabilización',    ec: 'Necesitás medicina CD 15 para detener' },
  { d: '9–10', tipo: 'danger',  h: 'Hueso roto',          ei: 'Zona afectada inutilizable (brazo/pierna al azar)',ec: 'Penalidad −4 a acciones que involucren esa zona' },
  { d: '11',   tipo: 'danger',  h: 'Trauma craneal',      ei: 'Voluntad CD 15 para actuar cada turno',           ec: 'Desventaja en Inteligencia y Percepción' },
  { d: '12',   tipo: 'danger',  h: 'Herida crítica',      ei: 'Caída inconsciente, perdés 1d6 HP/ronda',         ec: 'Sin atención en 3 rondas: muerte' },
];

const extremidades = [
  {
    d: '1',
    tipo: 'danger',
    zona: 'Cabeza',
  },
  {
    d: '2–3',
    tipo: 'warning',
    zona: 'Torso',
  },
  {
    d: '4',
    tipo: 'info',
    zona: 'Brazo izquierdo',
  },
  {
    d: '5',
    tipo: 'info',
    zona: 'Brazo derecho',
  },
  {
    d: '6',
    tipo: 'warning',
    zona: 'Pierna izquierda',
  },
  {
    d: '7',
    tipo: 'warning',
    zona: 'Pierna derecha',
  },
  {
    d: '8',
    tipo: 'danger',
    zona: 'Impacto crítico',
  },
];

const triggers = [
  { label: 'Sin traje',          color: 'danger',  desc: 'Cualquier golpe que supere 10 de daño' },
  { label: 'Con traje dañado',   color: 'warning', desc: 'Cualquier golpe que supere 15 de daño' },
  { label: 'Con traje completo', color: 'info',    desc: 'Solo si el traje falla (resultado 6 en tabla de daño)' },
  { label: 'A 0 HP',             color: 'danger',  desc: 'Siempre, sin importar el traje' },
];

const curacion = [
  {
    t: 'En campo',
    sub: 'Durante la misión',
    d: 'El médico del grupo puede estabilizar con Medicina CD 13 (acción completa). Detiene la pérdida de HP pero no elimina la penalidad.',
  },
  {
    t: 'Entre misiones',
    sub: 'En el cuarto de Gantz',
    d: 'Todas las heridas se curan automáticamente. El HP vuelve al máximo. Los SP del traje se recargan.',
  },
  {
    t: 'Panic Check',
    sub: 'Opcional',
    d: 'Al ver morir a un aliado: Voluntad CD 15. Si fallás: 1 huís, 2 paralizás 1 ronda, 3 atacás al aliado más cercano, 4 colapso.',
  },
];

export default function SeccionHeridas() {
  return (
    <section className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <div className="system-label mb-3">SISTEMA DE HERIDAS</div>
          <h2 className="display-5">Cada golpe tiene consecuencias</h2>
          <p className="fs-5 terminal-text mt-3" style={{ maxWidth: '700px', margin: '1rem auto 0' }}>
            Este sistema activa cuando un personaje llega a 0 HP o recibe un golpe crítico.
            Las consecuencias son permanentes hasta recibir atención médica.
          </p>
        </div>

        {/* CUÁNDO TIRAS */}
        <div className="system-label mb-3">¿CUÁNDO TIRÁS EN LA TABLA?</div>
        <div className="row g-3 mb-5">
          {triggers.map((t, i) => (
            <div key={i} className="col-sm-6 col-lg-3">
              <div className="card gantz-feature-card h-100 p-3"
                   style={{ borderLeft: `3px solid var(--bs-${t.color})` }}>
                <div className={`fw-bold mb-1 text-${t.color}`} style={{ fontSize: '.82rem' }}>{t.label}</div>
                <div className="text-secondary" style={{ fontSize: '.82rem' }}>{t.desc}</div>
              </div>
            </div>
          ))}
        </div>



          <div className="row g-4 mb-5 align-items-stretch">
            {/* DAÑO AL TRAJE */}
            <div className="col-12 col-xl-6">
              <div className="system-label mb-3">DAÑO AL TRAJE (1d6)</div>
              <div className="card p-3 h-100" style={{ background: 'rgba(220,53,69,.06)', border: '1px solid rgba(220,53,69,.2)' }}>
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
          
        {/* LOCALIZACIÓN DE IMPACTO */}


  <div className="col-12 col-xl-6">
    <div className="system-label mb-3">LOCALIZACIÓN DE IMPACTO (1d8)</div>

    <div
      className="card p-3 h-100"
      style={{
        background: 'rgba(220,53,69,.06)',
        border: '1px solid rgba(220,53,69,.2)'
      }}
    >
      <p className="terminal-text mb-3" style={{ fontSize: '.8rem' }}>
        // Se utiliza cuando el atacante no especifica la zona del impacto
      </p>

      <div className="row g-3">
        {extremidades.map((e, i) => (
          <div key={i} className="col-6 col-sm-6">
            <div className="d-flex gap-3 align-items-start">

              <span
                className={`badge bg-${e.tipo} bg-opacity-25 text-${e.tipo} fs-6 px-3`}
                style={{
                  minWidth: '52px',
                  textAlign: 'center'
                }}
              >
                {e.d}
              </span>

              <div>
                <div
                  className="fw-bold"
                  style={{ fontSize: '.85rem' }}
                >
                  {e.zona}
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>

        {/* TABLA DE HERIDAS */}
        
        <div className="system-label mb-3 mt-3">TABLA DE HERIDAS (1d12)</div>
        <div className="table-responsive mb-5">
          <table className="table table-dark table-borderless align-middle"
                 style={{ borderCollapse: 'separate', borderSpacing: '0 4px' }}>
            <thead>
              <tr style={{ color: '#6c757d', fontSize: '.75rem', letterSpacing: '.08em' }}>
                <th>d12</th>
                <th>HERIDA</th>
                <th className="d-none d-sm-table-cell">EFECTO INMEDIATO</th>
                <th className="d-none d-lg-table-cell">HASTA CURACIÓN</th>
              </tr>
            </thead>
            <tbody>
              {heridas.map((h, i) => (
                <tr key={i} className="gantz-feature-card">
                  <td style={{ borderRadius: '6px 0 0 6px', padding: '10px 16px', width: '60px' }}>
                    <span className={`badge bg-${h.tipo} bg-opacity-25 text-${h.tipo} px-2`}>{h.d}</span>
                  </td>
                  <td style={{ padding: '10px 16px' }}>
                    <strong>{h.h}</strong>
                    <div className="d-sm-none text-secondary mt-1" style={{ fontSize: '.75rem' }}>{h.ei}</div>
                  </td>
                  <td className="d-none d-sm-table-cell text-secondary" style={{ fontSize: '.83rem', padding: '10px 16px' }}>{h.ei}</td>
                  <td className="d-none d-lg-table-cell text-secondary"
                      style={{ borderRadius: '0 6px 6px 0', fontSize: '.83rem', padding: '10px 16px' }}>{h.ec}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CURACIÓN */}
        <div className="system-label mb-3">CURACIÓN</div>
        <div className="row g-4">
          {curacion.map((c, i) => (
            <div key={i} className="col-md-4">
              <div className="card gantz-feature-card h-100 p-4">
                <div className="feature-icon mb-3" style={{ fontSize: '1rem', marginBottom: '0.5rem !important' }}>
                  {i === 0 ? '✚' : i === 1 ? '◉' : '⚠'}
                </div>
                <h5 className="fw-bold mb-1">{c.t}</h5>
                <div className="terminal-text mb-3" style={{ fontSize: '.75rem' }}>{c.sub}</div>
                <p className="text-secondary mb-0" style={{ fontSize: '.85rem' }}>{c.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
