const express = require('express');
const session = require('express-session');
const app = express();
const mysql = require('mysql');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const cors = require('cors');
const path = require('path');
const os = require('os');

const bcrypt = require('bcrypt');
const saltRounds = 10;
const router = express.Router();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');


app.use(cors({
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

app.use(cookieParser());

app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
  key: "userId",
  secret: "subscribe",
  resave: false,
  saveUninitialized: false,
  cookie: {
      expires: 60 * 60 * 24,
  },
}));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'planeacion'
});

db.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos MySQL');
});

app.get('/salas', (req, res) => {
  const query = 'SELECT * FROM sala';

  db.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.json(results);
    }
  });
});

app.get('/carreras', (req, res) => {
  const query = 'SELECT * FROM carrera';

  db.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.json(results);
    }
  });
});

// En tu archivo de servidor
app.get('/niveles', (req, res) => {
  const query = 'SELECT * FROM nivel';

  db.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.json(results);
    }
  });
});

app.get('/profesores', (req, res) => {
  const query = 'SELECT * FROM profesor';

  db.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.json(results);
    }
  });
});

app.get('/asignaturas', (req, res) => {
  const query = 'SELECT * FROM asignatura';

  db.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.json(results);
    }
  });
});

app.get('/facultades', (req, res) => {
  const query = 'SELECT * FROM facultad';

  db.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.json(results);
    }
  });
});

app.get('/alumnos', (req, res) => {
  const query = 'SELECT * FROM alumno';

  db.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.json(results);
    }
  });
});

app.get('/horarios', (req, res) => {
  const query = 'SELECT * FROM horarios';

  db.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.json(results);
    }
  });
} );


// Agrega una nueva ruta para obtener eventos
app.get('/eventos', (req, res) => {
  const query = `
  SELECT eventos.id_evento, eventos.id_asignatura, asignatura.nombre AS nombre_asignatura, horarios.start, horarios.end,horarios.id_horario, eventos.id_sala, eventos.cupos, eventos.seccion, eventos.fecha,asignatura.id_nivel,profesor_asignatura.id_profesor,profesor.nombre AS nombre_profesor,alumno_asignatura.id_alumno,alumno.nombre AS nombre_alumno,eventos.cancelado
  FROM eventos
  JOIN horarios ON eventos.id_horario = horarios.id_horario
  JOIN asignatura ON eventos.id_asignatura = asignatura.id_asignatura
  JOIN profesor_asignatura ON asignatura.id_asignatura = profesor_asignatura.id_asignatura
  JOIN profesor ON profesor_asignatura.id_profesor = profesor.id_profesor
  JOIN alumno_asignatura ON asignatura.id_asignatura = alumno_asignatura.id_asignatura
  JOIN alumno ON alumno_asignatura.id_alumno = alumno.id_alumno;
    `;

  db.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      console.log('Resultados de la consulta:', results); // Agrega esta línea para imprimir los resultados en la consola del servidor
      res.json(results);
    }
  });
});

// Agrega una nueva ruta para obtener eventos
app.get('/eventosPREVIO', (req, res) => {
  const query = `
  SELECT eventos.id_evento, eventos.id_asignatura, asignatura.nombre AS nombre_asignatura, horarios.start, horarios.end,solicitudes.id_horario, eventos.id_sala, eventos.cupos, eventos.seccion, solicitudes.fecha,asignatura.id_nivel,profesor_asignatura.id_profesor,profesor.nombre AS nombre_profesor,alumno_asignatura.id_alumno,alumno.nombre AS nombre_alumno,eventos.cancelado
  FROM solicitudes
  JOIN eventos ON solicitudes.id_evento = eventos.id_evento
  JOIN horarios ON eventos.id_horario = horarios.id_horario
  JOIN asignatura ON eventos.id_asignatura = asignatura.id_asignatura
  JOIN profesor_asignatura ON asignatura.id_asignatura = profesor_asignatura.id_asignatura
  JOIN profesor ON profesor_asignatura.id_profesor = profesor.id_profesor
  JOIN alumno_asignatura ON asignatura.id_asignatura = alumno_asignatura.id_asignatura
  JOIN alumno ON alumno_asignatura.id_alumno = alumno.id_alumno;
    `;

  db.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      console.log('Resultados de la consulta:', results); // Agrega esta línea para imprimir los resultados en la consola del servidor
      res.json(results);
    }
  });
});


// Agrega una nueva ruta para obtener eventos
app.get('/obtenerDisputaData', (req, res) => {
  const idSolicitud = req.query.idSolicitud; // Obtiene el parámetro idSolicitud de la URL

  if (!idSolicitud) {
    return res.status(400).json({ error: 'El parámetro idSolicitud es necesario' });
  }

  const query = 'SELECT * FROM disputas WHERE id_solicitud = ?';

  db.query(query, [idSolicitud], (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      console.log('Resultados de la consulta:', results);
      res.json(results);
    }
  });
});


app.post('/disputa', (req, res) => {
  const { id_solicitud, descripcion, tipo_usuario } = req.body;

  // Asumiendo que tienes una tabla 'disputa' en tu base de datos
  const insertQuery = 'INSERT INTO disputa (id_solicitud, descripcion, tipo_usuario) VALUES (?, ?, ?)';
  const updateQuery = 'UPDATE solicitudes SET estado = ? WHERE id_solicitud = ?';

  db.beginTransaction((err) => {
    if (err) {
      console.error('Error al iniciar la transacción:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }

    // Insertar la disputa
    db.query(insertQuery, [id_solicitud, descripcion, tipo_usuario], (insertErr, insertResult) => {
      if (insertErr) {
        console.error('Error al insertar disputa en la base de datos:', insertErr);
        db.rollback(() => {
          res.status(500).json({ error: 'Error interno del servidor' });
        });
        return;
      }

      console.log('Disputa insertada correctamente');

      // Actualizar el estado de la solicitud a "Resuelto por ADMIN"
      db.query(updateQuery, ['Comentario de ADMIN', id_solicitud], (updateErr, updateResult) => {
        if (updateErr) {
          console.error('Error al actualizar el estado de la solicitud:', updateErr);
          db.rollback(() => {
            res.status(500).json({ error: 'Error interno del servidor' });
          });
          return;
        }

        console.log('Estado de la solicitud actualizado correctamente');

        // Confirmar la transacción
        db.commit((commitErr) => {
          if (commitErr) {
            console.error('Error al confirmar la transacción:', commitErr);
            db.rollback(() => {
              res.status(500).json({ error: 'Error interno del servidor' });
            });
            return;
          }

          res.status(200).json({ success: true });
        });
      });
    });
  });
});

app.post('/solicitudes', (req, res) => {
  const eventData = req.body;

  // Aquí deberías tener la lógica para guardar los datos en la base de datos
  // Puedes usar la información en `eventData` para realizar la inserción en tu tabla eventos_solicitud

  // Ejemplo con MySQL
  const query = `
    INSERT INTO solicitudes(id_evento, id_horario,id_profesor,tipo_solicitud,fecha,estado)
    VALUES (?, ?, ?,?,?,?);
  `;

  const values = [
    eventData.id_evento,
    eventData.id_horario,
    eventData.id_profesor,
    eventData.tipo_solicitud,
    eventData.fecha,
    eventData.estado
  ];

  db.query(query, values, (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      console.log('Evento guardado en la tabla eventos_solicitud');
      res.json({ message: 'Evento guardado en la tabla eventos_solicitud' });
    }
  });
});
/*
app.put('/solicitudesAceptar/:id', (req, res) => {
  const idSolicitud = req.params.id;
  const { idHorario, fecha } = req.body;

  const updateQuery = 'UPDATE solicitudes SET id_horario = ?, fecha = ? WHERE id_solicitud = ?';

  db.query(updateQuery, [idHorario, fecha, idSolicitud], (updateErr, updateResult) => {
    if (updateErr) {
      console.error('Error al actualizar la solicitud:', updateErr);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }

    console.log('Solicitud actualizada correctamente');
    res.status(200).json({ success: true });
  });
});
*/

app.put('/solicitudesAceptar/:id', (req, res) => {
  const idSolicitud = req.params.id;
  const { idHorario, fecha } = req.body;

  // Realiza la consulta para obtener el id_evento de la solicitud
  const obtenerIdEventoQuery = 'SELECT id_evento FROM solicitudes WHERE id_solicitud = ?';

  db.query(obtenerIdEventoQuery, [idSolicitud], (selectErr, selectResult) => {
    if (selectErr) {
      console.error('Error al obtener id_evento de la solicitud:', selectErr);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }

    const idEvento = selectResult[0].id_evento;

    // Realiza la actualización en la tabla de solicitudes
    const updateSolicitudesQuery = 'UPDATE solicitudes SET id_horario = ?, fecha = ? ,estado = "Cambio Aceptado" WHERE id_solicitud = ?';

    db.query(updateSolicitudesQuery, [idHorario, fecha, idSolicitud], (updateSolicitudesErr, updateSolicitudesResult) => {
      if (updateSolicitudesErr) {
        console.error('Error al actualizar la solicitud:', updateSolicitudesErr);
        res.status(500).json({ error: 'Error interno del servidor' });
        return;
      }

      // Realiza la actualización en la tabla de eventos
      const updateEventosQuery = 'UPDATE eventos SET id_horario = ?, fecha = ? WHERE id_evento = ?';

      db.query(updateEventosQuery, [idHorario, fecha, idEvento], (updateEventosErr, updateEventosResult) => {
        if (updateEventosErr) {
          console.error('Error al actualizar el evento:', updateEventosErr);
          res.status(500).json({ error: 'Error interno del servidor' });
          return;
        }

        console.log('Solicitud y evento actualizados correctamente');
        res.status(200).json({ success: true });
      });
    });
  });
});

// Actualiza la ruta para cancelar eventos
app.put('/cancelarEvento/:id_evento', (req, res) => {
  const id_evento = req.params.id_evento;
  db.query('UPDATE eventos SET cancelado = ? WHERE id_evento = ?', ['red', id_evento], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ success: false, message: 'Error al cancelar el evento' });
    } else {
      res.status(200).json({ success: true, message: 'Evento cancelado exitosamente' });
    }
  });
});

app.post('/actualizarEstadoSolicitud', (req, res) => {
  const { idSolicitud } = req.body;

  db.query('UPDATE solicitudes SET estado = "Respuesta profesor" WHERE id_solicitud = ?', [ idSolicitud], (err, result) => {
    if (err) {
      console.error('Error al actualizar el estado en la tabla de solicitudes:', err);
      res.status(500).json({ success: false, message: 'Error al actualizar el estado de la solicitud' });
    } else {
      res.status(200).json({ success: true, message: 'Estado de la solicitud actualizado con éxito' });
    }
  });
});






app.post('/enviarRespuesta', (req, res) => {
  const { idSolicitud, respuesta } = req.body;

  db.query('INSERT INTO disputa (id_solicitud, descripcion) VALUES (?, ?)', [idSolicitud, respuesta], (err, result) => {
    if (err) {
      console.error('Error al agregar la respuesta en la tabla de disputas:', err);
      res.status(500).json({ success: false, message: 'Error al enviar respuesta' });
    } else {
      res.status(200).json({ success: true, message: 'Respuesta enviada con éxito' });
    }
  });
});



// Actualiza la ruta para obtener detalles de la solicitud
app.get('/obtenerDetallesSolicitud/:id_solicitud', (req, res) => {
  const id_solicitud = req.params.id_solicitud;
  db.query('SELECT * FROM disputa WHERE id_solicitud = ?', [id_solicitud], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ success: false, message: 'Error al obtener detalles de la solicitud' });
    } else {
      if (result.length === 1) {
        // Se encontró una solicitud con el ID proporcionado
        const detallesSolicitud = result[0];
        res.status(200).json({ success: true, detallesSolicitud });
      } else {
        // No se encontró una solicitud con el ID proporcionado
        res.status(404).json({ success: false, message: 'Solicitud no encontrada' });
      }
    }
  });
});

// Actualiza la ruta para obtener detalles de la solicitud
app.get('/obtenerDetallesSolicitud2/:id_solicitud', (req, res) => {
  const id_solicitud = req.params.id_solicitud;
  db.query('SELECT * FROM disputa WHERE id_solicitud = ? AND tipo_usuario is null', [id_solicitud], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ success: false, message: 'Error al obtener detalles de la solicitud' });
    } else {
      if (result.length === 1) {
        // Se encontró una solicitud con el ID proporcionado
        const detallesSolicitud = result[0];
        res.status(200).json({ success: true, detallesSolicitud });
      } else {
        // No se encontró una solicitud con el ID proporcionado
        res.status(404).json({ success: false, message: 'Solicitud no encontrada' });
      }
    }
  });
});

// Agrega una nueva ruta para actualizar eventos
app.put('/eventos/:id', (req, res) => {
  const eventId = req.params.id;
  const { start, end, fecha } = req.body; // Ajusta según las propiedades reales que necesitas actualizar

  const query = `
    UPDATE eventos
    SET start = ?,
        end = ?,
        fecha = ?
    WHERE id_evento = ?;
  `;

  db.query(query, [start, end, fecha, eventId], (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.json({ message: 'Evento actualizado correctamente' });
    }
  });
});


app.use(express.urlencoded({ extended: true }));

app.get('/obtenerSolicitudes', (req, res) => {
  console.log('Query params:', req.query);
  let query = `
    SELECT solicitudes.id_solicitud,profesor.nombre AS profesor, 
           solicitudes.fecha_creacion, solicitudes.fecha_actualizacion, 
           solicitudes.estado,profesor.id_profesor AS idProfesor
    FROM solicitudes 
    INNER JOIN profesor ON solicitudes.id_profesor = profesor.id_profesor
  `;

  // Verificar si existe idProfesor o idAdmin y agregar la cláusula WHERE correspondiente
  if (req.query.idProfesor) {
    query += ` WHERE profesor.id_profesor = ${req.query.idProfesor}`;
  } else if (req.query.idAdmin) {
    // Asegúrate de validar y sanitizar el valor antes de agregarlo a la consulta
    query += ` `;
  }

  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error interno del servidor');
    } else {
      res.send(result);
    }
  });
});



app.post('/insertarIdAdminEnSolicitudes', (req, res) => {
  const { idSolicitud, idAdmin } = req.body;

  const query = 'UPDATE solicitudes SET id_administrador = ?, estado = "En revisión" WHERE id_solicitud = ?';

  db.query(query, [idAdmin, idSolicitud], (error, results) => {
    if (error) {
      console.error('Error al insertar en solicitudes:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }

    return res.status(200).json({ success: true });
  });
});

router.put('/actualizarEstadoSolicitud/:idSolicitud', (req, res) => {
  const { idSolicitud } = req.params;
  const { nuevoEstado } = req.body;

  const query = 'UPDATE solicitudes SET estado = ? WHERE id_solicitud = ? AND estado = "Pendiente"';

  db.query(query, [nuevoEstado, idSolicitud], (error, results) => {
    if (error) {
      console.error('Error al actualizar el estado de la solicitud:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }

    if (results.affectedRows === 0) {
      // No se actualizó ninguna fila, probablemente porque el estado no era "pendiente"
      return res.status(400).json({ error: 'La solicitud no está en estado pendiente' });
    }

    return res.status(200).json({ success: true });
  });
});

module.exports = router;

//TUFLA


//PROFESOR
app.post('/createProfe', (req, res) => {
  const rut_profesor = req.body.rut_profesor;
  const nombre = req.body.nombre;
  const contrato = req.body.contrato;
  const correo = req.body.correo;
  const password = req.body.password;

  // Check if the rut_profesor already exists
  db.query('SELECT * FROM profesor WHERE rut_profesor = ?', [rut_profesor], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      // If the result has length > 0, the rut_profesor already exists
      if (result.length > 0) {
        res.status(400).send("El rut ya existe");
      } else {
        // Hash the password before inserting into the database
        bcrypt.hash(password, saltRounds, (hashErr, hash) => {
          if (hashErr) {
            console.log(hashErr);
            res.status(500).send("Internal Server Error");
          }

          // Insert the new professor record into the database
          db.query(
            'INSERT INTO profesor (rut_profesor, nombre, contrato, correo, password) VALUES (?,?,?,?,?)',
            [rut_profesor, nombre, contrato, correo, hash],
            (insertErr, insertResult) => {
              if (insertErr) {
                console.log(insertErr);
                res.status(500).send("Internal Server Error");
              } else {
                res.status(200).send("Profesor registrado correctamente");
              }
            }
          );
        });
      }
    }
  });
});


app.get('/profesores2', (req, res) => {
  db.query('SELECT * FROM profesor' , 
  (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send(result);
      }
  });
});

app.put('/updateProfe', (req, res) => {
  const rut_profesor = req.body.rut_profesor;
  const nombre = req.body.nombre;
  const contrato = req.body.contrato;
  const correo = req.body.correo;
  
  db.query('UPDATE profesor SET nombre = ?, contrato = ?, correo=?  WHERE rut_profesor = ?', [nombre, contrato, correo, rut_profesor],
  (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send(result);
      }
  });

});


app.put('/hideProfe/:id_profesor', (req, res) => {
  const id_profesor = req.params.id_profesor;
  const nuevoEstado = 0;  // Establece el nuevo estado (inactivo)

  db.query('UPDATE profesor SET estado = ? WHERE id_profesor = ?', [nuevoEstado, id_profesor], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ success: false, message: 'Error al ocultar al profesor' });
    } else {
      res.status(200).json({ success: true, message: 'Profesor ocultado exitosamente' });
    }
  });
});

app.get('/exportar-profesores', (req, res) => {
    
    const downloadsFolder = path.join(os.homedir(), 'Downloads');
    const outputPath = path.join(downloadsFolder, 'profesores_exportados.csv');
  
    db.query('SELECT * FROM profesor', (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Error en la exportación' });
      } else {
        if (result.length > 0) {
          const csvWriter = createCsvWriter({
            path: outputPath,
            header: Object.keys(result[0]).map((columnName) => ({ id: columnName, title: columnName })),
          });
  
          csvWriter.writeRecords(result)
            .then(() => {
              res.status(200).json({ success: true, message: 'Exportación exitosa' });
            })
            .catch((error) => {
              console.error(error);
              res.status(500).json({ success: false, message: 'Error en la exportación' });
            });
        } else {
          res.status(500).json({ success: false, message: 'No hay datos para exportar' });
        }
      }
    });
  });
  

//ALUMNO
//ALUMNO

app.post('/createAlu', (req, res) => {
  const rut = req.body.rut;
  const nombre = req.body.nombre;
  const correo = req.body.correo;
  const password = req.body.password;
  const id_carrera = req.body.id_carrera;

  // Check if the rut already exists
  db.query('SELECT * FROM alumno WHERE rut = ?', [rut], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      // If the result has length > 0, the rut already exists
      if (result.length > 0) {
        res.status(400).send("El rut ya existe");
      } else {
        // Hash the password before inserting into the database
        bcrypt.hash(password, saltRounds, (hashErr, hash) => {
          if (hashErr) {
            console.log(hashErr);
            res.status(500).send("Internal Server Error");
          }

          // Insert the new alumno record into the database
          db.query(
            'INSERT INTO alumno (rut, nombre, correo, password, id_carrera) VALUES (?,?,?,?,?)',
            [rut, nombre, correo, hash, id_carrera],
            (insertErr, insertResult) => {
              if (insertErr) {
                console.log(insertErr);
                res.status(500).send("Internal Server Error");
              } else {
                res.status(200).send("Alumno registrado correctamente");
              }
            }
          );
        });
      }
    }
  });
});
app.get('/alumnos2', (req, res) => {
  db.query('SELECT alumno.rut, alumno.nombre,alumno.correo,alumno.password,(carrera.nombre)as carrera , alumno.estado FROM `alumno` INNER JOIN carrera on alumno.id_carrera = carrera.id_carrera', (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send(result);
      }
  });
});

app.put('/updateAlu', (req, res) => {
  const id_alumno = req.body.id_alumno;
  const rut = req.body.rut;
  const nombre = req.body.nombre;
  const correo = req.body.correo;
  

  console.log(id_alumno, rut, nombre, correo);

    db.query(
      'UPDATE alumno SET nombre = ?, correo = ? WHERE rut = ?',
      [nombre, correo, rut],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
});

app.put('/hideAlu/:rut', (req, res) => {
  const rut = req.params.rut;
  const nuevoEstado = 0;  // Establece el nuevo estado (inactivo)
  console.log(rut, nuevoEstado);

  db.query('UPDATE alumno SET estado = ? WHERE rut= ?', [nuevoEstado, rut], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ success: false, message: 'Error al eliminar al alumno' });
    } else {
      res.status(200).json({ success: true, message: 'Alumno eliminar exitosamente' });
    }
  });
});

app.get('/obtener-carreras', (req, res) => {
  db.query('SELECT * FROM carrera', (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send(result);
      }
  })
});

app.get('/exportar-alumnos', (req, res) => {
  const downloadsFolder = path.join(os.homedir(), 'Downloads');
  const outputPath = path.join(downloadsFolder, 'alumnos_exportados.csv');
  db.query('SELECT * FROM alumno', (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ success: false, message: 'Error en la exportación' });
    } else {
      if (result.length > 0) {
        const csvWriter = createCsvWriter({
          path: outputPath,
          header: Object.keys(result[0]).map((columnName) => ({ id: columnName, title: columnName })),
        });

        csvWriter.writeRecords(result)
          .then(() => {
            res.status(200).json({ success: true, message: 'Exportación exitosa' });
          })
          .catch((error) => {
            console.error(error);
            res.status(500).json({ success: false, message: 'Error en la exportación' });
          });
      } else {
        res.status(500).json({ success: false, message: 'No hay datos para exportar' });
      }
    }
  });
});

//LOGIN
app.post('/login', async (req, res) => {
  const rut = req.body.rut;
  const password = req.body.password;

  try {
    // Consulta a la base de datos para alumno
    const resultsAlumno = await dbQuery('SELECT * FROM alumno WHERE rut = ?', [rut]);
    if (resultsAlumno.length > 0) {
      const passwordsMatch = await bcrypt.compare(password, resultsAlumno[0].password);
      if (passwordsMatch) {
        req.session.alumno = resultsAlumno;
        res.json({ isAlumno: true, ...resultsAlumno[0] });   
        console.log("QUE DATO TENGO",resultsAlumno);
        //res.json(resultsAlumno);
        return; // Importante: terminar la función después de enviar la respuesta
      } else {
        res.json({ message: 'Usuario y/o contraseña incorrectos' });
        return;
      }
    } else {
      // No existe un usuario con el rut dado en la tabla de alumnos
      // Puedes manejarlo según tus necesidades
    }

    // Consulta a la base de datos para profesor
    const resultsProfesor = await dbQuery('SELECT * FROM profesor WHERE rut_profesor = ?', [rut]);
    if (resultsProfesor.length > 0) {
      const passwordsMatch = await bcrypt.compare(password, resultsProfesor[0].password);
      if (passwordsMatch) {
        req.session.profesor = resultsProfesor;
        res.json({ isProfesor: true, ...resultsProfesor[0] }); 
        //res.json(resultsProfesor);
        return; // Importante: terminar la función después de enviar la respuesta
      } else {
        res.json({ message: 'Usuario y/o contraseña incorrectos' });
        return;
      }
    } else {
      // No existe un usuario con el rut dado en la tabla de profesores
      // Puedes manejarlo según tus necesidades
    }

    // Consulta a la base de datos para administrador
    const resultsAdmin = await dbQuery('SELECT * FROM administrador WHERE rut_administrador = ?', [rut]);
    if (resultsAdmin.length > 0) {
      const passwordsMatch = await bcrypt.compare(password, resultsAdmin[0].password);
      if (passwordsMatch) {
        req.session.administrador = resultsAdmin;
        res.json({ isAdmin: true, ...resultsAdmin[0] });   
        //res.json(resultsAdmin);
        return; // Importante: terminar la función después de enviar la respuesta
      } else {
        res.json({ message: 'Usuario y/o contraseña incorrectos' });
        return;
      }
    } else {
      // No existe un usuario con el rut dado en la tabla de administradores
      // Puedes manejarlo según tus necesidades
    }

    // Si llegamos aquí, significa que no se encontró un usuario en ninguna de las tablas
    res.json({ message: 'Usuario no existe' });
  } catch (error) {
    console.error('Error en la consulta a la base de datos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Función de utilidad para realizar consultas a la base de datos
function dbQuery(sql, values) {
  return new Promise((resolve, reject) => {
    db.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

app.get('/login', (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, rut: req.session.rut });
  } else {
    res.send({ loggedIn: false });
  }
});

//codigo PARA SALIR SESION

app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      res.status(500).json({ error: 'Error destroying session' });
    } else {
      res.clearCookie('connect.sid'); // Clear the session cookie
      res.json({ message: 'Logout successful' });
    }
  });
});

app.listen(3001, () => console.log("Servidor en localhost:3001"));


//FORGOT

app.post('/forgot', async (req, res) => {
  const correo = req.body.correo;
  
  try {
    // Query for alumno
    const alumnoResults = await queryDatabase('SELECT * FROM alumno WHERE correo = ?', [correo]);
    if (alumnoResults.length > 0) {
      const token = jwt.sign({ id_alumno: alumnoResults[0].id_alumno }, 'tu-secreto', { expiresIn: '20min' });

      await sendResetEmail(correo, 'alumno', alumnoResults[0].id_alumno, token);

      res.json({ message: 'Se ha enviado un correo electrónico con las instrucciones para restablecer la contraseña.' });
      return;
    }

    // Query for profesor
    const profesorResults = await queryDatabase('SELECT * FROM profesor WHERE correo = ?', [correo]);
    if (profesorResults.length > 0) {
      const token = jwt.sign({ id_profesor: profesorResults[0].id_profesor }, 'tu-secreto', { expiresIn: '20min' });

      await sendResetEmail(correo, 'profesor', profesorResults[0].id_profesor, token);

      res.json({ message: 'Se ha enviado un correo electrónico con las instrucciones para restablecer la contraseña.' });
      return;
    }

    // Query for administrador
    const administradorResults = await queryDatabase('SELECT * FROM administrador WHERE correo = ?', [correo]);
    if (administradorResults.length > 0) {
      const token = jwt.sign({ id_administrador: administradorResults[0].id_administrador }, 'tu-secreto', { expiresIn: '20min' });

      await sendResetEmail(correo, 'administrador', administradorResults[0].id_administrador, token);

      res.json({ message: 'Se ha enviado un correo electrónico con las instrucciones para restablecer la contraseña.' });
      return;
    }

    // If no matching user found
    res.status(500).json({ error: 'No existe un usuario con el correo ingresado.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al procesar la solicitud.' });
  }
});

async function queryDatabase(sql, params) {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

async function sendResetEmail(correo, userType, userId, token) {
  const transporter = nodemailer.createTransport({
    host: '127.0.0.1',
    port: 25,
    secure: false,
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: 'Papercut@papercut.com',
    to: correo,
    subject: 'Restablecer contraseña',
    text: `Para restablecer tu contraseña, haz click en el siguiente enlace: http://localhost:3000/Reset/${userType}/${userId}/${token}`
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        console.log('Correo enviado: ' + info.response);
        resolve();
      }
    });
  });
}


// RESET
app.post('/reset/:userType/:id/:token', (req, res) => {
  const { password } = req.body;
  const { userType, id, token } = req.params;

  jwt.verify(token, 'tu-secreto', async (error, decodedToken) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al procesar la solicitud.' });
      return;
    } else {
      bcrypt.hash(password, saltRounds, async (error, hash) => {
        if (error) {
          console.error(error);
          res.status(500).json({ error: 'Error al procesar la solicitud.' });
          return;
        } else {
          try {
            let sql;
            let params;
            if (userType === 'alumno') {
              sql = 'UPDATE alumno SET password = ? WHERE id_alumno = ?';
              params = [hash, id];
            } else if (userType === 'profesor') {
              sql = 'UPDATE profesor SET password = ? WHERE id_profesor = ?';
              params = [hash, id];
            } else if (userType === 'administrador') {
              sql = 'UPDATE administrador SET password = ? WHERE id_administrador = ?';
              params = [hash, id];
            } else {
              res.status(500).json({ error: 'Error al procesar la solicitud.' });
              return;
            }

            await queryDatabase(sql, params);

            res.json({ message: 'Contraseña restablecida exitosamente.' });
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al procesar la solicitud.' });
          }
        }
      });
    }
  });

});

