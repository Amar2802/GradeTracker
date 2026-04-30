import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import api from "../services/api";

function GradeFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const [formData, setFormData] = useState({
    subjectName: "",
    marksObtained: "",
    totalMarks: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchGrade = async () => {
      if (!isEditMode) {
        return;
      }

      try {
        const response = await api.get(`/grades/${id}`);
        const grade = response.data;
        setFormData({
          subjectName: grade.subjectName,
          marksObtained: String(grade.marksObtained),
          totalMarks: String(grade.totalMarks)
        });
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load grade details");
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchGrade();
  }, [id, isEditMode, navigate]);

  const preview = useMemo(() => {
    const marks = Number(formData.marksObtained);
    const total = Number(formData.totalMarks);

    if (!marks || !total || total <= 0 || marks > total) {
      return { percentage: "-", grade: "-" };
    }

    const percentage = Number(((marks / total) * 100).toFixed(2));
    let grade = "F";

    if (percentage >= 90) {
      grade = "A";
    } else if (percentage >= 75) {
      grade = "B";
    } else if (percentage >= 60) {
      grade = "C";
    } else if (percentage >= 50) {
      grade = "D";
    }

    return { percentage: `${percentage}%`, grade };
  }, [formData.marksObtained, formData.totalMarks]);

  const validateForm = () => {
    const nextErrors = {};
    const marks = Number(formData.marksObtained);
    const total = Number(formData.totalMarks);

    if (!formData.subjectName.trim()) {
      nextErrors.subjectName = "Subject name is required";
    }

    if (formData.marksObtained === "") {
      nextErrors.marksObtained = "Marks obtained is required";
    } else if (marks < 0) {
      nextErrors.marksObtained = "Marks obtained cannot be negative";
    }

    if (formData.totalMarks === "") {
      nextErrors.totalMarks = "Total marks is required";
    } else if (total <= 0) {
      nextErrors.totalMarks = "Total marks must be greater than 0";
    }

    if (!nextErrors.marksObtained && !nextErrors.totalMarks && marks > total) {
      nextErrors.marksObtained = "Marks obtained cannot be greater than total marks";
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

    setSaving(true);

    try {
      const payload = {
        subjectName: formData.subjectName,
        marksObtained: Number(formData.marksObtained),
        totalMarks: Number(formData.totalMarks)
      };

      if (isEditMode) {
        await api.put(`/grades/${id}`, payload);
        toast.success("Grade updated successfully");
      } else {
        await api.post("/grades", payload);
        toast.success("Grade added successfully");
      }

      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save grade");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loader text="Loading grade details..." />;
  }

  return (
    <div className="page-shell">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <span className="hero-badge mb-3">
                  <i className="bi bi-pencil-square"></i>
                  Grade Form
                </span>
                <h1 className="fw-bold mb-2">
                  {isEditMode ? "Edit Grade" : "Add New Grade"}
                </h1>
                <p className="text-muted mb-0">
                  Enter subject details and the grade will be calculated automatically.
                </p>
              </div>

              <Link to="/dashboard" className="btn btn-outline-secondary">
                Back
              </Link>
            </div>

            <div className="card content-card">
              <div className="card-body p-4 p-md-5">
                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-3">
                    <label className="form-label">Subject Name</label>
                    <input
                      type="text"
                      name="subjectName"
                      className={`form-control ${errors.subjectName ? "is-invalid" : ""}`}
                      placeholder="Example: Mathematics"
                      value={formData.subjectName}
                      onChange={handleChange}
                    />
                    <div className="invalid-feedback">{errors.subjectName}</div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Marks Obtained</label>
                      <input
                        type="number"
                        name="marksObtained"
                        className={`form-control ${
                          errors.marksObtained ? "is-invalid" : ""
                        }`}
                        placeholder="Enter marks obtained"
                        value={formData.marksObtained}
                        onChange={handleChange}
                      />
                      <div className="invalid-feedback">{errors.marksObtained}</div>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Total Marks</label>
                      <input
                        type="number"
                        name="totalMarks"
                        className={`form-control ${errors.totalMarks ? "is-invalid" : ""}`}
                        placeholder="Enter total marks"
                        value={formData.totalMarks}
                        onChange={handleChange}
                      />
                      <div className="invalid-feedback">{errors.totalMarks}</div>
                    </div>
                  </div>

                  <div className="row g-3 my-2">
                    <div className="col-md-6">
                      <div className="bg-light rounded-4 p-3 h-100">
                        <p className="text-muted mb-1">Calculated Percentage</p>
                        <h4 className="fw-bold mb-0">{preview.percentage}</h4>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="bg-light rounded-4 p-3 h-100">
                        <p className="text-muted mb-1">Calculated Grade</p>
                        <h4 className="fw-bold mb-0">{preview.grade}</h4>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary mt-4"
                    disabled={saving}
                  >
                    {saving
                      ? "Saving..."
                      : isEditMode
                        ? "Update Grade"
                        : "Save Grade"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GradeFormPage;
