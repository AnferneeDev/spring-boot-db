import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./components/pages/landing-page/LandingPage.tsx";
import { GamePage } from "./components/pages/game-page/GamePage.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/play" element={<GamePage />} />
      </Routes>
    </BrowserRouter>
  );
}
