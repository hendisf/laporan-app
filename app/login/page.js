"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");
  const [loading, setLoading] =
    useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Isi email dan password!");
      return;
    }

    setLoading(true);

    const { error, data } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    console.log(data);
    console.log(error);

    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      document.cookie = "session=true; path=/";

      alert("Login berhasil");
      
      window.location.assign("/dashboard");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f1f5f9",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "350px",
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow:
            "0 10px 25px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Selamat Datang 👋
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: loading
              ? "#94a3b8"
              : "#3b82f6",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {loading
            ? "Loading..."
            : "MASUK"}
        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: "15px",
          }}
        >
          Belum punya akun?{" "}
          <Link
            href="/register"
            style={{ color: "#3b82f6" }}
          >
            Daftar
          </Link>
        </p>
      </div>
    </div>
  );
}