import { NextRequest, NextResponse } from "next/server";
import { getGroups, searchGroups } from "@/lib/Db/group";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const searchQuesry = searchParams.get("searchQuery"); 
  const counter = parseInt(searchParams.get("counter") || "0", 10);

  let data;
  if (searchQuesry) {
    data = await searchGroups(searchQuesry, counter);
  } else {
    data = await getGroups(counter);
  }

  if (!data) {
    return NextResponse.json({ error: "No groups found" }, { status: 404 });
  }
  return NextResponse.json(data, { status: 200 });
}
