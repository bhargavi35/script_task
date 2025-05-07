import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import Landing from "./pages/landing/Landing";
import DogFactsList from "./pages/DogFactsList";
import DogFactDetail from "./pages/DogFactDetail";
import Login from "./pages/Login";
import { useAuthStore } from "./store/app.store";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/breeds"
            element={
              <PrivateRoute>
                <DogFactsList />
              </PrivateRoute>
            }
          />
          <Route
            path="/breeds/:id" 
            element={
              <PrivateRoute>
                <DogFactDetail />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}
export default App;
