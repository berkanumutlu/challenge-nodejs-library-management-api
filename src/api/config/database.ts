import { Dialect, Sequelize } from "sequelize";
import { databaseConfig } from "@/config";

export const db = new Sequelize(databaseConfig.database, databaseConfig.username, databaseConfig.password, {
    host: databaseConfig.host,
    dialect: databaseConfig.dialect as Dialect,
    logging: databaseConfig.logging
});
