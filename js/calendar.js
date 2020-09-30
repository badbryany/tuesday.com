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
  eventResize: function(info) {
    editEvent(info, "drop");
  },
  eventClick: function(info){editEvent(info, "normal")},
  select: function(info) {
    createEvent(info.startStr, info.endStr);
  }
});
calendar.render();

//get config
  var groups, eventTypes;
  var content = ["groups", "eventtypes"]
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      groups = this.responseText;
    }
  };
    xhttp.open("POST", "/terminplanung/api/config.php", true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.send("config=groups");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        eventTypes = this.responseText;
      }
    };
      xhttp.open("POST", "/terminplanung/api/config.php", true);
      xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhttp.send("config=eventtypes");
