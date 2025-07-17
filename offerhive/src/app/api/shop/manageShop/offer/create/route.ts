import { NextRequest,NextResponse } from "next/server";
import { createOffer } from "@/lib/Db/offerer";
export async function POST(request:NextRequest){

    const {id} = await request.json();
    console.log("Creating offer for user ID:", id);
     const newOffer = {
          user_id: id,
          offer_title: "New Offer",
          offer_desc: "Description",
          image: "",
          starts_at: new Date().toISOString(),
          valid_uptill: new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000
          ).toISOString(),
        };
   const offerCreated= await createOffer(newOffer);
    
    if (!offerCreated) {
        return NextResponse.json(
        { error: "Failed to create offer" },
        { status: 500 }
        );
    }
    
    return NextResponse.json(offerCreated, { status: 201 });
}