import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config(); // Certifique-se de carregar as variáveis de ambiente

const { Client } = pg; // Pegue a classe Client do pg

const client = new Client({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Tentativa de conectar ao banco
client.connect()
  .then(() => {
    console.log('Conectado ao banco de dados PostgreSQL');
  })
  .catch(err => {
    console.error('Erro de conexão ao banco de dados', err.stack);
  });

export { client }; // Exporte o client, se necessário
