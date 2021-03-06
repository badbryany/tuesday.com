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
                    if (action == "delete" && event.event._def.extendedProps.isRRULE) {
                      Swal.fire({
                        title: "Einzel oder Serie bearbeiten?",
                        icon: "question",
                        showDenyButton: true,
                        denyButtonText: "Serie",
                        confirmButtonText: "Einzeltermin"
                      }).then((result) => {
                        if (result.isConfirmed) {
                          exdate = event.event._instance.range.start.toISOString();
                          var xhttp1 = new XMLHttpRequest();
                          xhttp1.onreadystatechange = function() {
                            if (this.readyState == 4 && this.status == 200) {
                              if (this.responseText == "true") {
                                Swal.fire({
                                  icon: 'success',
                                  title: 'Der Termin wurde erfolgreich entfernt',
                                  text: "Entfernt!",
                                }).then((r) => calendar.refetchEvents());
                              }else {
                                Swal.fire({
                                  icon: 'error',
                                  title: 'Oops...',
                                  text: "Error: " + this.responseText,
                                  footer: '<a href="">support</a>'
                                });
                              }
                            }
                          };
                          xhttp1.open("POST", "/tuesday.com/api/editEvent.php", true);
                          xhttp1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                          xhttp1.send("action=" + action + "&e_id=" + event.event._def.extendedProps.e_id + "&exdate=" + exdate);
                        } else {
                          var xhttp1 = new XMLHttpRequest();
                          xhttp1.onreadystatechange = function() {
                            if (this.readyState == 4 && this.status == 200) {
                              if (this.responseText == "true") {
                                if (action == "delete") {
                                  event.event.remove();
                                  Swal.fire('Der Termin wurde gelöscht!', '', 'success');
                                }else{
                                  Swal.fire('Der Termin wurde gespeichert!', '', 'success').then(() => calendar.refetchEvents());
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
                      });
                    } else if (action == "delete"){
                      var xhttp1 = new XMLHttpRequest();
                      xhttp1.onreadystatechange = function() {
                        if (this.readyState == 4 && this.status == 200) {
                          if (this.responseText == "true") {
                            if (action == "delete") {
                              event.event.remove();
                              Swal.fire('Der Termin wurde gelöscht!', '', 'success');
                            }else{
                              Swal.fire('Der Termin wurde gespeichert!', '', 'success').then(() => {calendar.refetchEvents();});
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
      var newBegin, newEnd;
      if (event.event._def.extendedProps.isRRULE) {
        newBegin = event.event._instance.range.start.toISOString().split("T")[1];
        newEnd = event.event._instance.range.end.toISOString().split("T")[1];  
      } else {
        newBegin = event.event._instance.range.start.toISOString();
        newEnd = event.event._instance.range.end.toISOString();
      }
      
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          if (this.responseText == "true") {
            calendar.refetchEvents();
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
      xhttp.send("action=time&newBegin=" + newBegin + "&newEnd=" + newEnd + "&e_id=" + event.event._def.extendedProps.e_id);
    break;
  }//end of switch
}//end of function editEvent()
