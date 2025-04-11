import { Offer } from "../types";
import { supabase } from "./db";

export async function getOfferers(counter: number) {
  const rangeStart = counter * 10;
  const rangeEnd = rangeStart + 9;

  const { data, error } = await supabase
    .from("UserShop")
    .select("*")
    .range(rangeStart, rangeEnd);
  console.log(data);
  if (error) {
    console.error("Error fetching offers:", error);
    return null;
  }
  return data;
}

export async function searchOfferers(searchTerm: string, counter: number) {
  const rangeStart = counter * 10;
  const rangeEnd = rangeStart + 9;

  const { data, error } = await supabase
    .from("UserShop")
    .select("*")
    .ilike("shop_title", `%${searchTerm}%`)
    .range(rangeStart, rangeEnd);

  console.log(data);
  if (error) {
    console.error("Error fetching offers:", error);
    return null;
  }
  return data;
}

export async function getShopById(id: string) {
  const { data, error } = await supabase
    .from("UserShop")
    .select(
      `
      user_id,
      shop_desc,
      shop_title,
      contact_info,
      links,
      shop_images,
      shop_tags,
      shop_address,
      Offers (
        user_id,
        offer_id,
        starts_at,
        valid_uptill,
        image,
        offer_desc,
        offer_title
      )
    `
    )
    .eq("user_id", id)
    .single();

  if (error || !data) {
    console.error("Error fetching shop:", error);
    return null;
  }

  const shop = {
    user_id: data?.user_id,
    shop_desc: data.shop_desc,
    shop_title: data.shop_title,
    contact_info: data.contact_info,
    links: data.links ?? [],
    shop_images: data.shop_images ?? [],
    shop_tags: data.shop_tags ?? [],
    shop_address: data.shop_address,
    offers: data.Offers ?? [],
  };

  return shop;
}
export async function createShop(userid: string, shop: any, images: File[]) {
  const { error: chatDeleteError } = await supabase
    .from("Chat")
    .delete()
    .eq("user_id", userid);

    const {  error: UserUpdateError } = await supabase
    .from("User")
    .update({ is_shop_owner: true })
    .eq("user_id", userid);
   if(UserUpdateError){
    console.log("User update error",UserUpdateError)
    return null
   }

  const imageurls: string[] = [];

  for (let i = 0; i < images.length; i++) {
    const filepath = `shop_pics/${userid}/${images[i].name}`;

    const {  error } = await supabase.storage
      .from("images")
      .upload(filepath, images[i], {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) {
      console.error("Error uploading image:", error);
      return { data: null, error };
    }

    const { data: urlData } = supabase.storage
      .from("images")
      .getPublicUrl(filepath);

    if (!urlData) {
      console.error("Error getting public URL for image:");
      return { data: null, error: "Error getting image url" };
    }

    imageurls.push(urlData.publicUrl);
  }

  const { data: shopData, error: shopError } = await supabase
    .from("UserShop")
    .insert({
      user_id: userid,
      shop_desc: shop.shop_desc,
      shop_title: shop.shop_title,
      contact_info: shop.contact_info,
      links: shop.links,
      shop_images: imageurls,
      shop_tags: shop.shop_tags,
      shop_address: shop.shop_address,
    })
    .select("*")
    .single();

  const { data, error } = await supabase
    .from("UserShopAnalysis")
    .insert({
      user_id: userid,
      clicks: [],
    })
    .select("*")
    .single();
  if (error) {
    console.log("error in creating analysis", error);
  }
  if (!data) {
    console.log("error in creating analysis");
  }

  if (shopError) {
    console.error("Error creating shop:", shopError);
    return { data: null, error: shopError };
  }

  if (chatDeleteError) {
    console.error("Error deleting chat:", chatDeleteError);
  }
  return { data: shopData, error: shopError };
}

export async function updateShop(id: string, updatedFields: Partial<any>) {
  if (!id) {
    console.log("no id provided");
    return;
  }
  console.log(updatedFields);
  const { data, error } = await supabase
    .from("UserShop")
    .update(updatedFields)
    .eq("user_id", id)
    .select("*")
    .single();

  if (error) {
    console.error("Error updating shop:", error);
    return null;
  }

  return data;
}
export async function updateOffer(id: string, updatedFields: Partial<any>) {
  console.log(updatedFields);
  const { data, error } = await supabase
    .from("Offers")
    .update(updatedFields)
    .eq("offer_id", id)
    .select("*")
    .single();

  if (error) {
    console.error("Error updating offer:", error);
    return null;
  }

  return data;
}

export async function deleteOffer(offer_id: string) {
  const { data, error } = await supabase
    .from("Offers")
    .delete()
    .eq("offer_id", offer_id)
    .select();
  if (!data) {
    console.log("error deleting data");
  }
  if (error) {
    console.error("Error deleting offer:", error);
    return null;
  }
  return data;
}
export async function createOffer(offer:Offer) {
  console.log("offer to be created", offer);
  const { data, error } = await supabase
    .from("Offers")
    .insert({
      user_id: offer?.user_id,
      offer_desc: offer?.offer_desc,
      offer_title: offer?.offer_title,
      image: offer?.image,
      starts_at: offer?.starts_at,
      valid_uptill: offer?.valid_uptill,
    })
    .select("*")
    .single();
  console.log(data);
  if (error) {
    console.error("Error creating offer:", error);
    return null;
  }

  return data;
}

export async function getOffersById(user_id: string) {
  const { data, error } = await supabase
    .from("Offers")
    .select("*")
    .eq("user_id", user_id);

  if (error) {
    console.error("Error fetching offers:", error);
    return null;
  }

  return data;
}
export async function deleteShop(id: string) {
  const { data, error } = await supabase
    .from("UserShop")
    .delete()
    .eq("user_id", id)
    .select("*")
    .single();

  if (error) {
    console.error("Error deleting shop:", error);
    return null;
  }

  return data;
}

export async function uploadImage(file: File, userId: string) {
  const filepath = `shop_pics/${userId}/${file.name}`;
  const {  error } = await supabase.storage
    .from("images")
    .upload(filepath, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    console.error("Error uploading image:", error);
    return null;
  }

  const { data: Data } = supabase.storage.from("images").getPublicUrl(filepath);
  const publicURL = Data?.publicUrl;

  if (!publicURL) {
    console.error("Error getting public URL:");
    return null;
  }

  return publicURL;
}

export async function uploadOfferImage(
  file: File,
  userId: string,
  offerId: string
) {
  const filepath = `offer_pics/${userId}/${offerId}/${file.name}`;
  const {  error } = await supabase.storage
    .from("images")
    .upload(filepath, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    console.error("Error uploading image:", error);
    return null;
  }

  const { data: Data } = supabase.storage.from("images").getPublicUrl(filepath);
  const publicURL = Data?.publicUrl;

  if (!publicURL) {
    console.error("Error getting public URL:");
    return null;
  }

  return publicURL;
}
