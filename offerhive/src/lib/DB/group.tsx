import { supabase } from "../Db/db";
import { GroupUnique } from "../types";
import { filter } from "motion/react-client";
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
  const filteredData = data?.map(group => ({
    ...group,
    GroupUser: group.GroupUser?.filter((user: any) => user.status !== "pending")
  }));
  
  if (error) {
    console.error("Error fetching groups:", error);
    return null;
  }




  return filteredData ;
}

export async function getCommunityProviders(community_id:string,searchTrem:string,counter:number){
  const rangeStart = counter * 10;
  const rangeEnd = rangeStart + 9;

  const { data, error } = await supabase
    .from('GroupUser')
    .select(`
      *,
      User (
        user_id,
        UserShop!UserShop_user_id_fkey (
          user_id,
          shop_title,
          shop_images,
          shop_address,
          shop_tags
          
        )
      )
    `)
    .eq('group_id', community_id)
    .ilike('User.UserShop.shop_title', `%${searchTrem}%`)
    .range(rangeStart, rangeEnd);
  if (error) {
    console.error("Error fetching community providers:", error);
    return null;
  }


  const filteredData = data?.filter(group => {return group.status !== "pending";});

  return filteredData;
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
  const filteredGroups = (data ?? []).filter(group => {
    return Array.isArray(group.GroupDetail) ? group.GroupDetail.length > 0 : !!group.GroupDetail;
  });

  const filteredData = filteredGroups?.map(group => ({
    ...group,
    GroupUser: group.GroupUser?.filter((user: any) => user.status !== "pending")
  }));
  
  return filteredData;
}


export async function subscribeGroup(user_id:string,group_id:string,isSubscribed:boolean) {

  if(isSubscribed) {

    const { data, error } = await supabase
      .from("GroupSubscription")
      .delete()
      .eq("user_id", user_id)
      .eq("group_id", group_id)
      .select();

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
  const { data: existingGroupUser, error: existingError } = await supabase
    .from("GroupUser")
    .select("*")
    .eq("user_id", user_id)
    .eq("group_id", group_id)
    .single();
  if (existingGroupUser) {
    return existingGroupUser;
  }
  const { data, error } = await supabase
    .from("GroupUser")
    .insert([{ user_id, group_id, status: "pending" }])
    .select();
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
        user_id,
        User (
          user_id
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



  return data;
}

