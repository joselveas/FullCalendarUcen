import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { MOCK_EVENTS } from './EventsCalBIG';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
    const events = MOCK_EVENTS.map((event, index) => {
        return {
            title: event.title,
            start: moment(event.start).add(index * 30, 'minutes').toDate(),
            end: moment(event.end).add(index * 30, 'minutes').toDate(),
            color: event.color,
            descripcion: event.descripcion,
        };
    });

    const separacionDespuesDeLas935 = {
        title: 'Tiempo de Separación',
        start: moment('2023-11-28T09:35:00').toDate(),
        end: moment('2023-11-28T10:00:00').toDate(),
        color: '#FFFFFF',
    };

    events.push(separacionDespuesDeLas935);
    // Define la función para renderizar los intervalos de tiempo
    const CustomSlot = ({ value, children }) => (
        <div>
            {/* Personaliza el texto según el valor del intervalo */}
            {value === '8:15' && 'Inicio'}
            {value === '9:35' && 'Descanso'}
            {/* Agrega más personalización según sea necesario */}
            {children}
        </div>
    );

    // Define las etiquetas personalizadas para la columna de la izquierda
    const dayFormats = {
        dayHeaderFormat: (date, culture, localizer) => localizer.format(date, 'ddd', culture),
    };

    return (
        <div className='App' style={{ padding: '14px' }}>
            <Calendar
                localizer={{ ...localizer, formats: { ...localizer.formats, ...dayFormats } }}
                startAccessor='start'
                events={events}
                endAccessor='end'
                style={{
                    height: '1000px',
                }}
                eventPropGetter={(event) => ({
                    style: {
                        backgroundColor: event.color,
                        border: '1px solid gray',
                    },
                })}
                onSelectEvent={(event) => alert(event.title + '\n' + event.descripcion)}
                views={[Views.WEEK, Views.DAY, Views.MONTH]}
                defaultView={Views.WEEK}
                min={new Date(0, 0, 0, 8, 15, 0)}
                max={new Date(0, 0, 0, 23, 0, 0)}
                timeslots={8}
                step={10}
                defaultDate={new Date()}
                toolbar={false}
                selectable={true}
                resizable={true}
                popup={true}
                messages={{
                    next: 'Siguiente',
                    previous: 'Anterior',
                    today: 'Hoy',
                    month: 'Mes',
                    week: 'Semana',
                    day: 'Día',
                    agenda: 'Agenda',
                    date: 'Fecha',
                    time: 'Hora',
                    event: 'Evento',
                    showMore: (total) => `+ Ver más (${total})`,
                }}
            />
        </div>
    );
};

export default MyCalendar;
