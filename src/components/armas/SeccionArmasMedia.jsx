// src/components/equipo/SeccionArmasBase.jsx

/* ── DATA ──────────────────────────────────────────────────── */
const armas = [
 
  {
    id: 'espada',
    nombre: 'Espada Gantz',
    sub: 'Armamento cuerpo a cuerpo — sin límite de cargas',
    costo: '50 PG',
    colorCosto: 'warning',
    icon: '⚔',
    stats: [
      { label: 'DAÑO',    val: '1d10 * Fuerza' },
      { label: 'CARGAS',  val: 'Sin límite' },
      { label: 'SINERGIA', val: '1 SP = +1d6' },
      { label: 'COSTO',   val: '50 PG' },
    ],
    desc: 'Hoja de energía que corta a nivel molecular. El único arma con sinergia directa con el traje: gastar 1 SP añade +1d6 al daño de ese ataque. Único arma sin penalidad en espacios cerrados.',
    mejoras: [
      { pg: '+30 PG', color: 'info',    nombre: 'Filo amplificado',     desc: 'usando 1 SP podes modificar la forma de la hoja.' },
      { pg: '+50 PG', color: 'warning', nombre: 'Amplificador de daño ',   desc: 'Daño sube + 1d8 + Fuerza. ' },
      { pg: '+50 PG', color: 'danger',  nombre: 'Onda de corte',      desc: 'podés gastar 2 SP para lanzar un arco de energía a 3m. daño en area.' },
    ],
  },
  {
    id: 'rifle',
    nombre: 'Rifle Gantz',
    sub: 'Armamento medio',
    costo: '60 PG',
    colorCosto: 'warning',
    icon: '◆',
    stats: [
      { label: 'DAÑO',    val: '4d10 en línea' },
      { label: 'ALCANCE', val: '40/50m' },
      { label: 'CARGAS',  val: '3 SP' },
      { label: 'COSTO',   val: '60 PG' },
    ],
    desc: 'Disparo en línea recta con un alto nivel de daño, se puede potenciar gastando SP para aumentar el daño o el alcance, 1sp + 1d8.',
    mejoras: [
      { pg: '+30 PG', color: 'info',    nombre: 'Amplificador',  desc: 'la distancia maxima aumenta al doble.' },
      { pg: '+40 PG', color: 'warning', nombre: 'Penetrante',   desc: 'atraviesa todos los objetivos en el trayecto.' },
      { pg: '+50 PG', color: 'danger',  nombre: 'Daño amplificado',    desc: 'Daño sube a 1d10 + percepción.' },
    ],
  },
  {
    id: 'escopeta',
    nombre: 'Escopeta Gantz',
    sub: 'Armamento medio — cono devastador a corta distancia',
    costo: '55 PG',
    colorCosto: 'warning',
    icon: '⌬',
    stats: [
      { label: 'DAÑO',    val: '4d10 en cono' },
      { label: 'ALCANCE', val: 'Cono 3m' },
      { label: 'CARGAS',  val: '2 SP' },
      { label: 'COSTO',   val: '55 PG' },
    ],
    desc: 'Descarga de energía en cono. Salvación Destreza CD 15 para la mitad.',
    mejoras: [
      { pg: '+30 PG', color: 'info',    nombre: 'Cono ampliado',        desc: 'El cono sube de 3 a 5m. La CD de salvación sube a 17.' },
      { pg: '+35 PG', color: 'warning', nombre: 'Carga de impacto',     desc: 'Los targets que fallen la salvación quedan Derribados (caen al suelo). Levantarse cuesta la mitad del movimiento.' },
      { pg: '+50 PG', color: 'danger',  nombre: 'Disparo concentrado',  desc: 'Podés elegir disparar a un solo target dentro del cono: 5d10, sin salvación.' },
    ],
  },
];

/* ── COMPONENT ─────────────────────────────────────────────── */
export default function SeccionArmasMedia() {
  return (
    <section className="py-5">
      <div className="container">

        {/* HEADER */}
        <div className="text-center mb-5">
          <div className="system-label mb-3">ARSENAL INTERMEDIO</div>
          <h2 className="display-5">Armamento intermedio de Gantz</h2>
          <p className="fs-5 terminal-text mt-3" style={{ maxWidth: '720px', margin: '1rem auto 0' }}>
            Armas mejores con mayor potencia y versatilidad, versiones optimizadas del armamento base con rendimiento superior y opciones tácticas ampliadas.
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
