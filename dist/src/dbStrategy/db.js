import { Client } from 'pg';
import dotenv from 'dotenv';
dotenv.config();
var client = new Client({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
client.connect()
    .then(function () {
    console.log('Conectado ao banco de dados PostgreSQL');
})["catch"](function (err) {
    console.error('Erro de conexão ao banco de dados', err.stack);
});
export { client };
