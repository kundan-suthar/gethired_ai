import { checkUser } from "../../../../prisma/checkUser";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await checkUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error in /api/user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
