import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function DELETE(request) {
  const { searchParams } =
    new URL(request.url);

  const id = searchParams.get("id");

  const { error } = await supabase
    .from("reports")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({
      error: error.message,
    });
  }

  return NextResponse.json({
    success: true,
  });
}