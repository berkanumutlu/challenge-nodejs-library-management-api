import { z } from "zod";

export const createBookSchema = z.object({
    body: z.object({
        name: z.string()
            .min(2, {
                message: 'Name must be at least 2 characters long'
            })
            .max(100, {
                message: 'Name cannot exceed 100 characters'
            })
    })
});

export const getBookSchema = z.object({
    params: z.object({
        id: z.string()
            .transform((val) => parseInt(val, 10))
            .refine((val) => !isNaN(val) && Number.isInteger(val) && val > 0, {
                message: 'id must be a positive integer'
            })
    })
});