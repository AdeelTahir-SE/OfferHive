"use server"

// import { supabase } from "./db";
import { createClient } from "./db-server"; 

export async function getGroupShopsByGroupId(
  groupId: string,
  counter: number,
  searchQuery: string
) {
    const supabase = await createClient();

  const rangeStart = counter * 10;
  const rangeEnd = rangeStart + 9;
  const { data, error } = await supabase
    .from("GroupShop")
    .select("*")
    .eq("group_id", groupId)
    .ilike("group_shop_name", `%${searchQuery}%`)
    .range(rangeStart, rangeEnd);

  if (error) {
    console.error("Error fetching group shop:", error);
    return { data: null, error: error };
  }

  return { data: data, error: null };
}

export async function getGroupShopById(groupShopId: string) {
    const supabase = await createClient();

  const { data, error } = await supabase
    .from("GroupShop")
    .select(`*`)
    .eq("id", groupShopId)
    .single();

  if (error) {
    console.error("Error fetching group shop by ID:", error);
    return { data: null, error: error };
  }

  return { data: data, error: null };
}
export async function getGroupShopOffersById(
  groupShopId: string,
  searchQuery: string,
  counter: number
) {
    const supabase = await createClient();

  const rangeStart = counter * 10;
  const rangeEnd = rangeStart + 9;
  const { data, error } = await supabase
    .from("GroupShopOffer")
    .select(`*`)
    .eq("group_shop_id", groupShopId)
    .ilike("group_shop_offer_title", `%${searchQuery}%`)
    .range(rangeStart, rangeEnd);

  if (error) {
    console.error("Error fetching group shop offers by ID:", error);
    return { data: null, error: error };
  }

  return { data: data, error: null };
}

export async function createGroupShopOffer(openShopId: string, offer: any) {
    const supabase = await createClient();

  const path = `groupShopOffers/${openShopId}/${offer?.title}${offer?.price}${offer?.contact}${offer?.description.substring(0, 10)}`;

  const { error: imageUploadError } = await supabase.storage
    .from("images")
    .upload(path, offer?.image, {
      cacheControl: "3600",
      upsert: true,
    });
  if (imageUploadError) {
    return { data: null, error: "Error Uplaoding Image" };
  }
  const { data: publicImageUrl } = supabase.storage
    .from("images")
    .getPublicUrl(path);
  if (!publicImageUrl?.publicUrl) {
    return { data: null, error: "Image uploaded but url not found" };
  }
  const { data, error } = await supabase.from("GroupShopOffer").insert({
    group_shop_id: openShopId,
    image_url: publicImageUrl?.publicUrl,
    description: offer?.description,
    group_shop_offer_title: offer?.title,
    contact: offer?.contact,
    price: offer?.price,
  });
  if ( error) {
    return { data: null, error: `Error creating Offer${error}` };
  }
  return { data:"Offer created Successfully!", error: null };
}
