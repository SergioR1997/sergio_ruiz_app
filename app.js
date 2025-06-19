import express from 'express';
import mysql from 'mysql2/promise';

const app = express();
const port = 3000;
// Create the connection to database
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'login',
  });
app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  app.get('/login', async(req, res) => { // req = request, peticion; res = respuesta
    const datos = req.query;
    // A simple SELECT query
try {
    const [results, fields] = await connection.query(
      "SELECT * FROM `usuarios` WHERE `usuario` = ? AND `clave` = ?",
      [datos.usuario, datos.clave]
    );
    if(results.length > 0){
        res.status(200).send('Inicio de sesion correcto')
    }else {
        res.status(401).send('Datos incorrectos')
    }

    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  } catch (err) {
    console.log(err);
  }

  })
  app.get('/validar', (req, res) => {
    res.send('Hello World!')
  })

// Ruta de prueba
app.get('/', async (req, res) => {
  try {
    const [rows] = await connection.query('SELECT NOW() AS hora_actual');
    res.json({ mensaje: 'Conexión exitosa', hora: rows[0].hora_actual });
  } catch (error) {
    res.status(500).json({ error: 'Error en la conexión a la base de datos', detalle: error.message });
  }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
  });