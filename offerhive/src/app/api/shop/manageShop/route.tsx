import { NextRequest, NextResponse } from "next/server";
import { getShopById, getOffersById } from "@/lib/Db/offerer";
export async function GET(request: NextRequest) {
  const id = request.headers.get("shop_id");
  const shop = await getShopById(id);
  if (!shop) {
    return NextResponse.json(
      { error: "Shop not found" },
      {
        status: 404,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
  const offers = await getOffersById(id);
  if (!offers) {
    return NextResponse.json(
      { error: "Offers not found" },
      {
        status: 404,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  return NextResponse.json(
    { shop, offers },
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
