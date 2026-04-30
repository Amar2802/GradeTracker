import { Link } from "react-router-dom";
import { getGradeBadgeClass } from "../utils/gradeUtils";

function GradeTable({ grades, onDelete }) {
  if (!grades.length) {
    return (
      <div className="text-center py-5">
        <i className="bi bi-journal-x fs-1 text-muted"></i>
        <h5 className="mt-3">No grades found</h5>
        <p className="text-muted mb-3">Start by adding your first subject grade.</p>
        <Link to="/grades/add" className="btn btn-primary">
          Add Grade
        </Link>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table align-middle mb-0">
        <thead className="table-light">
          <tr>
            <th>Subject</th>
            <th>Marks</th>
            <th>Percentage</th>
            <th>Grade</th>
            <th>Added On</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((item) => (
            <tr key={item._id}>
              <td className="fw-semibold">{item.subjectName}</td>
              <td>
                {item.marksObtained} / {item.totalMarks}
              </td>
              <td>{item.percentage}%</td>
              <td>
                <span
                  className={`badge text-bg-${getGradeBadgeClass(item.grade)} grade-pill`}
                >
                  {item.grade}
                </span>
              </td>
              <td>{new Date(item.createdAt).toLocaleDateString()}</td>
              <td className="text-end">
                <Link
                  to={`/grades/edit/${item._id}`}
                  className="btn btn-outline-primary btn-sm me-2"
                >
                  <i className="bi bi-pencil-square"></i>
                </Link>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => onDelete(item._id)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GradeTable;
