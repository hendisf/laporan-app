"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px",
      borderBottom: "1px solid #ddd",
      backgroundColor: "#224177",
      color: "#fff"
    }}>
      
      {/* Logo */}
      <div><b>LOGO</b></div>

      {/* Menu */}
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        
        <Link href="/" style={{ color: "#fff", textDecoration: "none" }}>
          HOME
        </Link>

        <Link href="/about" style={{ color: "#fff", textDecoration: "none" }}>
          ABOUT
        </Link>

        <Link href="/login" style={{ color: "#fff", textDecoration: "none" }}>
          MASUK
        </Link>

        <Link href="/register">
          <button style={{
            backgroundColor: "#22c55e",
            color: "#fff",
            padding: "8px 16px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}>
            DAFTAR
          </button>
        </Link>

      </div> {/* <-- INI YANG KAMU KURANGIN */}
      
    </nav>
  );
}