import { supabase } from "./db";
import { Group } from "../types";
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
          UserShop (
            user_id,
            shop_title
          )
        )
      )
    `)
    .range(rangeStart, rangeEnd);

  if (error) {
    console.error("Error fetching groups:", error);
    return null;
  }


  const filteredGroups = data?.filter((group) =>
    group.GroupUser?.some((user: any) => user.status?.toLowerCase() === 'joined')
  ) || [];


  return filteredGroups;
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
          UserShop (
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
    group.GroupUser?.some((user: any) => user.status?.toLowerCase() === 'joined')
  ) || [];

  return filteredGroups;
}



export async function getGroupById(id: string, user_id: string): Promise<any | null> {
  const { data, error } = await supabase
    .from('Group')
    .select(`
      *,
      GroupDetail (
        group_id,
        group_title,
        group_desc
      ),
      User (
        user_id,
        UserShop (
          user_id,
          shop_title,
          shop_desc,
          shop_images,
          shop_tags,
          shop_address
        )
      ),
      GroupSubscription (
        user_id
      ),
      GroupUser (
        user_id,
        status
      )
    `)
    .eq('group_id', id)
    .single();

  if (error) {
    console.error("Error fetching group:", error);
    return null;
  }

  const subscribedUserIds = data.GroupSubscription.map((sub:any) => sub.user_id);

  const joinedUserIds = data.GroupUser
    .filter((groupUser:any) => groupUser.status === 'joined')
    .map((groupUser:any) => groupUser.user_id);

  const subscribedUsers = data.User.filter((user:any) =>
    subscribedUserIds.includes(user.user_id)
  );

 const joinedUsers = data.User.filter((user:any) =>
    joinedUserIds.includes(user.user_id)
  );

  return {
    ...data,
    subscribedUsers,
    joinedUsers,
  };
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

