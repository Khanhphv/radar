import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { cookies } = req;
    const params = await req.json();
    const { value: token } = cookies.get("Authorization") ?? { value: null };
    const res = await fetch(`${process.env.API_URL}/key/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token || "",
      },
      body: JSON.stringify({
        ...params,
      }),
    });
    const data = await res.json();
    const response = NextResponse.json(data, {
      status: res.status,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json(
      { data: error.message },
      {
        status: 401,
      }
    );
  }
}
