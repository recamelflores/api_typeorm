import { AppDataSource } from "../data-source";
import { User } from "./user.entity";
import bcrypt from 'bcryptjs';

const userRepository = AppDataSource.getRepository(User);

export const userService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll(): Promise<User[]> {
    return await userRepository.find();
}

async function getById(id: number): Promise<User> {
    return await getUser(id);
}

async function create(params: Partial<User>): Promise<void> {
    // validate
    if (await userRepository.findOne({ where: { email: params.email } })) {
        throw `Email "${params.email}" is already registered`;
    }

    const user = new User();
    Object.assign(user, params);

    // hash password
    user.password = await bcrypt.hash(params.password!, 10);

    // save user
    await userRepository.save(user);
}

async function update(id: number, params: Partial<User>): Promise<void> {
    const user = await getUser(id);

    // validate
    if (params.email && params.email !== user.email && await userRepository.findOne({ where: { email: params.email } })) {
        throw `Email "${params.email}" is already registered`;
    }

    // hash password if it was entered
    if (params.password) {
        params.password = await bcrypt.hash(params.password, 10);
    }

    // copy params to user and save
    Object.assign(user, params);
    await userRepository.save(user);
}

async function _delete(id: number): Promise<void> {
    const user = await getUser(id);
    await userRepository.remove(user);
}

// helper functions

async function getUser(id: number): Promise<User> {
    const user = await userRepository.findOneBy({ id });
    if (!user) throw 'User not found';
    return user;
}