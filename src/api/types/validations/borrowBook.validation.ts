import { z } from "zod";

export const borrowBookSchema = z.object({
    params: z.object({
        userId: z.string()
            .transform((val) => parseInt(val, 10))
            .refine((val) => !isNaN(val) && Number.isInteger(val) && val > 0, {
                message: 'userId must be a positive integer'
            }),
        bookId: z.string()
            .transform((val) => parseInt(val, 10))
            .refine((val) => !isNaN(val) && Number.isInteger(val) && val > 0, {
                message: 'bookId must be a positive integer'
            })
    })
});

export const returnBookSchema = z.object({
    params: z.object({
        userId: z.string()
            .transform((val) => parseInt(val, 10))
            .refine((val) => !isNaN(val) && Number.isInteger(val) && val > 0, {
                message: 'userId must be a positive integer'
            }),
        bookId: z.string()
            .transform((val) => parseInt(val, 10))
            .refine((val) => !isNaN(val) && Number.isInteger(val) && val > 0, {
                message: 'bookId must be a positive integer'
            })
    }),
    body: z.object({
        score: z.number().int().min(0).max(10).optional()
    })
});