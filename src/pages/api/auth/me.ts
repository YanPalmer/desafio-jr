import type { NextApiRequest, NextApiResponse } from "next";
import { me } from "@/server/controllers/authController";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return await me(req, res);
}

