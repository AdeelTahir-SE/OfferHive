import { NextRequest } from "next/server";
import { getShopById } from "@/lib/Db/offerer";
export async function GET(request:NextRequest){

    const shop=await getShopById(request.nextUrl.pathname.split("/")[3]);
    if(!shop){
        return new Response(JSON.stringify({ error: "Shop not found" }), {
            status: 404,
            headers: { "Content-Type": "application/json" },
        });
    }
    return new Response(JSON.stringify(shop), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
    
}