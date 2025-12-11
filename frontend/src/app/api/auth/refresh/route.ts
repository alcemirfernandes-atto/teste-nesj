import { AuthEndpoints } from "@/shared/enums/api-endpoints";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;
    if (!refreshToken) {
      return NextResponse.json(
        { error: "Refresh token ausente" },
        { status: 401 }
      );
    }

    const apiRes = await fetch(
      `http://localhost:3000/${AuthEndpoints.REFRESH_TOKEN}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshToken}`,
        },
        body: JSON.stringify({ refreshToken }),
      }
    );

    if (!apiRes.ok) {
      return NextResponse.json(
        { error: "Falha ao renovar token" },
        { status: 401 }
      );
    }

    const data = await apiRes.json();

    const res = NextResponse.json({ ok: true });

    res.cookies.set("accessToken", data.accessToken, {
      httpOnly: true,
      path: "/",
    });

    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
