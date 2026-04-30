function SummaryCards({ grades }) {
  const average =
    grades.length > 0
      ? (
          grades.reduce((sum, grade) => sum + Number(grade.percentage), 0) / grades.length
        ).toFixed(2)
      : "0.00";

  const latestEntries = grades.slice(0, 3);

  const cards = [
    {
      label: "Total Subjects",
      value: grades.length,
      icon: "bi-book"
    },
    {
      label: "Average Percentage",
      value: `${average}%`,
      icon: "bi-graph-up-arrow"
    },
    {
      label: "Latest Entries",
      value: latestEntries.length,
      icon: "bi-clock-history"
    }
  ];

  return (
    <div className="row g-4 mb-4">
      {cards.map((card) => (
        <div className="col-md-4" key={card.label}>
          <div className="card summary-card h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-muted mb-2">{card.label}</p>
                  <h3 className="fw-bold mb-0">{card.value}</h3>
                </div>
                <div className="bg-primary bg-opacity-10 text-primary rounded-3 p-3">
                  <i className={`bi ${card.icon} fs-4`}></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SummaryCards;
