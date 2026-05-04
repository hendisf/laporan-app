import { supabase } from "@/lib/supabase";

export default async function DetailLaporan({ params }) {
  const { id } = await params;

  const { data, error } = await supabase
    .from("reports")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    return (
      <div style={styles.center}>
        <h2>Error Supabase ⚠️</h2>
        <pre>{error.message}</pre>
      </div>
    );
  }

  if (!data) {
    return (
      <div style={styles.center}>
        <h2>Data tidak ditemukan 😢</h2>
      </div>
    );
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>

        {/* IMAGE */}
        {data.image_url && (
          <img
            src={data.image_url}
            alt="gambar laporan"
            style={styles.image}
          />
        )}

        {/* TITLE */}
        <h1 style={styles.title}>{data.title}</h1>

        {/* CONTENT */}
        <p style={styles.content}>{data.content}</p>

        {/* INFO */}
        <div style={styles.infoBox}>
          <p><b>📍 Lokasi:</b> {data.location}</p>
          <p><b>📅 Tanggal:</b> {data.date}</p>

          <p>
            <b>Status:</b>{" "}
            <span style={getStatusStyle(data.status)}>
              {data.status}
            </span>
          </p>
        </div>

      </div>
    </div>
  );
}

/* STYLE */
const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    padding: "40px",
    background: "#f5f6fa",
    minHeight: "100vh",
  },
  card: {
    width: "100%",
    maxWidth: "600px",
    background: "#fff",
    borderRadius: "16px",
    padding: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  },
  image: {
    width: "100%",
    height: "250px",
    objectFit: "cover",
    borderRadius: "12px",
    marginBottom: "15px",
  },
  title: {
    fontSize: "24px",
    marginBottom: "10px",
  },
  content: {
    fontSize: "16px",
    color: "#444",
    marginBottom: "20px",
  },
  infoBox: {
    fontSize: "14px",
    color: "#333",
    lineHeight: "1.8",
  },
  center: {
    textAlign: "center",
    marginTop: "60px",
  },
};

/* STATUS COLOR */
function getStatusStyle(status) {
  const base = {
    padding: "4px 10px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: "bold",
  };

  switch (status) {
    case "dikirim":
      return { ...base, background: "#ffeaa7", color: "#6c5ce7" };
    case "diproses":
      return { ...base, background: "#81ecec", color: "#0984e3" };
    case "selesai":
      return { ...base, background: "#55efc4", color: "#006266" };
    default:
      return { ...base, background: "#dfe6e9", color: "#2d3436" };
  }
}