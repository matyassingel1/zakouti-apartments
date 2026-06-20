import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { saveUpload } from "@/lib/upload";

export async function POST(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Neautorizováno." }, { status: 401 });
  }
  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "Chybí soubor." }, { status: 400 });
  }
  const prefix = String(form.get("prefix") || "soubor");
  try {
    const url = await saveUpload(file, prefix);
    return NextResponse.json({ url });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Nahrání selhalo." },
      { status: 500 }
    );
  }
}
