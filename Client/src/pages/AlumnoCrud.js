import './Crud.css';
import React, { useState, useEffect } from 'react';
import  Axios  from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { saveAs } from 'file-saver';

function App() {
  const [rut, setRut] = useState(''); // El primer valor es el estado, el segundo es la función que lo actualiza
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [carrera, setCarrera] = useState('');
  const [id_alumno, setId_alumno] = useState('');
  const [password, setPassword] = useState('');
  const [search, setSearch] = useState('');
  const [editar, setEditar] = useState(false);
  const[AlumnosList, setAlumnosList] = useState([]);
  const [opcionesCarreras, setOpcionesCarreras] = useState([]);

  const add = () => {
    // Validaciones básicas
    // Permitir letras y espacios en blanco en el nombre
    if (!/^[a-zA-Z\s]+$/.test(nombre)) {
      Swal.fire({
        icon: 'error',
        title: 'Error en el nombre',
        text: 'El nombre debe contener solo letras.',
      });
  return;
    }
    if (!/^[\d\-]+$/.test(rut)) {
      Swal.fire({
      icon: 'error',
      title: 'Error en el RUT',
      text: 'El RUT debe contener solo números.',
    });
    return;
    }
    if (rut.length > 12) {
      Swal.fire({
        icon: 'error',
        title: 'Error en el RUT',
        text: 'El RUT debe tener un máximo de 12 caracteres.',
      });
      return;
    }
    Axios.post('http://localhost:3001/createAlu', {
      rut: rut,
      nombre: nombre,
      correo: correo,
      password: password,
      id_carrera: carrera,
    }).then(() => {
      getAlumnos();
      limpiarCampos();
      Swal.fire({
        title: "<strong>Registro exitoso</strong>",
        html: "<i>El alumno <strong>"+nombre+"</strong> fue registrado con éxito.</i>",
        icon: 'success',
        timer:3000
      });
    }).catch((error) => {
      console.error('Error al registrar el alumno:', error);
      if (error.response && error.response.status === 400 && error.response.data === 'El rut ya existe') {
        Swal.fire({
          icon: 'error',
          title: 'Error en el RUT',
          text: 'El RUT ingresado ya existe.',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar el alumno',
          text: 'Ocurrió un error al registrar el alumno. Por favor, intente nuevamente.',
        });
      }
    });
  };

  const getAlumnos = () => {
    Axios.get('http://localhost:3001/alumnos2').then((response) => {
      console.log(response.data);
      setAlumnosList(response.data.filter((alumno) => alumno.estado === 1));
    });
  }

  const editarAlumno = (val) => {
    setRut(val.rut);
    setNombre(val.nombre);
    setCorreo(val.correo);
    setCarrera(val.carrera);
    setPassword(val.password);
    setId_alumno(val.id_alumno);
    setEditar(true);
  }

  const updateAlumno = () => {
    // Permitir letras y espacios en blanco en el nombre
    if (!/^[a-zA-Z\s]+$/.test(nombre)) {
      Swal.fire({
        icon: 'error',
        title: 'Error en el nombre',
        text: 'El nombre debe contener solo letras y espacios.',
      });
      return;
    }
    if (!/^[\d\-]+$/.test(rut)) {
      Swal.fire({
      icon: 'error',
      title: 'Error en el RUT',
      text: 'El RUT debe contener solo números y guiones.',
    });
    return;
    }
    if (rut.length > 12) {
      Swal.fire({
        icon: 'error',
        title: 'Error en el RUT',
        text: 'El RUT debe tener un máximo de 12 caracteres.',
      });
      return;
    }

    Axios.put('http://localhost:3001/updateAlu', {
      id_alumno: id_alumno,
      rut: rut,
      nombre: nombre,
      correo: correo,
      carrera: carrera,
      password: password,

    }).then(() => {
      getAlumnos();
      limpiarCampos();
      Swal.fire({
        title: "<strong>Actualización exitosa!!!</strong>",
        html: "<i>El alumno <strong>"+nombre+"</strong> fue actualizado con éxito.</i>",
        icon: 'success',
        timer:3000
      })
    });
  }

  const limpiarCampos = () => {
    setRut('');
    setNombre('');
    setCorreo('');
    setCarrera('');
    setPassword('');
    setEditar(false);
  }

  const hideAlumno = (val)=>{
    Swal.fire({
      icon: 'warning',
      title: 'Confirmar eliminado?',
      html: "<i>Realmente desea eliminar a <strong>"+val.nombre+"</strong>?</i>",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.put(`http://localhost:3001/hideAlu/${val.rut}`).then((res)=>{
        getAlumnos();
        limpiarCampos();
        Swal.fire({
          icon: 'success',
          title: val.nombre+' fue eliminado.',
          showConfirmButton: false,
          timer: 2000
        });
      });
    }});
  } 

  const exportarCSV = async () => {
    try {
      const response = await Axios.get('http://localhost:3001/exportar-alumnos', {
        responseType: 'blob',
        timeout: 10000,
      });
  
      if (response.status === 200) {
        const blob = new Blob([response.data], { type: 'text/csv' });
        saveAs(blob, 'alumnos_exportados.csv');
      } else {
        console.error('Error en la exportación CSV:', response.status);
      }
    } catch (error) {
      console.error('Error en la exportación CSV:', error);
    }
  };

  // Filtrar la lista de profesores según el término de búsqueda
  const filteredAlumnos = AlumnosList.filter(
  (alumno) =>
    alumno.nombre.toLowerCase().includes(search.toLowerCase()) || alumno.rut.includes(search)
).filter((alumno) => alumno.estado === 1); // Filtra solo alumnos activos

  useEffect(() => {
    // Hacer una solicitud para obtener las opciones de carreras desde el servidor
    Axios.get('http://localhost:3001/obtener-carreras')
      .then(response => {
        setOpcionesCarreras(response.data);
      })
      .catch(error => {
        console.error('Error al obtener las opciones de carreras:', error);
      });
      getAlumnos();
  }, [search]);


  const formatRut = (rut) => {
  // Eliminar guiones existentes y cualquier otro caracter no numérico
  const cleanedRut = rut.replace(/[^\d]/g, '');
  // Separar los bloques de números con guiones
  const formattedRut = cleanedRut.replace(/(\d{1,8})(\d{1})/, '$1-$2');
  return formattedRut;
  };

  return (
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"></meta>
      
    </head>
    <body> 
    
      <div className="formulario">
      <label>
          Rut{' '}
          <input
            type="text"
            className="form-control"
            placeholder='Ingrese rut'
            value={rut}
            onChange={(event) => {
              const rawRut = event.target.value.replace('-', ''); // Eliminar guiones existentes
              setRut(formatRut(rawRut));
            }}
            readOnly={editar}
          />
        </label>
        <label>Nombre
          <input type="text" class='form-control'value = {nombre} placeholder="Ingrese nombre" onChange={(event) => {setNombre(event.target.value);}}  
          />
        </label>
        <label>Correo<input type='text' class='form-control' value = {correo}placeholder= 'Ingrese correo' onChange={(event)=>{setCorreo(event.target.value);}} /></label>
        <label>Contraseña<input type='text' class='form-control' value = {password}placeholder= 'Ingrese contraseña' onChange={(event)=>{setPassword(event.target.value);}} 
        readOnly={editar}/>
        </label>    
        <label>Carrera <select className="form-control"  value={carrera} onChange={(event) => { setCarrera(event.target.value);}}> 
        <option > Seleccionar Carrera</option>{opcionesCarreras.map((carrera) => ( <option key={carrera.id_carrera} value={carrera.id_carrera}> {carrera.nombre}</option>))}
        </select>
        </label>
      </div>
      <div class="botones">
        {
          editar ? 
            <div>
              <button onClick={updateAlumno}>Actualizar</button>
              <button onClick={limpiarCampos}>Cancelar</button>
            </div>
           : 
           <div>
            <button onClick={add}>Agregar</button>
            <button className='btn-exportar' onClick={exportarCSV}>Exportar CSV</button>

          </div>
        }
      </div>
      <div className="contenedor-tabla">
      <div className="busqueda">
      <label>Búsqueda <input type="text" className="form-control" value={search} onChange={(event) => setSearch(event.target.value)} /></label>
      </div>
      <table class= "table table-striped">
        <thead>
          <tr>
            <th>Rut</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Carrera</th>
            <th>password</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredAlumnos.map((val, key) => {
            return (
              <tr key={key}>
                <td>{val.rut}</td>
                <td>{val.nombre}</td>
                <td>{val.correo}</td>
                <td>{val.carrera}</td>
                <td>{val.password}</td>
                <td>
                    {val.estado ? (
                      <div>
                        <button className='btn-editar' onClick={() => editarAlumno(val)}>Editar</button>
                        <button className='btn-eliminar' onClick={() => hideAlumno(val)}>Ocultar</button>
                      </div>
                    ) : (
                      <span>Inactivo</span>
                    )}
                  </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>  
    </body>
    </html>
  );
}
export default App;