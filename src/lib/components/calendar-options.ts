import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import deLocale from '@fullcalendar/core/locales/de';

export const basicCalendarOptions = {
  allDayText: 'All-day',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  },
  initialView: 'timeGridWeek',
  plugins: [timeGridPlugin, dayGridPlugin, interactionPlugin],
  height: '100%',
  handleWindowResize: true,
  firstDay: 1,
  fixedWeekCount: false,
  slotEventOverlap: false,
  locale: deLocale,
  slotMinTime: '07:00:00',
  slotMaxTime: '24:00:00',
  slotDuration: '00:15:00',
  slotLabelInterval: {hours: 1},
  scrollTime: '09:00:00',
  allDaySlot: true,
  hiddenDays: [0],
  expandRows: true,
  nowIndicator: true,
  selectable: true,
  dayMaxEvents: 5,
  views: {
    timeGridSixDays: {
      type: 'timeGrid',
      duration: {days: 6},
      buttonText: '6 day'
    },
    timeGridOneDays: {
      type: 'timeGrid',
      duration: {days: 1},
      buttonText: '1 day'
    }
  }
};
