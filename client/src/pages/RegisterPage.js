import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RegisterPage() {
  const { register, authLoading } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.name.trim()) {
      nextErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      nextErrors.email = "Email is required";
    }

    if (!formData.password.trim()) {
      nextErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match";
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
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      navigate("/dashboard");
    } catch (error) {
      // Toast handled in context
    }
  };

  return (
    <div className="page-shell d-flex align-items-center">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <div className="card auth-card">
              <div className="card-body p-4 p-md-5">
                <span className="hero-badge mb-3">
                  <i className="bi bi-person-plus"></i>
                  Create Account
                </span>
                <h2 className="fw-bold mb-2">Start tracking smarter</h2>
                <p className="text-muted mb-4">
                  Create your account to save subjects, marks, and overall performance.
                </p>

                <form onSubmit={handleSubmit} noValidate>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        className={`form-control ${errors.name ? "is-invalid" : ""}`}
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                      <div className="invalid-feedback">{errors.name}</div>
                    </div>

                    <div className="col-md-6 mb-3">
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
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        name="password"
                        className={`form-control ${errors.password ? "is-invalid" : ""}`}
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                      <div className="invalid-feedback">{errors.password}</div>
                    </div>

                    <div className="col-md-6 mb-4">
                      <label className="form-label">Confirm Password</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        className={`form-control ${
                          errors.confirmPassword ? "is-invalid" : ""
                        }`}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />
                      <div className="invalid-feedback">{errors.confirmPassword}</div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={authLoading}
                  >
                    {authLoading ? "Creating account..." : "Register"}
                  </button>
                </form>

                <p className="text-center text-muted mt-4 mb-0">
                  Already have an account? <Link to="/login">Login here</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
