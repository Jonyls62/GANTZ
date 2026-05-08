// src/components/equipo/SeccionArmasBase.jsx

/* ── DATA ──────────────────────────────────────────────────── */
const armas = [
  {
    id: 'xgun',
    nombre: 'X-Gun',
    sub: 'Arma estándar — entregada por defecto',
    costo: '0 PG',
    colorCosto: 'secondary',
    icon: '◈',
    stats: [
      { label: 'DAÑO',    val: '3d6' },
      { label: 'CARGAS',  val: '1 PS' },
      { label: 'ALCANCE', val: '5/10m' },
      { label: 'COSTO',   val: 'Gratis' },
    ],
    desc: 'El arma básica. Daño alto retraso de disparo 1 turno. gatillo 1 rayos x y para fijar. para disparar apretar los 2 gatillos.',
    mejoras: [
      { pg: '+20 PG', color: 'info',    nombre: 'Amplificador',   desc: 'alcanse sube de 10m a 15m.' },
      { pg: '+30 PG', color: 'warning', nombre: 'Modo ráfaga',           desc: '2 cargas: disparo en cono de 20 pies (3d6 a todos). Salvación Des CD 13 para mitad.' },
      { pg: '+40 PG', color: 'danger',  nombre: 'Amplificador de daño',  desc: 'Daño sube a 4d6. Crítico en 19-20 contra todo tipo de target.' },
    ],
  },
  {
    id: 'ygun',
    nombre: 'Y-Gun',
    sub: 'Arma de soporte — daño reducido',
    costo: '0 PG',
    colorCosto: 'secondary',
    icon: '◎',
    stats: [
      { label: 'DAÑO',    val: '0' },
      { label: 'ÁREA',    val: '10 pies radio' },
      { label: 'CARGAS',  val: '1 PS' },
      { label: 'COSTO',   val: 'Gratis' },
    ],
    desc: 'Disparo de proyectil expansivo. Diseñada para captura de objetivo. Salvación F CD 13 para la mitad. fijado el objetivo se puede transportar a Gantz.',
    mejoras: [
      { pg: '+20 PG', color: 'info',    nombre: 'Radio ampliado',      desc: 'El área sube de 10 a 20 pies de radio.' },
      { pg: '+30 PG', color: 'warning', nombre: 'Carga pesada',    desc: 'el objetivo capturado tiene que superar un 18 de F para liberarse.' },
      { pg: '+40 PG', color: 'danger',  nombre: 'Captura acelerada',    desc: 'el tiempo de captura se reduce a la mitad.' },
    ],
  },
  {
    id: 'controlador',
    nombre: 'Controlador Gantz',
    sub: 'Dispositivo táctico — no hace daño directo',
    costo: '0 PG',
    colorCosto: 'secondary',
    icon: '⌖',
    stats: [
      { label: 'DAÑO',   val: 'Ninguno' },
      { label: 'CARGAS', val: '1 PS' },
      { label: 'EFECTO', val: 'Control de campo' },
      { label: 'COSTO',  val: 'Gratis' },
    ],
    desc: 'Funciona como un mapa donde se muestran los enemigos en el área. este permite entrar en modo sigilo, por 6PG, estos no se recargan mientras esta en modo sigilo.',
    mejoras: [
      { pg: '+20 PG', color: 'info',    nombre: 'Zona extendida',       desc: 'El área sube de 100m a 200m.' },
      { pg: '+30 PG', color: 'warning', nombre: 'Pulso de daño',         desc: 'El daño dentro de la zona sube a 3d4 por ronda, no solo al entrar.' },
      { pg: '+40 PG', color: 'danger',  nombre: 'Sigiloso',            desc: 'al entrar en sigilo los PG se recargan con retraso 1 cada 2 rondas.' },
    ],
  },
];

/* ── COMPONENT ─────────────────────────────────────────────── */
export default function SeccionArmasBase() {
  return (
    <section className="py-5">
      <div className="container">

        {/* HEADER */}
        <div className="text-center mb-5">
          <div className="system-label mb-3">ARSENAL BASE</div>
          <h2 className="display-5">Armamento estándar de Gantz</h2>
          <p className="fs-5 terminal-text mt-3" style={{ maxWidth: '720px', margin: '1rem auto 0' }}>
            Gantz asigna el armamento al inicio de cada misión. Las armas base no se pierden al morir
            — se reasignan en la siguiente misión. Las mejoras sí se pierden.
          </p>
        </div>

        {/* REGLA GLOBAL */}
        <div className="card mb-5 p-4"
             style={{ background: 'rgba(220,53,69,.07)', border: '1px solid rgba(220,53,69,.25)' }}>
          <div className="d-flex align-items-start gap-3">
            <span className="text-danger" style={{ fontSize: '1.3rem', marginTop: '2px' }}>◉</span>
            <div>
              <div className="fw-bold mb-1">Regla de módulos</div>
              <p className="text-secondary mb-0" style={{ fontSize: '.88rem' }}>
                Cada arma acepta hasta <strong className="text-white">2 mejoras activas simultáneas</strong>.
                Si morís, perdés las mejoras instaladas. El arma base se recupera en la siguiente misión.
                Las mejoras incompatibles están marcadas — no podés instalar dos del mismo nivel.
              </p>
            </div>
          </div>
        </div>

        {/* CARDS DE ARMAS */}
        <div className="d-flex flex-column gap-5">
          {armas.map((a) => (
            <div key={a.id} className="card gantz-feature-card overflow-hidden">

              {/* HEADER DEL ARMA */}
              <div className="px-4 pt-4 pb-3"
                   style={{ borderBottom: '1px solid rgba(255,255,255,.07)' }}>
                <div className="d-flex align-items-start justify-content-between gap-3 flex-wrap">
                  <div className="d-flex align-items-center gap-3">
                    <span className="text-danger" style={{ fontSize: '1.6rem' }}>{a.icon}</span>
                    <div>
                      <h4 className="mb-0 fw-bold">{a.nombre}</h4>
                      <div className="terminal-text" style={{ fontSize: '.75rem' }}>{a.sub}</div>
                    </div>
                  </div>
                  <span className={`badge bg-${a.colorCosto} bg-opacity-25 text-${a.colorCosto} px-3 py-2`}
                        style={{ fontSize: '.8rem' }}>
                    {a.costo}
                  </span>
                </div>
              </div>

              <div className="row g-0">

                {/* STATS + DESC */}
                <div className="col-12 col-lg-5 p-4"
                     style={{ borderRight: '1px solid rgba(255,255,255,.06)' }}>

                  {/* STAT GRID */}
                  <div className="row g-2 mb-3">
                    {a.stats.map((s, i) => (
                      <div key={i} className="col-6">
                        <div className="p-2 text-center"
                             style={{ background: 'rgba(255,255,255,.04)', borderRadius: '6px' }}>
                          <div className="text-danger fw-bold"
                               style={{ fontSize: '.9rem' }}>{s.val}</div>
                          <div className="terminal-text" style={{ fontSize: '.65rem' }}>{s.label}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="text-secondary mb-0" style={{ fontSize: '.85rem', lineHeight: 1.6 }}>
                    {a.desc}
                  </p>
                </div>

                {/* MEJORAS */}
                <div className="col-12 col-lg-7 p-4">
                  <div className="system-label mb-3">MÓDULOS DE MEJORA</div>
                  <div className="d-flex flex-column gap-3">
                    {a.mejoras.map((m, i) => (
                      <div key={i} className="d-flex align-items-start gap-3">
                        <span className={`badge bg-${m.color} bg-opacity-25 text-${m.color} px-2 py-1 mt-1`}
                              style={{ minWidth: '62px', textAlign: 'center',
                                       fontSize: '.72rem', whiteSpace: 'nowrap' }}>
                          {m.pg}
                        </span>
                        <div>
                          <div className="fw-bold mb-1" style={{ fontSize: '.88rem' }}>{m.nombre}</div>
                          <div className="text-secondary" style={{ fontSize: '.8rem' }}>{m.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
