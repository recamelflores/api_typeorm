import "reflect-metadata";
import express from 'express';
import { AppDataSource } from "./data-source";
import { userRouter } from "./users/users.controller";
import { errorHandler } from "./_middleware/error-handler";

AppDataSource.initialize()
    .then(async () => {
        const app = express();

        app.use(express.json());
        app.use('/users', userRouter);
          
        // Error-handling middleware MUST be placed AFTER all other routes
        app.use(errorHandler);

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
    })
    .catch(error => console.log(error));