import { NextRequest, NextResponse } from "next/server";
import { getGroupById } from "@/lib/DB/group";

export async function GET(
  req: NextRequest,
) {
  const  pathArray=req.nextUrl.pathname.split("/");
 const  id  =pathArray[pathArray?.length-1] ;

  if (!id) {
    return NextResponse.json({ error: "Group ID is required" }, { status: 400 });
  }

  try {
    const group = await getGroupById(id);

    if (!group) {
      return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }

    return NextResponse.json(group, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch group" },
      { status: 500 }
    );
  }
}
