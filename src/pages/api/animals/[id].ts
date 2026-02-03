import type { NextApiRequest, NextApiResponse } from "next";
import {
  deleteAnimal,
  getAnimal,
  patchAnimal,
  updateAnimal,
} from "@/server/controllers/animalController";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") return await getAnimal(req, res);
  if (req.method === "PUT") return await updateAnimal(req, res);
  if (req.method === "PATCH") return await patchAnimal(req, res);
  if (req.method === "DELETE") return await deleteAnimal(req, res);
  return res.status(405).json({ error: "Método não permitido" });
}

