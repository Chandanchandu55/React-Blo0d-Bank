import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Import all pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import DonorRegistration from "./pages/DonorRegistration";
import BloodRequest from "./pages/BloodRequest";
import AvailableBlood from "./pages/AvailableBlood";
import Contact from "./pages/Contact";
import About from "./pages/About";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <div style={{ paddingBottom: "80px" }}>
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />

            <Route
              path="/donor"
              element={
                <ProtectedRoute>
                  <DonorRegistration />
                </ProtectedRoute>
              }
            />

            <Route
              path="/request"
              element={
                <ProtectedRoute>
                  <BloodRequest />
                </ProtectedRoute>
              }
            />

            <Route
              path="/available"
              element={
                <ProtectedRoute>
                  <AvailableBlood />
                </ProtectedRoute>
              }
            />

            <Route
              path="/contact"
              element={
                <ProtectedRoute>
                  <Contact />
                </ProtectedRoute>
              }
            />

            <Route
              path="/about"
              element={
                <ProtectedRoute>
                  <About />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
