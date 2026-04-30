import { Navigate, Route, Routes } from "react-router-dom";
import AppNavbar from "./components/AppNavbar";
import PrivateRoute from "./components/PrivateRoute";
import DashboardPage from "./pages/DashboardPage";
import GradeFormPage from "./pages/GradeFormPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/grades/add"
          element={
            <PrivateRoute>
              <GradeFormPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/grades/edit/:id"
          element={
            <PrivateRoute>
              <GradeFormPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
