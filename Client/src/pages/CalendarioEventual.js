import React from 'react'
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './event-utils'
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './Calendar.css'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Swal from 'sweetalert2';


export default class DemoApp extends React.Component {

  obtenerNumeroDia = (diaPalabra) => {
    const dias = {
      domingo: "2023-12-10",
      lunes: "2023-12-11",
      martes: "2023-12-12",
      miércoles: "2023-12-13",
      jueves: "2023-12-14",
      viernes: "2023-12-15",
      sábado: "2023-12-16",
    };

    const diaLowerCase = diaPalabra.trim().toLowerCase();

    return dias[diaLowerCase];
  };

  
  

  customSlotLabelContent = (slotInfo) => {
    const blockNumber = slotInfo.date.getHours() - 7; // Resta 7 para ajustar desde las 8:15
    const blockText = ``;
    return <span>{blockText}</span>;
  };
  customSlotLabelMount = (arg) => {
    const blockNumber = arg.date.getHours() - 7; // Resta 7 para ajustar desde las 8:15
    const blockText = ``;
    const label = document.createElement('div');
    label.innerHTML = `<span>${blockText}</span>`;
    arg.el.appendChild(label);
  };

  componentDidMount() {
    // Cargar eventos desde la API y establecerlos directamente en FullCalendar
    this.fetchEventsFromAPI().then(apiEvents => {
      console.log('Eventos cargados desde la API ARRIBA:', apiEvents);

      this.setState(prevState => ({
        currentEvents: [...prevState.currentEvents, ...apiEvents],
      }));

      // Filtrar eventos con el profesor seleccionado al cargar la página
      this.fetchAndFilterEventsFromAPI();
    });
  }
  componentDidUpdate(prevProps) {
    // Detectar cambios en las propiedades relacionadas con los filtros y realizar acciones si es necesario
    if (this.props.sala !== prevProps.sala || this.props.carrera !== prevProps.carrera || this.props.nivel !== prevProps.nivel || this.props.profesor !== prevProps.profesor || this.props.asignatura !== prevProps.asignatura || this.props.facultad !== prevProps.facultad || this.props.alumno !== prevProps.alumno) {
      // Realizar acciones, como recargar eventos con los nuevos filtros
      this.fetchAndFilterEventsFromAPI();
    }
  }

  fetchAndFilterEventsFromAPI = () => {
    const {
      sala,
      carrera,
      nivel,
      profesor: filterProfesor, // Usar el valor del filtro directamente
      asignatura,
      facultad,
      color,
      alumno : filterAlumno,  
      
      
    } = this.props;
    const { selectedProfesor } = this.state; // Obtén el valor de selectedProfesor del estado
    const { selectedAlumno } = this.state; // Obtén el valor de selectedAlumno del estado

    fetch('http://localhost:3001/eventosPREVIO')
      .then((response) => response.json())
      .then((eventos) => {
                // Mapear los eventos para que se ajusten al formato esperado por FullCalendar
                const formattedEvents = eventos.map((event) => {
                  const fecha = this.obtenerNumeroDia(event.fecha);
                  const start = `${fecha}T${event.start}`;
                  const end = `${fecha}T${event.end}`;
        
                  return {
                    id: event.id_evento,
                    bloque: event.id_horario,
                    title: event.nombre_asignatura,
                    start,
                    end,
                    id_sala: event.id_sala,
                    cupos: event.cupos,
                    seccion: event.seccion,
                    id_asignatura: event.id_asignatura,
                    fecha,
                    nivel: event.id_nivel,
                    profesor: event.id_profesor,
                    profesor_nombre: event.nombre_profesor,
                    alumno: event.id_alumno,
                    alumno_nombre: event.nombre_alumno,
                    color: event.cancelado,
                  };
                });
                console.log('Eventos ANTES del filtro de asignatura:', formattedEvents);

                const filteredEvents = formattedEvents.filter((event) => {
                  const eventAsignatura = event.id_asignatura.toString(); // Convertir a cadena para comparación
                  const isSelectedAsignatura = !asignatura || eventAsignatura === asignatura;
                  const eventNivel = event.nivel.toString(); // Convertir a cadena para comparación
                  const isSelectedNivel = !nivel || eventNivel === nivel;
                  const eventProfesor = event.profesor.toString(); // Convertir a cadena para comparación
                  const isSelectedProfesor =
                      (!selectedProfesor && !filterProfesor) ||
                      (selectedProfesor && eventProfesor === selectedProfesor.toString()) ||
                      (filterProfesor && eventProfesor === filterProfesor.toString());
                  const eventAlumno = event.alumno.toString(); // Convertir a cadena para comparación
                  const isSelectedAlumno =
                      (!selectedAlumno && !filterAlumno) ||
                      (selectedAlumno && eventAlumno === selectedAlumno.toString()) ||
                      (filterAlumno && eventAlumno === filterAlumno.toString());
                  return (
                    (!sala || event.id_sala === sala) &&
                    (!carrera || event.id_carrera === carrera) &&
                    isSelectedNivel &&
                    isSelectedProfesor &&
                    isSelectedAsignatura &&
                    (!facultad || event.id_facultad === facultad) &&
                    isSelectedAlumno
                    
                  );
                });
                
        console.log('Eventos después del filtro de asignatura:', filteredEvents);


        this.setState({
          currentEvents: filteredEvents,
        });
        console.log('filtro', filteredEvents);
      })
      .catch((error) => {
        console.error('Error al obtener eventos desde la API:', error);
      });
  };
    
  
    // Función para manejar cambios en los filtros
    handleFilterChange = () => {
      // Llamar a la función para obtener y filtrar eventos desde la API
      this.fetchAndFilterEventsFromAPI();
    };
    
  
  

  state = {
    weekendsVisible: true,
    currentEvents: [],
    showModal: false, // Nueva propiedad para manejar la visibilidad del modal
    selectedEvent: null,
    selectedProfesor: this.props.idProfesor || null,
    selectedAlumno: this.props.idAlumno || null,
  }
  render() {
    console.log("profesor traido LOGIN:", this.props.idProfesor); // Cambia a this.props
    console.log("profesorCalendario:", this.props.Calendarioprofesor); // Cambia a this.props
    return (
    
      <div className='demo-app'>
        
        {/* {this.renderSidebar()} */}
        <div className='demo-app-main'>
        
          <FullCalendar
          
          sala={this.state.selectedSala}
          carrera={this.state.selectedCarrera}
          nivel={this.state.selectedNivel}
          profesor={this.state.selectedProfesor}
          asignatura={this.state.selectedAsignatura}
          facultad={this.state.selectedFacultad}
          alumno={this.state.selectedAlumno}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, bootstrap5Plugin]}
            headerToolbar={{
              left: '',
              center: '',
              right: ''
            }}
            locale={'es'}
            dayHeaderFormat={{ weekday: 'long' }}
            firstDay={1}
            height={"90vh"}
            initialView='timeGridWeek'
            hiddenDays={[0]}
            editable={!this.props.idAlumno}
            eventDrop={this.handleEventDrop} // Agrega el manejador de eventos para el cambio de posición
            selectable={false}
            selectMirror={true}
            dayMaxEvents={true}
            
            slotLabelContent={this.customSlotLabelContent}
            themeSystem='bootstrap5'
            weekends={this.state.weekendsVisible}
            events={[...INITIAL_EVENTS, ...this.state.currentEvents]} // alternatively, use the `events` setting to fetch from a feed
            
            select={false}
            eventContent={renderEventContent} // custom render function
            eventClick={this.handleEventClick}
            //eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
            allDaySlot={false}

            //slotLabelDidMount={this.customSlotLabelMount}
            slotLabelInterval={'01:20:00'} // Intervalo de los bloques
            slotDuration={"00:10:00"}
            slotMinTime='08:15:00' // Hora de inicio
            slotMaxTime='23:00:00' // Hora de fin
                        
          // Agregar un eventRender para modificar visualmente los bloques
          //eventRender={this.adjustEventRendering}
            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
          />
        </div>
        {this.renderEventModal()}
      </div>
    )
  }
  
  adjustEventRendering = (info) => {
    // Realizar ajustes visuales a los eventos
    const eventStart = info.event.start;
    const eventEnd = info.event.end;
  }  

  renderEventModal() {
    const { showModal, selectedEvent } = this.state;
  
    if (!showModal || !selectedEvent) {
      return null; // No hay evento seleccionado, no renderizar el modal
    }
  
    const isRecreo = selectedEvent.title === 'RECREO';
  
    return (
      <Modal show={showModal} onHide={this.handleCloseModal}>
        <Modal.Header>
          <Modal.Title>{selectedEvent.title}</Modal.Title>
          <Button variant="secondary" onClick={this.handleCloseModal}>
            <i className="fas fa-times"></i> Cerrar
          </Button>
        </Modal.Header>
        <Modal.Body>
          {/* Agrega una condición para mostrar el contenido solo si idAlumno e idProfesor son nulos */}
          {(!this.props.idAlumno && !this.props.idProfesor) && (
            <>
              {isRecreo ? (
                <p>¡Es hora de descansar!</p>
              ) : (
                <>
                  <p><strong>Nombre Asignatura:</strong> {selectedEvent.title}</p>
                  <p><strong>ID Asignatura:</strong> {selectedEvent.extendedProps.id_asignatura}</p>
                  <p><strong>Carrera 1:</strong> {selectedEvent.extendedProps.id_asignatura}</p>
                  <p><strong>Carrera 2:</strong> {selectedEvent.extendedProps.id_asignatura}</p>
                  <p><strong>ID de Sala:</strong> {selectedEvent.extendedProps.id_sala}</p>
                  <p><strong>Sección:</strong> {selectedEvent.extendedProps.seccion}</p>
                  <p><strong>Cupos:</strong> {selectedEvent.extendedProps.cupos}</p>
                  <p><strong>Bloque:</strong> {selectedEvent.extendedProps.bloque}</p>
                  {/* Agrega más detalles según tus necesidades */}
                </>
              )}
            </>
          )}
        </Modal.Body>
        {!isRecreo && (!this.props.idAlumno) && (
          <Modal.Footer>
            <Button variant="danger" onClick={this.handleCancelEvent}>
              Cancelar Clase
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    );
  }
  
  
  

  fetchEventsFromAPI() {
    function obtenerNumeroDia(diaPalabra) {
      const dias = {
        domingo: "2023-12-10",
        lunes: "2023-12-11",
        martes: "2023-12-12",
        miércoles: "2023-12-13",
        jueves: "2023-12-14",
        viernes: "2023-12-15",
        sábado: "2023-12-16",
      };
  
      // Convertir a minúsculas y eliminar posibles espacios extra al inicio y al final
      const diaLowerCase = diaPalabra.trim().toLowerCase();
  
      return dias[diaLowerCase];
    }
  
    return fetch('http://localhost:3001/eventos')
      .then(response => response.json())
      .then(eventos => {
        if (!Array.isArray(eventos)) {
          console.error('La respuesta de la API no es un array:', eventos);
          return []; // Devolver un array vacío si no es un array
        }
        console.log('Datos originales de la API:', eventos);
  
        // Mapear los eventos para que se ajusten al formato esperado por FullCalendar
        return eventos.map(event => {
          const fecha = obtenerNumeroDia(event.fecha);
          const start = `${fecha}T${event.start}`;
          const end = `${fecha}T${event.end}`;
  
          return {
            id: event.id_evento,
            bloque: event.id_horario,
            title: event.nombre_asignatura,
            start,
            end,
            id_sala: event.id_sala,
            cupos: event.cupos,
            seccion: event.seccion,
            id_asignatura: event.id_asignatura,
            fecha,
            nivel: event.id_nivel,
            profesor: event.id_profesor,
            profesor_nombre: event.nombre_profesor,
          };
        });
      })
      .catch(error => {
        console.error('Error al obtener eventos desde la API:', error);
        return []; // Devolver un array vacío en caso de error
      });
  }

  // Función para obtener el día de la semana a partir de una cadena de fecha
getDayOfWeek = (dateString) => {
  const daysOfWeek = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  const date = new Date(dateString);
  const dayOfWeek = daysOfWeek[date.getUTCDay()];
  return dayOfWeek;
};

  
  handleEventDrop = async (dropInfo) => {
    const { event } = dropInfo;
  
    // Verificar si el evento es un "Recreo" o si idAlumno tiene un valor
    if (event.title === '' || this.props.idAlumno) {
      return; // No hacer nada si es un "Recreo" o idAlumno tiene un valor
    }
  
    // Cambiar el color del evento
    event.setProp('backgroundColor', 'orange'); // Reemplaza 'tuNuevoColor' con el color deseado
  
    // Obtener datos del evento
    const idHorario = this.mapStartToBloque(event.start);
    const fechaSinHora = event.start.toISOString().split('T')[0]; // Obtener la fecha sin la parte de la hora
    const fecha = this.getDayOfWeek(fechaSinHora); // Obtener el día de la semana
    const eventData = {
      id_evento: event.id,
      id_horario: idHorario,
      id_sala: event.extendedProps.id_sala,
      seccion: event.extendedProps.seccion,
      id_asignatura: event.extendedProps.id_asignatura,
      nivel: event.extendedProps.nivel,
      fecha: fecha,
      id_profesor: this.props.idProfesor,
      tipo_solicitud: "Cambio hora de clase",
      estado: "Pendiente",
      
    };
  
    console.log('Datos del evento:', eventData); // Agrega esta línea para imprimir los datos en la consola
    // Realizar una solicitud a tu servidor para guardar en la nueva tabla
    try {
      const response = await axios.post('http://localhost:3001/solicitudes', eventData);
      console.log('Respuesta del servidor:', response.data);
    } catch (error) {
      console.error('Error al guardar el evento en la nueva tabla:', error);
    }
  };

  
  // Función para mapear el start a id_horario
  mapStartToBloque = (start) => {
    const horaInicio = new Date(start).getHours();
    switch (horaInicio) {
      case 8:
        return 1;
      case 9:
        return 2;
      case 11:
        return 3;
      case 12:
        return 4;
      case 14:
        return 5;
      case 15:
        return 6;
      case 17:
        return 7;
      case 18:
        return 8;
      case 20:
        return 9;
      case 21:
        return 10;
      default:
        return 0; // Valor predeterminado o manejo de errores
    }
  };
  

  

  handleCloseModal = () => {
    this.setState({
      showModal: false,
      selectedEvent: null,
    });
  }

  


  handleEventClick = (clickInfo) => {
    const selectedEvent = clickInfo.event;
  
    // Verificar si el evento es un "Recreo" o si idAlumno tiene un valor
    if (selectedEvent.title === '' || this.props.idAlumno) {
      return; // No hacer nada si es un "Recreo" o idAlumno tiene un valor
    }
  
    this.setState({
      showModal: true,
      selectedEvent,
    });
  }

  handleCancelEvent = async (info) => {
    const { selectedEvent } = this.state;
  
    // Mostrar SweetAlert para confirmar la cancelación
    const result = await Swal.fire({
      title: `¿Estás seguro de cancelar la clase de "${selectedEvent.title}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'Cancelar',
    });
  
    if (result.isConfirmed) {
      try {
        // Realizar la solicitud al servidor para cancelar el evento
        await axios.put(`http://localhost:3001/cancelarEvento/${selectedEvent.id}`);
  
        // Cambiar el color a rojo y marcar como cancelado en la interfaz de usuario
        selectedEvent.setProp('backgroundColor', 'red');
  
        // Actualizar el estado local para marcar el evento como cancelado
        this.setState(
          (prevState) => ({
            currentEvents: prevState.currentEvents.map((event) => {
              if (event.id === selectedEvent.id) {
                return { ...event, cancelado: 'red' };
              }
              return event;
            }),
            showModal: false,
            selectedEvent: null,
          }),
          () => {
            // Mostrar notificación con SweetAlert
            Swal.fire({
              icon: 'success',
              title: 'Evento cancelado',
              text: `La clase de "${selectedEvent.title}" ha sido cancelada.`,
            });
          }
        );
      } catch (error) {
        console.error('Error al cancelar el evento:', error);
        // Mostrar notificación de error con SweetAlert
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al cancelar el evento. Por favor, inténtalo de nuevo.',
        });
      }
    }
  };





  

  handleDeleteEvent = () => {
    const { selectedEvent } = this.state;
    if (window.confirm(`¿Estás seguro de eliminar el evento "${selectedEvent.title}"?`)) {
      selectedEvent.remove();
      this.setState({
        showModal: false,
        selectedEvent: null,
      });
    }
  }

  


  handleEvents = (events) => {   
    this.setState({
      currentEvents: events

    })
  }
}
// Renderiza el contenido de los eventos
function renderEventContent(eventInfo) {
  return (
    <>
      <b className='grid height:50px'>{eventInfo.timeText}</b>
      {eventInfo.event.title && ( // Verifica si el título no está vacío
        <>
          <i className='grid height:50px'>{eventInfo.event.title}</i>
          <p>Sección: {eventInfo.event.extendedProps.seccion}</p>
          <p>Sala: {eventInfo.event.extendedProps.id_sala}</p>
          <p>Bloque: {eventInfo.event.extendedProps.bloque}</p>
        </>
      )}
    </>
  );
}




 
/*
function renderSidebarEvent(event, index) {
  return (
    <div className='grid'>
    <li key={`${event.id}-${index}`}>
      <b>{formatDate(event.start, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
      <i>{`Asignatura: ${event.title}`}</i>
      <i className='grid'>{`Sala: ${event.id_sala}  | Sección: ${event.seccion}`}</i>
      <i className='grid'>{`Hora Inicio: ${event.start}  | Hora Fin: ${event.end}`}</i>
      <div className='cuad'></div>
    </li>
    </div>
  );
}
*/

