import { useState } from "react";
import BootSequence from "./components/BootSequence";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SistemaPage from "./pages/SistemaPage";
import EquipoPage from "./pages/EquipoPage";
import PersonajePage from "./pages/PersonajePage";
import CharacterPage from "./pages/CharacterPage";
import CharacterPage1 from "./pages/CharacterPage1";
import Navbar from "./components/Navbar";

export default function App() {
  const [bootFinished, setBootFinished] = useState(false);

  return (
    <>
      {!bootFinished ? (
        <BootSequence onFinish={() => setBootFinished(true)} />
      ) : (
        <>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sistema" element={<SistemaPage />} />
              <Route path="/equipo" element={<EquipoPage />} />
              <Route path="/personaje" element={<PersonajePage />} />
              <Route path="/character/:id" element={<CharacterPage />} />
            </Routes>
          </BrowserRouter>
        </>
      )}
    </>
  );
}
