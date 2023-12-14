import './Crud.css';
import React, { useState, useEffect } from 'react';
import  Axios  from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { saveAs } from 'file-saver';

const App = () => {
  const [id_profesor, setId_profesor] = useState('');
  const [rut_profesor, setRut_profesor] = useState('');
  const [nombre, setNombre] = useState('');
  const [contrato, setContrato] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [editar, setEditar] = useState(false);
  const [profesoresList, setProfesoresList] = useState([]);
  const [search, setSearch] = useState('');

  const add = () => {
    // Validaciones básicas
    // Permitir letras y espacios en blanco en el nombre
    if (!/^[a-zA-Z\s]+$/.test(nombre)) {
      Swal.fire({
        icon: 'error',
        title: 'Error en el nombre',
        text: 'El nombre debe contener solo letras y espacios.',
      });
  return;
}
  if (!/^[\d\-]+$/.test(rut_profesor)) {
    Swal.fire({
    icon: 'error',
    title: 'Error en el RUT',
    text: 'El RUT debe contener solo números y guiones.',
  });
  return;
}
    if (rut_profesor.length > 12) {
      Swal.fire({
        icon: 'error',
        title: 'Error en el RUT',
        text: 'El RUT debe tener un máximo de 12 caracteres.',
      });
      return;
    }


    Axios.post('http://localhost:3001/createProfe', {
      rut_profesor: rut_profesor,
      nombre: nombre,
      contrato: contrato,
      correo: correo,
      password: password,
    })
      .then(() => {
        getProfesores();
        limpiarCampos();
        Swal.fire({
          title: '<strong>Registro exitoso</strong>',
          html: `<i>El profesor <strong>${nombre}</strong> fue registrado con éxito.</i>`,
          icon: 'success',
          timer: 3000,
        });
      })
      .catch((error) => {
        console.error('Error al registrar el profesor:', error);
    
        // Check if the error is due to a duplicate RUT
        if (error.response && error.response.status === 400 && error.response.data === 'El rut ya existe') {
          Swal.fire({
            icon: 'error',
            title: 'Error al registrar el profesor',
            text: 'El RUT ya está en uso. Por favor, elija otro RUT.',
          });
        } else {
          // Handle other errors
          Swal.fire({
            icon: 'error',
            title: 'Error al registrar el profesor',
            text: 'Ocurrió un error al registrar el profesor. Por favor, inténtelo nuevamente.',
          });
        }
      });
    
};

  const getProfesores = () => {
    Axios.get('http://localhost:3001/profesores2', {
      params: {
        searchTerm: search,
      },
    })
      .then((response) => {
        setProfesoresList(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener profesores:', error);
      });
  };

  useEffect(() => {
    getProfesores();
  }, [search]);

  const editarProfesores = (val) => {
    setRut_profesor(val.rut_profesor);
    setNombre(val.nombre);
    setContrato(val.contrato);
    setCorreo(val.correo);
    setId_profesor(val.id_profesor);
    setPassword(val.password);
    setEditar(true);
  };

  const update = () => {
    // Permitir letras y espacios en blanco en el nombre
    if (!/^[a-zA-Z\s]+$/.test(nombre)) {
      Swal.fire({
        icon: 'error',
        title: 'Error en el nombre',
        text: 'El nombre debe contener solo letras y espacios.',
      });
  return;
}

if (!/^[\d\-]+$/.test(rut_profesor)) {
  Swal.fire({
    icon: 'error',
    title: 'Error en el RUT',
    text: 'El RUT debe contener solo números y guiones.',
  });
  return;
}

    if (rut_profesor.length > 12) {
      Swal.fire({
        icon: 'error',
        title: 'Error en el RUT',
        text: 'El RUT debe tener un máximo de 12 caracteres.',
      });
      return;
    }

Axios.put('http://localhost:3001/updateProfe', {
  id_profesor: id_profesor,
  rut_profesor: rut_profesor,
  nombre: nombre,
  contrato: contrato,
  correo: correo,
  password: password,
})
  .then(() => {
    getProfesores();
    limpiarCampos();
    Swal.fire({
      title: '<strong>Actualización exitosa!!!</strong>',
      html: `<i>El profesor <strong>${nombre}</strong> fue actualizado con éxito.</i>`,
      icon: 'success',
      timer: 3000,
    });
  })
  .catch((error) => {
    console.error('Error al actualizar el profesor:', error);
  });
};

  const hideProfesor = (val) => {
    Swal.fire({
      icon: 'warning',
      title: 'Confirmar ocultar?',
      html: `<i>Realmente desea eliminar a <strong>${val.nombre}</strong>?</i>`,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.put(`http://localhost:3001/hideProfe/${val.id_profesor}`)
          .then((res) => {
            getProfesores();
            limpiarCampos();
            Swal.fire({
              title: '<strong>Eliminación exitosa!!!</strong>',
              html: `<i>El profesor <strong>${val.nombre}</strong> fue eliminado con éxito.</i>`,
              icon: 'success',
              timer: 2000,
            });
          })
          .catch((error) => {
            console.error('Error al ocultar el profesor:', error);
          });
      }
    });
  };

  const limpiarCampos = () => {
    setNombre('');
    setContrato('');
    setRut_profesor('');
    setPassword('');
    setId_profesor('');
    setCorreo ('');
    setEditar(false);
  };

  const exportarCSV = async () => {
    try {
      const response = await Axios.get('http://localhost:3001/exportar-profesores', {
        responseType: 'blob',
        timeout: 10000,
      });

      if (response.status === 200) {
        const blob = new Blob([response.data], { type: 'text/csv' });
        saveAs(blob, 'profesores_exportados.csv');
      } else {
        console.error('Error en la exportación CSV:', response.status);
      }
    } catch (error) {
      console.error('Error en la exportación CSV:', error);
    }
  };

  const filteredProfesores = profesoresList.filter(
    (profesor) =>
      profesor.nombre.toLowerCase().includes(search.toLowerCase()) || profesor.rut_profesor.includes(search)
  ).filter((profesor) => profesor.estado === 1); // Filtra solo profesores activos
  
  const formatRut = (rut_profesor) => {
    // Eliminar guiones existentes y cualquier otro caracter no numérico
    const cleanedRut = rut_profesor.replace(/[^\d]/g, '');
  
    // Separar los bloques de números con guiones
    const formattedRut = cleanedRut.replace(/(\d{1,8})(\d{1})/, '$1-$2');
  
    return formattedRut;
  };

  return (
    <div>

      <div className="formulario">
      <label>
          Rut{' '}
          <input
            type="text"
            className="form-control"
            placeholder="Ingrese rut"
            value={rut_profesor}
            onChange={(event) => {
              const rawRut = event.target.value.replace('-', ''); // Eliminar guiones existentes
              setRut_profesor(formatRut(rawRut));
            }}
            readOnly={editar} // Agregar readOnly
          />
        </label>
        <label>
          Nombre{' '}
          <input
            type="text"
            className="form-control"
            placeholder='Ingrese nombre'
            value={nombre}
            onChange={(event) => {
              setNombre(event.target.value);
            }}

          />
        </label>
        <label>
          Contrato{' '}
          <input
            type="text"
            className="form-control"
            placeholder='Ingrese contrato'
            value={contrato}
            onChange={(event) => {
              setContrato(event.target.value);
            }}
          />
        </label>
        <label>
          Correo{' '}
          <input
            type="text"
            className="form-control"
            placeholder='Ingrese correo'
            value={correo}
            onChange={(event) => {
              setCorreo(event.target.value);
            }}
          />
        </label>
        <label>
          Contraseña{' '}
          <input
            type="text"
            className="form-control"
            placeholder='Ingrese contraseña'
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            

            }}
            readOnly={editar} // Agregar readOnly
          />
        </label>
      </div>
      <div className="botones">
        {editar ? (
          <div>
            <button onClick={update}>Actualizar</button>
            <button onClick={limpiarCampos}>Cancelar</button>
          </div>
        ) : (
          <div>
            <button className="btn-exportar" onClick={exportarCSV}>
              Exportar CSV
            </button>
            <button onClick={add}>Registrar</button>
          </div>
        )}
      </div>

      <div className="contenedor-tabla">
        <div className="busqueda">
          <label>
            Búsqueda{' '}
            <input
              type="text"
              className="form-control"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
        </div>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>Rut</th>
              <th>Nombre</th>
              <th>Contrato</th>
              <th>Correo</th>
              <th>password</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProfesores.map((val, key) => (
              <tr key={key}>
                <td>{val.rut_profesor}</td>
                <td>{val.nombre}</td>
                <td>{val.contrato}</td>
                <td>{val.correo}</td>
                <td>{val.password}</td>
                <td>
                  {val.estado ? (
                    <div>
                      <button className="btn-editar" onClick={() => editarProfesores(val)}>
                        Editar
                      </button>
                      <button className="btn-eliminar" onClick={() => hideProfesor(val)}>
                        Ocultar
                      </button>
                    </div>
                  ) : (
                    <span>Inactivo</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;