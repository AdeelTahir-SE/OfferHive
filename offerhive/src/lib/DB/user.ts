import { supabase } from "./db";
export async function signUp(email: string, password: string) {
  console.log(email, password);

  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signUpError || !signUpData.user) {
    return {
      userData: null,
      signUpError,
      insertError: "User signup failed or user is null",
    };
  }

  const { data: userData, error: insertError } = await supabase
    .from("User")
    .insert([
      {
        email,
        user_id: signUpData.user.id,
        profile_image: "",
      },
    ])
    .select();

  return {
    userData,
    signUpError,
    insertError,
  };
}
export async function signIn(email: string, password: string) {
  const { data, error: signInError } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  const { data: userData, error: findingError } = await supabase
    .from("User")
    .select("*")
    .eq("user_id", data.user?.id)
    .single();
  return { userData, signInError, findingError };
}
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log("Error signing out:", error.message);
    return null;
  } else {
    console.log("User signed out");
    return true;
  }
}
export async function signInWithOAuth(provider: string) {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: provider,
  });
  if (error) {
    console.log("Error signing in with OAuth:", error.message);
    return null;
  } else {
    console.log("User signed in with OAuth:", data);
    return data;
  }
}
