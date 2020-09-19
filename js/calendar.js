var calendarEl = document.getElementById('calendar');

var calendar = new FullCalendar.Calendar(calendarEl, {
  timeZone: 'GMT +0200',
  locale: 'de',
  initialView: 'timeGridWeek',
  events: '/terminplanung/api/getEvents.php',//https://fullcalendar.io/demo-events.json
  editable: true,
  selectable: true,
  firstDay: 1,
  eventDragStop: function (info) {
    console.log(info.event.start);
    console.log(info);
    //console.log(info.view.getCurrentData().viewSpec.optionOverrides/*.optionDefaults*/);
    //console.log(info.event.extendedProps.owner);
  },
  eventResizeStop: function (info) {
    console.log(info);
  },
  eventClick: function(info){editEvent(info)},
  select: function(info) {
    createEvent(info.startStr, info.endStr);
  }
});
calendar.render();
