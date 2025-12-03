import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/landing-page/LandingPage.tsx";
import { GamePage } from "./pages/game-page/GamePage.tsx";
import NotFound from "./pages/NotFound.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/play/ai" element={<GamePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
