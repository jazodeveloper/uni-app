import pkg from 'pg';

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default async function handler(req, res) {

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const result = await pool.query('SELECT * FROM escuelas ORDER BY nombre');

    res.status(200).json(result.rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener escuelas' });
  }
}