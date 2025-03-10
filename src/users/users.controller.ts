import express from 'express';
import { userService } from './user.service';
import { createSchema, updateSchema } from './user.schema';
import { validateRequest } from '../_middleware/validate-request';

export const userRouter = express.Router();

// routes
userRouter.get('/', getAll);
userRouter.get('/:id', getById);
userRouter.post('/', validateRequest(createSchema), create); // Pass createSchema to validateRequest
userRouter.put('/:id', validateRequest(updateSchema), update); // Pass updateSchema to validateRequest
userRouter.delete('/:id', _delete);

// route functions
function getAll(req: express.Request, res: express.Response, next: express.NextFunction) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(next);
}

function getById(req: express.Request, res: express.Response, next: express.NextFunction) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return next({ statusCode: 400, message: 'Invalid user ID' });
    }
    userService.getById(id)
        .then(user => res.json(user))
        .catch(next);
}

function create(req: express.Request, res: express.Response, next: express.NextFunction) {
    userService.create(req.body)
        .then(() => res.json({ message: 'User created' }))
        .catch(next);
}

function update(req: express.Request, res: express.Response, next: express.NextFunction) {
    const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return next({ statusCode: 400, message: 'Invalid user ID' }); 
        }
    userService.update(id, req.body)
        .then(() => res.json({ message: 'User updated' }))
        .catch(next);
}

function _delete(req: express.Request, res: express.Response, next: express.NextFunction) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return next({ statusCode: 400, message: 'Invalid user ID' }); 
    }
    userService.delete(id)
        .then(() => res.json({ message: 'User deleted' }))
        .catch(next);
}