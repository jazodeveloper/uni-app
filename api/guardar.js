import pkg from 'pg';

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { nombre, carrera, telefono, correo, escuela } = req.body;

    const query = `
      INSERT INTO aspirantes (nombre, carrera, telefono, correo, escuela)
      VALUES ($1, $2, $3, $4, $5)
    `;

    await pool.query(query, [nombre, carrera, telefono, correo, escuela]);

    res.status(200).json({ message: 'Guardado correctamente' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en servidor' });
  }
}