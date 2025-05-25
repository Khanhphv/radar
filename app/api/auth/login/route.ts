import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const params = await req.json();
    const res = await fetch(`${process.env.API_URL}/admin/auth/login`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...params,
      }),
    });
    const data = await res.json();
    console.log("process.env.HOST", process.env.HOST);
    const config = {
      maxAge: 60 * 30,
      path: "/",
      domain: process.env.HOST,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };

    const response = NextResponse.json(null, {
      status: res.status,
      headers: {
        Authorization: data.encode_jwt,
      },
    });
    response.cookies.set("Authorization", data.encode_jwt, config);
    return response;
  } catch (error: any) {
    return NextResponse.json(null, {
      status: 401,
    });
  }
}
