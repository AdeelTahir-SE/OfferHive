import { NextRequest,NextResponse } from "next/server";
import { updateOffer } from "@/lib/Db/offerer";
export async function PUT(request:NextRequest){
const body = await request.json();
const { offer_id, ...offerData } = body;

  const updatedOffer = await updateOffer({
    offer_id,
    ...offerData,
  });

  if (!updatedOffer) {
    return NextResponse.json(
      { error: "Failed to update offer" },
      { status: 500 }
    );
  }

  return NextResponse.json(updatedOffer, { status: 200 });
}