import { chatWithShopOwners } from "@/lib/database/user";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
  try {
    const user_id = request.nextUrl.searchParams.get("user_id");
    const chats = await chatWithShopOwners(user_id);
    if (chats) {
      return NextResponse.json(chats, { status: 200 });
    }
    return NextResponse.json({ error: "No chats found" }, { status: 404 });
  } catch (error) {
    console.error("Error fetching chats:", error);
    return NextResponse.json(
      { error: "Failed to fetch chats" },
      { status: 500 }
    );
  }
}
