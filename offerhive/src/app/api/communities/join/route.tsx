import { NextRequest, NextResponse } from "next/server";
import { joinGroup } from "@/lib/DB/group";

export async function POST(req: NextRequest) {
  const { user_id, group_id } = await req.json();

  if (!user_id || !group_id) {
    return NextResponse.json(
      { error: "user_id and group_id are required" },
      { status: 400 }
    );
  }

  try {
    const result = await joinGroup(user_id, group_id);
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to join group" },
      { status: 500 }
    );
  }
}
