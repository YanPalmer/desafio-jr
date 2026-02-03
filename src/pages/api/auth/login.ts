import type { NextApiRequest, NextApiResponse } from "next";
import { login } from "@/server/controllers/authController";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return await login(req, res);
}

