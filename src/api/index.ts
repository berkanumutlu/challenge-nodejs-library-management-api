import express from "express";
import cors from "cors";
import { appConfig, databaseConfig } from "@/config";
import { db } from "@/config/database";
import routes from "@/routes";

// Start the Express server
const server = express();
const host = appConfig.url;
const port = appConfig.port;

// Middlewares
if (appConfig?.corsOrigin) {
    server.use(cors({
        origin: appConfig.corsOrigin,
        credentials: true
    }));                                                    // Allows browsers to accept requests from different sources (origin). (Allows us to send requests to the API address.)
}
server.use(express.json());                                 // If there is data in JSON format in the body of the incoming request, it automatically parses this data and places it in the req.body object.

// Route definitions
server.use('/api', routes);

// Start the application
const main = async () => {
    try {
        console.log(`Trying to connect to Database: ${databaseConfig.database}`);
        await db.authenticate();
        console.log('Database connected successfully!');

        server.listen(port, () => {
            console.log(`env:  ${appConfig.env}`);
            console.log(`server: ${host}:${port}, start running`);
        });
    } catch (err) {
        console.error(`Unable to start server or connect to the database: ${err}`);
        await db.close();
        process.exit(1);
    }
};
main();