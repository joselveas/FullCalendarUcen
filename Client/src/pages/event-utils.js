let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

let eventGuidCounter = 0;

export function createEventId() {
  eventGuidCounter++;
  return String(Date.now() + eventGuidCounter);
}



export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    start: '2023-12-11T09:35:00',
    end: '2023-12-11T09:45:00',
    allDay: false,
    color: '#ff7474', // Ajusta el color según tus necesidades
    editable: false,
  },

  {
    id: createEventId(),
    title: '',
    start: '2023-12-16T09:35:00',
    end: '2023-12-16T09:45:00',
    allDay: false,
    color: 'red', // Ajusta el color según tus necesidades
    editable: false,
  },
  {
    id: createEventId(),
    title: '',
    start: '2023-12-12T09:35:00',
    end: '2023-12-12T09:45:00',
    allDay: false,
    color: 'red', // Ajusta el color según tus necesidades
    editable: false,
  },
  {
    id: createEventId(),
    title: '',
    start: '2023-12-13T09:35:00',
    end: '2023-12-13T09:45:00',
    allDay: false,
    color: 'red', // Ajusta el color según tus necesidades
    editable: false,
  },
  {
    id: createEventId(),
    title: '',
    start: '2023-12-14T09:35:00',
    end: '2023-12-14T09:45:00',
    allDay: false,
    color: 'red', // Ajusta el color según tus necesidades
    editable: false,
  },
  {
    id: createEventId(),
    title: '',
    start: '2023-12-15T09:35:00',
    end: '2023-12-15T09:45:00',
    allDay: false,
    color: 'red', // Ajusta el color según tus necesidades
    editable: false,
  },
  
  {
    id: createEventId(),
    title: '',
    start: '2023-12-11T11:05:00',
    end: '2023-12-11T11:15:00',
    allDay: false,
    color: 'red', // Ajusta el color según tus necesidades
    editable: false,
  },
  {
    id: createEventId(),
    title: '',
    start: '2023-12-12T11:05:00',
    end: '2023-12-12T11:15:00',
    allDay: false,
    color: 'red', // Ajusta el color según tus necesidades
    editable: false,
  },
  {
    id: createEventId(),
    title: '',
    start: '2023-12-13T11:05:00',
    end: '2023-12-13T11:15:00',
    allDay: false,
    color: 'red', // Ajusta el color según tus necesidades
    editable: false,
  },
  {
    id: createEventId(),
    title: '',
    start: '2023-12-14T11:05:00',
    end: '2023-12-14T11:15:00',
    allDay: false,
    color: 'red', // Ajusta el color según tus necesidades
    editable: false,
  },
  {
    id: createEventId(),
    title: '',
    start: '2023-12-15T11:05:00',
    end: '2023-12-15T11:15:00',
    allDay: false,
    color: 'red', // Ajusta el color según tus necesidades
    editable: false,
  },
  {
    id: createEventId(),
    title: '',
    start: '2023-12-16T11:05:00',
    end: '2023-12-16T11:15:00',
    allDay: false,
    color: 'red', // Ajusta el color según tus necesidades
    editable: false,
  },
  {
    id: createEventId(),
    title: '',
    start: '2023-12-11T12:35:00',
    end: '2023-12-11T12:45:00',
    allDay: false,
    color: 'red', // Ajusta el color según tus necesidades
    editable: false,
  },
  {
    id: createEventId(),
    title: '',
    start: '2023-12-12T12:35:00',
    end: '2023-12-12T12:45:00',
    allDay: false,
    color: 'red', // Ajusta el color según tus necesidades
    editable: false,
  },
  {
    id: createEventId(),
    title: '',
    start: '2023-12-13T12:35:00',
    end: '2023-12-13T12:45:00',
    allDay: false,
    color: 'red', // Ajusta el color según tus necesidades
    editable: false,
  },
  {
    id: createEventId(),
    title: '',
    start: '2023-12-14T12:35:00',
    end: '2023-12-14T12:45:00',
    allDay: false,
    color: 'red', // Ajusta el color según tus necesidades
    editable: false,
  },
  {
    id: createEventId(),
    title: '',
    start: '2023-12-15T12:35:00',
    end: '2023-12-15T12:45:00',
    allDay: false,
    color: 'red', // Ajusta el color según tus necesidades
    editable: false,
  },
  {
    id: createEventId(),
    title: '',
    start: '2023-12-16T12:35:00',
    end: '2023-12-16T12:45:00',
    allDay: false,
    color: 'red', // Ajusta el color según tus necesidades
    editable: false,
  }
  /////////////////////////////////////
  ,
  {
    id: createEventId(),
    title: '',
    start: '2023-12-11T14:05:00',
    end: '2023-12-11T14:15:00',
    allDay: false,
    color: 'red', // Ajusta el color según tus necesidades
    editable: false,
  },
  {
    id: createEventId(),
    title: '',
    start: '2023-12-12T14:05:00',
    end: '2023-12-12T14:15:00',
    allDay: false,
    color: 'red', // Ajusta el color según tus necesidades
    editable: false,
  },
  {
    id: createEventId(),
    title: '',
    start: '2023-12-13T14:05:00',
    end: '2023-12-13T14:15:00',
    allDay: false,
    color: 'red', // Ajusta el color según tus necesidades
    editable: false,
  },
  {
    id: createEventId(),
    title: '',
    start: '2023-12-14T14:05:00',
    end: '2023-12-14T14:15:00',
    allDay: false,
    color: 'red', // Ajusta el color según tus necesidades
    editable: false,
  },
  {
    id: createEventId(),
    title: '',
    start: '2023-12-15T14:05:00',
    end: '2023-12-15T14:15:00',
    allDay: false,
    color: 'red', // Ajusta el color según tus necesidades
    editable: false,
  },
  {
    id: createEventId(),
    title: '',
    start: '2023-12-16T14:05:00',
    end: '2023-12-16T14:15:00',
    allDay: false,
    color: 'red', // Ajusta el color según tus necesidades
    editable: false,
  },
    /////////////////////////////////////
    {
      id: createEventId(),
      title: '',
      start: '2023-12-11T15:35:00',
      end: '2023-12-11T15:45:00',
      allDay: false,
      color: 'red', // Ajusta el color según tus necesidades
      editable: false,
    },
    {
      id: createEventId(),
      title: '',
      start: '2023-12-12T15:35:00',
      end: '2023-12-12T15:45:00',
      allDay: false,
      color: 'red', // Ajusta el color según tus necesidades
      editable: false,
    },
    {
      id: createEventId(),
      title: '',
      start: '2023-12-13T15:35:00',
      end: '2023-12-13T15:45:00',
      allDay: false,
      color: 'red', // Ajusta el color según tus necesidades
      editable: false,
    },
    {
      id: createEventId(),
      title: '',
      start: '2023-12-14T15:35:00',
      end: '2023-12-14T15:45:00',
      allDay: false,
      color: 'red', // Ajusta el color según tus necesidades
      editable: false,
    },
    {
      id: createEventId(),
      title: '',
      start: '2023-12-15T15:35:00',
      end: '2023-12-15T15:45:00',
      allDay: false,
      color: 'red', // Ajusta el color según tus necesidades
      editable: false,
    },
    {
      id: createEventId(),
      title: '',
      start: '2023-12-16T15:35:00',
      end: '2023-12-16T15:45:00',
      allDay: false,
      color: 'red', // Ajusta el color según tus necesidades
      editable: false,
    },
    /////////////////////////////////////
    {
      id: createEventId(),
      title: '',
      start: '2023-12-11T17:05:00',
      end: '2023-12-11T17:15:00',
      allDay: false,
      color: 'red', // Ajusta el color según tus necesidades
      editable: false,
    },
    {
      id: createEventId(),
      title: '',
      start: '2023-12-12T17:05:00',
      end: '2023-12-12T17:15:00',
      allDay: false,
      color: 'red', // Ajusta el color según tus necesidades
      editable: false,
    },
    {
      id: createEventId(),
      title: '',
      start: '2023-12-13T17:05:00',
      end: '2023-12-13T17:15:00',
      allDay: false,
      color: 'red', // Ajusta el color según tus necesidades
      editable: false,
    },
    {
      id: createEventId(),
      title: '',
      start: '2023-12-14T17:05:00',
      end: '2023-12-14T17:15:00',
      allDay: false,
      color: 'red', // Ajusta el color según tus necesidades
      editable: false,
    },
    {
      id: createEventId(),
      title: '',
      start: '2023-12-15T17:05:00',
      end: '2023-12-15T17:15:00',
      allDay: false,
      color: 'red', // Ajusta el color según tus necesidades
      editable: false,
    },
    {
      id: createEventId(),
      title: '',
      start: '2023-12-16T17:05:00',
      end: '2023-12-16T17:15:00',
      allDay: false,
      color: 'red', // Ajusta el color según tus necesidades
      editable: false,
    },
        /////////////////////////////////////
        {
          id: createEventId(),
          title: '',
          start: '2023-12-11T18:35:00',
          end: '2023-12-11T18:50:00',
          allDay: false,
          color: 'red', // Ajusta el color según tus necesidades
          editable: false,
        },
        {
          id: createEventId(),
          title: '',
          start: '2023-12-12T18:35:00',
          end: '2023-12-12T18:50:00',
          allDay: false,
          color: 'red', // Ajusta el color según tus necesidades
          editable: false,
        },
        {
          id: createEventId(),
          title: '',
          start: '2023-12-13T18:35:00',
          end: '2023-12-13T18:50:00',
          allDay: false,
          color: 'red', // Ajusta el color según tus necesidades
          editable: false,
        },
        {
          id: createEventId(),
          title: '',
          start: '2023-12-14T18:35:00',
          end: '2023-12-14T18:50:00',
          allDay: false,
          color: 'red', // Ajusta el color según tus necesidades
          editable: false,
        },
        {
          id: createEventId(),
          title: '',
          start: '2023-12-15T18:35:00',
          end: '2023-12-15T18:50:00',
          allDay: false,
          color: 'red', // Ajusta el color según tus necesidades
          editable: false,
        },
        {
          id: createEventId(),
          title: '',
          start: '2023-12-16T18:35:00',
          end: '2023-12-16T18:50:00',
          allDay: false,
          color: 'red', // Ajusta el color según tus necesidades
          editable: false,
        },
                /////////////////////////////////////
                {
                  id: createEventId(),
                  title: '',
                  start: '2023-12-11T20:10:00',
                  end: '2023-12-11T20:15:00',
                  allDay: false,
                  color: 'red', // Ajusta el color según tus necesidades
                  editable: false,
                },
                {
                  id: createEventId(),
                  title: '',
                  start: '2023-12-12T20:10:00',
                  end: '2023-12-12T20:15:00',
                  allDay: false,
                  color: 'red', // Ajusta el color según tus necesidades
                  editable: false,
                },
                {
                  id: createEventId(),
                  title: '',
                  start: '2023-12-13T20:10:00',
                  end: '2023-12-13T20:15:00',
                  allDay: false,
                  color: 'red', // Ajusta el color según tus necesidades
                  editable: false,
                },
                {
                  id: createEventId(),
                  title: '',
                  start: '2023-12-14T20:10:00',
                  end: '2023-12-14T20:15:00',
                  allDay: false,
                  color: 'red', // Ajusta el color según tus necesidades
                  editable: false,
                },
                {
                  id: createEventId(),
                  title: '',
                  start: '2023-12-15T20:10:00',
                  end: '2023-12-15T20:15:00',
                  allDay: false,
                  color: 'red', // Ajusta el color según tus necesidades
                  editable: false,
                },
                {
                  id: createEventId(),
                  title: '',
                  start: '2023-12-16T20:10:00',
                  end: '2023-12-16T20:15:00',
                  allDay: false,
                  color: 'red', // Ajusta el color según tus necesidades
                  editable: false,
                },
  /////////////////////////////////////
  {
    id: createEventId(),
    title: '',
    start: '2023-12-11T21:35:00',
    end: '2023-12-11T21:40:00',
    allDay: false,
    color: 'red', // Ajusta el color según tus necesidades
    editable: false,
  },
  {
    id: createEventId(),
    title: '',
    start: '2023-12-12T21:35:00',
    end: '2023-12-12T21:40:00',
    allDay: false,
    color: 'red', // Ajusta el color según tus necesidades
    editable: false,
  },
  {
    id: createEventId(),
    title: '',
    start: '2023-12-13T21:35:00',
    end: '2023-12-13T21:40:00',
    allDay: false,
    color: 'red', // Ajusta el color según tus necesidades
    editable: false,
  },
  {
    id: createEventId(),
    title: '',
    start: '2023-12-14T21:35:00',
    end: '2023-12-14T21:40:00',
    allDay: false,
    color: 'red', // Ajusta el color según tus necesidades
    editable: false,
  },
  {
    id: createEventId(),
    title: '',
    start: '2023-12-15T21:35:00',
    end: '2023-12-15T21:40:00',
    allDay: false,
    color: 'red', // Ajusta el color según tus necesidades
    editable: false,
  },
  {
    id: createEventId(),
    title: '',
    start: '2023-12-16T21:35:00',
    end: '2023-12-16T21:40:00',
    allDay: false,
    color: 'red', // Ajusta el color según tus necesidades
    editable: false,
  },

  
]






