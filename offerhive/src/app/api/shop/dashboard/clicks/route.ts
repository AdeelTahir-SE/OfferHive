import { NextRequest, NextResponse } from "next/server";
import { getClicks } from "@/lib/database/shop";
export async function GET(request: NextRequest) {
  const id = request.headers.get("user_id");
  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }
  try {
    const clicks = await getClicks(id);
    if (!clicks) {
      return NextResponse.json({ error: "No clicks found" }, { status: 404 });
    }
    return NextResponse.json(clicks, { status: 200 });
  } catch (error) {
    console.error("Error fetching clicks:", error);
    return NextResponse.json(
      { error: "Failed to fetch clicks" },
      { status: 500 }
    );
  }
}
