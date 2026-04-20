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

    // 🔥 VALIDACIONES
    if (!nombre || !carrera || !telefono || !correo || !escuela) {
      return res.status(400).json({ error: 'Faltan datos' });
    }

    // validar correo básico
    if (!correo.includes('@')) {
      return res.status(400).json({ error: 'Correo inválido' });
    }

    await pool.query(
      'INSERT INTO aspirantes (nombre, carrera, telefono, correo, escuela) VALUES ($1,$2,$3,$4,$5)',
      [nombre, carrera, telefono, correo, escuela]
    );

    res.status(200).json({ ok: true });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en servidor' });
  }
}