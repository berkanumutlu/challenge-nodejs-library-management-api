import express from "express";
import cors from "cors";
import { appConfig, databaseConfig } from "@/config";
import { db } from "@/config/database";
import { initializeAssociations } from '@/models';
import { responseHandler } from "@/middlewares/responseHandler";
import { errorHandler } from "@/middlewares/errorHandler";
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
server.use(responseHandler as express.RequestHandler);

// Route definitions
server.use('', routes);

// Start the application
const main = async () => {
    try {
        console.log(`Trying to connect to Database: ${databaseConfig.database}`);

        // Initialize model associations
        initializeAssociations();

        if (appConfig.env !== 'production') {
            await db.sync({ alter: true });
            console.log('Database models synchronized.');
        } else {
            await db.authenticate();
            console.log('Database connected successfully!');
        }

        server.listen(port, () => {
            console.log(`env    : ${appConfig.env}`);
            console.log(`server : ${host}:${port}, start running`);
        });
    } catch (err) {
        console.error(`Unable to start server or connect to the database: ${err}`);
        await db.close();
        process.exit(1);
    }
};
main();

// ErrorHandler
server.use(errorHandler as express.ErrorRequestHandler);