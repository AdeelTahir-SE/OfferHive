import { NextRequest, NextResponse } from "next/server";
import { signUp } from "@/lib/Db2/db";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  const { userData, signUpError, insertError } = await signUp(email, password);

  if (signUpError) {
    return NextResponse.json(
      { error: signUpError },
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  if (insertError) {
    return NextResponse.json(
      { error: insertError },
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  return NextResponse.json(
    { userData },
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
