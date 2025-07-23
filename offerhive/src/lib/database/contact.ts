"use server"

// import { supabase } from "./db";

import { createClient } from "./db-server";

export async function sendMessage(
  name: string,
  email: string,
  message: string
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("Contact")
    .insert([
      {
        name,
        email,
        message,
      },
    ])
    .select();

  return { data, error };
}
