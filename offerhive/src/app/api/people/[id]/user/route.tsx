import { getUserwithId } from "@/lib/Db/user";
import { NextRequest,NextResponse } from "next/server";
export async function GET(rqeuest:NextRequest){
    const id= rqeuest.nextUrl.pathname.split("/")[3];
    const user=await getUserwithId(id);
    if(!user){
        console.error("User not found for ID:", id);
    }
    if(!user){
        return NextResponse.json({error:"User not found"}, {status:404});
    }
    return NextResponse.json(user, {status:200});

}