import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import EmailTemplate from "@/components/mail-templates/testing-template";


export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { to, subject } = await req.json();
  if (!to || !subject) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }
  try {
    const response = await resend.emails.send({
      from: `OfferHive <${process.env.DOMAIN_EMAIL ?? "adeeltahir6a@gmail.com"}>`,
      to,
      subject,
      react: EmailTemplate({ name: "OfferHive" }),
    });
    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
      response,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
