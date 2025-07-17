import { deleteOffer } from "@/lib/Db/offerer";
import { NextRequest,NextResponse } from "next/server";
export async function DELETE(request:NextRequest){
const {offer_id, user_id} = await request.json();
    const deletedOffer = await deleteOffer(offer_id, user_id);
    
    if (!deletedOffer) {
        return NextResponse.json(
        { error: "Failed to delete offer" },
        { status: 500 }
        );
    }
    
    return NextResponse.json(deletedOffer, { status: 200 });
}