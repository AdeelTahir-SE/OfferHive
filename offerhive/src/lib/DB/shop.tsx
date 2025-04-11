import { Click } from "../types";
import { supabase } from "./db";

export async function getClicks(user_id: string) {
  const { data, error } = await supabase
    .from("UserShopAnalysis")
    .select("*")
    .eq("user_id", user_id)
    .single();

  if (error) {
    console.error("Error fetching clicks:", error);
    return [];
  }
  if (!data) {
    console.log("Error in fetching data");
    return [];
  }
  return data;
}

export async function setClicks(user_id: string, clicks: Click[]) {
  const { data, error } = await supabase
    .from("UserShopAnalysis")
    .update({ clicks: clicks })
    .eq("user_id", user_id)
    .select("*")
    .single();

  if (error) {
    console.error("Error updating clicks:", error);
    return null;
  }
  if (!data) {
    console.log("Error in fetching data");
    return null;
  }
  return data;
}

export async function getLatestMessages(user_id) {
  const { data, error } = await supabase
    .from(`Chat`)
    .select(
      `
    *,
    User(
    user_id,
    email,
    profile_image
    )
    `
    )
    .eq("shop_user_id", user_id);
  const messages = data?.map((message) => {
    return {
      user_id: message?.user_id,
      email: message?.User?.email,
      profile_image: message?.User?.profile_image,
      message: message?.chat[message?.chat?.length - 1]?.message,
    };
  });
  if (error) {
    console.log("error occured", error);
  }
  if (!messages) {
    console.log("no Message");
    return [];
  }
  console.log(messages);
  return messages;
}
