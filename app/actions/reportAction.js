"use server";

import { z } from "zod";
import { supabase } from "@/lib/supabase";

const ReportSchema = z.object({
  title: z
    .string()
    .min(3, "Judul minimal 3 karakter"),

  content: z
    .string()
    .min(10, "Isi laporan terlalu pendek"),

  location: z
    .string()
    .min(3, "Lokasi wajib diisi"),

  date: z
    .string()
    .min(1, "Tanggal wajib diisi"),

  email: z
    .string()
    .email("Format email tidak valid"),
});

export async function createReport(
  prevState,
  formData
) {
  const validatedFields =
    ReportSchema.safeParse({
      title: formData.get("title"),
      content: formData.get("content"),
      location: formData.get("location"),
      date: formData.get("date"),
      email: formData.get("email"),
    });

  // jika validasi gagal
  if (!validatedFields.success) {
    return {
      errors:
        validatedFields.error.flatten()
          .fieldErrors,
    };
  }

  const {
    title,
    content,
    location,
    date,
    email,
  } = validatedFields.data;

  // simpan ke database
  const { error } = await supabase
    .from("reports")
    .insert([
      {
        title,
        content,
        location,
        date,
        email,
      },
    ]);

  if (error) {
    return {
      message: error.message,
    };
  }

  return {
    success: true,
  };
}