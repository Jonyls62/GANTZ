// src/pages/Home.jsx

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero-section d-flex align-items-center">
        <div className="container position-relative">

          <div className="row align-items-center min-vh-100">

            {/* LEFT */}
            <div className="col-lg-7">

              <div className="system-label mb-4">
                GANTZ SYSTEM // AFMBE 
              </div>

              <h1
                className="display-1 fw-bold mb-4"
                style={{
                  lineHeight: 0.95,
                  maxWidth: '900px',
                }}
              >
                MUERES.
                <br />

                DESPIERTAS.
                <br />

                CAZAS.
              </h1>

              <p
                className="fs-4 terminal-text mb-5"
                style={{
                  maxWidth: '700px',
                }}
              >
                Un juego de rol inspirado en el universo de Gantz.
                Sobrevive misiones imposibles, enfréntate a entidades
                desconocidas y descubre cuánto estás dispuesto
                a sacrificar para volver.
              </p>

          
            </div>

            {/* RIGHT */}
            <div className="col-lg-5 d-none d-lg-flex justify-content-center">

              <div className="gantz-sphere-container">

                <div className="gantz-sphere-glow"></div>

                <div className="gantz-sphere">

                  <div className="gantz-core"></div>

                  <div className="gantz-ring"></div>

                  <div className="gantz-ring ring-2"></div>

                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-5">
        <div className="container">

          <div className="text-center mb-5">

            <div className="system-label mb-3">
              DATABASE
            </div>

            <h2 className="display-5">
              SISTEMA OPERATIVO
            </h2>

          </div>

          <div className="row g-4">

            {/* CARD */}
            <div className="col-md-6 col-xl-3">
              <div className="card gantz-feature-card h-100 p-4">

                <div className="feature-icon mb-4">
                  ⚔
                </div>

                <h4 className="mb-3">
                  Combate Brutal
                </h4>

                <p className="text-secondary">
                  Daño localizado, amputaciones,
                  heridas críticas y combates de alta letalidad.
                </p>

              </div>
            </div>

            {/* CARD */}
            <div className="col-md-6 col-xl-3">
              <div className="card gantz-feature-card h-100 p-4">

                <div className="feature-icon mb-4">
                  ◉
                </div>

                <h4 className="mb-3">
                  Tecnología Gantz
                </h4>

                <p className="text-secondary">
                  Trajes tácticos, armas avanzadas
                  y equipamiento experimental.
                </p>

              </div>
            </div>

            {/* CARD */}
            <div className="col-md-6 col-xl-3">
              <div className="card gantz-feature-card h-100 p-4">

                <div className="feature-icon mb-4">
                  ☣
                </div>

                <h4 className="mb-3">
                  Amenazas Alienígenas
                </h4>

                <p className="text-secondary">
                  Entidades desconocidas con patrones
                  impredecibles y capacidades devastadoras.
                </p>

              </div>
            </div>

            {/* CARD */}
            <div className="col-md-6 col-xl-3">
              <div className="card gantz-feature-card h-100 p-4">

                <div className="feature-icon mb-4">
                  ⌬
                </div>

                <h4 className="mb-3">
                  Decisiones Extremas
                </h4>

                <p className="text-secondary">
                  Cada misión cambia a los personajes
                  física y psicológicamente.
                </p>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="py-5">
        <div className="container">

          <div className="quote-panel text-center">

            <div className="quote-symbol mb-4">
              "
            </div>

            <h2
              className="display-6 mx-auto"
              style={{
                maxWidth: '900px',
              }}
            >
              Tu vida ha terminado.
              <br />
              Lo que hagas ahora depende de Gantz.
            </h2>

            <div className="terminal-text mt-4">
              // MISSION START
            </div>

          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-5">
        <div className="container">

          <div className="card p-5 text-center">

            <div className="system-label mb-3">
              READY
            </div>

            <h2 className="display-5 mb-4">
              PREPÁRATE PARA LA MISIÓN
            </h2>

            <p
              className="text-secondary fs-5 mx-auto mb-5"
              style={{
                maxWidth: '700px',
              }}
            >
              Consulta reglas, administra personajes,
              revisa armamento y organiza sesiones
              desde una interfaz inspirada en Gantz:O.
            </p>

            <div className="d-flex justify-content-center gap-3 flex-wrap">

              <button className="btn btn-danger btn-lg px-5">
                Comenzar
              </button>

              <button className="btn btn-outline-danger btn-lg px-5">
                Base de Datos
              </button>

            </div>

          </div>

        </div>
      </section>
    </>
  )
}