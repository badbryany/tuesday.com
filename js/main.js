var calendarEl = document.getElementById('calendar');

var calendar = new FullCalendar.Calendar(calendarEl, {
  timeZone: 'CET',
  locale: 'de',
  initialView: 'timeGridWeek',
  events: '/terminplanung/api/events.php',//https://fullcalendar.io/demo-events.json
  editable: true,
  selectable: true,
  eventDragStart: function(info) {
    console.log(info.view.getCurrentData().viewSpec.optionOverrides/*.optionDefaults*/);
    if (name === info.event.extendedProps.owner) {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          location.reload();
        }
      };
      xhttp.open("POST", "/terminplanung/api/events.php", true);
      xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhttp.send("start=" + start + "&end=" + end + "&type=" + typ + "&title=" + title);
    }else {
      console.log("nö");
    }
    console.log(info.event.extendedProps.owner);
  },
  select: function(info) {
    date(info.startStr, info.endStr);
  }
});
calendar.render();

async function date(start, end) {
const { value: title } = await Swal.fire({
  title: 'Titel',
  icon: 'question',
  input: 'text',
  //inputValue: inputValue,
  showCancelButton: false,
  inputValidator: (value) => {
    if (!value) {
      return 'Du musst ein Titel eingeben!'
    }
  }
})

if (title) {
  const { value: type } = await Swal.fire({
    title: 'Welche Art von Termin ist das?',
    input: 'select',
    icon: 'question',
    inputOptions: {
      'Typ':{
        0:'freies_training', 1:'privat_stunde',2:'angebot',3:'veranstaltung'
      }
    },
    inputPlaceholder: 'wähle einen Typ aus',
    showCancelButton: false,
    inputValidator: (value) => {
      return new Promise((resolve) => {
        if (value > 0 || value < 3) {
          resolve()
        } else {
          resolve('Das ist kein Typ!')
        }
      })
    }
  })
  if (type) {
    switch (type.toString()) {
      case "0":
        typ = "freies_training";
      break;
      case "1":
        typ = "privat_stunde";
      break;
      case "2":
        typ = "angebot";
      break;
      case "3":
        typ = "veranstaltung";
      break;
    }

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        //console.log(this.responseText);
        location.reload();
      }
    };
    xhttp.open("POST", "/terminplanung/api/events.php", true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.send("start=" + start + "&end=" + end + "&type=" + typ + "&title=" + title);
  }

}
}
