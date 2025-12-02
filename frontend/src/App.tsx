import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/pages/landing-page/LandingPage.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
