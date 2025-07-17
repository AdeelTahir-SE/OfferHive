import { getLatestMessages } from "@/lib/database/shop";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
  const id = request.headers.get("user_id");
  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }
  try {
    const messages = await getLatestMessages(id);
    if (!messages) {
      return NextResponse.json({ error: "No messages found" }, { status: 404 });
    }
    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    console.error("Error fetching latest messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch latest messages" },
      { status: 500 }
    );
  }
}
