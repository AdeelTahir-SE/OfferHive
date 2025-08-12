import { NextRequest,NextResponse } from "next/server";
import { updateUser } from "@/lib/database/user";
export async function PATCH(request:NextRequest){

    const data = await request.json();
    const user_id = data.user_id;
    delete data.user_id;
    if(!user_id){
        return NextResponse.json({error:"User ID is required"},{status:400});
    }
    



    const {data:updatedUser,error} = await updateUser(user_id,data);
    if(error){
        return NextResponse.json({error:error.message},{status:500});
    }
    return NextResponse.json({success:true,updatedUser},{status:200});



}