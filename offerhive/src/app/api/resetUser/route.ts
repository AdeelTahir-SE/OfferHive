import {
  updatePassword,
  getUserWithEmail,
} from "@/lib/database/user";
import { NextRequest, NextResponse } from "next/server";




export async function PUT(req: NextRequest) {
  const body = await req.json();
  const password = body.password;
  const email=body.email
  if (!password) {
    return NextResponse.json(
      { error: "Password is required" },
      { status: 400 }
    );
  }

  const { error:updateError } = await updatePassword(password, email);
  if (updateError) {
    return NextResponse.json(
      { error: "Password update failed" },
      { status: 500 }
    );
  }
  const {data,error}=await getUserWithEmail(email);
  if(error){
    return NextResponse.json(
      { error: "User not found" },
      { status: 404 }
    );
  }
  return NextResponse.json(
    { message: "Password updated successfully", user:data },
    { status: 200 }
  );
}
