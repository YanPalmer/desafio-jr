import type { NextApiRequest, NextApiResponse } from "next";
import { register } from "@/server/controllers/authController";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return await register(req, res);
}

