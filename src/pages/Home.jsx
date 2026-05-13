import { useState } from "react";

export default function Home() {
   const [showSpoiler, setShowSpoiler] = useState(false);
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

                <div className="feature-icon mb-2">
                  ◉
                </div>

                <h4 className="mb-2">
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

                <div className="feature-icon mb-2">
                  ☣
                </div>

                <h4 className="mb-2">
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

                <div className="feature-icon mb-2">
                  ⌬
                </div>

                <h4 className="mb-2">
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
      <section className="py-1">
        <div className="container">

          <div className="quote-panel text-center">



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

        
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-3">
        <div className="container">

          <div className="card p-2 text-center">

         <h5 className="terminal-text mt-2 d-flex justify-content-center">
              // GANTZ
            </h5>
            <p
              className="text-secondary fs-5 mx-auto mb-2"
              
            >
Sistema Gantz RPG es un juego de rol de horror y supervivencia basado en el motor de All Flesh Must Be Eaten (Unisystem), adaptado para usar tiradas de d20. Los jugadores interpretan a personas que despiertan sin explicación en un departamento desconocido, junto a otros extraños, con una misteriosa esfera negra perfecta en el centro de la sala. Nadie recuerda bien cómo llegó. Nadie sabe qué es esa cosa. Y la puerta no abre. Lo que viene después tendrán que descubrirlo — y sobrevivirlo. El sistema fusiona el sistema de heridas permanentes de Mothership RPG para mantener una letalidad constante, e incorpora los Tokens de Tensión para darle a cada jugador agencia narrativa real sobre los momentos más críticos. El resultado es un juego donde los recursos son siempre escasos, las decisiones pesan, y cada sesión puede cambiar todo.            </p>      

              
              <a href="#" className="text-danger" onClick={(e) => {e.preventDefault();setShowSpoiler(!showSpoiler);
        }}>¡Spoiler Alert!</a>
              {showSpoiler && (
                
        <div className="mt-3 p-1 border border-danger rounded bg-dark text-secondary ">
          <h6 className="text-danger">
            ⚠ Spoiler — leer solo si querés saber más
          </h6>

          <p className="mb-2 ">
            Los personajes están muertos. Cada uno murió de manera diferente,
            un accidente, suicidio, asesinato o algo que no debería haber pasado y
            fueron reclutados por Gantz sin pedir permiso.
          </p>

          <p className="mb-2 ">
            La esfera, conocida como Gantz, los envía en misiones para cazar y
            eliminar aliens que se ocultan entre la población.
            Con cada misión acumulan puntos. Con suficientes puntos, pueden
            recuperar su vida.
          </p>

          <p className="mb-0">
            Pero nadie les dijo que sería fácil. Nadie les dijo qué pasa
            realmente si fallan. Y nadie les dijo por qué Gantz los eligió a
            ellos.
          </p>
        </div>
     
              )}
        
        </div>
              
          <div className="terminal-text mt-4 d-flex justify-content-center">
              // MISSION START
            </div>
        </div>
      </section>

    </>
  )
}