import { NextRequest,NextResponse } from "next/server";
import { getNotifications, deleteNotifications,createNotification } from "@/lib/database/user";


export async function GET(req:NextRequest){
    const user_id=req.headers.get("user_id");
    if(!user_id){
        return NextResponse.json({data:null,error:"user_id not found"},{status:400});
    }
    const notifications = await getNotifications(user_id);
    if(notifications.error){
        return NextResponse.json({data:null,error:notifications.error},{status:500});
    }
    return NextResponse.json({data:notifications?.data,error:null,success:true},{status:200});
}

export async function DELETE(req:NextRequest){
    const user_id=req.headers.get("user_id");
    if(!user_id){
        return NextResponse.json({data:null,error:"user_id not found"},{status:400});
    }
    const deletedNotifications = await deleteNotifications(user_id);
    if(deletedNotifications.error){
        return NextResponse.json({data:null,error:deletedNotifications.error},{status:500});
    }
        return NextResponse.json({data:deletedNotifications?.data,error:null,success:true},{status:200});
}

export async function POST(req:NextRequest){

    const user_id=req.headers.get("user_id");
    if(!user_id){
        return NextResponse.json({data:null,error:"user_id not found"},{status:400});
    }
    const notification=await req.json();
    if(!notification){
        return NextResponse.json({data:null,error:"notification not found"},{status:400});
    }
    const createdNotification = await createNotification({user_id,description:notification.description});
    if(createdNotification.error){
        return NextResponse.json({data:null,error:createdNotification.error},{status:500});
    }
    return NextResponse.json({data:createdNotification?.data,error:null,success:true},{status:200});
}