import { NextRequest } from "next/server";
import { supabaseService } from "@/lib/Db2/db";

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

export async function signUp(email: string, password: string) {
  const { data: signUpData, error: signUpError } =
    await supabaseService.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: "https://offer-hive.vercel.app/logIn",
      },
    });
console.log(signUpError)
  if (signUpError || !signUpData.user) {
    return {
      userData: null,
      signUpError,
      insertError: "User signup failed or user is null",
    };
  }

  const { data: userData, error: insertError } = await supabaseService
    .from("User")
    .insert([
      {
        email,
        user_id: signUpData.user.id,
        profile_image: "",
        is_shop_owner: false,
      },
    ])
    .select();

  if (insertError) {
    await supabaseService.auth.admin.deleteUser(signUpData.user.id);
  }

  return {
    userData: insertError ? null : userData,
    signUpError: null,
    insertError,
  };
}
