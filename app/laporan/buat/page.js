"use client";

import Navbar from "../../components/Navbar";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import { useState } from "react";

export default function BuatLaporan() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleSubmit = async (e) => {

    
    e.preventDefault();

    let imageUrl = null;

    // ✅ Upload file ke Supabase Storage
    if (file) {
      const fileName = `${Date.now()}-${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("reports") // nama bucket
        .upload(fileName, file);

      if (uploadError) {
        console.error(uploadError);
        alert("Upload gambar gagal");
        return;
      }

      // ✅ Ambil public URL
      const { data: publicUrlData } = supabase
        .storage
        .from("reports")
        .getPublicUrl(fileName);

      imageUrl = publicUrlData.publicUrl;
    }

    // ✅ Simpan ke database
    const { data, error } = await supabase
      .from("reports")
      .insert([
        {
          title,
          content,
          location,
          date,
          image_url: imageUrl,
          status: "pending"
        }
      ])
      .select();

   if (error) {
  console.error("ERROR INSERT:", error);
  alert(error.message);
  return;
}

    const reportId = data[0].id;

    // 🚀 redirect ke halaman detail
    router.push(`/laporan/${reportId}`);
  };

  return (
    <>
      <Navbar />

      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "600px",
          margin: "50px auto",
          display: "flex",
          flexDirection: "column",
          gap: "12px"
        }}
      >
        <h2>SAMPAIKAN LAPORAN ANDA</h2>

        <input
          placeholder="Ketik Judul Laporan Anda"
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Ketik Isi Laporan Anda"
          className="input"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <input
          type="date"
          className="input"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          placeholder="Lokasi Kejadian"
          className="input"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        {/* 📸 Upload gambar */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);

            if (selectedFile) {
              setPreview(URL.createObjectURL(selectedFile));
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