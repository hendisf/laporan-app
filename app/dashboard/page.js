"use client";

import {
  useEffect,
  useState,
  useOptimistic,
  startTransition,
} from "react";

import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function Dashboard() {
  const [data, setData] = useState([]);

  // ambil data dari supabase
  useEffect(() => {
    fetchReports();
  }, []);

  async function fetchReports() {
    const { data, error } =
      await supabase
        .from("reports")
        .select("*")
        .order("id", {
          ascending: false,
        });

    if (error) {
      console.error(error);
    } else {
      setData(data);
    }
  }

  // optimistic UI
  const [
    optimisticReports,
    removeOptimistic,
  ] = useOptimistic(
    data,
    (state, reportId) =>
      state.filter(
        (report) => report.id !== reportId
      )
  );

  // hapus laporan
  async function handleDelete(id) {
    // UI langsung berubah
    startTransition(() => {
      removeOptimistic(id);
    });

    // delete di supabase
    const { error } = await supabase
      .from("reports")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("Gagal menghapus");
      return;
    }

    // update state asli
    setData((prev) =>
      prev.filter(
        (report) => report.id !== id
      )
    );
  }

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      {/* tombol kembali */}
      <Link
        href="/"
        style={{
          display: "inline-block",
          marginBottom: "20px",
          textDecoration: "none",
          color: "#2563eb",
          fontWeight: "bold",
        }}
      >
        ← Kembali ke Home
      </Link>

      <h1
        style={{
          marginBottom: "20px",
        }}
      >
        Dashboard
      </h1>

      {optimisticReports?.length === 0 && (
        <p>Belum ada laporan.</p>
      )}

      {optimisticReports?.map((report) => (
        <div
          key={report.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "20px",
            marginBottom: "15px",
            backgroundColor: "#fff",
          }}
        >
          <h3>{report.title}</h3>

          <p>{report.content}</p>

          <p>
            📍 {report.location}
          </p>

          <p>
            📅 {report.date}
          </p>

          <button
            onClick={() =>
              handleDelete(report.id)
            }
            style={{
              marginTop: "10px",
              padding: "8px 12px",
              backgroundColor: "red",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Hapus
          </button>
        </div>
      ))}
    </div>
  );
}