import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./users/user.entity"; 

export const AppDataSource = new DataSource({
    type: "mysql", 
    host: process.env.HOST || "localhost",
    port: 3306,
    username: process.env.USER || "root",
    password: process.env.PASSWORD || "Rg121003serolf*",
    database: process.env.DATABASE || "node-mysql-crud-api",
    synchronize: true, // Set to false in production!
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
});


