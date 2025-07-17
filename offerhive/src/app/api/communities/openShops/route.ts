import { getGroupShopsByGroupId } from "@/lib/database/groupShop";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  const groupId = req.headers.get("group-id");
  const searchParams = req.nextUrl.searchParams;
  const searchQuery = searchParams.get("searchQuery") || "";
  const counter = parseInt(searchParams.get("counter") || "0", 10);
  if (!groupId) {
    return NextResponse.json(
      { error: "Group ID is required" },
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
  console.log("Fetching group shops for group ID:", groupId);
  const { data, error } = await getGroupShopsByGroupId(groupId,counter,searchQuery);

  if (error) {
    console.error("Error fetching group shops:", error);
    return NextResponse.json(
      { error: "Failed to fetch group shops" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { data },
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
