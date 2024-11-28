import { Request as ExpressRequest, Response as ExpressResponse, NextFunction as ExpressNextFunction } from "express";

export type CustomRequest = ExpressRequest;
export interface CustomResponse extends ExpressResponse {
    success(data?: any, message?: string | null, status?: number): this;
    warning(message?: string | null, status?: number): this;
    error(err?: any, message?: string | null, status?: number): this;
}
export type CustomNext = ExpressNextFunction;