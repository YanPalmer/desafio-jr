import { SignJWT, jwtVerify } from "jose";

const SESSION_COOKIE_NAME = "petcare_session";

type SessionPayload = {
  sub: string; // userId
  email: string;
};

function getJwtSecret() {
  const secret = process.env.AUTH_JWT_SECRET;
  if (!secret) {
    throw new Error("AUTH_JWT_SECRET não definido no ambiente.");
  }
  return new TextEncoder().encode(secret);
}

export async function createSessionToken(payload: SessionPayload) {
  return await new SignJWT({ email: payload.email })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getJwtSecret());
}

export async function verifySessionToken(token: string) {
  const { payload } = await jwtVerify(token, getJwtSecret());
  const userId = payload.sub;
  const email = payload.email;

  if (!userId || typeof userId !== "string") return null;
  if (!email || typeof email !== "string") return null;

  return { userId, email };
}

export function getSessionCookieName() {
  return SESSION_COOKIE_NAME;
}

