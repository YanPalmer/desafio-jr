import { z } from 'zod';

// Animal type enum
export const animalTypeSchema = z.enum(['DOG', 'CAT'], {
  required_error: 'Tipo de animal é obrigatório',
  invalid_type_error: 'Tipo de animal inválido',
});

// Create animal validation schema
export const createAnimalSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Nome é obrigatório')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  age: z
    .number({
      required_error: 'Idade é obrigatória',
      invalid_type_error: 'Idade deve ser um número',
    })
    .int('Idade deve ser um número inteiro')
    .min(0, 'Idade não pode ser negativa')
    .max(50, 'Idade inválida'),
  type: animalTypeSchema,
  breed: z
    .string()
    .trim()
    .min(1, 'Raça é obrigatória')
    .max(100, 'Raça deve ter no máximo 100 caracteres'),
  owner_name: z
    .string()
    .trim()
    .min(1, 'Nome do dono é obrigatório')
    .max(150, 'Nome do dono deve ter no máximo 150 caracteres'),
  owner_contact: z
    .string()
    .trim()
    .min(1, 'Contato do dono é obrigatório')
    .max(50, 'Contato deve ter no máximo 50 caracteres'),
});

// Update animal validation schema (all fields optional except id)
export const updateAnimalSchema = z.object({
  id: z.string().uuid('ID inválido'),
  name: z
    .string()
    .trim()
    .min(1, 'Nome é obrigatório')
    .max(100, 'Nome deve ter no máximo 100 caracteres')
    .optional(),
  age: z
    .number()
    .int('Idade deve ser um número inteiro')
    .min(0, 'Idade não pode ser negativa')
    .max(50, 'Idade inválida')
    .optional(),
  type: animalTypeSchema.optional(),
  breed: z
    .string()
    .trim()
    .min(1, 'Raça é obrigatória')
    .max(100, 'Raça deve ter no máximo 100 caracteres')
    .optional(),
  owner_name: z
    .string()
    .trim()
    .min(1, 'Nome do dono é obrigatório')
    .max(150, 'Nome do dono deve ter no máximo 150 caracteres')
    .optional(),
  owner_contact: z
    .string()
    .trim()
    .min(1, 'Contato do dono é obrigatório')
    .max(50, 'Contato deve ter no máximo 50 caracteres')
    .optional(),
});

// Search/filter schema
export const animalFiltersSchema = z.object({
  search: z.string().optional(),
  type: animalTypeSchema.optional(),
});

// Type exports
export type CreateAnimalInput = z.infer<typeof createAnimalSchema>;
export type UpdateAnimalInput = z.infer<typeof updateAnimalSchema>;
export type AnimalFiltersInput = z.infer<typeof animalFiltersSchema>;
