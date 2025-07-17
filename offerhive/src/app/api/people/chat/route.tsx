import { NextRequest, NextResponse } from "next/server";
import { getChat } from "@/lib/database/user";
export async function GET(req: NextRequest) {
  const senderId = req.headers.get('sender-id');
  const receiverId = req.headers.get('receiver-id');

  const chat = await getChat(senderId, receiverId);
  if (!chat) {
    return NextResponse.json(
      { error: "Chat not found" },
      {
        status: 404,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
  return NextResponse.json(chat, {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
