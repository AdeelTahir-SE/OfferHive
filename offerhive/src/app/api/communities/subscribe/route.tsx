import { NextRequest, NextResponse } from "next/server";
import { subscribeGroup } from "@/lib/database/group";

export async function POST(req: NextRequest) {
  const { user_id, group_id, isSubscribed } = await req.json();

  if (!user_id || !group_id || typeof isSubscribed !== "boolean") {
    return NextResponse.json(
      { error: "Invalid input" },
      { status: 400 }
    );
  }

  try {
    const result = await subscribeGroup(user_id, group_id, isSubscribed);
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to update subscription" },
      { status: 500 }
    );
  }
}
