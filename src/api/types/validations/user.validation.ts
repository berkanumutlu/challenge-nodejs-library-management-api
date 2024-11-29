import { z } from "zod";

export const createUserSchema = z.object({
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