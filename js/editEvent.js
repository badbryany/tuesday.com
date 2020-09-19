function editEvent(event) {
  console.log(event.event._def.extendedProps);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      if (event.event._def.extendedProps.owner == this.responseText) {
        var action;
        html = "<div class='event_config'><div class='title'><h1>Titel</h1><input type='text' id='title' value='" + event.event._def.title + "' placeholder='Titel'></div><div class='type'><h1>Welche art von Termin ist das?</h1><select id='type'><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option></select></div><div class='tags'><h1>Für wen ist dieser Termin relevant?</h1><span id='tags'><label><input type='checkbox' class='checkbox' value='1'>group 1</label><label><input type='checkbox' class='checkbox' value='2'>group 2</label><label><input type='checkbox' class='checkbox' value='3'>group 3</label><label><input type='checkbox' class='checkbox' value='4'>group 4</label></span></div></div>";
        Swal.fire({
          title: 'Termin bearbeiten',
          icon: 'info',
          html: html,
          customClass: "swal-wide",
          showDenyButton: true,
          showCancelButton: true,
          denyButtonText: "löschen",
          cancelButtonText : "Abbrechen",
          focusConfirm: true,
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.dismiss != "cancel") {
            if (result.isConfirmed) {
              action = "save&newTitle=" + newTitle + "&newType=" + newType + "&newTags=" + JSON.stringify(newTags) + "&newBegin=" + newBegin + "&newEnd=" + newEnd;
              Swal.fire('Erfolgreich gespeichert!', '', 'success')
            } else if (result.isDenied) {
              action = "delete";
              var xhttp = new XMLHttpRequest();
              xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                  if (this.responseText == "true") {
                    Swal.fire('Der Termin wurde gelöscht!', '', 'success').then((result) => {event.event.remove();});
                  }else {
                    Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: 'Es ist ein unbekannter Fehler aufgetreten!'
                    })
                  }
                }
              };
              xhttp.open("POST", "/terminplanung/api/editEvent.php", true);
              xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
              xhttp.send("action=" + action + "&e_id=" + event.event._def.extendedProps.e_id);
            }
          }
        })
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Das ist nicht dein Termin!'
        })
      }
    }
  };
  xhttp.open("GET", "/terminplanung/api/getSession.php", true);
  xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhttp.send();
}//end of function editEvent()
