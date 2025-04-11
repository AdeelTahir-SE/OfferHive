export interface Offer {
  user_id: string;
  starts_at: string;
  valid_uptill: string;
  image: string;
  offer_desc: string;
  offer_title: string;
  offer_id: string;


  
}

export interface Shop {
  user_id:string
  shop_desc: string;
  shop_title: string;
  contact_info: string;
  links: string[];
  shop_images: string[];
  shop_tags: string[];
  shop_address: string;
  offers:Offer[]
}
export interface UserShop {
  user_id: string;
  shop_title: string;
}

export interface User {
  user_id: string;
  UserShop?: UserShop;
}

export interface GroupUser {
  user_id: string;
  group_id: string;
  status: string;
  User?: User;
}

export interface GroupDetail {
  group_id: string;
  group_title: string;
  group_desc: string;
  group_image: string;
  group_tags: string[];
}

export interface Group {
  group_id: string;
  user_id: string;
  created_at: string;
  GroupDetail?: GroupDetail[];
  GroupUser?: GroupUser[];
}




//for group with id
export interface GroupDetailUnique {
  group_id: string;
  group_title: string;
  group_desc: string;
  group_image : string;
  group_tags: string[];
}

export interface GroupSubscriptionUnique {
  user_id: string;
}

export interface GroupUserUnique {
  user_id: string;
  status: 'joined' | 'subscribed'; // Assuming status can be 'joined' or 'subscribed'
  User: UserUnique; // Assuming you have a User type defined elsewhere
}

export interface UserUnique {
  user_id: string;
  UserShop: UserShopUnique;

}
export interface UserShopUnique {
  user_id:string,
  shop_title:string,
  contact_info:string,
  links:string[],
  shop_images:string[],
  shop_tags:string[],
  shop_address:string,
}

export interface GroupUnique {
  group_id: string;
  created_at: string;
  user_id: string;
  GroupDetail: GroupDetailUnique[];
  GroupSubscription: GroupSubscriptionUnique[];
  GroupUser: GroupUserUnique[];
}


export interface Click{
date:string,
clicks:number
}

export interface Message  {
  message: string;
  profile_image: string;
  email: string;
  user_id:string
  
};

export interface simpleUser{
  user_id:string;
  email: string;
  profile_image: string
  is_shop_owner:boolean
  joined_groups: string[],
  subscribed_groups: string[],
}
// In @/lib/types.ts
export interface ClickData {
  date: string;
  clicks: number;
}

export type GraphProps = ClickData[];

