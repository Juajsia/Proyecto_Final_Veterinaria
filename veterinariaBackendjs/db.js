import { createConnection } from 'mysql2/promise'

export async function crearConexion () {
  try {
    const connection = await createConnection({
      host: process.env.DB_HOST ?? 'localhost',
      user: process.env.DB_USER ?? 'root',
      port: process.env.DB_PORT ?? 3306,
      password: process.env.DB_PASSWORD ?? '1234',
      database: process.env.DB_NAME ?? 'db_veterinaria'
    })
    return connection
  } catch (error) {
    throw new Error('error connecting')
  }
}

// forma anteror de hacer la cone
// const DEFAULT_CONFIG = {
//   host: 'localhost',
//   user: 'root',
//   port: 3306,
//   password: '1234',
//   database: 'db_veterinaria'
// }
// const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG
// let connection
// try {
//   connection = await mysql.createConnection(connectionString)
// } catch (error) {
//   throw new Error('error connecting')
// }
