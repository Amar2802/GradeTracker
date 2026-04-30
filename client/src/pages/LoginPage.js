import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const { login, authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.from?.pathname || "/dashboard";
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.email.trim()) {
      nextErrors.email = "Email is required";
    }

    if (!formData.password.trim()) {
      nextErrors.password = "Password is required";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await login(formData);
      navigate(redirectPath, { replace: true });
    } catch (error) {
      // Toast handled in context
    }
  };

  return (
    <div className="page-shell d-flex align-items-center">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-7">
            <div className="card auth-card">
              <div className="card-body p-4 p-md-5">
                <span className="hero-badge mb-3">
                  <i className="bi bi-shield-lock"></i>
                  Secure Login
                </span>
                <h2 className="fw-bold mb-2">Welcome back</h2>
                <p className="text-muted mb-4">
                  Login to manage your subjects and grades in one place.
                </p>

                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-3">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      className={`form-control ${errors.email ? "is-invalid" : ""}`}
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <div className="invalid-feedback">{errors.email}</div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      name="password"
                      className={`form-control ${errors.password ? "is-invalid" : ""}`}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <div className="invalid-feedback">{errors.password}</div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={authLoading}
                  >
                    {authLoading ? "Logging in..." : "Login"}
                  </button>
                </form>

                <p className="text-center text-muted mt-4 mb-0">
                  Don&apos;t have an account? <Link to="/register">Register here</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
