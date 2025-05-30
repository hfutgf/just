import z from 'zod';

export const loginSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Foydalanuvchi nomi kamida 3 ta belgidan iborat boʻlishi kerak' })
    .max(20, { message: 'Foydalanuvchi nomi 20 ta belgidan oshmasligi kerak' }),
  password: z
    .string()
    .min(6, { message: 'Parol kamida 6 ta belgidan iborat boʻlishi kerak' })
    .max(30, { message: 'Parol 30 ta belgidan oshmasligi kerak' }),
});
