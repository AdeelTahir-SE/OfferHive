import { getGroupShopById } from "@/lib/Db/groupShop";
import { NextRequest,NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  const groupShopId = req.nextUrl.pathname.split("/")[4];
  const { data, error } = await getGroupShopById(groupShopId);

  if (error) {
    console.error("Error fetching group shop offers:", error);
    return NextResponse.json({ error: "Failed to fetch group shop offers" }, { status: 500 });
  }
  
  return NextResponse.json({ data }, { status: 200, headers: { "Content-Type": "application/json" } });
}