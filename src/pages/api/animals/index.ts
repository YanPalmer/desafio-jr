import type { NextApiRequest, NextApiResponse } from "next";
import { createAnimal, listAnimals } from "@/server/controllers/animalController";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") return await listAnimals(req, res);
  if (req.method === "POST") return await createAnimal(req, res);
  return res.status(405).json({ error: "Método não permitido" });
}

