import { AnyZodObject } from "zod";
import { CustomNext, CustomRequest, CustomResponse } from "@/types/route";

export const validateRequest = (schema: AnyZodObject) => {
    return async (req: CustomRequest, res: CustomResponse, next: CustomNext) => {
        try {
            await schema.parseAsync({
                params: req.params,
                query: req.query,
                body: req.body
            });
            next();
        } catch (error) {
            next(error);
        }
    };
};