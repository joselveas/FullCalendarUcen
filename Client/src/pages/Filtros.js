import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Filtros.css';
import logo from './Logo UCEN_.png';
import CalendarioDemo from './CalendarioDemo';
import CalendarioDemo_copy from './CalendarioDemo_copy';

function App() {
  const [salasList, setSalasList] = useState([]);
  const [selectedSala, setSelectedSala] = useState('');

  const [carrerasList, setCarrerasList] = useState([]);
  const [selectedCarrera, setSelectedCarrera] = useState('');

  const [nivelesList, setNivelesList] = useState([]);
  const [selectedNivel, setSelectedNivel] = useState('');

  const [profesoresList, setProfesoresList] = useState([]);
  const [selectedProfesor, setSelectedProfesor] = useState('');

  const [asignaturasList, setAsignaturasList] = useState([]);
  const [selectedAsignatura, setSelectedAsignatura] = useState('');

  const [facultadesList, setFacultadesList] = useState([]);
  const [selectedFacultad, setSelectedFacultad] = useState('');

  const [alumnosList, setAlumnosList] = useState([]);
  const [selectedAlumno, setSelectedAlumno] = useState('');

  useEffect(() => {
    getSalas();
    getCarreras();
    getNiveles();
    getProfesores();
    getAsignaturas();
    getFacultades();
    getAlumnos();
  }, []);

  const getSalas = () => {
    axios.get('http://localhost:3001/salas')
      .then((response) => {
        setSalasList(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de salas:', error);
      });
  };

  const getCarreras = () => {
    axios.get('http://localhost:3001/carreras')
      .then((response) => {
        setCarrerasList(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de carreras:', error);
      });
  };

  const getNiveles = () => {
    axios.get('http://localhost:3001/niveles')
      .then((response) => {
        setNivelesList(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de niveles:', error);
      });
  };

  const getProfesores = () => {
    axios.get('http://localhost:3001/profesores')
      .then((response) => {
        setProfesoresList(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de profesores:', error);
      });
  };

  const getAsignaturas = () => {
    axios.get('http://localhost:3001/asignaturas')
      .then((response) => {
        setAsignaturasList(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de asignaturas:', error);
      });
  };

  const getFacultades = () => {
    axios.get('http://localhost:3001/facultades')
      .then((response) => {
        setFacultadesList(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de facultades:', error);
      });
  };
  const getAlumnos = () => {
    axios.get('http://localhost:3001/alumnos')
      .then((response) => {
        setAlumnosList(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de facultades:', error);
      });
  };

  return (
    <div className='App'>
      <main className='container mt-2'>
        <div className='bg-primary p-2'>
          {/* Primera Fila de Dropdowns */}
          <div className='row mb-2'>
            <div className='col mb-2'>
              <label htmlFor='salaDropdown' className='form-label text-white fw-bold'>Seleccionar Sala:</label>
              <select
                id='salaDropdown'
                className='form-select text-dark'
                onChange={(event) => setSelectedSala(event.target.value)}
                value={selectedSala}
              >
                <option value=''>Seleccione una sala</option>
                {salasList.map((sala) => (
                  <option key={sala.id_sala} value={sala.id_sala}>
                    {sala.id_sala}
                  </option>
                ))}
              </select>
            </div>
            <div className='col mb-2'>
              <label htmlFor='carreraDropdown' className='form-label text-white fw-bold'>Seleccionar Carrera:</label>
              <select
                id='carreraDropdown'
                className='form-select text-dark'
                onChange={(event) => setSelectedCarrera(event.target.value)}
                value={selectedCarrera}
              >
                <option value=''>Seleccione una carrera</option>
                {carrerasList.map((carrera) => (
                  <option key={carrera.id_carrera} value={carrera.id_carrera}>
                    {carrera.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className='col mb-2'>
              <label htmlFor='nivelDropdown' className='form-label text-white fw-bold'>Seleccionar Nivel:</label>
              <select
                id='nivelDropdown'
                className='form-select'
                onChange={(event) => setSelectedNivel(event.target.value)}
                value={selectedNivel}
              >
                <option value=''>Seleccione un nivel</option>
                {nivelesList.map((nivel) => (
                  <option key={nivel.id_nivel} value={nivel.id_nivel}>
                    {nivel.id_nivel}
                  </option>
                ))}
              </select>
            </div>
          </div>
  
          {/* Segunda Fila de Dropdowns */}
          <div className='row'>
            <div className='col mb-2'>
              <label htmlFor='profesorDropdown' className='form-label text-white fw-bold'>Seleccionar Profesor:</label>
              <select
                id='profesorDropdown'
                className='form-select'
                onChange={(event) => setSelectedProfesor(event.target.value)}
                value={selectedProfesor}
              >
                <option value=''>Seleccione un profesor</option>
                {profesoresList.map((profesor) => (
                  <option key={profesor.id_profesor} value={profesor.id_profesor}>
                    {profesor.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className='col mb-2'>
              <label htmlFor='asignaturaDropdown' className='form-label text-white fw-bold'>Seleccionar Asignatura:</label>
              <select
                id='asignaturaDropdown'
                className='form-select'
                onChange={(event) => setSelectedAsignatura(event.target.value)}
                value={selectedAsignatura}
              >
                <option value=''>Seleccione una asignatura</option>
                {asignaturasList.map((asignatura) => (
                  <option key={asignatura.id_asignatura} value={asignatura.id_asignatura}>
                    {asignatura.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className='col mb-2'>
              <label htmlFor='facultadDropdown' className='form-label text-white fw-bold'>Seleccionar Facultad:</label>
              <select
                id='facultadDropdown'
                className='form-select'
                onChange={(event) => setSelectedFacultad(event.target.value)}
                value={selectedFacultad}
              >
                <option value=''>Seleccione una facultad</option>
                {facultadesList.map((facultad) => (
                  <option key={facultad.id_facultad} value={facultad.id_facultad}>
                    {facultad.nombre_facultad}
                  </option>
                ))}
              </select>
            </div>
            <div className='col mb-2'>
              <label htmlFor='alumnoDropdown' className='form-label text-white fw-bold'>Seleccionar alumnos:</label>
              <select
                id='alumnoDropdown'
                className='form-select'
                onChange={(event) => setSelectedAlumno(event.target.value)}
                value={selectedAlumno}
              >
                <option value=''>Seleccione un alumno</option>
                {alumnosList.map((alumno) => (
                  <option key={alumno.id_alumno} value={alumno.id_alumno}>
                    {alumno.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <CalendarioDemo_copy 
          sala={selectedSala}
          carrera={selectedCarrera}
          nivel={selectedNivel}
          profesor={selectedProfesor}
          asignatura={selectedAsignatura}
          facultad={selectedFacultad}
          alumno={selectedAlumno}
          />
      </main>
    </div>
  );
  
}

export default App;