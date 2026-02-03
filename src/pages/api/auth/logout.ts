import type { NextApiRequest, NextApiResponse } from "next";
import { logout } from "@/server/controllers/authController";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return await logout(req, res);
}

