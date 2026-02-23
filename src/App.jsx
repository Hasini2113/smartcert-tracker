import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import UserManagement from "./pages/UserManagement";
import ManageCertifications from "./pages/ManageCertifications";
import MyCertifications from "./pages/MyCertifications";
import AddCertification from "./pages/AddCertification";
import EditCertification from "./pages/EditCertification";
import RenewCertification from "./pages/RenewCertification";
import NotificationCenter from "./pages/NotificationCenter";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";

function App() {

  const [certifications, setCertifications] = useState([]);

  const addCertification = (newCert) => {
    setCertifications([...certifications, { ...newCert, id: Date.now() }]);
  };

  const deleteCertification = (id) => {
    setCertifications(certifications.filter((cert) => cert.id !== id));
  };

  const updateCertification = (updatedCert) => {
    setCertifications(
      certifications.map((cert) =>
        cert.id === updatedCert.id ? updatedCert : cert
      )
    );
  };

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* USER ROUTES */}
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute allowedRole="user">
              <UserDashboard certifications={certifications} />
            </ProtectedRoute>
          }
        />
        <Route
  path="/profile"
  element={
    <ProtectedRoute allowedRole={localStorage.getItem("role")}>
      <Profile />
    </ProtectedRoute>
  }
/>

        <Route
          path="/user/certifications"
          element={
            <ProtectedRoute allowedRole="user">
              <MyCertifications
                certifications={certifications}
                deleteCertification={deleteCertification}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/add"
          element={
            <ProtectedRoute allowedRole="user">
              <AddCertification addCertification={addCertification} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/edit/:id"
          element={
            <ProtectedRoute allowedRole="user">
              <EditCertification
                certifications={certifications}
                updateCertification={updateCertification}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/renew/:id"
          element={
            <ProtectedRoute allowedRole="user">
              <RenewCertification
                certifications={certifications}
                updateCertification={updateCertification}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notifications"
          element={
            <ProtectedRoute allowedRole="user">
              <NotificationCenter certifications={certifications} />
            </ProtectedRoute>
          }
        />

        {/* ADMIN ROUTE */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRole="admin">
              <UserManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/certifications"
          element={
            <ProtectedRoute allowedRole="admin">
              <ManageCertifications />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;