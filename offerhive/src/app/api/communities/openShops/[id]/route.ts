import {
  getGroupShopById,
  getGroupShopOffersById,
} from "@/lib/database/groupShop";

import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  const groupShopId = req.nextUrl.pathname.split("/")[4];
  const query = req.nextUrl.searchParams;
  const searchQuery = query?.get("searchQuery") || "";
  const counter = parseInt(query.get("counter") || "0", 10);
  const offers = query?.get("offers");

console.log(searchQuery,counter,offers)
  if (offers) {
    const { data, error } = await getGroupShopOffersById(
      groupShopId,
      searchQuery,
      counter
    );
    console.log(data)
    if (!data) {
      return NextResponse.json({ data: null, error }, { status: 404 });
    }
    if(error){
            return NextResponse.json({ data: null, error }, { status: 500 });

    }
    return NextResponse.json({ data: data, error: null }, { status: 200 });
  }


  const { data, error } = await getGroupShopById(groupShopId);

  if (error) {
    console.error("Error fetching group shop offers:", error);
    return NextResponse.json(
      { error: "Failed to fetch group shop offers" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { data },
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
