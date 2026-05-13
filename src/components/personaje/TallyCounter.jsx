import { useState } from "react";

const W = 50;
const H = 50;
const PAD = 3;
const THICK = 8;
const COLOR_ON = "rgb(224, 60, 60)";
const COLOR_OFF = "rgba(255,255,255,0.15)";

function TallyMark({ count }) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      xmlns="http://www.w3.org/2000/svg"
      className="w-100 h-100 d-block"
    >
      {/* izquierda */}
      <polygon
        fill={count >= 1 ? COLOR_ON : COLOR_OFF}
        points={`${PAD},${PAD} ${PAD+THICK},${PAD} ${PAD+THICK},${H-PAD} ${PAD},${H-PAD}`}
      />

      {/* arriba */}
      <polygon
        fill={count >= 2 ? COLOR_ON : COLOR_OFF}
        points={`${PAD},${PAD} ${W-PAD},${PAD} ${W-PAD},${PAD+THICK} ${PAD},${PAD+THICK}`}
      />

      {/* abajo */}
      <polygon
        fill={count >= 3 ? COLOR_ON : COLOR_OFF}
        points={`${PAD},${H-PAD-THICK} ${W-PAD},${H-PAD-THICK} ${W-PAD},${H-PAD} ${PAD},${H-PAD}`}
      />

      {/* derecha */}
      <polygon
        fill={count >= 4 ? COLOR_ON : COLOR_OFF}
        points={`${W-PAD-THICK},${PAD} ${W-PAD},${PAD} ${W-PAD},${H-PAD} ${W-PAD-THICK},${H-PAD}`}
      />

      {/* diagonal */}
      <line
        x1={PAD + THICK/2}
        y1={H - PAD - THICK/2}
        x2={W - PAD - THICK/2}
        y2={PAD + THICK/2}
        stroke={count >= 5 ? COLOR_ON : COLOR_OFF}
        strokeWidth={THICK}
        strokeLinecap="round"
      />
    </svg>
  );
}
export default function TallyCounter({
  initialValue = 0,
  onChange,
}) {
  const [count, setCount] = useState(initialValue);

  const handleChange = (newValue) => {
    const safeValue = Math.max(0, newValue);

    setCount(safeValue);
    onChange?.(safeValue);
  };

  const fullGroups = Math.floor(count / 5);
  const remain = count % 5;

  return (
    <div className="">
      <div className="card bg-black text-light border-secondary shadow-sm">
        <div className="card-body p-2">
          {/* titulo */}
          <p className="text-center small  mb-2 terminal-text">
            PUNTOS DE VIDA
          </p>

          {/* tallys */}
          <div className="d-flex flex-wrap gap-2 justify-content-center align-items-end mb-3">
            {/* grupos completos */}
            {Array.from({ length: fullGroups }).map((_, i) => (
              <div
                key={i}
                className="text-light"
                style={{
                  width: 24,
                  height: 42,
                }}
              >
                <TallyMark count={5} />
              </div>
            ))}

            {/* grupo parcial */}
            <div
              onClick={() => handleChange(count + 1)}
              className="text-light"
              style={{
                width: 24,
                height: 42,
                cursor: "pointer",
              }}
              title="Agregar"
            >
              <TallyMark count={remain} />
            </div>
          </div>
                    <div className="d-flex justify-content-center align-items-center gap-2">

                 <button
              onClick={() => handleChange(0)}
              className="btn btn-sm btn-outline-secondary px-2 py-0"
              >   
              ↺
            </button>
            </div>
          {/* controles */}
          <div className="d-flex justify-content-center align-items-center gap-2">
            
            <button
              onClick={() => handleChange(count - 1)}
              className="btn btn-sm btn-outline-secondary px-2 py-0"
            >
              -
            </button>

            <span
              className="fw-bold fs-4 text-light text-center"
              style={{
                minWidth: 48,
              }}
            >
              {count}
            </span>

            <button
              onClick={() => handleChange(count + 1)}
              className="btn btn-sm btn-outline-secondary px-2 py-0"
            >
              +
            </button>
         
          </div>
        </div>
      </div>
    </div>
  );
}