import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");
    console.log(id);
    const res = await fetch(`https://others.atwship.net/room/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    const data = await res.json();
    console.log(data);
    const response = NextResponse.json(data, {
      status: res.status,
    });
    return response;
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { data: error.message },
      {
        status: 401,
      }
    );
  }
}
