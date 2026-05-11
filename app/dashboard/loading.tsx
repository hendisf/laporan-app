export default function Loading() {
    return (
      <div
        style={{
          maxWidth: "900px",
          margin: "40px auto",
          padding: "20px",
        }}
      >
        <h2>Loading dashboard...</h2>
  
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            style={{
              height: "100px",
              background: "#e5e7eb",
              borderRadius: "10px",
              marginBottom: "15px",
              animation: "pulse 1.5s infinite",
            }}
          />
        ))}
      </div>
    );
  }