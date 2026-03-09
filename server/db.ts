import { Pool } from 'pg';

// Configuración de la conexión a PostgreSQL
// Descomenta y completa con tus credenciales cuando estés listo
/*
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'smartflow_db',
  password: process.env.DB_PASSWORD || 'password',
  port: parseInt(process.env.DB_PORT || '5432'),
});

export const query = (text: string, params?: any[]) => pool.query(text, params);
*/

// Mock de consulta para desarrollo inicial
export const query = async (text: string, params?: any[]) => {
  console.log('Ejecutando consulta (MOCK):', text, params);
  return { rows: [] };
};

export default { query };
