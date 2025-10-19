import { Client } from "pg";

async function query(queryObject) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  }); // 1️⃣ cria um novo cliente para se conectar ao banco
  await client.connect(); // 2️⃣ abre a conexão (operação assíncrona)

  try {
    const result = await client.query(queryObject); // 3️⃣ executa a query (operação assíncrona)
    return result; // 5️⃣ retorna o resultado
  } catch (error) {
    console.error(error);
  } finally {
    await client.end(); // 4️⃣ fecha a conexão (operação assíncrona)
  }
}

export default {
  query: query,
};
