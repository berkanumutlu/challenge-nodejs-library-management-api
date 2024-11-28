import { CustomRequest, CustomResponse, CustomNext } from "@/types/request";
import { appConfig } from "@/config";
import { createNewLog } from "@/utils/logger";

export const errorHandler = (err: any, req: CustomRequest, res: CustomResponse, next: CustomNext) => {
    createNewLog(err, req, res, next);
    res.error(
        err,
        appConfig.env === "development" ? err.message : "Internal Server Error.",
        err?.status || 500
    );
};
