import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const res = NextResponse.json({ ok: true });

  res.cookies.set("accessToken", body.accessToken, {
    httpOnly: false,
    path: "/",
  });

  res.cookies.set("refreshToken", body.refreshToken, {
    httpOnly: true,
    path: "/",
  });

  return res;
}
