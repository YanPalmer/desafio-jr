import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { prisma } from "@/server/db/prisma";
import { loginSchema, registerSchema } from "@/schemas/auth.schema";
import { clearSessionCookie, setSessionCookie } from "@/server/auth/cookies";
import { createSessionToken } from "@/server/auth/session";
import { getSessionFromRequest } from "@/server/auth/getSession";

function methodNotAllowed(res: NextApiResponse) {
  return res.status(405).json({ error: "Método não permitido" });
}

export async function register(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return methodNotAllowed(res);

  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Dados inválidos", issues: parsed.error.issues });
  }

  const { full_name, email, password } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return res.status(409).json({ error: "Este e-mail já está cadastrado" });
  }

  const password_hash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { full_name, email, password_hash },
    select: { id: true, email: true, full_name: true },
  });

  const token = await createSessionToken({ sub: user.id, email: user.email });
  setSessionCookie(res, token);

  return res.status(201).json({ user });
}

export async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return methodNotAllowed(res);

  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Dados inválidos", issues: parsed.error.issues });
  }

  const { email, password } = parsed.data;

  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, email: true, full_name: true, password_hash: true },
  });

  if (!user) {
    return res.status(401).json({ error: "E-mail ou senha incorretos" });
  }

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) {
    return res.status(401).json({ error: "E-mail ou senha incorretos" });
  }

  const token = await createSessionToken({ sub: user.id, email: user.email });
  setSessionCookie(res, token);

  return res.status(200).json({
    user: { id: user.id, email: user.email, full_name: user.full_name },
  });
}

export async function logout(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return methodNotAllowed(res);
  clearSessionCookie(res);
  return res.status(204).end();
}

export async function me(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return methodNotAllowed(res);

  const session = await getSessionFromRequest(req);
  if (!session) {
    return res.status(401).json({ user: null });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true, email: true, full_name: true },
  });

  if (!user) {
    clearSessionCookie(res);
    return res.status(401).json({ user: null });
  }

  return res.status(200).json({ user });
}

