import { passwordRecovery } from "@/lib/database/user";
import { NextRequest,NextResponse } from "next/server";

export async function PUT(req:NextRequest){
    const body=await req.json();
    const email=body.email;
    if(!email){
        return NextResponse.json({error:"email is required"},{status:400});
    }
    const {error}=await passwordRecovery(email);
    if(error){
        return NextResponse.json({error:"rate limit hit please try 5 min later"},{status:500});
    }
    return NextResponse.json({message:"password recovery email sent"},{status:200});
}