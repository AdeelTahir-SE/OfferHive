import { supabase } from "./db";
export async function getGroupShopsByGroupId(
  groupId: string,
  counter: number,
  searchQuery: string
) {
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
  const { data, error } = await supabase
    .from("GroupShop")
    .select(`*, GroupShopOffer(*)`)
    .eq("id", groupShopId)
    .single();

  if (error) {
    console.error("Error fetching group shop by ID:", error);
    return { data: null, error: error };
  }

  return { data: data, error: null };
}
