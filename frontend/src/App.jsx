import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import UserManagement from "./components/admin/UserManagement";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/layout/Navbar";
import Navbar2 from "./components/layout/Navbar2";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import { ProtectedRoute } from "./components/ProtectedRoute";

const App = () => {
  const [domaineActif, setDomaineActif] = useState("Education");
  const [activeChart, setActiveChart] = useState("Etablissement");

  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Navbar />
              <main className="container mx-auto w-full px-4 py-6">
                <Navbar2
                  domaineActif={domaineActif}
                  setDomaineActif={setDomaineActif}
                  activeChart={activeChart}
                  setActiveChart={setActiveChart}
                />
                <Dashboard activeChart={activeChart} />
              </main>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <Navbar />
              <UserManagement />
            </ProtectedRoute>
          }
        />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
