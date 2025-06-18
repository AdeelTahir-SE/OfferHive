import { NextRequest, NextResponse } from "next/server";
import { signIn } from "@/lib/Db/user";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const { userData, findingError, signInError } = await signIn(email, password);

    if (signInError || findingError) {
      const errorMessage =
        signInError?.message || findingError?.message || "An error occurred";

      console.error("Error signing in:", errorMessage);

      return NextResponse.json(
        { success: false, error: errorMessage },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, user: userData },
      { status: 200 }
    );

  } catch (err: any) {
    console.error("Unexpected error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Unexpected server error" },
      { status: 500 }
    );
  }
}
