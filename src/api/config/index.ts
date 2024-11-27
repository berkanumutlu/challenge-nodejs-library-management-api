import dotenv from "dotenv";
import { AppConfigType, DatabaseConfigType } from "@/types/app";

dotenv.config();

export const appConfig: AppConfigType = {
    env: process.env.NODE_ENV as string,
    name: process.env.APP_NAME as string,
    url: process.env.APP_URL as string,
    port: process.env.APP_PORT as string,
    corsOrigin: process.env.APP_CORS_ORIGIN as string,
    loggingFile: process.env.APP_LOGGING_FILE as unknown as boolean
};
export const databaseConfig: DatabaseConfigType = {
    host: process.env.DB_HOST as string,
    database: process.env.DB_DATABASE as string,
    username: process.env.DB_USERNAME as string,
    password: process.env.DB_PASSWORD as string,
    dialect: process.env.DB_CONNECTION as string,
    logging: appConfig.env === 'development' ? console.log : false
};