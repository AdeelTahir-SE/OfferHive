import { supabase } from "./db";

export async function getOfferers(counter: number) {
  const rangeStart = counter * 10;
  const rangeEnd = rangeStart + 9;

  const { data, error } = await supabase
    .from('UserShop')
    .select('*')
    .range(rangeStart, rangeEnd); 
    console.log(data)
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
        .from('UserShop')
        .select('*')
        .ilike('title', `%${searchTerm}%`) 
        .range(rangeStart, rangeEnd);
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
  const imageurls: string[] = []; 

  for (let i = 0; i < images.length; i++) {
    const filepath = `shop_pics/${userid}/${images[i].name}`; 

    const { data, error } = await supabase.storage
      .from("images") 
      .upload(filepath, images[i], {
        cacheControl: "3600", 
      });

    if (error) {
      console.error("Error uploading image:", error);
      return { data: null, error }; 
    }

  
    const { data: urlData } =  supabase.storage
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

  if (shopError) {
    console.error("Error creating shop:", shopError);
    return { data: null, error: shopError }; 
  }

  return { data: shopData, error: shopError };
}
