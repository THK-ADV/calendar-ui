<script lang="ts">
	import type { CalendarOptions } from 'svelte-fullcalendar';
	import FullCalendar from 'svelte-fullcalendar';
	import deLocale from '@fullcalendar/core/locales/de';
	import timeGridPlugin from '@fullcalendar/timegrid';
	import dayGridPlugin from '@fullcalendar/daygrid';
	import interactionPlugin from '@fullcalendar/interaction';
	import { _ } from 'svelte-i18n';
	import { CalendarViewTypes } from '$lib/types';

	export let options: CalendarOptions;
	
	let baseOptions: CalendarOptions = {
		allDayText: 'All-day',
		allDaySlot: true,
		expandRows: true,
		fixedWeekCount: false,
		handleWindowResize: true,
		headerToolbar: {
			left: 'prev,next today',
			center: 'title',
			right: `${CalendarViewTypes.dayGridMonthView},${CalendarViewTypes.timeGridWeekView},${CalendarViewTypes.timeGridDayView}`
		},
		height: '100%',
		hiddenDays: [0],
		initialView: CalendarViewTypes.timeGridWeekView,
		locale: deLocale,
		nowIndicator: true,
		plugins: [timeGridPlugin, dayGridPlugin, interactionPlugin],
		scrollTime: '08:00:00',
		slotDuration: '00:15:00',
		slotEventOverlap: false,
		slotLabelInterval: { hours: 1 },
		slotMaxTime: '24:00:00',
		slotMinTime: '07:00:00',
		selectable: true,
		views: {
			[CalendarViewTypes.dayGridMonthView]: {
				type: 'dayGridMonth',
				buttonText: $_("month"),
				dayMaxEvents: 4,
			},
			[CalendarViewTypes.timeGridWeekView]: {
				type: 'timeGridWeek',
				duration: { days: 7 },
				buttonText: $_("week"),
				eventMaxStack: 4,
				dateAlignment: 'week',
				moreLinkClick: () => CalendarViewTypes.timeGridDayView
			},
			[CalendarViewTypes.timeGridDayView]: {
				type: 'timeGridDay',
				duration: { days: 1 },
				buttonText: $_("day"),
				eventMaxStack: 15
			}
		},
		weekNumbers: true,
		...options
	};
	let calendarOptions = { ...baseOptions, ...options };
	$: calendarOptions = { ...baseOptions, ...options };
</script>

<FullCalendar style="width: 100%" options={calendarOptions} />
