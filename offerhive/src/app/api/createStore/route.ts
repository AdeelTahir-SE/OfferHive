import { NextResponse, NextRequest } from "next/server";
import { createShop } from "@/lib/database/offerer";
import { object } from "motion/react-client";
export async function POST(request: NextRequest) {

  const formData = await request.formData();
  const shop_owner_id = formData.get("shop_owner_id");
  const shop_title = formData.get("shop_title");
  const shop_desc = formData.get("shop_desc");
  const shop_address = formData.get("shop_address");
  const shop_contact_info = formData.get("shop_contact_info");
  const shop_images = formData.getAll("shop_images");
  const shop_tags = formData.getAll("shop_tags");
  const shop_links = formData.getAll("shop_links");


  const shop = {
    user_id: shop_owner_id,
    shop_desc: shop_desc,
    shop_title: shop_title,
    contact_info: shop_contact_info,
    links: shop_links,
    shop_tags: shop_tags,
    shop_address: shop_address,
  };
  const { data, error,code } = await createShop(
    shop_owner_id as string,
    shop,
    shop_images as File[]
  );
  if (error||!data) {
    if(code=="23505"){
      return NextResponse.json(
        { error: "Shop already exists" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: `Error in creating shop:${error}` },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { success: true, message: "Shop created successfully!" },
    { status: 200 }
  );
}
