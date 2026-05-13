// src/components/sistema/SeccionPuntos.jsx

const ganancias = [
  { cond: 'Objetivo principal completado', tipo: 'success' },
  { cond: 'Objetivos secundarios completados', tipo: 'success' },
  { cond: 'Eliminación de amenazas hostiles', tipo: 'success' },
  { cond: 'Captura de objetivos designados', tipo: 'success' },
  { cond: 'Supervivencia hasta el final de la misión', tipo: 'success' },
  { cond: 'Protección o extracción de aliados', tipo: 'success' },
  { cond: 'Recuperación de información o recursos', tipo: 'success' },
  { cond: 'Neutralización de amenazas de alto nivel', tipo: 'success' },
  { cond: 'Pérdida del traje o equipamiento crítico', tipo: 'danger' },
  { cond: 'Fracaso del objetivo asignado', tipo: 'danger' },
  { cond: 'Abandono prematuro de la operación', tipo: 'danger' },
  { cond: 'Muerte durante la misión', tipo: 'danger' },
];
const mejoras = [
   {
    grupo: 'MENU DE 100 PUNTOS',
    color: 'success',

    items: [
      { costo: '100 PG', m: 'Liberación',d: 'Seras libre y tu memoria sera borrada.'
      },
      { costo: '100 PG',
        m: 'Revivir jugador',
        d: 'Traés de vuelta a un jugador muerto previamente sin sus recursos.'
      },
      
      {
        costo: '100 PG',
        m: 'Equipo avanzado',
        d: 'Desbloqueás armamento o tecnología de clase superior.'
      },

    
    ]
  },
    {
    grupo: 'HABILIDADES PERSONALES',
    color: 'info',
    items: [
      { costo: '30 PG',  m: '+1 a habilidad específica',          d: 'El personaje mejora en lo que practica' },
      { costo: '40 PG',  m: 'Ventaja en habilidad de clase',      d: 'El arquetipo del personaje aflora naturalmente' },
      { costo: '50 PG',  m: '+1 a atributo base',                 d: 'Crecimiento real — máximo 6' },
      { costo: '50 PG',  m: 'Voluntad inquebrantable',  d: 'Resistencia mental frente a manipulación, terror o control +1d10 pv' },

    ]
  },
{
  grupo: 'ARMAMENTO',
  color: 'danger',
  items: [
        { 
      costo: '50 PG',
      m: 'Mejora de Armamento Base',
      d: 'Las armas básicas obtienen más estabilidad, daño o capacidad'
    },
    { 
      costo: '50 PG',
      m: 'Armamento Medio',
      d: 'Desbloquea acceso a armas de potencia intermedia y equipo táctico'
    },

    { 
      costo: '50 PG',
      m: 'Mejora de Armamento Medio',
      d: 'Las armas medias reciben modificaciones avanzadas y mejor rendimiento'
    },
  ]
},
  {
    grupo: 'TRAJE',
    color: 'warning',
    items: [
      { costo: '50 PG',  m: 'usa pv como sp',   d: 'usa tu vitalidad como puntos de traje 1sp = 10pv' },
      { costo: '50 PG',  m: 'Refuerzo del traje',      d: 'tiras con ventaja al recibir daño' },
      { costo: '60 PG',  m: 'Impulso cinético',  d: 'Podés realizar saltos extremos y duplicar movimiento fuera de combate.' },
      { costo: '60 PG',  m: 'Modo Berserker',          d: '5 SP: ventaja en todos los ataques por 3 rondas, traje se apaga' },
      { costo: '40 PG',  m: 'Interfaz táctica',  d: 'Ventaja en percepción, iniciativa y detección de amenazas.' },
      { costo: '70 PG',  m: 'Reserva de emergencia',  d: '+3 SP máximos permanentes al pool del traje' },
    ]
  },

 
];

export default function SeccionPuntos() {
  return (
    <section className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <div className="system-label mb-3">PUNTOS GANTZ</div>
          <h2 className="display-5">La moneda de tu segunda vida</h2>
          <p className="fs-5 terminal-text mt-3" style={{ maxWidth: '700px', margin: '1rem auto 0' }}>
            La pelota asigna los puntos al final de cada misión.
            No hay niveles — cada mejora se compra directamente con lo que ganaste.
          </p>
        </div>

        {/* AVISO MUERTE */}
        <div className="card mb-5 p-4" style={{ background: 'rgba(220,53,69,.08)', border: '1px solid rgba(220,53,69,.3)' }}>
          <div className="d-flex align-items-center gap-3">
            <span className="text-danger" style={{ fontSize: '1.5rem' }}>⚠</span>
            <p className="mb-0 text-secondary">
              Si morís, perdés todo — armas, mejoras de traje, SP comprados.
              El revivir cuesta <strong className="text-danger">100 PG</strong> de otro jugador o del pool grupal.
            </p>
          </div>
        </div>

      {/* GANANCIAS POR MISIÓN */}
<div className="row justify-content-center mb-5">

  <div className="col-xl-10">

    <div className="card gantz-feature-card p-4">

      <div className="system-label mb-4">
        CÓMO GANARLOS
      </div>

      <div className="row g-3">

        {ganancias.map((g, i) => (

          <div
            key={i}
            className="col-md-6"
          >

            <div
              className="
                d-flex
                justify-content-between
                align-items-center
                gap-3
                p-3
                rounded
              "
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.04)',
              }}
            >

              {/* TEXTO */}
              <div className="d-flex align-items-start gap-2">

                <span
                  className={
                    g.tipo === 'danger'
                      ? 'text-danger'
                      : 'text-success'
                  }
                  style={{
                    marginTop: '2px',
                  }}
                >
                  ▸
                </span>

                <div
                  className="text-secondary"
                  style={{
                    fontSize: '.9rem',
                  }}
                >
                  {g.cond}
                </div>

              </div>

              {/* BADGE */}
              <span
                className={`
                  badge
                  bg-${g.tipo}
                  bg-opacity-25
                  text-${g.tipo}
                  px-3
                  py-2
                `}
              >
                {g.pg}
              </span>

            </div>

          </div>

        ))}

      </div>

    </div>

  </div>

</div>
        {/* TABLA MEJORAS POR GRUPO */}
        <div className="system-label mb-4">PARA QUE SON LOS PG</div>
        <div className="row g-4">
          {mejoras.map((grp, gi) => (
            <div key={gi} className="col-12 col-lg-6">
              <div className="card gantz-feature-card h-100 p-0 overflow-hidden">
                <div className="px-4 py-3"
                     style={{ borderBottom: `1px solid rgba(var(--bs-${grp.color}-rgb),.25)`,
                              background: `rgba(var(--bs-${grp.color}-rgb),.08)` }}>
                  <span className={`system-label text-${grp.color}`}>{grp.grupo}</span>
                </div>
                <div className="p-4">
                  <div className="d-flex flex-column gap-3">
                    {grp.items.map((it, ii) => (
                      <div key={ii} className="d-flex align-items-start gap-3">
                        <span className={`badge bg-${grp.color} bg-opacity-25 text-${grp.color} px-2 py-1`}
                              style={{ minWidth: '64px', textAlign: 'center', fontSize: '.72rem', whiteSpace: 'nowrap' }}>
                          {it.costo}
                        </span>
                        <div>
                          <div className="fw-bold" style={{ fontSize: '.85rem' }}>{it.m}</div>
                          <div className="text-secondary" style={{ fontSize: '.78rem' }}>{it.d}</div>
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
