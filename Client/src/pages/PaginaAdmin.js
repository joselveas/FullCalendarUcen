import React,{ useState } from 'react';
import { Link } from 'react-router-dom';
import './estilos.css';
import ProfeCrud from './ProfeCrud';
import Filtros from './Filtros';
import csv from './csv.png'
import calendario from './calendario.png'
import agregar_contacto from './agregar_contacto.png'
import conversacion from './conversacion.png'
import AlumnoCrud from './AlumnoCrud';
import graduado from './graduado.png'
import profesor from './profesor.png'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




/* <Filtros />*/

function Admins() {
  const [showDiv7, setShowDiv7] = useState(true);
  const [showDiv7_5, setShowDiv7_5] = useState(false);
  const [showDiv8, setShowDiv8] = useState(true);//listado horarios}
  const [showDiv8_5, setShowDiv8_5] = useState(false);
  const [showDiv9, setShowDiv9] = useState(true); //csv
  const [showDiv10, setShowDiv10] = useState(true); //solicitudes
  const [showDiv11, setShowDiv11] = useState(true);
  const [showDiv11_5, setShowDiv11_5] = useState(false);
  const [showDiv12, setShowDiv12] = useState(true);//listado horarios
  const [showDiv12_5, setShowDiv12_5] = useState(false);//listado horarios
  const [showDiv13, setShowDiv13] = useState(true); //csv
  const [showDiv14, setShowDiv14] = useState(true); //solicitudes
  const [showDiv15, setShowDiv15] = useState(true); //csv
  const [showDiv16, setShowDiv16] = useState(true); //solicitudes
  const [showDiv17, setShowDiv17] = useState(true); //listado horarios
  const [showDiv17_5, setShowDiv17_5] = useState(false); //listado horarios
  const [showDiv18, setShowDiv18] = useState(true);
  const [showDiv18_5, setShowDiv18_5] = useState(false);
  const [showFiltros, setShowFiltros] = useState(false);
  const [showProfeCrud, setShowProfeCrud] = useState(false);
  const [showAlumnoCrud, setShowAlumnoCrud] = useState(false);
  const [showSolicitudes, setShowSolicitudes] = useState(false);
  const [show2Crud, setShow2Crud] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:3001/logout');
      console.log(response.data.message); // Log the server response
  
      // You may want to redirect the user to the login page or perform other actions
      // For example:
       navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleDiv7Click = () => {
    setShowDiv7(false);
    setShowDiv7_5(false);
    setShowDiv8(false);//listado horarios
    setShowDiv8_5(false);//listado horarios
    setShowDiv9(false);//csv
    setShowDiv10(false);//solicitudes
    setShowDiv11(false);
    setShowDiv11_5(false);
    setShowDiv12(false);//listado horarios
    setShowDiv12_5(false);//listado horarios  
    setShowDiv13(false);//csv
    setShowDiv14(false);//solicitudes
    setShowDiv15(false);//csv
    setShowDiv16(false);//solicitudes
    setShowDiv17(false);//listado horarios
    setShowDiv17_5(false);//listado horarios
    setShowDiv18(false);
    setShowDiv18_5(false);
    setShowFiltros(false);
    setShowProfeCrud(false);
    setShowAlumnoCrud(true);
    setShowSolicitudes(false);
    setShow2Crud(false);
  };

  const handleDiv8Click = () => {
    setShowDiv7(false);
    setShowDiv7_5(false);
    setShowDiv8(false);//listado horarios
    setShowDiv8_5(false);//listado horarios
    setShowDiv9(false);//csv
    setShowDiv10(false);//solicitudes
    setShowDiv11(false);
    setShowDiv11_5(false);
    setShowDiv12(false);//listado horarios
    setShowDiv12_5(false);//listado horarios  
    setShowDiv13(false);//csv
    setShowDiv14(false);//solicitudes
    setShowDiv15(false);//csv
    setShowDiv16(false);//solicitudes
    setShowDiv17(false);//listado horarios
    setShowDiv17_5(false);//listado horarios
    setShowDiv18(false);
    setShowDiv18_5(false);
    setShowFiltros(true);
    setShowProfeCrud(false);
    setShowAlumnoCrud(false);
    setShowSolicitudes(false);
    setShow2Crud(false);
  };

  const handleDiv9Click = () => {
    setShowDiv7(false);
    setShowDiv7_5(false);
    setShowDiv8(false);//listado horarios
    setShowDiv8_5(false);//listado horarios
    setShowDiv9(false);//csv
    setShowDiv10(false);//solicitudes
    setShowDiv11(false);
    setShowDiv11_5(false);
    setShowDiv12(false);//listado horarios 
    setShowDiv12_5(false);//listado horarios 
    setShowDiv13(false);//csv
    setShowDiv14(false);//solicitudes
    setShowDiv15(false);//csv
    setShowDiv16(false);//solicitudes
    setShowDiv17(false);//listado horarios
    setShowDiv17_5(false);//listado horarios
    setShowDiv18(false);
    setShowDiv18_5(false);
    setShowFiltros(false);
    setShowProfeCrud(true);
    setShowAlumnoCrud(false);
    setShowSolicitudes(false);
    setShow2Crud(false);
  };

  const handleDiv10Click = () => {
    setShowDiv7(false);
    setShowDiv7_5(false);
    setShowDiv8(false);//listado horarios
    setShowDiv8_5(false);//listado horarios
    setShowDiv9(false);//csv
    setShowDiv10(false);//solicitudes
    setShowDiv11(false);
    setShowDiv11_5(false);
    setShowDiv12(false);//listado horarios
    setShowDiv12_5(false);//listado horarios  
    setShowDiv13(false);//csv
    setShowDiv14(false);//solicitudes
    setShowDiv15(false);//csv
    setShowDiv16(false);//solicitudes
    setShowDiv17(false);//listado horarios
    setShowDiv17_5(false);//listado horarios
    setShowDiv18(false);
    setShowDiv18_5(false);
    setShowFiltros(false);
    setShowProfeCrud(false);
    setShowAlumnoCrud(false);
    setShowSolicitudes(true);
    setShow2Crud(false);
  };
  const handleDosCrud = () => {
    setShowDiv7(false);
    setShowDiv7_5(true);
    setShowDiv8(false);//listado horarios
    setShowDiv8_5(true);//listado horarios
    setShowDiv9(false);//csv
    setShowDiv10(false);//solicitudes
    setShowDiv11(false);
    setShowDiv11_5(true);
    setShowDiv12(false);//listado horarios
    setShowDiv12_5(true);//listado horarios  
    setShowDiv13(false);//csv
    setShowDiv14(false);//solicitudes
    setShowDiv15(false);//csv
    setShowDiv16(false);//solicitudes
    setShowDiv17(false);//listado horarios
    setShowDiv17_5(true);//listado horarios
    setShowDiv18(false);
    setShowDiv18_5(true);
    setShowFiltros(false);
    setShowProfeCrud(false);
    setShowAlumnoCrud(false);
    setShowSolicitudes(false);
    setShow2Crud(false);
  };

  const handleVolverInicioClick = () => {
    setShowDiv7(true);
    setShowDiv7_5(false);
    setShowDiv8(true);
    setShowDiv8_5(false);
    setShowDiv9(true);
    setShowDiv10(true);
    setShowDiv11(true);
    setShowDiv11_5(false);
    setShowDiv12(true);
    setShowDiv12_5(false);
    setShowDiv13(true);
    setShowDiv14(true);
    setShowDiv15(true);
    setShowDiv16(true);
    setShowDiv17(true);
    setShowDiv17_5(false);
    setShowDiv18(true);
    setShowDiv18_5(false);
    setShowFiltros(false);
    setShowProfeCrud(false);
    setShowAlumnoCrud(false);
    setShowSolicitudes(false);
    setShow2Crud(false);
  };
  
return (
<div className="parent">
<div className="div1"></div>
<div className="div2"><button className="buttonInicio" onClick={handleVolverInicioClick}>
<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>
  Volver Inicio
</button> <button className="buttonInicio">
<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"/></svg>
  Notificaciones
</button> </div>
<div className="div3"><button className="BtnCerrarS" onClick={handleLogout}>
  
  <div className="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
  
  <div className="textCerrarS">Cerrar Sesion</div>
</button> </div>
<div className={`div4`}>{/* Contenido del div4 */}{showFiltros ? (<Filtros />) : showProfeCrud ? (<ProfeCrud />) :showAlumnoCrud ? (<AlumnoCrud />):showSolicitudes ? (/*Cambiar a pagina solicitudes*/<ProfeCrud />) : null} 
      </div>
<div className="div5"> </div>
<div className="div6"><button id="btn-message" className="button-message">
	<div className="content-avatar">
		<div className="status-user"></div>
		<div className="avatar">
			<svg className="user-img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,12.5c-3.04,0-5.5,1.73-5.5,3.5s2.46,3.5,5.5,3.5,5.5-1.73,5.5-3.5-2.46-3.5-5.5-3.5Zm0-.5c1.66,0,3-1.34,3-3s-1.34-3-3-3-3,1.34-3,3,1.34,3,3,3Z"></path></svg>
		</div>
	</div>
	<div className="notice-content">
		<div className="username">Mario Ortiz</div>
		<div className="lable-message">Administrador<span className="number-message"></span></div>
		<div className="user-id"></div>
	</div>
</button></div>
<div className={`div7 ${showDiv7 ? '' : 'fade-out'}`} onClick={handleDosCrud}>{}</div>
<div id='2do' className={`div7_5 ${showDiv7_5 ? '' : 'fade-out'}`} onClick={handleDiv7Click /*Alumno*/}>{}</div>
<div className={`div8 ${showDiv8 ? '' : 'fade-out'}`} onClick={handleDiv8Click}>{/* Contenido del div8 */}</div>
<div className={`div8_5 ${showDiv8_5 ? '' : 'fade-out'}`} onClick={handleDiv9Click/*Profesores*/}>{/* Contenido del div8 */}</div>
<div className={`div9 ${showDiv9 ? '' : 'fade-out'}`} onClick={handleDiv9Click/*Exportar/importar CSV*/}>{}</div>
<div className={`div10 ${showDiv10 ? '' : 'fade-out'}`} onClick={handleDiv10Click/*Solicitudes*/}>{}</div>
<div className={`div11 ${showDiv11 ? '' : 'fade-out'}`}onClick={handleDosCrud}>Crud{/* Contenido del div11 */}</div>
<div className={`div11_5 ${showDiv11_5 ? '' : 'fade-out'}`}onClick={handleDiv7Click /*Alumno*/}>Alumno{/* Contenido del div11 */}</div>
<div className={`div12 ${showDiv12 ? '' : 'fade-out'}`}onClick={handleDiv8Click}>Listado Horarios </div>
<div className={`div12_5 ${showDiv12_5 ? '' : 'fade-out'}`}onClick={handleDiv9Click/*Profesores*/}>Profesor </div>
<div className={`div13 ${showDiv13 ? '' : 'fade-out'}`}onClick={handleDiv9Click/*Exportar/importar CSV*/}>Exportar/importar CSV</div>
<div className={`div14 ${showDiv14 ? '' : 'fade-out'}`}onClick={handleDiv10Click/*Solicitudes*/}>{}Solicitudes</div>
<div className={`div15 ${showDiv15 ? '' : 'fade-out'}`}onClick={handleDiv9Click/*Exportar/importar CSV*/}><img src={csv}  alt="csv" className='imagencsv' /></div>
<div className={`div16 ${showDiv16 ? '' : 'fade-out'}`}onClick={handleDiv10Click/*Solicitudes*/}><img src={conversacion}  alt="conversacion" className='imagencsv' /></div>
<div className={`div17 ${showDiv17 ? '' : 'fade-out'}`}onClick={handleDiv8Click}><img src={calendario}  alt="calendario" className='imagencsv' /> </div>
<div className={`div17_5 ${showDiv17_5 ? '' : 'fade-out'}`}onClick={handleDiv9Click/*Profesores*/}><img src={profesor}  alt="profesor" className='imagencsv' /> </div>
<div className={`div18 ${showDiv18 ? '' : 'fade-out'}`}onClick={handleDosCrud}><img src={agregar_contacto}  alt="agregar_contacto" className='imagencsv'/>{/* Contenido del div18 */}</div>
<div className={`div18_5 ${showDiv18_5 ? '' : 'fade-out'}`}onClick={handleDiv7Click /*Alumno*/}><img src={graduado}  alt="alumnos" className='imagencsv'/>{/* Contenido del div18 */}</div>

<div className="div19">19 Notificaciones</div>
</div>
  );
}

export default Admins;