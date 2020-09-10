var calendarEl = document.getElementById('calendar');

var calendar = new FullCalendar.Calendar(calendarEl, {
  timeZone: 'CET',
  locale: 'de',
  initialView: 'timeGridWeek',
  events: '/terminplanung/api/getEvents.php',//https://fullcalendar.io/demo-events.json
  editable: true,
  selectable: true,
  firstDay: 1,
  eventDragStart: function(info) {
    console.log(info.view.getCurrentData().viewSpec.optionOverrides/*.optionDefaults*/);
    console.log(info.event.extendedProps.owner);
  },
  select: function(info) {
    date(info.startStr, info.endStr);
  }
});
calendar.render();

async function date(start, end) {
  var html = "<div class='event_config'><div class='title'><h1>Titel</h1><input type='text' id='title' placeholder='Titel'></div><div class='type'><h1>Welche art von Termin ist das?</h1><select id='type'><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option></select></div><div class='tags'><h1>Für wen ist dieser Termin relevant?</h1><span id='tags'><label><input type='checkbox' class='checkbox' value='1'>group 1</label><label><input type='checkbox' class='checkbox' value='2'>group 2</label><label><input type='checkbox' class='checkbox' value='3'>group 3</label><label><input type='checkbox' class='checkbox' value='4'>group 4</label></span></div></div>";
  Swal.fire({
    title: '',
    icon: 'question',
    html: html,
    customClass: "swal-wide",
    showCloseButton: false,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText: 'OK',
    cancelButtonText: 'Abbrechen',
    }).then((foo) => {
      if (foo) {
        var title = document.getElementById("title").value;
        var type = document.getElementById("type").value;
        var tags = [];
        for (var i = 0; i < document.getElementsByClassName("checkbox").length; i++) {
          if (document.getElementsByClassName("checkbox")[i].checked) {
            tags.push(document.getElementsByClassName("checkbox")[i].value);
          }
        }
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            //console.log(this.responseText);
            location.reload();
          }
        };
        xhttp.open("POST", "/terminplanung/api/createEvent.php", true);
        xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhttp.send("start=" + start + "&end=" + end + "&type=" + type + "&title=" + title + "&tags=" + tags.toString());
      }
    });

/*const { value: title } = await Swal.fire({
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
    xhttp.open("POST", "/terminplanung/api/createEvent.php", true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.send("start=" + start + "&end=" + end + "&type=" + typ + "&title=" + title);
  }*/
}
