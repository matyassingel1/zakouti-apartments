import "server-only";

/** Pošle e-mail o nové poptávce makléřce — pouze pokud je nastaven RESEND_API_KEY. */
export async function sendInquiryEmail(to: string, subject: string, body: string): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return; // bez klíče se e-mail přeskočí (poptávka se i tak uloží do DB)
  const from = process.env.RESEND_FROM || "Zákoutí Apartments <onboarding@resend.dev>";
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        text: body,
      }),
    });
  } catch {
    // tichý fail — poptávka už je uložená
  }
}
