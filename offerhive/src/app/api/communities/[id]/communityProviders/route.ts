import { NextRequest, NextResponse } from "next/server";
import { getCommunityProviders } from "@/lib/Db/group";
export async function GET(request: NextRequest) {
  const id = request.nextUrl.pathname.split("/")[3];
  const searchParams = request.nextUrl.searchParams;
  const counter = parseInt(searchParams.get("counter") || "0", 10);
  const searchQuery = searchParams.get("searchQuery") || "";

  try {
    const providerData = await getCommunityProviders(id, searchQuery, counter);
    if (!providerData) {
      return NextResponse.json({ error: "No Provider Found" }, { status: 404 });
    }

    return NextResponse.json(providerData, { status: 200 });
  } catch (error) {
    console.error("Error fetching provider data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
