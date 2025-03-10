//_middleware/error-handler.ts
import express from 'express';

export function errorHandler(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
    console.error(err); // Log the error for debugging purposes

    // Default error message and status code
    let statusCode = 500;
    let message = 'An unexpected error occurred.';

    // Check if the error has a specific status code and message
    if (err.statusCode) {
        statusCode = err.statusCode;
    }
    if (err.message) {
        message = err.message;
    }

    res.status(statusCode).json({ error: message });
}