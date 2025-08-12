// import { supabase } from "./db";
"use server";
import { createClient } from "./db-server";

export async function signIn(email: string, password: string) {
  const supabase = await createClient();

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
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log("Error signing out:", error.message);
    return null;
  } else {
    console.log("User signed out");
    return true;
  }
}
// export async function signInWithOAuth(provider) {
//   const { data, error } = await supabase.auth.signInWithOAuth({
//     provider: provider,
//   });
//   if (error) {
//     console.log("Error signing in with OAuth:", error.message);
//     return null;
//   } else {
//     console.log("User signed in with OAuth:", data);
//     return data;
//   }
// }

export async function getUserwithId(user_id: string) {
  const supabase = await createClient();

  const { data } = await supabase
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
export async function getUserWithEmail(email: string|null|undefined) {
  if(!email){
    return { data: null, error: 'Email is required' };
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("User")
    .select("*")
    .eq("email", email)
    .single();
  if (error) {
    console.log("Error in fetching data");
    return { data: null, error };
  }
  return { data, error: null };
}

export async function getChat(
  user_id: string | null,
  shop_user_id: string | null
) {
  const supabase = await createClient();

  if (!user_id || !shop_user_id) {
    return [];
  }
  const { data, error } = await supabase
    .from("Chat")
    .select("chat")
    .eq("user_id", user_id)
    .eq("shop_user_id", shop_user_id)
    .single();

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

// export async function chatListener(
//   user_id: string,
//   shop_user_id: string,
//   handleNewChat: (message: any) => void
// ) {
//   console.log(user_id, shop_user_id, "broadcasting");
//   const channel = supabase
//     .channel("custom-chat-channel")
//     .on(
//       "postgres_changes",
//       {
//         event: "*",
//         schema: "public",
//         table: "Chat",
//         filter: `user_id=eq.${user_id},shop_user_id=eq.${shop_user_id}`,
//       },
//       (payload) => {
//         console.log("Change received!", payload);
//         if (payload?.new?.chat) {
//           handleNewChat(payload.new?.chat);
//         }
//       }
//     )
//     .subscribe();

//   console.log("chadasdasdsadasnnel", channel);

//   return channel;
// }

export async function setChatDB(
  user_id: string,
  shop_user_id: string,
  chat: any[]
) {
  const supabase = await createClient();

  const { data } = await supabase
    .from("Chat")
    .update({ chat: chat })
    .eq("user_id", user_id)
    .eq("shop_user_id", shop_user_id)
    .select();

  if (!data) {
    console.log("error in fetching chat!");
    return null;
  }
  return data;
}

// export async function removeChatListener(chatlistener: RealtimeChannel) {
//   try {
//     if (chatlistener && typeof chatlistener.unsubscribe === "function") {
//       chatlistener.unsubscribe();
//     }
//   } catch (error) {
//     console.error("Error unsubscribing from channel:", error);
//   }
// }

export async function setProfileImageDB(
  file: File | null,
  user_id: string | null
) {
  const supabase = await createClient();

  if (!user_id || !file) return;

  const folderPath = `profile_pics/${user_id}/`;
  const filepath = `${folderPath}${file.name}`;

  const { data: existingFiles, error: listError } = await supabase.storage
    .from("images")
    .list(folderPath);

  if (listError) {
    console.error("Error listing profile images:", listError);
    return null;
  }

  // Step 2: Remove all existing files (if any)
  if (existingFiles && existingFiles.length > 0) {
    const filesToDelete = existingFiles.map(
      (file) => `${folderPath}${file.name}`
    );
    const { error: deleteError } = await supabase.storage
      .from("images")
      .remove(filesToDelete);

    if (deleteError) {
      console.error("Error deleting old profile images:", deleteError);
      return null;
    }
  }

  // Step 3: Upload new image
  const { data, error: uploadError } = await supabase.storage
    .from("images")
    .upload(filepath, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (uploadError) {
    console.error("Error uploading image:", uploadError);
    return null;
  }

  // Step 4: Get public URL
  const { data: publicData } = supabase.storage
    .from("images")
    .getPublicUrl(filepath);
  const publicURL = publicData?.publicUrl;

  if (!publicURL) {
    console.error("Error getting public URL.");
    return null;
  }

  // Step 5: Update user's profile image in the database
  const { data: uploadImage, error: updateError } = await supabase
    .from("User")
    .update({ profile_image: publicURL })
    .eq("user_id", user_id)
    .single();

  if (updateError) {
    console.error("Error updating user profile image:", updateError);
    return null;
  }

  return publicURL;
}

export async function chatWithShopOwners(user_id: string | null) {
  const supabase = await createClient();
  if (!user_id) {
    return [];
  }
  const { data: chats, error: chatError } = await supabase
    .from("Chat")
    .select("shop_user_id")
    .eq("user_id", user_id);
  if (chatError) {
    console.error("Error fetching chats:", chatError);
    return [];
  }

  const shopUserIds = chats?.map((chat) => chat.shop_user_id) || [];

  if (shopUserIds.length === 0) {
    return [];
  }

  const { data: shopOwners, error: userError } = await supabase
    .from("User")
    .select("*")
    .in("user_id", shopUserIds);

  if (userError) {
    console.error("Error fetching shop owner data:", userError);
    return [];
  }

  return shopOwners;
}

export async function getNotifications(user_id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("Notification")
    .select("*")
    .eq("user_id", user_id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching notifications:", error);
    return { data: null, error };
  }
  return { data, error };
}
export async function deleteNotifications(user_id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("Notification")
    .delete()
    .eq("user_id", user_id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error deleting notifications:", error);
    return { data: null, error };
  }

  return { data, error };
}

export async function createNotification(notification: {
  user_id: string;
  description: string;
}) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("Notification")
    .insert(notification)
    .select();
  if (error) {
    console.log("Error creating notification:", error);
    return { data: null, error };
  }
  return { data, error };
}

export async function passwordRecovery(email: string) {
  const supabase = await createClient();

  let { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "https://offer-hive.vercel.app/resetPassword",
  });
  if (error) {
    console.log("Error fetching user:", error);
    return { data: null, error };
  }
  return { data, error };
}

export async function updatePassword(password: string, email: string|null|undefined) {
    const supabase = await createClient();

  if(!email){
    return { data: null, error: 'Email is required' };
  }

  let { data, error } = await supabase.auth.updateUser({
    email,
    password,
  });
  if (error) {
    console.log("Error fetching user:", error);
    return { data: null, error };
  }
  return { data, error };
}

export async function updateUser(user_id: string, data: {
  name: string | null;
  email: string | null;
  bio: string | null;
  university: string | null;
  year: string | null;
  major: string | null;
}) {
  const supabase = await createClient();

  const { data: updatedUser, error } = await supabase
    .from("User")
    .update(data)
    .eq("user_id", user_id)
    .single();
  if (error) {
    console.log("Error fetching user:", error);
    return { data: null, error };
  }
  return { data, error };
}
