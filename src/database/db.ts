import { fa } from "@faker-js/faker/.";

const Sequelize = require('sequelize');

const DB_NAME = 'BD_Ventas';
const DB_USER = 'root';
const DB_PASS = 'Salmo21.';

export const database = new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASS,
    {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306,
        logging: false, // Desactiva el logging de Sequelize en consola
    }
);

async function generateDb() {
    try {
        await database.authenticate();
        console.log('Conexión exitosa a la base de datos');

        // Sincronización de la base de datos. Usa { alter: true } en producción para no perder datos
        await database.sync({ force: false });
        console.log('Base de datos y tablas creadas');
    } catch (error) {
        console.error('Error conectando a la base de datos:', error);
    }
}

generateDb();
