import Navbar from "../../components/Navbar";
import SearchBar from "../../components/SearchBar";
import { supabase } from "../../lib/supabase";
import Link from "next/link";

export default async function LaporanPage({
  searchParams,
}) {
  // ambil query dari URL
  const query = searchParams?.query || "";

  // filter data dari Supabase
  const { data: reports, error } =
    await supabase
      .from("reports")
      .select("*")
      .ilike("title", `%${query}%`)
      .order("id", { ascending: false });

  if (error) {
    console.error(error);
  }

  return (
    <>
      <Navbar />

      <div
        style={{
          maxWidth: "900px",
          margin: "40px auto",
          padding: "20px",
        }}
      >
        <h1
          style={{
            marginBottom: "20px",
          }}
        >
          Daftar Laporan
        </h1>

        {/* SEARCH BAR */}
        <SearchBar />

        {/* JIKA TIDAK ADA DATA */}
        {reports?.length === 0 && (
          <p>Tidak ada laporan ditemukan.</p>
        )}

        {/* LIST DATA */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          {reports?.map((report) => (
            <Link
              key={report.id}
              href={`/laporan/${report.id}`}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  padding: "20px",
                  backgroundColor: "#fff",
                }}
              >
                <h3>{report.title}</h3>

                <p
                  style={{
                    marginTop: "10px",
                    color: "#555",
                  }}
                >
                  {report.content}
                </p>

                <p
                  style={{
                    marginTop: "10px",
                    fontSize: "14px",
                    color: "#888",
                  }}
                >
                  📍 {report.location}
                </p>

                <p
                  style={{
                    fontSize: "14px",
                    color: "#888",
                  }}
                >
                  📅 {report.date}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}