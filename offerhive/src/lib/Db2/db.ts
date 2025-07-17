"use server"
import { createClient } from '@supabase/supabase-js';

 const supabaseService = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,       
  process.env.SUPABASE_SERVICE_ROLE_KEY!       
);


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
