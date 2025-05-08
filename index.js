import express from 'express'
import mysql from 'mysql2/promise';

const app = express()

const pool = mysql.createPool({
  host: 'mysqlss',
  user: 'root',
  password: '1234',
  database: 'pruebaDocker',
});

app.get('/', async (_req, res) => {
  console.log('listando... chanchitos...')
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM animales');
    connection.release();
    return res.send(rows);
  } catch (error) {
    console.error('Error al obtener los animales:', error);
    return res.status(500).send('Error interno del servidor');
  }
})

app.get('/crear', async (_req, res) => {
  console.log('creando...')
  try {
    const connection = await pool.getConnection();
    await connection.query('INSERT INTO animales (tipo, estado) VALUES (?, ?)', ['Chanchito', 'Feliz']);
    connection.release();
    return res.send('ok');
  } catch (error) {
    console.error('Error al crear el animal:', error);
    return res.status(500).send('Error interno del servidor');
  }
})

app.listen(3000, () => console.log('listening...'))
