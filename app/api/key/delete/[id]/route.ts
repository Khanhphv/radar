import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { cookies } = req;
    const { value: token } = cookies.get("Authorization") ?? { value: null };
    const res = await fetch(`${process.env.API_URL}/key/delete/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token || "",
      },
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
