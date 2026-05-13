// CharacterPage.jsx
// Datos hardcodeados en MOCK_CHAR — reemplazá onSave/onLoad con tu hook Firebase
import { useState, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Traje from "../components/personaje/Traje";  

// ─── CONSTANTES ───────────────────────────────────────────────────────────────
const ARQUETIPOS = ["Ex-policía", "Atleta", "Médico", "Estudiante", "Criminal", "Militar"];

const HERIDAS_TABLA = [
  { rango: "1–2",  nombre: "Golpe aturdidor", efecto: "Aturdido 1 ronda" },
  { rango: "3–4",  nombre: "Corte profundo",  efecto: "2 HP/ronda + desventaja Fue" },
  { rango: "5–6",  nombre: "Costillas rotas", efecto: "Velocidad mitad + desventaja Con" },
  { rango: "7–8",  nombre: "Hemorragia",      efecto: "1d4 HP/ronda, Medicina CD 15" },
  { rango: "9–10", nombre: "Hueso roto",      efecto: "Zona inutilizable, −4 acciones" },
  { rango: "11",   nombre: "Trauma craneal",  efecto: "Voluntad CD 15 para actuar" },
  { rango: "12",   nombre: "Herida crítica",  efecto: "Inconsciente, 1d6 HP/ronda, muerte en 3 rondas" },
];

// ─── JSON DE PRUEBA — reemplazá con tu carga Firebase ─────────────────────────
const MOCK_CHAR = {
  id:          "abc123",
  nombre:      "Kenji Mori",
  arquetipo:   "Atleta",
  foto:        "",
  muerteComo:  "Atropellado cruzando la vía del tren sin mirar.",
  atributos:   { Fue: 3, Des: 4, Con: 3, Int: 2, Per: 3, Vol: 2 },
  pv: 11, pvMax: 11,
  pr: 11, vel: 24, esencia: 20,
  sp: 8,  spMax: 10,
  pg: 35,
  tokens: 2, tokensMax: 3,
  ventajas:    "Atlético 4 (4), Reflejos rápidos 2 (2)",
  habilidades: "Atletismo 4, Acrobacias 3, Arma de fuego (Pistola) 2, Pelea 3, Sigilo 2",
  equipo: [
    { id: "e1", nombre: "X-Gun básica",        pg: 0  },
    { id: "e2", nombre: "Traje estándar",       pg: 0  },
    { id: "e3", nombre: "Kit médico básico",    pg: 0  },
  ],
  mejoras: [
    { id: "m1", nombre: "Burst de velocidad",  pg: 20 },
    { id: "m2", nombre: "+2 SP al pool",        pg: 20 },
  ],
  heridas: [],
  personalidad: "Competitivo, no sabe trabajar en equipo. Extraña a su hermana menor.",
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const uid   = () => crypto.randomUUID().slice(0, 8);

// ─── ESTILOS INLINE MÍNIMOS (solo lo que Bootstrap no puede dar) ───────────────
const CSS = {
  // colores del tema — usados como valores inline donde Bootstrap no llega
  bg:      "#0a0a0e",
  surface: "#111118",
  card:    "#14141e",
  border:  "#252534",
  dim:     "#70708a",
  red:     "#e03c3c",
  redDim:  "rgba(224,60,60,.35)",
  gold:    "#d4a020",
  teal:    "#1aae82",
  amber:   "#e09c20",
  text:    "#e2e0f0",
};

const inputStyle = {
  background: CSS.surface,
  border: `1px solid ${CSS.border}`,
  borderRadius: 5,
  color: CSS.text,
  fontFamily: "inherit",
  fontSize: 13,
  padding: "5px 8px",
  outline: "none",
  width: "100%",
};

const inputSmStyle = { ...inputStyle, width: 56, textAlign: "center" };

// ─── COMPONENTES ATÓMICOS ─────────────────────────────────────────────────────

/** Etiqueta uppercase pequeña */
function MicroLabel({ children }) {
  return (
    <div style={{
      fontSize: 9, fontWeight: 700, letterSpacing: "0.12em",
      textTransform: "uppercase", color: CSS.dim, marginBottom: 3,
    }}>
      {children}
    </div>
  );
}

/** Input de texto o textarea editable / texto plano */
function Field({ value, onChange, editing, multiline, placeholder, className = "" }) {
  if (!editing) {
    return (
      <p className={`mb-0 ${className}`} style={{ fontSize: 13, color: value ? CSS.text : CSS.dim, lineHeight: 1.6 }}>
        {value || placeholder || "—"}
      </p>
    );
  }
  const shared = { ...inputStyle, ...(multiline ? { resize: "vertical" } : {}) };
  return multiline
    ? <textarea rows={3} value={value} placeholder={placeholder}
        onChange={e => onChange(e.target.value)} style={shared} />
    : <input type="text" value={value} placeholder={placeholder}
        onChange={e => onChange(e.target.value)} style={inputStyle} />;
}

/** Barra de progreso con controles +/− */
function BarTracker({ label, value, max, color, onChange, editing }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className="mb-3">
      <div className="d-flex justify-content-between align-items-center mb-1">
        <MicroLabel>{label}</MicroLabel>
        <div className="d-flex align-items-center gap-1">
          {editing && (
            <button className="btn btn-sm py-0 px-1" style={{ color: CSS.dim, border: `1px solid ${CSS.border}`, background: CSS.surface, lineHeight: 1.6 }}
              onClick={() => onChange(clamp(value - 1, 0, max))}>−</button>
          )}
          <span style={{ fontSize: 12, color: CSS.text, minWidth: 38, textAlign: "center" }}>{value} / {max}</span>
          {editing && (
            <button className="btn btn-sm py-0 px-1" style={{ color: CSS.dim, border: `1px solid ${CSS.border}`, background: CSS.surface, lineHeight: 1.6 }}
              onClick={() => onChange(clamp(value + 1, 0, max))}>+</button>
          )}
        </div>
      </div>
      <div style={{ height: 7, background: CSS.border, borderRadius: 4, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 4, transition: "width .3s" }} />
      </div>
    </div>
  );
}

/** Dots de tokens clickeables */
function TokenDots({ value, max, onChange, editing }) {
  return (
    <div className="d-flex gap-2 align-items-center flex-wrap">
      {Array.from({ length: max }).map((_, i) => (
        <div key={i}
          onClick={() => editing && onChange(i < value ? i : i + 1)}
          style={{
            width: 17, height: 17, borderRadius: "50%", flexShrink: 0,
            border: `2px solid ${i < value ? CSS.amber : CSS.border}`,
            background: i < value ? CSS.amber : "transparent",
            cursor: editing ? "pointer" : "default",
            transition: "all .15s",
          }}
        />
      ))}
      <span style={{ fontSize: 12, color: CSS.dim }}>{value}/{max}</span>
    </div>
  );
}

/** Caja de atributo AFMBE */
function AttrBox({ label, value, onChange, editing }) {
  return (
    <div className="d-flex flex-column align-items-center p-2"
      style={{ background: CSS.surface, border: `1px solid ${CSS.border}`, borderRadius: 6, minWidth: 52 }}>
      <MicroLabel>{label}</MicroLabel>
      {editing ? (
        <input type="number" min={1} max={6} value={value}
          onChange={e => onChange(clamp(parseInt(e.target.value) || 1, 1, 6))}
          style={{ width: 40, textAlign: "center", fontSize: 22, fontWeight: 700,
            background: "transparent", border: "none", color: CSS.red, outline: "none" }} />
      ) : (
        <span style={{ fontSize: 22, fontWeight: 700, color: CSS.red }}>{value}</span>
      )}
    </div>
  );
}

/** Fila de stat secundario (PV, PR, Vel, Esencia) */
function StatCell({ label, field, data, onChange, editing }) {
  return (
    <div className="text-center p-2" style={{ background: CSS.surface, border: `1px solid ${CSS.border}`, borderRadius: 6 }}>
      <MicroLabel>{label}</MicroLabel>
      {editing ? (
        <input type="number" min={0} value={data[field]}
          onChange={e => onChange(field, parseInt(e.target.value) || 0)}
          style={{ width: "100%", textAlign: "center", fontSize: 18, fontWeight: 700,
            background: "transparent", border: "none", color: CSS.text, outline: "none" }} />
      ) : (
        <div style={{ fontSize: 18, fontWeight: 700, color: CSS.text }}>{data[field]}</div>
      )}
    </div>
  );
}

// ─── SECCIONES ────────────────────────────────────────────────────────────────

/** Cabecera con foto, nombre, arquetipo, muerte */
function SectionIdentidad({ data, update, editing }) {
  return (
    <div className="gap-3 flex-wrap mb-4">
      {/* Foto */}
      <div style={{
        width: 100, height: 130, flexShrink: 0,
        border: `2px solid ${CSS.border}`, borderRadius: 6,
        background: CSS.surface, overflow: "hidden",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {data.foto
          ? <img src={data.foto} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          : <span style={{ fontSize: 36, color: CSS.dim }}>👤</span>
        }
      </div>

      {/* Campos */}
      <div className="flex-fill" style={{ minWidth: 180 }}>
        <div className="mb-1">
          <Field value={data.nombre} onChange={v => update("nombre", v)}
            editing={editing} placeholder="Nombre del personaje"
            className="fw-bold fs-5" />
        </div>

        <div className="mb-1">
          {editing ? (
            <select value={data.arquetipo} onChange={e => update("arquetipo", e.target.value)} style={inputStyle}>
              {ARQUETIPOS.map(a => <option key={a}>{a}</option>)}
            </select>
          ) : (
            <span style={{ fontSize: 13, color: CSS.gold, fontWeight: 600 }}>{data.arquetipo}</span>
          )}
        </div>
      </div>
    </div>
  );
}

/** Atributos AFMBE */
function SectionAtributos({ data, update, editing }) {
  return (
    <div className="mb-4">
      <p className="mb-2" style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: CSS.dim }}>
        Atributos AFMBE
      </p>
      <div className="d-flex flex-wrap gap-2 mb-3">
        {Object.entries(data.atributos).map(([attr, val]) => (
          <AttrBox key={attr} label={attr} value={val}
            onChange={v => update("atributos", { ...data.atributos, [attr]: v })}
            editing={editing} />
        ))}
      </div>

      {/* Stats secundarios */}
      <div className="row g-2">
        {[["PV actual","pv"],["PV máx","pvMax"],["PR","pr"],["Velocidad","vel"],["Esencia","esencia"]].map(([label, field]) => (
          <div key={field} className="col-6 col-sm-4 col-md-2">
            <StatCell label={label} field={field} data={data}
              onChange={(f, v) => update(f, v)} editing={editing} />
          </div>
        ))}
      </div>
    </div>
  );
}

/** Sistema Gantz: PV, SP, Tokens, PG */
function SectionGantz({ data, update, editing }) {
  const pgPct = Math.min(data.pg, 100);
  return (
    <div className="mb-4">
      <p className="mb-3" style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: CSS.dim }}>
        Sistema Gantz
      </p>

      <BarTracker label="Puntos de vida (PV)"
        value={data.pv} max={data.pvMax} color={CSS.teal}
        onChange={v => update("pv", v)} editing={editing} />

      <BarTracker label={`Suit Points (SP) — pool: ${data.spMax}`}
        value={data.sp} max={data.spMax} color={CSS.red}
        onChange={v => update("sp", v)} editing={editing} />

      {/* SP máx editable */}
      {editing && (
        <div className="d-flex align-items-center gap-2 mb-3">
          <MicroLabel>SP máx:</MicroLabel>
          <input type="number" min={1} max={30} value={data.spMax}
            onChange={e => update("spMax", parseInt(e.target.value) || 10)}
            style={inputSmStyle} />
        </div>
      )}

      {/* Tokens */}
      <div className="mb-3">
        <MicroLabel>Tokens de tensión</MicroLabel>
        <TokenDots value={data.tokens} max={data.tokensMax}
          onChange={v => update("tokens", v)} editing={editing} />
      </div>

      {/* PG */}
      <div className="p-3" style={{ background: CSS.surface, border: `1px solid ${CSS.border}`, borderRadius: 6 }}>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <MicroLabel>Puntos Gantz (PG)</MicroLabel>
          <div className="d-flex align-items-center gap-2">
            {editing && (
              <button className="btn btn-sm py-0 px-1"
                style={{ color: CSS.dim, border: `1px solid ${CSS.border}`, background: CSS.card, lineHeight: 1.6 }}
                onClick={() => update("pg", clamp(data.pg - 1, 0, 9999))}>−</button>
            )}
            <span style={{ fontSize: 22, fontWeight: 700, color: CSS.gold, fontFamily: "monospace" }}>{data.pg}</span>
            {editing && (
              <button className="btn btn-sm py-0 px-1"
                style={{ color: CSS.dim, border: `1px solid ${CSS.border}`, background: CSS.card, lineHeight: 1.6 }}
                onClick={() => update("pg", data.pg + 1)}>+</button>
            )}
          </div>
        </div>
        <div style={{ height: 6, background: CSS.border, borderRadius: 3, overflow: "hidden" }}>
          <div style={{ width: `${pgPct}%`, height: "100%", background: data.pg >= 100 ? CSS.teal : CSS.gold, borderRadius: 3, transition: "width .4s" }} />
        </div>
        <div className="text-end mt-1" style={{ fontSize: 10, color: CSS.dim }}>
          {data.pg >= 100 ? "🟢 Libertad disponible" : `${100 - data.pg} PG para libertad`}
        </div>
      </div>
    </div>
  );
}

/** Ventajas y habilidades */
function SectionHabilidades({ data, update, editing }) {
  return (
    <div className="mb-4">
      <div className="mb-3">
        <MicroLabel>Ventajas / Desventajas</MicroLabel>
        <Field value={data.ventajas} onChange={v => update("ventajas", v)}
          editing={editing} multiline placeholder="Ej: Atractivo 4 (4), Difícil de matar 2 (2)…" />
      </div>
      <div>
        <MicroLabel>Habilidades</MicroLabel>
        <Field value={data.habilidades} onChange={v => update("habilidades", v)}
          editing={editing} multiline placeholder="Ej: Atletismo 4, Arma de fuego (Pistola) 2…" />
      </div>
    </div>
  );
}

/** Lista dinámica genérica (equipo o mejoras) */
function ListaItems({ label, items, onAdd, onRemove, onUpdate, editing, pgTotal }) {
  return (
    <div className="mb-4">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: CSS.dim }}>
            {label}
          </span>
          {pgTotal != null && pgTotal > 0 && (
            <span className="ms-2" style={{ fontSize: 10, color: CSS.gold }}>{pgTotal} PG gastados</span>
          )}
        </div>
        {editing && (
          <button className="btn btn-sm py-0 px-2"
            style={{ fontSize: 11, color: CSS.dim, border: `1px solid ${CSS.border}`, background: CSS.surface }}
            onClick={onAdd}>+ Agregar</button>
        )}
      </div>

      {items.length === 0 && (
        <p style={{ fontSize: 12, color: CSS.dim }}>—</p>
      )}

      {items.map(item => (
        <div key={item.id} className="d-flex align-items-center gap-2 mb-1 px-2 py-1"
          style={{ background: CSS.surface, border: `1px solid ${CSS.border}`, borderRadius: 5 }}>
          {editing ? (
            <>
              <input value={item.nombre} placeholder="Nombre"
                onChange={e => onUpdate(item.id, "nombre", e.target.value)}
                style={{ ...inputStyle, flex: 1 }} />
              <input type="number" min={0} value={item.pg}
                onChange={e => onUpdate(item.id, "pg", parseInt(e.target.value) || 0)}
                style={inputSmStyle} />
              <span style={{ fontSize: 10, color: CSS.dim, flexShrink: 0 }}>PG</span>
              <button className="btn btn-sm py-0 px-1"
                style={{ color: CSS.red, border: "none", background: "transparent", fontSize: 14, lineHeight: 1 }}
                onClick={() => onRemove(item.id)}>×</button>
            </>
          ) : (
            <>
              <span style={{ flex: 1, fontSize: 13, color: CSS.text }}>{item.nombre || "—"}</span>
              {item.pg > 0 && <span style={{ fontSize: 11, color: CSS.gold }}>{item.pg} PG</span>}
            </>
          )}
        </div>
      ))}
    </div>
  );
}

/** Heridas activas + tabla para agregar */
function SectionHeridas({ data, update, editing }) {
  const add    = (h) => update("heridas", [...data.heridas, { id: uid(), ...h }]);
  const remove = (id) => update("heridas", data.heridas.filter(h => h.id !== id));

  return (
    <div className="mb-4">
      <div className="d-flex align-items-center gap-2 mb-2">
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: CSS.dim }}>
          Heridas activas
        </span>
        {data.heridas.length > 0 && (
          <span style={{ fontSize: 11, color: CSS.red }}>⚠ {data.heridas.length}</span>
        )}
      </div>

      {/* Tabla para agregar — solo en modo edición */}
      {editing && (
        <div className="mb-3">
          <MicroLabel>Clic para agregar herida</MicroLabel>
          <div className="d-flex flex-column gap-1">
            {HERIDAS_TABLA.map(h => (
              <button key={h.rango} onClick={() => add(h)}
                className="text-start btn btn-sm py-1 px-2"
                style={{ background: CSS.surface, border: `1px solid ${CSS.border}`, color: CSS.text, fontSize: 12 }}>
                <span style={{ color: CSS.gold, marginRight: 8 }}>{h.rango}</span>
                <strong>{h.nombre}</strong>
                <span style={{ color: CSS.dim, marginLeft: 8 }}>{h.efecto}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {data.heridas.length === 0
        ? <p style={{ fontSize: 12, color: CSS.dim }}>Sin heridas activas.</p>
        : data.heridas.map(h => (
          <div key={h.id} className="d-flex align-items-start gap-2 px-2 py-2 mb-1"
            style={{ background: "rgba(60,0,0,.4)", border: `1px solid ${CSS.redDim}`, borderRadius: 5 }}>
            <div className="flex-fill">
              <div style={{ fontSize: 13, fontWeight: 700, color: CSS.red }}>{h.nombre}</div>
              <div style={{ fontSize: 11, color: CSS.dim }}>{h.efecto}</div>
            </div>
            {editing && (
              <button className="btn btn-sm py-0 px-1"
                style={{ color: CSS.red, border: "none", background: "transparent", fontSize: 14, lineHeight: 1 }}
                onClick={() => remove(h.id)}>×</button>
            )}
          </div>
        ))
      }
    </div>
  );
}

/** Personalidad / notas */
function SectionNotas({ data, update, editing }) {
  return (
    <div className="mb-2">
      <MicroLabel>Personalidad / Historia / Notas</MicroLabel>
      <Field value={data.personalidad} onChange={v => update("personalidad", v)}
        editing={editing} multiline placeholder="Historia, personalidad, conexiones, citas…" />
    </div>
  );
}

// ─── PAGE PRINCIPAL ───────────────────────────────────────────────────────────
export default function CharacterPage() {
  const [char, setChar]       = useState(MOCK_CHAR);
  const [editing, setEditing] = useState(false);
  const [saved, setSaved]     = useState(null); // snapshot antes de editar

  // Actualización de campo simple o anidado
  const update = useCallback((field, value) => {
    setChar(prev => ({ ...prev, [field]: value }));
  }, []);

  // Listas dinámicas — equipo
  const equipoAdd    = () => update("equipo", [...char.equipo, { id: uid(), nombre: "", pg: 0 }]);
  const equipoRemove = (id) => update("equipo", char.equipo.filter(e => e.id !== id));
  const equipoUpdate = (id, f, v) => update("equipo", char.equipo.map(e => e.id === id ? { ...e, [f]: v } : e));

  // Listas dinámicas — mejoras
  const mejoraAdd    = () => update("mejoras", [...char.mejoras, { id: uid(), nombre: "", pg: 0 }]);
  const mejoraRemove = (id) => update("mejoras", char.mejoras.filter(m => m.id !== id));
  const mejoraUpdate = (id, f, v) => update("mejoras", char.mejoras.map(m => m.id === id ? { ...m, [f]: v } : m));

  const pgGastado = char.mejoras.reduce((a, m) => a + (parseInt(m.pg) || 0), 0);

  const handleEdit = () => { setSaved(char); setEditing(true); };
  const handleCancel = () => { setChar(saved); setEditing(false); };

  // TODO: reemplazá esto con tu onSave de Firebase
  const handleSave = () => {
    console.log("Guardar en Firebase:", char);
    setEditing(false);
    setSaved(null);
  };

  return (
    
    <div style={{ background: CSS.bg, minHeight: "100vh", color: CSS.text, fontFamily: "'Barlow', sans-serif" }}>
        {/* Botones */}
            <div className="d-flex  justify-content-md-end">
              {editing ? (
                <>
                  <button className="btn btn-outline-danger btn-sm px-3 m-2"
                    onClick={handleSave}>💾 Guardar</button>
                  <button className="btn btn-outline-danger btn-sm px-3 m-2"
                    onClick={handleCancel}>Cancelar</button>
                </>
              ) : (
                <button className="btn btn-outline-danger btn-sm px-3 m-2"
                  onClick={handleEdit}>✏️ Editar</button>
              )}
            </div>

      <Traje/>
      {/* ── CUERPO ── */}
      <div className="container-lg px-3 px-md-4 py-4">
        <div className="row g-4">
          {/* Columna izquierda */}
          <div className="col-12 col-md-6 col-lg-12">
            {/* Identidad */}
            <div className="p-3 mb-3" style={{ background: CSS.card, border: `1px solid ${CSS.border}`, borderRadius: 8 }}>
              <SectionIdentidad data={char} update={update} editing={editing} />
              <hr style={{ borderColor: CSS.border }} />
              <SectionAtributos data={char} update={update} editing={editing} />
            </div>

          </div>
            {/* Habilidades */}
            <div className="p-3" style={{ background: CSS.card, border: `1px solid ${CSS.border}`, borderRadius: 8 }}>
              <SectionHabilidades data={char} update={update} editing={editing} />
              <hr style={{ borderColor: CSS.border }} />
              <SectionNotas data={char} update={update} editing={editing} />
            </div>



        </div>
      </div>
          {/* Columna derecha */}
          <div className="col-12 col-md-6 col-lg-7">
            {/* Sistema Gantz */}
            <div className="p-3 mb-3" style={{ background: CSS.card, border: `1px solid ${CSS.border}`, borderRadius: 8 }}>
              <SectionGantz data={char} update={update} editing={editing} />
            </div>

            {/* Heridas */}
            <div className="p-3 mb-3" style={{ background: CSS.card, border: `1px solid ${CSS.border}`, borderRadius: 8 }}>
              <SectionHeridas data={char} update={update} editing={editing} />
            </div>

            {/* Equipo */}
            <div className="p-3 mb-3" style={{ background: CSS.card, border: `1px solid ${CSS.border}`, borderRadius: 8 }}>
              <ListaItems label="Equipo"
                items={char.equipo}
                onAdd={equipoAdd} onRemove={equipoRemove} onUpdate={equipoUpdate}
                editing={editing} />
            </div>

            {/* Mejoras */}
            <div className="p-3" style={{ background: CSS.card, border: `1px solid ${CSS.border}`, borderRadius: 8 }}>
              <ListaItems label="Mejoras compradas"
                items={char.mejoras} pgTotal={pgGastado}
                onAdd={mejoraAdd} onRemove={mejoraRemove} onUpdate={mejoraUpdate}
                editing={editing} />
            </div>
          </div>
    </div>
  );
}
