import { supabase } from "./db";
import { GroupUnique } from "../types";
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
      group_tags
    ),
    GroupUser (
      user_id,
      group_id,
      status,
      User (
        user_id,
        UserShop!UserShop_user_id_fkey (
          user_id,
          shop_title
        )
      )
    )
  `)
  .range(rangeStart, rangeEnd);

console.log(data)
  if (error) {
    console.error("Error fetching groups:", error);
    return null;
  }




  return data;
}



export async function searchGroups(searchTerm: string, counter: number) {
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
        group_image
      ),
      GroupUser (
        user_id,
        group_id,
        status,
        User (
          user_id,
        UserShop!UserShop_user_id_fkey (
            user_id,
            shop_title
          )
        )
      )
    `)
    .ilike('GroupDetail.group_title', `%${searchTerm}%`)
    .range(rangeStart, rangeEnd);

  if (error) {
    console.error("Error fetching groups:", error);
    return null;
  }

  const filteredGroups = data?.filter((group) =>
    group.GroupDetail?.length > 0
  ) || [];

  return filteredGroups;
}


export async function subscribeGroup(user_id:string,group_id:string,isSubscribed:boolean) {
  console.log("user_id",user_id)
  console.log("group_id",group_id)
  console.log("isSubscribed",isSubscribed)
  if(isSubscribed) {

    const { data, error } = await supabase
      .from("GroupSubscription")
      .delete()
      .eq("user_id", user_id)
      .eq("group_id", group_id)
      .select();

      console.log(data)
    if (error) {
      console.error("Error unsubscribing from group:", error);
      return null;
    }
    return data;
  }


  const { data, error } = await supabase
    .from("GroupSubscription")
    .insert([{ user_id, group_id }])
    .select();
  if (error) {
    console.error("Error subscribing to group:", error);
    return null;
  }
  return data;
}

export async function joinGroup(user_id:string,group_id:string) {
  const { data, error } = await supabase
    .from("GroupUser")
    .insert([{ user_id, group_id, status: "pending" }])
    .select();
    console.log(data)
  if (error) {
    console.error("Error joining group:", error);
    return null;
  }
  
  return data;
}



export async function getGroupById(id: string): Promise<GroupUnique | null> {
  const { data, error } = await supabase
    .from('Group')
    .select(`
      *,
      GroupDetail (
        group_id,
        group_title,
        group_desc,
        group_image,
        group_tags
      ),
      GroupSubscription (
        user_id
        ,User(
        user_id
        )
      ),
      GroupUser (
        user_id,
        status,
        User (
          user_id,
        UserShop!UserShop_user_id_fkey (
            user_id,
            shop_title,
            shop_desc,
            contact_info,
            links,
            shop_images,
            shop_tags,
            shop_address

          )
        )
      )
    `)
    .eq('group_id', id)  
    .single();  
  if (error) {
    console.error("Error fetching group:", error);
    return null;
  }

  if (!data) {
    console.warn("No group found for the provided group_id:", id);
    return null; 
  }
console.log(data)

  return data;
}
