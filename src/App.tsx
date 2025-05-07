// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing/Landing";
import Login from "./pages/auth/Login";
import DogBreedsList from "./pages/DogFactsList";
import DogBreedDetail from "./pages/DogFactDetail";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/breeds" element={<DogBreedsList />} />
          <Route path="/breeds/:id" element={<DogBreedDetail />} />
        </Route>

        <Route path="*" element={<Landing />} />
      </Routes>
    </Router>
  );
}
