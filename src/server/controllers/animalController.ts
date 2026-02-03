import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/server/db/prisma";
import {
  animalFiltersSchema,
  createAnimalSchema,
  updateAnimalSchema,
} from "@/schemas/animal.schema";
import { getSessionFromRequest } from "@/server/auth/getSession";

function methodNotAllowed(res: NextApiResponse) {
  return res.status(405).json({ error: "Método não permitido" });
}

function toAnimalResponse(a: {
  id: string;
  name: string;
  age: number;
  type: "DOG" | "CAT";
  breed: string;
  owner_name: string;
  owner_contact: string;
  created_by: string;
  created_at: Date;
  updated_at: Date;
}) {
  return {
    ...a,
    created_at: a.created_at.toISOString(),
    updated_at: a.updated_at.toISOString(),
  };
}

export async function listAnimals(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return methodNotAllowed(res);

  const session = await getSessionFromRequest(req);
  if (!session) return res.status(401).json({ error: "Não autenticado" });

  const parsedFilters = animalFiltersSchema.safeParse({
    search: typeof req.query.search === "string" ? req.query.search : undefined,
    type: typeof req.query.type === "string" ? req.query.type : undefined,
  });

  if (!parsedFilters.success) {
    return res
      .status(400)
      .json({ error: "Filtros inválidos", issues: parsedFilters.error.issues });
  }

  const { search, type } = parsedFilters.data;

  const animals = await prisma.animal.findMany({
    where: {
      // REMOVIDO: created_by: session.userId,
      ...(type ? { type } : {}),
      ...(search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { owner_name: { contains: search, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    orderBy: { created_at: "desc" },
  });

  return res.status(200).json({ data: animals.map(toAnimalResponse) });
}

export async function createAnimal(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return methodNotAllowed(res);

  const session = await getSessionFromRequest(req);
  if (!session) return res.status(401).json({ error: "Não autenticado" });

  const parsed = createAnimalSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Dados inválidos", issues: parsed.error.issues });
  }

  const dto = parsed.data;

  const animal = await prisma.animal.create({
    data: {
      name: dto.name,
      age: dto.age,
      type: dto.type,
      breed: dto.breed,
      owner_name: dto.owner_name,
      owner_contact: dto.owner_contact,
      creator: { connect: { id: session.userId } },
    },
  });

  return res.status(201).json({ data: toAnimalResponse(animal) });
}

export async function getAnimal(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return methodNotAllowed(res);

  const session = await getSessionFromRequest(req);
  if (!session) return res.status(401).json({ error: "Não autenticado" });

  const id = typeof req.query.id === "string" ? req.query.id : null;
  if (!id) return res.status(400).json({ error: "ID inválido" });

  const animal = await prisma.animal.findFirst({
    where: { id, created_by: session.userId },
  });

  if (!animal) return res.status(404).json({ error: "Animal não encontrado" });

  return res.status(200).json({ data: toAnimalResponse(animal) });
}

export async function updateAnimal(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT") return methodNotAllowed(res);

  const session = await getSessionFromRequest(req);
  if (!session) return res.status(401).json({ error: "Não autenticado" });

  const id = typeof req.query.id === "string" ? req.query.id : null;
  if (!id) return res.status(400).json({ error: "ID inválido" });

  const parsed = createAnimalSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Dados inválidos", issues: parsed.error.issues });
  }
  const dto = parsed.data;

  // garante que é do usuário
  const existing = await prisma.animal.findFirst({
    where: { id, created_by: session.userId },
    select: { id: true },
  });

  if (!existing) {
    return res.status(403).json({ error: "Você não tem permissão para editar este animal" });
  }

  const updated = await prisma.animal.update({
    where: { id },
    data: {
      name: dto.name,
      age: dto.age,
      type: dto.type,
      breed: dto.breed,
      owner_name: dto.owner_name,
      owner_contact: dto.owner_contact,
    },
  });

  return res.status(200).json({ data: toAnimalResponse(updated) });
}

export async function patchAnimal(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PATCH") return methodNotAllowed(res);

  const session = await getSessionFromRequest(req);
  if (!session) return res.status(401).json({ error: "Não autenticado" });

  const parsed = updateAnimalSchema.safeParse({ ...req.body, id: req.query.id });
  if (!parsed.success) {
    return res.status(400).json({ error: "Dados inválidos", issues: parsed.error.issues });
  }

  const { id, ...data } = parsed.data;

  const existing = await prisma.animal.findFirst({
    where: { id, created_by: session.userId },
    select: { id: true },
  });

  if (!existing) {
    return res.status(403).json({ error: "Você não tem permissão para editar este animal" });
  }

  const updated = await prisma.animal.update({
    where: { id },
    data,
  });

  return res.status(200).json({ data: toAnimalResponse(updated) });
}

export async function deleteAnimal(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "DELETE") return methodNotAllowed(res);

  const session = await getSessionFromRequest(req);
  if (!session) return res.status(401).json({ error: "Não autenticado" });

  const id = typeof req.query.id === "string" ? req.query.id : null;
  if (!id) return res.status(400).json({ error: "ID inválido" });

  const existing = await prisma.animal.findFirst({
    where: { id, created_by: session.userId },
    select: { id: true },
  });

  if (!existing) {
    return res.status(403).json({ error: "Você não tem permissão para excluir este animal" });
  }

  await prisma.animal.delete({ where: { id } });

  return res.status(204).end();
}

