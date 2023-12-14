import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Filtros.css';
import logo from './Logo UCEN_.png';
import CalendarioDemo_copy from './CalendarioDemo_copy';
import { useParams,Link, useNavigate } from 'react-router-dom';
import './usuarios.css';


function App() {

    const { idAlumno } = useParams();
    const { nombre } = useParams();

    const [alumnosList, setAlumnosList] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
      getAlumnos();
    }, []);
    const handleLogout = async () => {
  
      try {
        const response = await axios.post('http://localhost:3001/logout');
        console.log(response.data.message);
        navigate('/');
      } catch (error) {
        console.error('Error during logout:', error);
        }};
        
    const getAlumnos = () => {
      axios.get('http://localhost:3001/Alumnos')
        .then((response) => {
          setProfesoresList(response.data);
        })
        .catch((error) => {
          console.error('Error al obtener la lista de alumnos:', error);
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
              <Link class="nav-link" style={{ pointerEvents: 'none' }}> Bienvenido: {nombre} </Link>
              </li>
             
            </ul>
          </div>
        </nav>
      </header>
      <CalendarioDemo_copy idAlumno={idAlumno} nombreAlumno={nombre}/>
    </div>
  );
}

export default App;
