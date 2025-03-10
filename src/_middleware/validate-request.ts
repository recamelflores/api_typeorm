import express from 'express';
import Joi, { ObjectSchema } from 'joi';

export function validateRequest(schema: ObjectSchema) {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const { error } = schema.validate(req.body);
        if (error) {
            next({statusCode: 400, message: error.details.map(x => x.message).join(', ')});
        } else {
            next();
        }
    };
}