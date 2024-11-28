import { ZodError } from "zod";
import { CustomNext, CustomRequest, CustomResponse } from "@/types/route";
import { appConfig } from "@/config";

export const responseHandler = (req: CustomRequest, res: CustomResponse, next: CustomNext) => {
    res.success = function (data: any = null, message: string | null = null, status: number = 200) {
        if (data) {
            return this.status(status).json(data);
        } else {
            // return this.status(status).json({ success: true, message });
            return this.status(status).json();
        }
    };
    res.warning = function (message: string | null = null, status: number = 400) {
        return this.status(status).json({ success: false, message: message });
    };
    res.error = function (err: any, message: string | null = null, status: number = 500) {
        let response: any = { success: false, message };
        const isDevelopment = appConfig.env === 'development';
        if (err instanceof ZodError) {
            response.message = 'Validation Error';
            response.errors = err.errors.map((zodError: any) => ({
                message: zodError.message,
                ...(isDevelopment && {
                    path: zodError.path,
                    expected: zodError.expected,
                    received: zodError.received
                })
            }));
        } else {
            if (isDevelopment) {
                response.errors = err?.stack || err?.message;
            } else {
                response.errors = err?.message || 'Internal Server Error';
            }
        }
        return this.status(status).json(response);
    };
    next();
};
