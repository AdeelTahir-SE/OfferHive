import { NextRequest, NextResponse } from "next/server";
import { getClicks, setClicks } from "@/lib/database/shop"; // Your database functions
import { Click } from "@/lib/types";
export async function GET(req: NextRequest) {
  try {
    const offer_id = req.nextUrl.searchParams.get("offer_id");
    if (!offer_id) {
      return NextResponse.json({ error: "offer_id required" }, { status: 400 });
    }

    const today = new Date().toISOString().split("T")[0];
    const data = await getClicks(offer_id); 
    const clicks= data?.clicks || [];

    let matched = false;
    let updatedClicks = clicks?.map((click:Click) => {
      if (click.date === today) {
        matched = true;
        return { ...click, clicks: click.clicks + 1 };
      }
      return click;
    }) ?? [];

    if (!matched) {
      updatedClicks.push({ date: today, clicks: 1 });
    }

    await setClicks(offer_id, updatedClicks);

    return NextResponse.json({ success: true, updatedClicks });
  } catch (error) {
    console.error("Error updating clicks:", error);
    return NextResponse.json({ error: "Failed to update clicks" }, { status: 500 });
  }
}
