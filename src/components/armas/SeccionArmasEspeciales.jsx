// src/components/equipo/SeccionArmasEspeciales.jsx

/* ── DATA ──────────────────────────────────────────────────── */
const especiales = [
  {
    id: 'ggun',
    nombre: 'G-Gun',
    sub: 'Arma de Gravedad — área de aplastamiento',
    costo: '100 PG',
    aviso: 'ESPECIAL',
    icon: '⊛',
    acento: 'danger',
    stats: [
      { label: 'DAÑO',      val: '4d12 área' },
      { label: 'ÁREA',      val: '3m radio' },
      { label: 'CARGAS',    val: '3 SP' },
      { label: 'SALVACIÓN', val: 'Fuerza CD 20' },
    ],
    desc: 'Emite un pulso gravitatorio que aplasta todo en el área.tarda 1 turno en aplicarse. Salvación de Fuerza CD 20 o el target queda Aprisionado hasta el inicio de su próximo turno. El daño aplica aunque pasen la salvación. miesntras mas se mantenga mas sube el daño +1d10 por turno adicional.',
    efecto_extra: 'Aprisionado: no puede moverse ni usar acciones de movimiento.',
    mejoras: [
      {
        nivel: 'MÓDULO 1',
        pg: '+100 PG',
        color: 'info',
        nombre: 'Carga apresurada',
        desc: 'La carga se reduce a la mitad. + 2d10 de daño por turno adicional  ',
        exclusivo: true,
      },
      {
        nivel: 'MÓDULO 2A',
        pg: '+100 PG',
        color: 'warning',
        nombre: 'Daño amplificado',
        desc: 'El daño sube a d12 el retraso y ps adicional gastado cada vez mas daño.',
        exclusivo: true,
        excTag: 'Incompatible con 2B',
      },
      {
        nivel: 'MÓDULO 2B',
        pg: '+100 PG',
        color: 'warning',
        nombre: 'Área expandida',
        desc: 'El área sube de 3m a 6m de radio. El arma tarda 1 acción adicional en cargar cuando se usa en modo área grande.',
        exclusivo: true,
        excTag: 'Incompatible con 2A',
      },
    ],
  },
  {
    id: 'zgun',
    nombre: 'Z-Gun',
    sub: 'Cañón de pulso — línea total sin salvación',
    costo: '100 PG',
    aviso: 'ESPECIAL',
    icon: '⟁',
    acento: 'danger',
    stats: [
      { label: 'DAÑO',    val: '6d10 línea' },
      { label: 'ALCANCE', val: '10m línea' },
      { label: 'CARGAS',  val: '4sp' },
      { label: 'ESPECIAL', val: 'Sin salvación' },
    ],
    desc: 'Disparo en línea recta que atraviesa múltiples objetivos. Todos los targets en la línea reciben el daño completo — sin salvación. Destruye cobertura ligera en su trayectoria.',
    efecto_extra: 'Penetra cobertura ligera automáticamente. Targets con DR no pueden reducir este daño.',
    mejoras: [
      {
        nivel: 'MÓDULO 1',
        pg: '+100 PG',
        color: 'info',
        nombre: 'Extensión',
        desc: 'el alcance sube a 15m. pero el pulso ahora atraviesa cobertura media además de ligera.',
        exclusivo: false,
      },
      {
        nivel: 'MÓDULO 2A',
        pg: '+100 PG',
        color: 'warning',
        nombre: 'Daño amplificado',
        desc: 'El daño sube en 3d8. Los targets que fallen Constitución CD 16 quedan Aturdidos 1 ronda además del daño.',
        exclusivo: true,
        excTag: 'Incompatible con 2B',
      },
      {
        nivel: 'MÓDULO 2B',
        pg: '+100 PG',
        color: 'warning',
        nombre: 'Dispersión lateral',
        desc: 'El pulso se expande a 3m de ancho. Daño baja a 4d10 en el área, pero cubre mucho más terreno.',
        exclusivo: true,
        excTag: 'Incompatible con 2A',
      },
    ],
  },
  {
    id: 'xgun-plus',
    nombre: 'X-Gun Mejorada',
    sub: 'Versión avanzada — crítico extendido y daño extra vs grandes',
    costo: '100 PG',
    aviso: 'ESPECIAL',
    icon: '◈',
    acento: 'danger',
    stats: [
      { label: 'DAÑO',    val: '4d6' },
      { label: 'CARGAS',  val: '10/misión' },
      { label: 'CRÍTICO', val: '19–20' },
      { label: 'BONUS',   val: '+1d8 vs grandes' },
    ],
    desc: 'Versión rediseñada de la X-Gun estándar. Daño base más alto, rango de crítico extendido y bonus específico contra targets de gran tamaño. Mismas cargas que la versión base — la diferencia está en la potencia bruta.',
    efecto_extra: 'El crítico en 19-20 aplica daño doble de dados (sin el modificador de atributo). Contra aliens Grandes o más: +1d8 adicional automático.',
    mejoras: [
      {
        nivel: 'MÓDULO 1',
        pg: '+30 PG',
        color: 'info',
        nombre: 'Precisión aumentada',
        desc: 'El rango de crítico se extiende a 18-20. Ignorás bonificaciones de cobertura del target.',
        exclusivo: false,
      },
      {
        nivel: 'MÓDULO 2A',
        pg: '+50 PG',
        color: 'warning',
        nombre: 'Daño amplificado',
        desc: 'El daño base sube a 5d6. El bonus contra grandes sube a +2d8.',
        exclusivo: true,
        excTag: 'Incompatible con 2B',
      },
      {
        nivel: 'MÓDULO 2B',
        pg: '+50 PG',
        color: 'warning',
        nombre: 'Modo ráfaga',
        desc: '2 cargas: disparás dos veces en 1 acción contra el mismo o distintos targets. Cada disparo tira separado (incluyendo crítico).',
        exclusivo: true,
        excTag: 'Incompatible con 2A',
      },
    ],
  },
];

/* ── MOTO ────────────────────────────────────────────────────── */
const motoStats = [
  { label: 'COSTO',      val: '100 PG' },
  { label: 'VELOCIDAD',  val: '60 pies/turno' },
  { label: 'HP',         val: '25' },
  { label: 'CA',         val: '14' },
];

const motoMods = [
  { pg: '+40 PG', color: 'info',    nombre: 'Blindaje reforzado', desc: 'HP de la moto sube a 45. CA sube a 16. Reduce daño de embestida a la moto de 5 a 2.' },
  { pg: '+40 PG', color: 'info',    nombre: 'Turbo',              desc: 'Velocidad en combate sube a 90 pies/turno. 1/combate: sprint en línea recta a 120 pies.' },
  { pg: '+60 PG', color: 'warning', nombre: 'Piloto automático',  desc: 'La moto puede moverse sola 1 ronda sin jinete siguiendo última orden. Útil para distracciones o rescates.' },
  { pg: '+60 PG', color: 'warning', nombre: 'Cañón montado',      desc: 'Arma fija integrada (2d8, 10 cargas/misión). El jinete la activa como acción bonus.' },
  { pg: '+80 PG', color: 'danger',  nombre: 'Modo sigilo',        desc: 'Motor silenciado. Percepción para detectarla con desventaja. Incompatible con Turbo.' },
];

const motoReglas = [
  { t: 'Movimiento en combate', d: 'La moto se mueve hasta 60 pies como parte del turno del jinete — sin gastar su movimiento propio. Con arma de dos manos: desventaja en el ataque.' },
  { t: 'Embestida',             d: 'Si se mueve al menos 20 pies en línea hacia un target: 3d6 daño (Fuerza CD 15 para mitad) y la moto pierde 5 HP. El jinete no recibe daño.' },
  { t: 'Pasajero',              d: 'Acepta 1 pasajero que puede atacar con armas de una mano sin desventaja. Con dos manos: desventaja.' },
  { t: 'Restricción',           d: 'No entra en espacios interiores estrechos. El DJ puede declararla no utilizable en edificios o zonas subterráneas.' },
];

/* ── COMPONENT ─────────────────────────────────────────────── */
export default function SeccionArmasEspeciales() {
  return (
    <section className="py-5">
      <div className="container">

        {/* HEADER */}
        <div className="text-center mb-5">
          <div className="system-label mb-3">ARSENAL ESPECIAL</div>
          <h2 className="display-5">Armamento de <span className="text-danger">100 PG</span></h2>
          <p className="fs-5 terminal-text mt-3" style={{ maxWidth: '720px', margin: '1rem auto 0' }}>
            Las armas especiales cambian el campo de batalla. Cada una cuesta 100 PG base y acepta
            hasta 2 módulos de mejora activos simultáneamente.
          </p>
        </div>

        {/* REGLA MÓDULOS */}
        <div className="card mb-5 p-4"
             style={{ background: 'rgba(220,53,69,.07)', border: '1px solid rgba(220,53,69,.25)' }}>
          <div className="row g-3 text-center">
            {[
              { icon: '◈', t: 'Máx 2 módulos activos', d: 'Módulo 1 + uno de Módulo 2. No podés instalar 2A y 2B en la misma arma.' },
              { icon: '⚠', t: 'Muerte = pérdida total', d: 'Si morís, los módulos instalados se pierden. El arma base tampoco regresa.' },
              { icon: '⌖', t: '100 PG de entrada',      d: 'El arma base se compra primero. Los módulos son costos adicionales separados.' },
            ].map((r, i) => (
              <div key={i} className="col-12 col-md-4">
                <div className="text-danger mb-1" style={{ fontSize: '1.2rem' }}>{r.icon}</div>
                <div className="fw-bold mb-1" style={{ fontSize: '.85rem' }}>{r.t}</div>
                <div className="text-secondary" style={{ fontSize: '.78rem' }}>{r.d}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ARMAS ESPECIALES */}
        <div className="d-flex flex-column gap-5 mb-5">
          {especiales.map((a) => (
            <div key={a.id} className="card gantz-feature-card overflow-hidden">

              {/* HEADER */}
              <div className="px-4 pt-4 pb-3"
                   style={{ borderBottom: '1px solid rgba(220,53,69,.2)',
                            background: 'rgba(220,53,69,.05)' }}>
                <div className="d-flex align-items-start justify-content-between gap-3 flex-wrap">
                  <div className="d-flex align-items-center gap-3">
                    <span className="text-danger" style={{ fontSize: '1.8rem' }}>{a.icon}</span>
                    <div>
                      <div className="d-flex align-items-center gap-2 flex-wrap">
                        <h4 className="mb-0 fw-bold">{a.nombre}</h4>
                        <span className="badge bg-danger text-white px-2"
                              style={{ fontSize: '.65rem', letterSpacing: '.08em' }}>
                          {a.aviso}
                        </span>
                      </div>
                      <div className="terminal-text" style={{ fontSize: '.75rem' }}>{a.sub}</div>
                    </div>
                  </div>
                  <span className="badge bg-danger bg-opacity-25 text-danger px-3 py-2"
                        style={{ fontSize: '.85rem' }}>
                    {a.costo}
                  </span>
                </div>
              </div>

              <div className="row g-0">

                {/* STATS + DESC */}
                <div className="col-12 col-lg-5 p-4"
                     style={{ borderRight: '1px solid rgba(255,255,255,.06)' }}>

                  <div className="row g-2 mb-3">
                    {a.stats.map((s, i) => (
                      <div key={i} className="col-6">
                        <div className="p-2 text-center"
                             style={{ background: 'rgba(220,53,69,.08)', borderRadius: '6px' }}>
                          <div className="text-danger fw-bold"
                               style={{ fontSize: '.9rem' }}>{s.val}</div>
                          <div className="terminal-text" style={{ fontSize: '.65rem' }}>{s.label}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="text-secondary mb-3" style={{ fontSize: '.85rem', lineHeight: 1.6 }}>
                    {a.desc}
                  </p>

                  <div className="p-3" style={{ background: 'rgba(255,255,255,.04)',
                                                borderRadius: '6px',
                                                borderLeft: '2px solid rgba(220,53,69,.5)' }}>
                    <div className="terminal-text mb-1" style={{ fontSize: '.7rem' }}>// EFECTO ESPECIAL</div>
                    <div className="text-secondary" style={{ fontSize: '.8rem' }}>{a.efecto_extra}</div>
                  </div>
                </div>

                {/* ÁRBOL DE MEJORAS */}
                <div className="col-12 col-lg-7 p-4">
                  <div className="system-label mb-3">ÁRBOL DE MÓDULOS</div>

                  <div className="d-flex flex-column gap-3">
                    {a.mejoras.map((m, i) => (
                      <div key={i} className="d-flex align-items-start gap-3">
                        {/* conector visual */}
                        <div className="d-flex flex-column align-items-center"
                             style={{ minWidth: '16px', paddingTop: '4px' }}>
                          <span className={`text-${m.color}`} style={{ fontSize: '.7rem' }}>▸</span>
                          {i < a.mejoras.length - 1 && (
                            <div style={{ width: '1px', flexGrow: 1, minHeight: '24px',
                                          background: 'rgba(255,255,255,.1)', margin: '2px 0' }} />
                          )}
                        </div>

                        <div className="flex-grow-1">
                          <div className="d-flex align-items-center gap-2 mb-1 flex-wrap">
                            <span className={`badge bg-${m.color} bg-opacity-25 text-${m.color} px-2`}
                                  style={{ fontSize: '.68rem' }}>{m.nivel}</span>
                            <span className="fw-bold" style={{ fontSize: '.88rem' }}>{m.nombre}</span>
                            <span className={`badge bg-${m.color} bg-opacity-10 text-${m.color} px-2`}
                                  style={{ fontSize: '.68rem' }}>{m.pg}</span>
                            {m.exclusivo && (
                              <span className="badge bg-danger bg-opacity-10 text-danger px-2"
                                    style={{ fontSize: '.65rem' }}>{m.excTag}</span>
                            )}
                          </div>
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

        {/* ── MOTO GANTZ ─────────────────────────────────────── */}
        <div className="system-label mb-3">VEHÍCULO ESPECIAL</div>
        <div className="card gantz-feature-card overflow-hidden mb-4">

          <div className="px-4 pt-4 pb-3"
               style={{ borderBottom: '1px solid rgba(255,193,7,.15)',
                        background: 'rgba(255,193,7,.04)' }}>
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
              <div className="d-flex align-items-center gap-3">
                <span className="text-warning" style={{ fontSize: '1.8rem' }}>⚡</span>
                <div>
                  <h4 className="mb-0 fw-bold">Moto Gantz</h4>
                  <div className="terminal-text" style={{ fontSize: '.75rem' }}>Vehículo personal — se pierde con el personaje</div>
                </div>
              </div>
              <span className="badge bg-warning bg-opacity-25 text-warning px-3 py-2"
                    style={{ fontSize: '.85rem' }}>120 PG</span>
            </div>
          </div>

          <div className="row g-0">

            {/* STATS + REGLAS */}
            <div className="col-12 col-lg-5 p-4"
                 style={{ borderRight: '1px solid rgba(255,255,255,.06)' }}>

              <div className="row g-2 mb-4">
                {motoStats.map((s, i) => (
                  <div key={i} className="col-6">
                    <div className="p-2 text-center"
                         style={{ background: 'rgba(255,193,7,.08)', borderRadius: '6px' }}>
                      <div className="text-warning fw-bold" style={{ fontSize: '.9rem' }}>{s.val}</div>
                      <div className="terminal-text" style={{ fontSize: '.65rem' }}>{s.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="d-flex flex-column gap-3">
                {motoReglas.map((r, i) => (
                  <div key={i}>
                    <div className="fw-bold mb-1" style={{ fontSize: '.82rem', color: '#ffc107' }}>{r.t}</div>
                    <div className="text-secondary" style={{ fontSize: '.8rem' }}>{r.d}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* MEJORAS */}
            <div className="col-12 col-lg-7 p-4">
              <div className="system-label mb-3">MÓDULOS DE MEJORA</div>
              <div className="d-flex flex-column gap-3">
                {motoMods.map((m, i) => (
                  <div key={i} className="d-flex align-items-start gap-3">
                    <span className={`badge bg-${m.color} bg-opacity-25 text-${m.color} px-2 py-1 mt-1`}
                          style={{ minWidth: '64px', textAlign: 'center',
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

        {/* NOTA FINAL */}
        <div className="quote-panel text-center">
          <p className="terminal-text">
            // Las armas especiales son inversión de largo plazo. Calculá bien antes de morir.
          </p>
        </div>

      </div>
    </section>
  );
}
