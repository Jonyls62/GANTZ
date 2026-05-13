// CharacterList.jsx
import { useEffect, useState } from "react";
import { getAllCharacters } from "../../services/characterService";
import CharacterCard from "./CharacterCard";

function CharacterList({ refreshKey }) {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getAllCharacters();
        setCharacters(data);
      } catch (e) {
        console.error(e);
        setError("No se pudieron cargar los personajes.");
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [refreshKey]);

  if (loading)
    return (
      <div className="text-center text-light mt-5">Cargando personajes...</div>
    );

  if (error) return <div className="text-center text-danger mt-5">{error}</div>;

  if (characters.length === 0)
    return (
      <div className="text-center text-secondary mt-5">
        No hay personajes creados.
      </div>
    );

  return (
    <div className="container-fluid container-md py-5 px-0 px-md-3">
      <h1 className="text-center text-danger mb-5">Seleccionar Personaje</h1>

      <div className="row g-0 g-md-4 justify-content-center mx-0">
        {characters.map((char, i) => (
          <div key={char.id} className="col-12 col-md-4 col-lg-3 px-0 px-md-2">
            <CharacterCard
              char={char}
              index={i}
              onSelect={(c) => console.log("seleccionado:", c)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CharacterList;
