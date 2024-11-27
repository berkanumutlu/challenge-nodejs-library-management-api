export type AppConfigType = {
    env: string;
    name: string;
    url: string;
    port: string;
    corsOrigin?: string;
    loggingFile?: boolean;
};
export type DatabaseConfigType = {
    host: string;
    database: string;
    username: string;
    password: string;
    dialect: string;
    logging: any;
};