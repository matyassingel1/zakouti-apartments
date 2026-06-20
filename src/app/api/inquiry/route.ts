import { NextResponse } from "next/server";
import { createInquiry, getSettings } from "@/lib/data";
import { sendInquiryEmail } from "@/lib/email";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Neplatný požadavek." }, { status: 400 });
  }

  const jmeno = String(body.jmeno ?? "").trim();
  const email = String(body.email ?? "").trim();
  const telefon = String(body.telefon ?? "").trim();
  const zprava = body.zprava ? String(body.zprava).trim() : undefined;
  const apartman_slug = body.apartman_slug ? String(body.apartman_slug) : undefined;
  const apartman_label = body.apartman_label ? String(body.apartman_label) : undefined;

  if (!jmeno || !email || !telefon) {
    return NextResponse.json({ error: "Chybí povinná pole." }, { status: 400 });
  }

  await createInquiry({ jmeno, email, telefon, zprava, apartman_slug, apartman_label });

  const settings = await getSettings();
  const predmet = apartman_label
    ? `Nová poptávka — ${apartman_label}`
    : "Nová poptávka z webu Zákoutí";
  await sendInquiryEmail(
    settings.email,
    predmet,
    [
      apartman_label ? `Apartmán: ${apartman_label}` : "Obecná poptávka",
      `Jméno: ${jmeno}`,
      `E-mail: ${email}`,
      `Telefon: ${telefon}`,
      "",
      zprava || "(bez zprávy)",
    ].join("\n")
  );

  return NextResponse.json({ ok: true });
}
