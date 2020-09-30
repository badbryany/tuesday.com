var calendarEl = document.getElementById('calendar');
var activeEvent;

var calendar = new FullCalendar.Calendar(calendarEl, {
  timeZone: 'GMT +0200',
  locale: 'de',
  initialView: 'timeGridWeek',
  events: '/terminplanung/api/getEvents.php',//https://fullcalendar.io/demo-events.json
  editable: true,
  selectable: true,
  firstDay: 1,
  eventDrop: function (info) {
    editEvent(info, "drop");
  },
  eventDragStop: function (info) {
    //editEvent(info, "drag");
    //console.log(info.view.getCurrentData().viewSpec.optionOverrides/*.optionDefaults*/);
    //console.log(info.event.extendedProps.owner);
  },
  eventResizeStop: function (info) {
    console.log(info);
  },
  eventClick: function(info){editEvent(info, "normal")},
  select: function(info) {
    createEvent(info.startStr, info.endStr);
  }
});
calendar.render();

//get config
  var xhttp1 = new XMLHttpRequest();
  xhttp1.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      //console.log(this.responseText);
    }
  };
  xhttp1.open("GET", "/terminplanung/api/config.php", true);
  xhttp1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhttp1.send("q=groups");
