"use client";

import {
  useSearchParams,
  usePathname,
  useRouter,
} from "next/navigation";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term) {
    const params = new URLSearchParams(
      searchParams
    );

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    replace(
      `${pathname}?${params.toString()}`
    );
  }

  return (
    <input
      type="text"
      placeholder="Cari laporan..."
      defaultValue={
        searchParams.get("query")?.toString()
      }
      onChange={(e) =>
        handleSearch(e.target.value)
      }
      style={{
        width: "100%",
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        marginBottom: "20px",
      }}
    />
  );
}