export interface Offer {
  starts_at: string;
  valid_uptill: string;
  image: string;
  offer_desc: string;
  offer_title: string;
}

export interface Shop {
  shop_desc: string;
  shop_title: string;
  contact_info: string;
  links: string[];
  shop_images: string[];
  shop_tags: string[];
  shop_address: string;
  offers: Offer[];
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
