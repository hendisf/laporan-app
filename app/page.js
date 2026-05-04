import Navbar from "./components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <div style={{ 
      minHeight: "100vh",
      backgroundColor: "#f1f5f9" // abu soft biar gak putih
    }}>
      
      <Navbar />

      <div style={{ 
        textAlign: "center", 
        marginTop: "100px" 
      }}>
        <h1>Suara Anda, Solusi Kami!</h1>
        <h2>Suara Anda, Perubahan Nyata</h2>

        <Link href="/laporan/buat">
          <button style={{ 
            marginTop: "20px",
            padding: "12px 24px",
            backgroundColor: "#22c55e", 
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "16px"
          }}>
            BUAT LAPORAN
          </button>
        </Link>
      </div>

    </div>
  );
}