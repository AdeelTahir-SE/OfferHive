import { NextResponse, NextRequest } from "next/server";
import { sendMessage } from "@/lib/Db/contact";
export async function POST(request: NextRequest) {
  const { name, email, message } = await request.json();
  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }
  try {
    const { data, error } = await sendMessage(name, email, message);
    if (data) {
      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: `Failed to send message ,${error}` },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
