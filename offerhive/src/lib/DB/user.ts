import { supabase } from "./db";
import { RealtimeChannel } from "@supabase/supabase-js";
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
        is_shop_owner: false,
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

export async function getUserwithId(user_id: string) {
  const { data, error } = await supabase
    .from("User")
    .select("profile_image,email")
    .eq("user_id", user_id)
    .single();

  if (!data) {
    console.log("Error in fetching data");
    return null;
  }
  return data;
}

export async function getChat(user_id: string, shop_user_id: string) {
  const { data, error } = await supabase
    .from("Chat")
    .select("chat")
    .eq("user_id", user_id)
    .eq("shop_user_id", shop_user_id)
    .single();

  // If no data is found, insert a new row
  if (!data) {
    const { data: insertData, error: insertError } = await supabase
      .from("Chat")
      .insert([
        {
          user_id: user_id,
          shop_user_id: shop_user_id,
          chat: [],
          shop_user_status: "no pending",
          user_status: "no pending",
        },
      ])
      .single();

    // Handle insert error
    if (insertError) {
      console.error("Error inserting chat data:", insertError);
      return []; // Return an empty array in case of error
    }

    return insertData; // Return the newly inserted data
  }

  // Handle error during fetching data
  if (error) {
    console.error("Error fetching chat data:", error);
    return []; // Return an empty array in case of error
  }

  return data; // Return the fetched data
}


export async function chatListener(
  user_id: string,
  shop_user_id: string,
  setChatMessages: React.Dispatch<React.SetStateAction<any[]>>
) {
  const chatChannel = supabase
    .channel("custom-chat-channel")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "Chat",
        filter: `user_id=eq.${user_id},shop_user_id=eq.${shop_user_id}`,
      },
      (payload) => {
        console.log("Change received!", payload);
        setChatMessages((prevChat: any[]) => [...prevChat, payload.new]);
      }
    )
    .subscribe();

  return chatChannel;
}

export async function setChatDB(user_id: string, shop_user_id: string,chat:any[]) {
  console.log("userid",user_id)
  console.log("shop_id",shop_user_id)
  console.log("chat",chat)
  const { data, error } = await supabase
    .from("Chat")
    .update({ chat: chat })
    .eq("user_id", user_id)
    .eq("shop_user_id", shop_user_id).select();

  if (!data) {
    console.log("error in fetching chat!");
    return null;
  }
  console.log("setted chat",data)
  return data;
}


export async function removeChatListener(chatlistener: RealtimeChannel) {
  try {
    if (chatlistener && typeof chatlistener.unsubscribe === 'function') {
      chatlistener.unsubscribe();
    }
  } catch (error) {
    console.error('Error unsubscribing from channel:', error);
  }
}
