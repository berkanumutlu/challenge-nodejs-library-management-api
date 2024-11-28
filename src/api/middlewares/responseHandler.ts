import { CustomNext, CustomRequest, CustomResponse } from "@/types/request";
import { appConfig } from "@/config";

export const responseHandler = (req: CustomRequest, res: CustomResponse, next: CustomNext) => {
    res.success = function (data: any = null, message: string | null = null, status: number = 200) {
        if (data) {
            return this.status(status).json(data);
        } else {
            return this.status(status).json({ success: true, message });
        }
    };
    res.warning = function (message: string | null = null, status: number = 400) {
        return this.status(status).json({ success: false, warning: message });
    };
    res.error = function (err: any, message: string | null = null, status: number = 500) {
        let response: any = { success: false, message };
        if (appConfig?.env === 'production') {
            let errorMessages: { message: string }[] = [];
            if (err?.errors) {
                err.errors.forEach((error: { message: string }) => errorMessages.push({ message: error.message }));
            } else {
                errorMessages.push({ message: err.message });
            }
            response = { ...response, errors: errorMessages };
        } else {
            response = { ...response, errors: err?.stack };
        }
        return this.status(status).json(response);
    };
    next();
};
