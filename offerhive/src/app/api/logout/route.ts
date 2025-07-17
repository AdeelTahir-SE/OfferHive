import { NextRequest, NextResponse } from "next/server";
import { signOut } from "@/lib/Db/user";
export async function POST(request: NextRequest) {
  const result = await signOut();
  if (result) {
    return NextResponse.json(
      { message: "User signed out successfully" },
      { status: 200 }
    );
  }
  return NextResponse.json(
    { error: "Failed to sign out user" },
    { status: 500 }
  );
}
