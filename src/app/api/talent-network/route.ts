import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();

  const fullName = formData.get("fullName");
  const email = formData.get("email");
  const country = formData.get("country");
  const expertise = formData.get("expertise");
  const linkedin = formData.get("linkedin");
  const motivation = formData.get("motivation");
  const resume = formData.get("resume");

  // For now: just log.
  // Replace with email service (Resend, SendGrid, etc.)
  console.log({
    fullName,
    email,
    country,
    expertise,
    linkedin,
    motivation,
    resume,
  });

  return NextResponse.json({ success: true });
}