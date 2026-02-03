import type { NextApiRequest } from "next";
import { getSessionCookieName, verifySessionToken } from "./session";

function parseCookieHeader(header: string | undefined) {
  if (!header) return {};
  const pairs = header.split(";").map((p) => p.trim());
  const out: Record<string, string> = {};
  for (const pair of pairs) {
    const eq = pair.indexOf("=");
    if (eq === -1) continue;
    const key = pair.slice(0, eq).trim();
    const value = pair.slice(eq + 1).trim();
    out[key] = value;
  }
  return out;
}

export async function getSessionFromRequest(req: NextApiRequest) {
  const cookies = parseCookieHeader(req.headers.cookie);
  const token = cookies[getSessionCookieName()];
  if (!token) return null;
  return await verifySessionToken(token);
}

