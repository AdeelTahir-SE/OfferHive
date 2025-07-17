import { NextRequest } from "next/server";
import { signUp } from "@/lib/Db2/db";
export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  const { userData, signUpError, insertError } = await signUp(email, password);
  if (signUpError) {
    return new Response(JSON.stringify({ error: signUpError }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  if (insertError) {
    return new Response(JSON.stringify({ error: insertError }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
  return new Response(JSON.stringify({ userData }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
