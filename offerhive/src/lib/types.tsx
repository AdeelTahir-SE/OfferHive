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