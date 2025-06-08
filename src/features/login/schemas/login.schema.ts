import z from 'zod';

const loginForm = z.object({
  otp: z
    .string()
    .min(6, { message: "Kod 6 ta raqamdan iborat bo'lishi kerak" })
    .max(6)
    .regex(/^\d+$/, { message: 'Faqat raqamlar qabul qilinadi' }),
});

export default loginForm;
