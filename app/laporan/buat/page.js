"use client";

import Navbar from "../../components/Navbar";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import { useState, useActionState } from "react";
import { createReport } from "../../actions/reportAction";

export default function BuatLaporan() {
  const router = useRouter();

  // ✅ Zod form state
  const [state, formAction] =
    useActionState(createReport, null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  return (
    <>
      <Navbar />

      <form
        action={formAction}
        style={{
          maxWidth: "600px",
          margin: "50px auto",
          display: "flex",
          flexDirection: "column",
          gap: "12px"
        }}
      >
        <h2>SAMPAIKAN LAPORAN ANDA</h2>

        {/* TITLE */}
        <input
          name="title"
          placeholder="Ketik Judul Laporan Anda"
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* ERROR TITLE */}
        {state?.errors?.title && (
          <p style={{ color: "red", fontSize: "14px" }}>
            {state.errors.title[0]}
          </p>
        )}

        {/* CONTENT */}
        <textarea
          name="content"
          placeholder="Ketik Isi Laporan Anda"
          className="input"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {/* ERROR CONTENT */}
        {state?.errors?.content && (
          <p style={{ color: "red", fontSize: "14px" }}>
            {state.errors.content[0]}
          </p>
        )}

        {/* DATE */}
        <input
          name="date"
          type="date"
          className="input"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        {/* ERROR DATE */}
        {state?.errors?.date && (
          <p style={{ color: "red", fontSize: "14px" }}>
            {state.errors.date[0]}
          </p>
        )}

        {/* LOCATION */}
        <input
          name="location"
          placeholder="Lokasi Kejadian"
          className="input"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        {/* ERROR LOCATION */}
        {state?.errors?.location && (
          <p style={{ color: "red", fontSize: "14px" }}>
            {state.errors.location[0]}
          </p>
        )}

        {/* EMAIL */}
        <input
          name="email"
          type="email"
          placeholder="Email Pelapor"
          className="input"
        />

        {/* ERROR EMAIL */}
        {state?.errors?.email && (
          <p style={{ color: "red", fontSize: "14px" }}>
            {state.errors.email[0]}
          </p>
        )}

        {/* 📸 Upload gambar */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);

            if (selectedFile) {
              setPreview(
                URL.createObjectURL(selectedFile)
              );
            }
          }}
        />

        {/* 🔍 Preview gambar */}
        {preview && (
          <img
            src={preview}
            alt="preview"
            style={{
              width: "100%",
              borderRadius: "10px",
              marginTop: "10px"
            }}
          />
        )}

        {/* MESSAGE ERROR DATABASE */}
        {state?.message && (
          <p style={{ color: "red" }}>
            {state.message}
          </p>
        )}

        {/* SUCCESS */}
        {state?.success && (
          <p style={{ color: "green" }}>
            Laporan berhasil dikirim ✅
          </p>
        )}

        <button
          type="submit"
          style={{
            marginTop: "10px",
            padding: "12px",
            backgroundColor: "#f97316",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          KIRIM LAPORAN
        </button>
      </form>
    </>
  );
}