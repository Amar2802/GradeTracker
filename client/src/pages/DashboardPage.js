import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import GradeTable from "../components/GradeTable";
import Loader from "../components/Loader";
import SummaryCards from "../components/SummaryCards";
import api from "../services/api";

function DashboardPage() {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchGrades = async () => {
    try {
      setLoading(true);
      const response = await api.get("/grades");
      setGrades(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load grades");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGrades();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this grade?");

    if (!confirmed) {
      return;
    }

    try {
      await api.delete(`/grades/${id}`);
      setGrades((prev) => prev.filter((item) => item._id !== id));
      toast.success("Grade deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete grade");
    }
  };

  const filteredGrades = useMemo(() => {
    return grades.filter((grade) =>
      grade.subjectName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [grades, searchTerm]);

  return (
    <div className="page-shell">
      <div className="container py-5">
        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4">
          <div>
            <span className="hero-badge mb-3">
              <i className="bi bi-bar-chart-line"></i>
              Performance Overview
            </span>
            <h1 className="fw-bold mb-2">Dashboard</h1>
            <p className="text-muted mb-0">
              Track your subject marks, percentages, and grades in one simple dashboard.
            </p>
          </div>

          <Link to="/grades/add" className="btn btn-primary">
            <i className="bi bi-plus-circle me-2"></i>
            Add New Grade
          </Link>
        </div>

        {loading ? (
          <Loader text="Loading your dashboard..." />
        ) : (
          <>
            <SummaryCards grades={grades} />

            <div className="card content-card">
              <div className="card-body p-4">
                <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mb-4">
                  <div>
                    <h4 className="mb-1">Grade List</h4>
                    <p className="text-muted mb-0">Search, edit, or delete your saved grades.</p>
                  </div>

                  <div className="col-md-4 px-0">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search by subject..."
                      value={searchTerm}
                      onChange={(event) => setSearchTerm(event.target.value)}
                    />
                  </div>
                </div>

                <GradeTable grades={filteredGrades} onDelete={handleDelete} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
