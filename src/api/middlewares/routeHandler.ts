import { AnyZodObject } from "zod";
import { CustomNext, CustomRequest, CustomResponse } from "@/types/route";

export const validateRequest = (schema: AnyZodObject) => {
    return async (req: CustomRequest, res: CustomResponse, next: CustomNext) => {
        try {
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params
            });
            next();
        } catch (error) {
            next(error);
        }
    };
};