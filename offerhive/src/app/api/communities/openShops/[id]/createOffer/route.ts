import { NextRequest, NextResponse } from "next/server";
import { createGroupShopOffer } from "@/lib/database/groupShop";
export async function POST(req: NextRequest) {

  const formData = await req.formData();
  const title = formData.get("title");
  const contact = formData.get("contact");
  const description = formData.get("description");
  const price = formData.get("price");
  const openShopId = formData.get("openShopId");
  const image = formData.get("image");

  const offer = {
    title,
    contact,
    description,
    price,
    image,
  };
  const { data, error } = await createGroupShopOffer(
    openShopId as string,
    offer
  );
  if (error || !data) {
    console.log(error)
    return NextResponse.json(
      { error:error?error:"Internal server Error" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { success: true, message: "Offer created successfully!" },
    { status: 200 }
  );
}
