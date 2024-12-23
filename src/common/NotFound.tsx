const NotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f8f9fa",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "4rem", color: "#dc3545" }}>404</h1>
      <p style={{ fontSize: "1.5rem", color: "#6c757d" }}>Page Not Found</p>
    </div>
  );
};

export default NotFound;
