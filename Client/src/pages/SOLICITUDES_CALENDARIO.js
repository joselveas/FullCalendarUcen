import React from 'react';
import CalendarioDemo_copy from './CalendarioDemo_copy';
import Filtros from './Filtros';
import './Solicitudes_cal.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa el archivo CSS de Bootstrap
import { useLocation , useNavigate } from 'react-router-dom';
import { useState , useEffect } from 'react';
import axios from 'axios';
import CalendarioEventual from './CalendarioEventual';



const Solicitudes_Cal = () => {

    
  // Utiliza useLocation para obtener el objeto de ubicación actual
  const location = useLocation();
  // Accede a los datos pasados como state durante la redirección
  const { idSolicitud, idProfesor , profesor , idAdmin} = location.state || {};

  const navigate = useNavigate();

  const [horarios, setHorarios] = useState([]);

  const [selectedHorario, setSelectedHorario] = useState('');
  const [selectedDia, setSelectedDia] = useState('');

  const handleAceptar = () => {
    const nuevaSolicitud = {
      idSolicitud: idSolicitud,
      idHorario: selectedHorario,
      fecha: selectedDia,
    };

    // Realiza una solicitud al servidor para actualizar la solicitud
  axios.put(`http://localhost:3001/solicitudesAceptar/${idSolicitud}`, nuevaSolicitud)
  .then(response => {
    console.log('Solicitud actualizada exitosamente:', response.data);
    navigate(`/Admin/${idAdmin}`);
    // Realiza alguna acción adicional si es necesario
  })
  .catch(error => {
    console.error('Error al actualizar la solicitud:', error);
  });
};

  const diasDeLaSemana = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];

  const [descripcionDisputa, setDescripcionDisputa] = useState('');

  const handleDisputa = () => {
    // Realizar la solicitud HTTP para guardar la disputa
    const nuevaDisputa = {
      id_solicitud: idSolicitud,
      descripcion: descripcionDisputa,
      tipo_usuario: 1, // Administrador
    };

    axios.post('http://localhost:3001/disputa', nuevaDisputa)
      .then(response => {
        console.log('Disputa guardada exitosamente:', response.data);
        // Redirige a la página "/Admin" con el idAdmin
        navigate(`/Admin/${idAdmin}`);
        // Puedes realizar alguna acción adicional después de guardar la disputa, si es necesario.
      })
      .catch(error => {
        console.error('Error al guardar la disputa:', error);
      });
  };

  useEffect(() => {
    // Hacer una solicitud al servidor para obtener la lista de horarios
    axios.get('http://localhost:3001/horarios')
      .then(response => {
        setHorarios(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los horarios:', error);
      });
  }, []);
    
    return (
        
<div className="container mt-4 mb-4">
  <div className="card mb-4">
    <div className="card-header bg-primary text-white">
      <h2 className="card-title">Datos recibidos en Solicitudes Calendario</h2>
    </div>
    <div className="card-body d-flex justify-content-between">
      <div>
        <p className="card-text font-weight-bold">ID de Solicitud: {idSolicitud}</p>
      </div>
      <div>
        <p className="card-text font-weight-bold">Profesor: {profesor}</p>
      </div>
    </div>
    <div className="card-footer">
      <p className="card-text font-weight-bold">Administrador a cargo: {idAdmin}</p>
    </div>
  </div>
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h1 className="card-title">Calendario Profesor</h1>
              </div>
              <div className="card-body">
                <CalendarioDemo_copy idProfesor={idProfesor} />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h1 className="card-title">Calendario Cambio</h1>
              </div>
              <div className="card-body">
                <CalendarioEventual idProfesor={idProfesor} />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Disputa de solicitud</h2>
            </div>
            <div className="card-body d-flex">
            <div className="form-group mr-4 Strong">
        <label htmlFor="horario">Seleccionar Horario:</label>
        <select
          id="horario"
          className="form-control"
          value={selectedHorario}
          onChange={(e) => setSelectedHorario(e.target.value)}
        >
          <option value="" disabled>Seleccione un Bloque de hora</option>
          {horarios.map(horario => (
            <option key={horario.id_horario} value={horario.id_horario}>
              {horario.bloque}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="dia">Seleccionar Día:</label>
        <select
          id="dia"
          className="form-control"
          value={selectedDia}
          onChange={(e) => setSelectedDia(e.target.value)}
        >
          <option value="" disabled>Seleccione un día</option>
          {diasDeLaSemana.map((dia, index) => (
            <option key={index} value={dia}>
              {dia}
            </option>
          ))}
        </select>
      </div>    
            </div>
            <div className="card-footer d-flex justify-content-between">
              <div>
                <button className="btn btn-danger mr-2">Rechazar</button>
                <button className="btn btn-success" onClick={handleAceptar}>Aceptar</button>
              </div>
            </div>
            
            
            <div className="card-body">
                
              <label htmlFor="descripcion">Descripción:</label>
              <textarea id="descripcion" className="form-control" rows="4" value={descripcionDisputa} onChange={(e) => setDescripcionDisputa(e.target.value)}></textarea>
            </div>
            <div className="card-footer d-flex justify-content-between">
              <button className="btn btn-primary" onClick={handleDisputa}>Disputa</button>
              <div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Busqueda Disponibilidad</h2>
            </div>
            <div className="card-body">
              <Filtros />
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Solicitudes_Cal;