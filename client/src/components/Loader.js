function Loader({ text = "Loading..." }) {
  return (
    <div className="d-flex justify-content-center align-items-center py-5">
      <div className="text-center">
        <div className="spinner-border text-primary mb-3" role="status"></div>
        <p className="mb-0 text-muted">{text}</p>
      </div>
    </div>
  );
}

export default Loader;
