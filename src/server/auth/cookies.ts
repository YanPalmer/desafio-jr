import type { NextApiResponse } from "next";
import { getSessionCookieName } from "./session";

type CookieOptions = {
  maxAgeSeconds?: number;
};

function buildCookie(value: string, opts?: CookieOptions) {
  const parts: string[] = [];
  parts.push(`${getSessionCookieName()}=${value}`);
  parts.push("Path=/");
  parts.push("HttpOnly");
  parts.push("SameSite=Lax");

  if (process.env.NODE_ENV === "production") {
    parts.push("Secure");
  }

  if (typeof opts?.maxAgeSeconds === "number") {
    parts.push(`Max-Age=${opts.maxAgeSeconds}`);
  }

  return parts.join("; ");
}

export function setSessionCookie(res: NextApiResponse, token: string) {
  res.setHeader(
    "Set-Cookie",
    buildCookie(token, { maxAgeSeconds: 60 * 60 * 24 * 7 }),
  );
}

export function clearSessionCookie(res: NextApiResponse) {
  res.setHeader("Set-Cookie", buildCookie("", { maxAgeSeconds: 0 }));
}

