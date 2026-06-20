"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { checkPassword, createSession, destroySession, requireAuth } from "@/lib/auth";
import {
  createApartman,
  updateApartman,
  deleteApartman,
  setInquiryStav,
  deleteInquiry,
  createMedia,
  deleteMedia,
  updateSettings,
  type ApartmanInput,
} from "@/lib/data";
import type { GalerieKategorie } from "@/data/gallery";

function revalidatePublic() {
  revalidatePath("/");
  revalidatePath("/apartmany");
  revalidatePath("/galerie");
  revalidatePath("/kontakt");
  revalidatePath("/lokalita");
  revalidatePath("/standardy");
}

export type LoginState = { error?: string };

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const pw = String(formData.get("password") ?? "");
  if (!checkPassword(pw)) return { error: "Nesprávné heslo." };
  await createSession();
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect("/admin/login");
}

export async function saveApartmanAction(
  id: number | null,
  input: ApartmanInput
): Promise<void> {
  await requireAuth();
  if (id) await updateApartman(id, input);
  else await createApartman(input);
  revalidatePublic();
  revalidatePath("/admin/apartmany");
  redirect("/admin/apartmany");
}

export async function deleteApartmanAction(id: number): Promise<void> {
  await requireAuth();
  await deleteApartman(id);
  revalidatePublic();
  revalidatePath("/admin/apartmany");
}

export async function setPoptavkaStavAction(
  id: number,
  stav: "Nová" | "Vyřízená"
): Promise<void> {
  await requireAuth();
  await setInquiryStav(id, stav);
  revalidatePath("/admin/poptavky");
}

export async function deletePoptavkaAction(id: number): Promise<void> {
  await requireAuth();
  await deleteInquiry(id);
  revalidatePath("/admin/poptavky");
}

export async function addMediaAction(input: {
  src: string;
  alt: string;
  kategorie: GalerieKategorie;
  sirsi: boolean;
  poradi: number;
}): Promise<void> {
  await requireAuth();
  await createMedia(input);
  revalidatePath("/galerie");
  revalidatePath("/admin/galerie");
}

export async function deleteMediaAction(id: number): Promise<void> {
  await requireAuth();
  await deleteMedia(id);
  revalidatePath("/galerie");
  revalidatePath("/admin/galerie");
}

export async function saveSettingsAction(input: {
  telefon: string;
  email: string;
  email_druhy: string;
  standardy_pdf?: string | null;
}): Promise<void> {
  await requireAuth();
  await updateSettings(input);
  revalidatePublic();
  revalidatePath("/admin/nastaveni");
}
