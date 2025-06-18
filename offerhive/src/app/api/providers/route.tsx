import { NextRequest } from "next/server";
import { searchOfferers, getOfferers } from "@/lib/Db/offerer";
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const counter = parseInt(searchParams.get("counter") || "0", 10);
  const searchQuery = searchParams.get("searchQuery") || "";
  try {
    const providerData = searchQuery
      ? await searchOfferers(searchQuery, counter)
      : await getOfferers(counter);

    if (!providerData) {
      return new Response(JSON.stringify({ error: "No Provider Found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(providerData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching provider data:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
