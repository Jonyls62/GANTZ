// src/components/sistema/SeccionBase.jsx

const atributos = [
  { nombre: "Fuerza", desc: "Combate, carga, destrucción física" },
  { nombre: "Destreza", desc: "Reflejos, sigilo, puntería, esquivar, correr" },
  { nombre: "Constitución", desc: "resistencia, venenos, caídas" },
  { nombre: "Inteligencia", desc: "Análisis, tecnología, memoria" },
  { nombre: "Percepción", desc: "Detección, rastreo, vigilancia" },
  { nombre: "Voluntad", desc: "Pánico, horror, presión mental" },
  { nombre: "Puntos de vida", desc: "Resistencia a daños físicos" },
  { nombre: "Puntos de resistencia", desc: "resistencia a efectos físicos" },
  { nombre: "velocidad", desc: "Cuánto puede moverse un personaje en combate" },
  { nombre: "esencias", desc: "Puntos de energía para habilidades especiales" },
];

export default function SeccionBase() {
  return (
    <>
      {/* MECÁNICA CENTRAL */}
      <section className="py-2">
        <div className="container">
          <div className="text-center mb-5">
            <div className="system-label mb-3">MECÁNICA CENTRAL</div>
            <h2 className="display-5">Resolución de acciones</h2>
            <p className="terminal-text mt-3">
              d20 + Modificador + Habilidad vs CD del DJ
            </p>
          </div>

          <div className="row g-3 justify-content-center mb-5">
            {[
              {
                cd: "CD 10",
                label: "Fácil",
                color: "border-secondary text-secondary",
              },
              {
                cd: "CD 15",
                label: "Normal",
                color: "border-warning text-warning",
              },
              {
                cd: "CD 20",
                label: "Difícil",
                color: "border-danger text-danger",
              },
              {
                cd: "CD 25+",
                label: "Extremo",
                color: "border-danger text-danger",
              },
            ].map((c, i) => (
              <div key={i} className="col-6 col-md-3">
                <div
                  className={`card gantz-feature-card h-100 p-3 text-center border ${c.color}`}
                  style={{ borderWidth: "1px !important" }}
                >
                  <div
                    className={`display-6 fw-bold mb-1 ${c.color.split(" ")[1]}`}
                  >
                    {c.cd}
                  </div>
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
                        <span
                          className="text-danger"
                          style={{ marginTop: "2px" }}
                        >
                          ▸
                        </span>
                        <div>
                          <div
                            className="fw-bold"
                            style={{ fontSize: ".85rem" }}
                          >
                            {a.nombre}
                          </div>
                          <div
                            className="text-secondary"
                            style={{ fontSize: ".75rem" }}
                          >
                            {a.desc}
                          </div>
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
                ¿Quién eras antes de morir?, quien te espera, que te motiva, que
                te asusta, que te hace seguir adelante? Todo esto se refleja en
                tu arquetipo y si eres capas de usarlo a tu favor. El sistema de
                juego te recompensa por interpretación.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── //      COMBATE / DEFENSA //      ───────────────────────────────────────────────────────────── */}
      <div className="row g-4 mt-1">
        <div className="col-md-6">
          <div className="card gantz-feature-card h-100 p-4">
            <div className="system-label mb-3">ATAQUE ENEMIGO</div>

            <div className="d-flex flex-column gap-3">
              <div>
                <p className="text-secondary">
                  Los ataques enemigos normalmente funcionan como una CD
                  definida por el DM. En situaciones especiales, el DM puede
                  usar una tirada enfrentada con la habilidad o atributo del
                  enemigo.
                </p>
              </div>
              <div>
                <div className="fw-bold text-info mb-1">Defensa activa</div>

                <div className="text-secondary" style={{ fontSize: ".85rem" }}>
                  Si el personaje está atento, en combate o esperando el ataque,
                  puede intentar defenderse usando:
                </div>

                <ul className="terminal-text mt-2 mb-0">
                  <li>Dodge</li>
                  <li>Block</li>
                  <li>Defensa física</li>
                </ul>
              </div>

              <div>
                <div className="fw-bold text-warning mb-1">
                  Desventaja defensiva
                </div>

                <div className="text-secondary" style={{ fontSize: ".85rem" }}>
                  Si el personaje está distraído, cansado, herido o atrapado,
                  recibe desventaja defensiva. El DJ puede:
                </div>

                <ul className="terminal-text mt-2 mb-0">
                  <li>Aumentar la CD</li>
                  <li>Aplicar penalizadores</li>
                  <li>Reducir parcialmente el daño</li>
                </ul>
              </div>

              <div>
                <div className="fw-bold text-danger mb-1">
                  Ataques en sigilo
                </div>

                <div className="text-secondary" style={{ fontSize: ".85rem" }}>
                  Si el enemigo ataca desde sigilo o sorpresa, el personaje debe
                  detectar el peligro primero:
                </div>

                <div className="terminal-text mt-2">
                  d20 + Percepción + Notice
                </div>

                <div
                  className="text-secondary mt-2"
                  style={{ fontSize: ".8rem" }}
                >
                  Si falla, no puede esquivar y el ataque impacta directamente o
                  recibe daño aumentado.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────  HORROR / ESTRÉS / MIEDO     ───────────────────────────────────────────────────────────── */}

        <div className="col-md-6">
          <div className="card gantz-feature-card h-100 p-4">
            <div className="system-label mb-3">HORROR / ESTRÉS / MIEDO</div>

            <div className="text-secondary mb-3" style={{ fontSize: ".85rem" }}>
              Situaciones traumáticas, violencia extrema o pérdidas importantes
              obligan a una tirada de Pánico. Adaptado de{" "}
              <span className="text-warning">Mothership RPG</span> con
              desventajas de <span className="text-warning">AFMBE</span>.
            </div>

            {/* Tirada base */}
            <div className="terminal-text mb-1">
              d20 + Voluntad vs CD de Horror
            </div>
            <div className="text-secondary mb-3" style={{ fontSize: ".78rem" }}>
              Si <span className="text-danger fw-bold">fallás</span> → tirá{" "}
              <span className="text-warning fw-bold">1d10</span> en la Tabla de
              Pánico
            </div>

            {/* CDs — siempre visibles */}
            <div className="row g-2 mb-3">
              {[
                ["CD 10", "Sangre, cadáveres, tensión"],
                ["CD 13", "Ejecuciones, muerte de NPC conocido"],
                ["CD 16", "Muerte de aliado PJ, horda, criatura grotesca"],
                ["CD 20", "Horror sobrenatural. Algo que no debería existir."],
              ].map((h, i) => (
                <div key={i} className="col-6">
                  <div
                    className="border border-danger rounded p-2 h-100"
                    style={{ background: "rgba(255,0,0,.03)" }}
                  >
                    <div
                      className="fw-bold text-danger"
                      style={{ fontSize: ".82rem" }}
                    >
                      {h[0]}
                    </div>
                    <div
                      className="text-secondary"
                      style={{ fontSize: ".72rem" }}
                    >
                      {h[1]}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Tabla de Pánico — colapsable ── */}
            <button
              className="btn btn-sm btn-outline-warning w-100 mb-1 d-flex justify-content-between align-items-center"
              data-bs-toggle="collapse"
              data-bs-target="#tablaPanico"
              aria-expanded="false"
              style={{ fontSize: ".8rem" }}
            >
              <span>⚡ Tabla de Pánico — 1d10</span>
              <span className="text-secondary" style={{ fontSize: ".7rem" }}>
                ver tabla ▾
              </span>
            </button>

            <div className="collapse mb-3" id="tablaPanico">
              <div className="d-flex flex-column gap-1 pt-2">
                {[
                  {
                    rango: "1–2",
                    nombre: "Sacudida",
                    efecto: "Desventaja en tu próxima tirada.",
                    marca: null,
                    color: "border-secondary",
                  },
                  {
                    rango: "3–4",
                    nombre: "Temblor",
                    efecto: "−2 a todas las tiradas hasta el fin de tu turno.",
                    marca: null,
                    color: "border-secondary",
                  },
                  {
                    rango: "5–6",
                    nombre: "Flashback",
                    efecto: "Perdés tu acción. La reacción sigue disponible.",
                    marca: null,
                    color: "border-secondary",
                  },
                  {
                    rango: "7",
                    nombre: "Pánico",
                    efecto:
                      "Huís 30 pies del origen. No podés acercarte 1 ronda.",
                    marca: null,
                    color: "border-warning",
                  },
                  {
                    rango: "8",
                    nombre: "Congelado",
                    efecto:
                      "Parálisis total 1 ronda. Tirá d2 — en 2: marca de trauma.",
                    marca: "posible",
                    color: "border-danger",
                  },
                  {
                    rango: "9",
                    nombre: "Reacción violenta",
                    efecto:
                      "Atacás al aliado más cercano sin control. Tirá d2 — en 2: marca.",
                    marca: "posible",
                    color: "border-danger",
                  },
                  {
                    rango: "10",
                    nombre: "Colapso",
                    efecto:
                      "Inconsciente 1d4 rondas. Gastás 1 Token. Marca automática.",
                    marca: "auto",
                    color: "border-danger",
                  },
                ].map((row, i) => (
                  <div
                    key={i}
                    className={`border ${row.color} rounded px-2 py-1`}
                    style={{
                      background: row.marca
                        ? "rgba(255,0,0,.05)"
                        : "rgba(255,255,255,.02)",
                      fontSize: ".76rem",
                    }}
                  >
                    <div className="d-flex align-items-start gap-2">
                      <span
                        className="fw-bold text-warning"
                        style={{ minWidth: 26, flexShrink: 0 }}
                      >
                        {row.rango}
                      </span>
                      <div style={{ flex: 1 }}>
                        <span className="fw-bold text-light">
                          {row.nombre}.{" "}
                        </span>
                        <span className="text-secondary">{row.efecto}</span>
                      </div>
                      {row.marca && (
                        <span
                          className="text-danger fw-bold"
                          style={{ fontSize: ".68rem", flexShrink: 0 }}
                        >
                          {row.marca === "auto" ? "⚠ marca" : "⚠ posible"}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Marcas de trauma — siempre visible, compacto */}
            <div
              className="border border-warning rounded p-2 mb-2"
              style={{ background: "rgba(255,193,7,.04)", fontSize: ".76rem" }}
            >
              <span className="fw-bold text-warning">Marcas de Trauma — </span>
              <span className="text-secondary">
                Resultados 8–10 pueden generar marca. Con{" "}
                <span className="text-warning fw-bold">3 marcas</span> el PJ
                adquiere una desventaja permanente de AFMBE. No se borran entre
                misiones.
              </span>
            </div>

            {/* ── Desventajas AFMBE — colapsable ── */}
            <button
              className="btn btn-sm btn-outline-danger w-100 mb-1 d-flex justify-content-between align-items-center"
              data-bs-toggle="collapse"
              data-bs-target="#desventajasAFMBE"
              aria-expanded="false"
              style={{ fontSize: ".8rem" }}
            >
              <span>☠ Desventajas AFMBE por trauma</span>
              <span className="text-secondary" style={{ fontSize: ".7rem" }}>
                ver opciones ▾
              </span>
            </button>

            <div className="collapse" id="desventajasAFMBE">
              <div className="d-flex flex-column gap-2 pt-2">
                {[
                  {
                    grupo: "A — Miedo",
                    desc: "Algo dentro tuyo se quebró",
                    color: "text-danger",
                    border: "border-danger",
                    opciones: [
                      "Fobia específica — reaccionás mal ante estímulos relacionados al trauma",
                      "Cowardice — desventaja en tiradas de Voluntad bajo presión extrema",
                      "Panic Attacks — crisis de pánico en situaciones límite",
                      "Hypervigilance — vivís en alerta constante",
                    ],
                  },
                  {
                    grupo: "B — Disociación",
                    desc: "El estrés empieza a aislarte",
                    color: "text-info",
                    border: "border-info",
                    opciones: [
                      "Pesadillas — el descanso nunca es completamente reparador",
                      "Distante — dificultad para conectar emocionalmente con otros",
                      "Detached — desconexión emocional progresiva",
                      "Thin Skinned — te quebrás emocionalmente con facilidad",
                    ],
                  },
                  {
                    grupo: "C — Compulsión",
                    desc: "Desarrollaste mecanismos poco sanos para seguir adelante",
                    color: "text-warning",
                    border: "border-warning",
                    opciones: [
                      "Adicción leve — dependencia emocional o química para calmarse",
                      "Temerario — tendencia a actuar impulsivamente en situaciones críticas",
                      "Obsesión — fijación peligrosa con una persona, misión o idea",
                      "Autodestructivo — despreocupación por la propia vida",
                    ],
                  },
                  {
                    grupo: "D — Trauma profundo",
                    desc: "La experiencia dejó marcas permanentes",
                    color: "text-secondary",
                    border: "border-secondary",
                    opciones: [
                      "Paranoia — desconfianza constante hacia desconocidos",
                      "Flashbacks — ciertos estímulos pueden bloquearte momentáneamente",
                      "Hallucinaciones — el estrés extremo distorsiona la realidad",
                      "PTSD — recuerdos traumáticos afectan tus acciones",
                    ],
                  },
                  {
                    grupo: "E — Pérdida de humanidad",
                    desc: "Sobrevivir empieza a cambiarte",
                    color: "text-light",
                    border: "border-light",
                    opciones: [
                      "Desensibilizado — perdés empatía frente al sufrimiento",
                      "Moral rota — justificás actos extremos para sobrevivir",
                      "Violent Outbursts — reacciones agresivas repentinas",
                      "Trust Issues — incapacidad para confiar plenamente en otros",
                    ],
                  },
                ].map((g, i) => (
                  <div
                    key={i}
                    className={`border ${g.border} rounded p-2`}
                    style={{
                      background: "rgba(255,255,255,.02)",
                      fontSize: ".75rem",
                    }}
                  >
                    <div className="d-flex justify-content-between mb-1">
                      <span className={`fw-bold ${g.color}`}>{g.grupo}</span>

                      <span
                        className="text-secondary"
                        style={{ fontSize: ".7rem" }}
                      >
                        {g.desc}
                      </span>
                    </div>

                    {g.opciones.map((op, j) => (
                      <div key={j} className="d-flex gap-1 text-secondary">
                        <span className="text-danger">▸</span>
                        <span>{op}</span>
                      </div>
                    ))}
                  </div>
                ))}

                <div className="terminal-text" style={{ fontSize: ".7rem" }}>
                  // Los traumas representan secuelas mentales permanentes.
                  <br />
                  // El DM decide cuándo afectan al personaje durante la
                  historia.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ARQUETIPOS */}
      <section className="py-1">
        <div className="container">
          <div className="quote-panel text-center mt-1">
            <p className="terminal-text">
              // El sistema no usa niveles de d20. Los personajes son humanos
              normales que crecen comprando mejoras con Puntos Gantz entre
              misiones.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
