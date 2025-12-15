import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const url =
      process.env.CONTACT_WEBHOOK_URL +
      "?token=" +
      encodeURIComponent(process.env.CONTACT_WEBHOOK_TOKEN as string);

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const text = await res.text();

    let json: any = {};
    try {
      json = JSON.parse(text);
    } catch {}

    if (!res.ok || json?.success !== true) {
      return NextResponse.json(
        { success: false, error: json?.error || "Webhook failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("API ERROR:", err);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
