import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './usuarios.css';
import logo from './Logo UCEN_.png';
import CalendarioDemo from './CalendarioDemo';
import CalendarioDemo_copy from './CalendarioDemo_copy';
import { useParams,Link, useNavigate } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap'; // Importa componentes de Bootstrap

import Solicitudes from './Solicitudes'; // Asegúrate de importar el componente Solicitudes correctamente

function App() {
  const { idProfesor } = useParams();
 
  const { nombreProfesor } = useParams();
  const [showSolicitudes, setShowSolicitudes] = useState(false);


  const handleShowSolicitudes = () => setShowSolicitudes(true);
  const handleCloseSolicitudes = () => setShowSolicitudes(false);
  const [profesoresList, setProfesoresList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getProfesores();
  }, []);
  const handleLogout = async () => {

    try {
      const response = await axios.post('http://localhost:3001/logout');
      console.log(response.data.message);
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
      }};
      
  const getProfesores = () => {
    axios.get('http://localhost:3001/profesores')
      .then((response) => {
        setProfesoresList(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de profesores:', error);
      });
  };

  return (
    <div className='App'>

      <header className="mb-4">
        <nav className="navbar navbar-expand-lg navbar-light bg-light ">
          <div className="container-fluid">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Logo_nuevo_ucen.png/1200px-Logo_nuevo_ucen.png" alt="logo" border="0" width="50" height="50"></img>
            <ul className="navbar-nav m-auto ">
              <li className="nav-item">
                <Link class="nav-link" >Inicio</Link>
              </li>
              <li className="nav-item">
                <Link class="nav-link" onClick={handleLogout}>Cerrar sesion</Link>
              </li>
              <li className="nav-item">
              <Link class="nav-link" style={{ pointerEvents: 'none' }}> Bienvenido: {nombreProfesor} </Link>
              </li>
             
            </ul>
          </div>
        </nav>
      </header>

      {/* Cuadrante con botón de Solicitudes */}
      <div className='p-3' style={{ backgroundColor: '#f8f9fa' }}>
        <Button variant='primary' onClick={handleShowSolicitudes}>
          Consultar Solicitudes
        </Button>
      </div>

      {/* Componente CalendarioDemo_copy */}
      <CalendarioDemo_copy idProfesor={idProfesor} nombreProfesor={nombreProfesor} />

      {/* Ventana emergente de Solicitudes */}
      <Modal show={showSolicitudes} onHide={handleCloseSolicitudes} size="lg"> {/* Añade la propiedad size para hacer el modal más grande */}
  <Modal.Header closeButton>
    <Modal.Title>Solicitudes</Modal.Title>
  </Modal.Header>
  <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}> {/* Ajusta la altura máxima y el desbordamiento */}
    <Solicitudes idProfesor={idProfesor} />
  </Modal.Body>
</Modal>
    </div>
  );
}

export default App;
