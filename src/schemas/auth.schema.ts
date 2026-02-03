import { z } from 'zod';

// Login validation schema
export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'E-mail é obrigatório')
    .email('E-mail inválido')
    .max(255, 'E-mail deve ter no máximo 255 caracteres'),
  password: z
    .string()
    .min(1, 'Senha é obrigatória')
    .min(6, 'Senha deve ter no mínimo 6 caracteres')
    .max(128, 'Senha deve ter no máximo 128 caracteres'),
});

// Register validation schema
export const registerSchema = z
  .object({
    full_name: z
      .string()
      .trim()
      .min(1, 'Nome completo é obrigatório')
      .max(150, 'Nome deve ter no máximo 150 caracteres'),
    email: z
      .string()
      .trim()
      .min(1, 'E-mail é obrigatório')
      .email('E-mail inválido')
      .max(255, 'E-mail deve ter no máximo 255 caracteres'),
    password: z
      .string()
      .min(1, 'Senha é obrigatória')
      .min(6, 'Senha deve ter no mínimo 6 caracteres')
      .max(128, 'Senha deve ter no máximo 128 caracteres'),
    confirmPassword: z
      .string()
      .min(1, 'Confirmação de senha é obrigatória'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

// Type exports
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
