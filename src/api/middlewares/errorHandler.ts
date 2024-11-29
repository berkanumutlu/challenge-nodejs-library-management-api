import { CustomRequest, CustomResponse, CustomNext } from "@/types/route";
import { createNewLog } from "@/utils/logger";

export const errorHandler = (err: any, req: CustomRequest, res: CustomResponse, next: CustomNext) => {
    createNewLog(err, req, res, next);
    return res.error(err);
};
