import { NextRequest, NextResponse } from "next/server";
import { setProfileImageDB } from "@/lib/database/user";

export async function PATCH(request: NextRequest) {
  try {
    const data = await request.formData();
    const image = data.get("image");
    const user_id = data.get("user_id");

    if (!image || !user_id) {
        console.log(image,user_id)
      return NextResponse.json({ error: "Missing image or user_id" }, { status: 400 });
    }

    const imageurl = await setProfileImageDB(image as File, user_id as string);

    if (!imageurl) {
      return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
    }
console.log("server",imageurl)
    return NextResponse.json({ success: true, imageurl });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
