import { supabase } from "./db";
export async function getGroups(counter: number) {
  const rangeStart = counter * 10;
  const rangeEnd = rangeStart + 9;

  const { data, error } = await supabase
  .from('Group')  
  .select(`
    *,
    GroupDetail (
      group_id,
      group_title,
      group_desc,
      group_image,
    ),
    UserShop (
      user_id,
      shop_title,
    )
  `)  
  .range(rangeStart, rangeEnd);

  if (error) {
    console.error("Error fetching groups:", error);
    return null;
  }
  return data;
}

export async function searchGroup(searchTerm: string, counter: number) {
  const rangeStart = counter * 10;
  const rangeEnd = rangeStart + 9;

  const { data, error } = await supabase
  .from('Group')  
  .select(`
    *,
    GroupDetail (
      group_id,
      group_title,
      group_desc,
      group_image,
    ),
    UserShop (
      user_id,
      shop_title,
    )
  `)  
    .ilike("title", `%${searchTerm}%`)
    .range(rangeStart, rangeEnd);
  if (error) {
    console.error("Error fetching groups:", error);
    return null;
  }
  return data;
}

export async function getGroupById(id: string) {
  const { data, error } = await supabase
  .from('Group')  
  .select(`
    *,
    GroupDetail (
      group_id,
      group_title,
      group_desc,
    ),
    UserShop (
      user_id,
      shop_title,
      shop_desc,
      shop_images,
      shop_tags,
      shop_address,

    )
  `)  
    .eq("group_id", id)
    .single();
  if (error) {
    console.error("Error fetching group:", error);
    return null;
  }
  return data;
}