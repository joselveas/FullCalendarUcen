import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import './solicitudes.css';



function Solicitudes(props) {
  const navigate = useNavigate();
  const [respuesta, setRespuesta] = useState(''); // Asegúrate de que esta línea esté presente
  const [solicitudesList, setSolicitudesList] = useState([]);
  const [selectedSolicitud, setSelectedSolicitud] = useState(null);
  const [detallesSolicitud, setDetallesSolicitud] = useState({});

  const handleMostrarDetalles = async (solicitud) => {
    try {
      const response = await axios.get(`http://localhost:3001/obtenerDetallesSolicitud/${solicitud.id_solicitud}`);
      
      if (response.data.success) {
        setSelectedSolicitud(solicitud);
        setDetallesSolicitud(response.data.detallesSolicitud);
      } else {
        console.error('Error al obtener detalles de la solicitud:', response.data.message);
      }
    } catch (error) {
      console.error('Error al obtener detalles de la solicitud:', error);
    }
  };

  const handleMostrarDetalles2 = async (solicitud) => {
    try {
      const response = await axios.get(`http://localhost:3001/obtenerDetallesSolicitud2/${solicitud.id_solicitud}`);
      
      if (response.data.success) {
        setSelectedSolicitud(solicitud);
        setDetallesSolicitud(response.data.detallesSolicitud);
      } else {
        console.error('Error al obtener detalles de la solicitud:', response.data.message);
      }
    } catch (error) {
      console.error('Error al obtener detalles de la solicitud:', error);
    }
  };
  
  

  useEffect(() => {
    const idToUse = props.idProfesor || props.idAdmin;
    const idType = props.idProfesor ? 'idProfesor' : 'idAdmin';

    axios.get(`http://localhost:3001/obtenerSolicitudes?${idType}=${idToUse}`)
      .then(response => {
        setSolicitudesList(response.data);
      })
      .catch(error => {
        console.error('Error al obtener las solicitudes:', error);
      });
  }, [props.idProfesor, props.idAdmin]);

  const handleResponder = async () => {
    try {
      const response = await axios.post('http://localhost:3001/enviarRespuesta', {
        idSolicitud: selectedSolicitud.id_solicitud,
        respuesta: respuesta,
      });
  
      if (response.data.success) {
        // Actualizar el estado en la tabla de solicitudes
        await axios.post('http://localhost:3001/actualizarEstadoSolicitud', {
          idSolicitud: selectedSolicitud.id_solicitud,
          
        });
  
        // Cerrar la ventana de detalles
        setSelectedSolicitud(null);
        console.log('Respuesta enviada con éxito');
      } else {
        console.error('Error al enviar respuesta:', response.data.message);
      }
    } catch (error) {
      console.error('Error al enviar respuesta:', error);
    }
  };
  
  


  const handleIr2 = (idSolicitud, idProfesor,profesor,idAdmin) => {
    axios.post('http://localhost:3001/insertarIdAdminEnSolicitudes', {
      idSolicitud: idSolicitud,
      idAdmin: props.idAdmin
    })
      .then(response => {
        console.log('Inserción exitosa:', response.data);
        // Redirige a la página "/solicitudes_pagina" y pasa los datos como props
        navigate('/solicitudes_calendario', {
          state: {
            idSolicitud: idSolicitud,
            idProfesor: idProfesor,
            profesor: profesor,
            idAdmin: idAdmin,
          }
        });
      })
      .catch(error => {
        console.error('Error al insertar en solicitudes:', error);
      });
  };
  

  return (
    <div>
      <table className="table table-striped">
        <thead className="table-light">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Profesor</th>
            <th scope="col">Fecha Creacion</th>
            <th scope="col">Fecha Actualizacion</th>
            <th scope="col">Estado</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {solicitudesList.map(solicitud => (
            <tr key={solicitud.id_solicitud}>
              <th scope="row">{solicitud.id_solicitud}</th>
              <td>{solicitud.profesor}</td>
              <td>{solicitud.fecha_creacion}</td>
              <td>{solicitud.fecha_actualizacion}</td>
              <td>{solicitud.estado}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => handleMostrarDetalles2(solicitud)}
                >
                  Mostrar
                </button>
                {props.idProfesor ? (
                  <button
                    type="button"
                    className="btn btn-success"
                
                    onClick={() => handleMostrarDetalles(solicitud)}
                  >
                   Mostrar Comentario
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => handleIr2(solicitud.id_solicitud, solicitud.idProfesor, solicitud.profesor, props.idAdmin)}
                  >
                    Atender Solicitud
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedSolicitud && (
        <div className="detalles-solicitud">
          <h3>Detalles de la Solicitud</h3>
          <p>Ticket de solicitud: {selectedSolicitud.id_solicitud}</p>
          <p>Mensaje: {detallesSolicitud.descripcion}</p>
          <p>Fecha: {detallesSolicitud.fecha}</p>

          <div>
            <h4>Responder</h4>
            <textarea
              value={respuesta}
              onChange={(e) => setRespuesta(e.target.value)}
              rows={4}
              className="form-control"
              placeholder="Escribe tu respuesta aquí..."
            />
            <button
              type="button"
              className="btn btn-primary mt-2"
              onClick={handleResponder}
            >
              Enviar Respuesta
            </button>
          </div>

          <button
            type="button"
            className="btn btn-secondary mt-2"
            onClick={() => setSelectedSolicitud(null)}
          >
            Cerrar Detalles
          </button>
        </div>
      )}
    </div>
  );
}

export default Solicitudes;
