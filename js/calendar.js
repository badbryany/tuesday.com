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
    editEvent(info, 'drop');
  },
  eventResize: function(info) {
    editEvent(info, 'drop');
    createSelection("foo", info);
  },
  eventClick: function(info){
    editEvent(info, 'normal');
  },
  select: function(info) {
    createEvent(info.startStr, info.endStr);
    createSelection();
  }
});
calendar.render();

//get config
  var groups, eventTypes;
  var content = ['groups', 'eventtypes']
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      groups = JSON.parse(this.responseText);
    }
  };
    xhttp.open('POST', '/terminplanung/api/config.php', true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.send('config=groups');

    var xhttp1 = new XMLHttpRequest();
    xhttp1.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        eventTypes = JSON.parse(this.responseText);
      }
    };
    xhttp1.open('POST', '/terminplanung/api/config.php', true);
    xhttp1.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp1.send('config=eventtypes');

function createSelection(type, event) {
  for (var i = 0; i < eventTypes.length; i++) {
    var option = document.createElement('option');
    option.value = eventTypes[i];
    option.innerText = eventTypes[i];
    if (type == "edit") {
      if (eventTypes[i] == event.event._def.extendedProps.type) {
        option.setAttribute("selected", "selected");
      }
    }

    document.getElementById('type').appendChild(option);
  }
  for (var i = 0; i < groups.length; i++) {
    var checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.value = groups[i];
    checkbox.setAttribute("class", "checkbox");

    if (type == "edit") {
      var tags = event.event._def.extendedProps.tags;
      for (var j = 0; j < tags.length; j++) {
        if (groups[i] == tags[j]) {
          checkbox.setAttribute("checked", "checked");
        }
      }
    }

    var label = document.createElement('label');
    label.appendChild(checkbox);
    label.innerHTML += groups[i];

    document.getElementById('tags').appendChild(label);
  }
}
