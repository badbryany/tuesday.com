function editEvent(event, action) {
  switch (action) {
    case "normal":
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          if (event.event._def.extendedProps.owner == this.responseText) {
            var action;
            html = "<div class='event_config'><div class='title'><h1>Titel</h1><input type='text' id='title' value='" + event.event._def.title + "' placeholder='Titel'></div><div class='type'><h1>Welche art von Termin ist das?</h1><select id='type'></select></div><div class='tags'><h1>Für wen ist dieser Termin relevant?</h1><span id='tags'></span></div></div>";
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
                if (result.dismiss != "esc") {
                  if (result.dismiss != "backdrop") {
                    if (result.isConfirmed) {
                      var newTitle = document.getElementById("title").value;
                      var newType = document.getElementById("type").value;
                      var newTags = [];
                      for (var i = 0; i < document.getElementsByClassName("checkbox").length; i++) {
                        if (document.getElementsByClassName("checkbox")[i].checked) {
                          newTags.push(document.getElementsByClassName("checkbox")[i].value);
                        }
                      }
                      newTags = JSON.stringify(newTags);
                      action = "save&newTitle=" + newTitle + "&newType=" + newType + "&newTags=" + newTags;
                    } else if (result.isDenied) {
                      action = "delete";
                    }
                    var xhttp1 = new XMLHttpRequest();
                    xhttp1.onreadystatechange = function() {
                      if (this.readyState == 4 && this.status == 200) {
                        if (this.responseText == "true") {
                          if (action == "delete") {
                            event.event.remove();
                            Swal.fire('Der Termin wurde gelöscht!', '', 'success');
                          }else{
                            Swal.fire('Der Termin wurde gespeichert!', '', 'success').then(() => {location.reload();});
                          }
                        }else {
                          Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: "Error: " + this.responseText,
                            footer: '<a href="">support</a>'
                          })
                        }
                      }
                    };
                    xhttp1.open("POST", "/tuesday.com/api/editEvent.php", true);
                    xhttp1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    xhttp1.send("action=" + action + "&e_id=" + event.event._def.extendedProps.e_id);
                  }
                }
              }
            })
            createSelection("edit", event);
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Das ist nicht dein Termin!'
            })
          }
        }
      };
      xhttp.open("GET", "/tuesday.com/api/getSession.php", true);
      xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhttp.send();
    break;
    case "drop":
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          if (this.responseText == "true") {

          }else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: "Error: " + this.responseText,
              footer: '<a href="">support</a>'
            })
          }
        };
      }
      xhttp.open("POST", "/tuesday.com/api/editEvent.php", true);
      xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhttp.send("action=time&newBegin=" + event.event._instance.range.start.toISOString() + "&newEnd=" + event.event._instance.range.end.toISOString() + "&e_id=" + event.event._def.extendedProps.e_id);
    break;
  }//end of switch
}//end of function editEvent()
