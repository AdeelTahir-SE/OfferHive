import { getSupabaseUser } from "@/lib/database/user";
import { NextRequest,NextResponse } from "next/server";
export async function GET(request: NextRequest){
const {data,error}=await getSupabaseUser();
if(error){
  return NextResponse.json({error:error.message},{status:500});
}
return NextResponse.json({user:data?.user},{status:200});
}