import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";


function CharacterPage() {

  const { id } = useParams();

  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchCharacter = async () => {

      try {

        const docRef = doc(db, "characters", id);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {

          setCharacter({
            id: docSnap.id,
            ...docSnap.data(),
          });

        } else {

          console.log("No existe el personaje");

        }

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }
    };

    fetchCharacter();

  }, [id]);

  if (loading) {
    return (
      <div className="text-light text-center mt-5">
        Cargando personaje...
      </div>
    );
  }

  if (!character) {
    return (
      <div className="text-danger text-center mt-5">
        Personaje no encontrado
      </div>
    );
  }

  return (
    <div className="container py-5 text-light">

      <div className="card bg-dark border-danger shadow-lg">

        {character.image && (
          <img
            src={character.image}
            alt={character.name}
            className="card-img-top"
            style={{
              height: "400px",
              objectFit: "cover",
            }}
          />
        )}

        <div className="card-body">

          <h1 className="text-danger mb-3">
            {character.name}
          </h1>

          <p>
            <strong>Edad:</strong> {character.age}
          </p>

          <p>
            <strong>Estado:</strong> {character.status}
          </p>

          <p>
            <strong>HP:</strong> {character.hp}
          </p>

          <p>
            <strong>Puntos:</strong> {character.points}
          </p>

          <hr />

          <p>
            {character.description}
          </p>

        </div>

      </div>

    </div>
  );
}

export default CharacterPage;