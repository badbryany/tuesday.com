async function createEvent(start, end) {
  var html = "<div class='event_config'><div class='title'><h1>Titel</h1><input type='text' value='Neuer Termin' id='title' placeholder='Titel'></div><div class='type'><h1>Welche art von Termin ist das?</h1><select id='type'></select></div><div class='tags'><h1>Für wen ist dieser Termin relevant?</h1><span id='tags'></span></div><label><input type='checkbox' value='stermin' id='stermin' />Serientermin</label></div>";
  Swal.fire({
    title: 'Termin erstellen',
    //icon: 'question',
    html: html,
    customClass: "swal-wide",
    showCloseButton: true,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText: 'OK',
    cancelButtonText: 'Abbrechen',
    }).then((foo) => {
      if (foo.isConfirmed) {
        var title = document.getElementById("title").value;
        var type = document.getElementById("type").value;
        var tags = [];
        for (var i = 0; i < document.getElementsByClassName("checkbox").length; i++) {
          if (document.getElementsByClassName("checkbox")[i].checked) {
            tags.push(document.getElementsByClassName("checkbox")[i].value);
          }
        }
        tags = JSON.stringify(tags);
        if (document.getElementById("stermin").checked) {
          sTermin("type=" + type + "&title=" + title + "&tags=" + JSON.stringify(tags) , start, end, title);
        } else {
          var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              calendar.addEvent({"title": title,"start": start,"end":end});
              //location.reload();
            }
          };
          xhttp.open("POST", "/tuesday.com/api/createEvent.php", true);
          xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
          xhttp.send("type=" + type + "&title=" + title + "&tags=" + JSON.stringify(tags) + "&start=" + start + "&end=" + end); 
        }
      }
    });
}

function sTermin(req, start, end, title) {
  Swal.fire({
    title: 'Serientermin',
    html: ' <div class="sTermin"> <div class="intervall"> <p>Intervall:</p> <input type="number" id="intervall" style="width:80%" placeholder="z.B. 1->jede Woche;2->alle 2 Wochen;usw." /> </div> <div class="weekdays"> <label> <input type="checkbox" value="MO" class="checkbox"> Montag </label> <br> <label> <input type="checkbox" value="TU" class="checkbox"> Dienstag </label> <br> <label> <input type="checkbox" value="WE" class="checkbox"> Mittwoch </label> <br> <label> <input type="checkbox" value="TH" class="checkbox"> Donnerstag </label> <br> <label> <input type="checkbox" value="FR" class="checkbox"> Freitag </label> <br> <label> <input type="checkbox" value="SA" class="checkbox"> Samstag </label> <br> <label> <input type="checkbox" value="SU" class="checkbox"> Sonntag </label> </div> </div>',
    //html: ' <div class="sTermin"> <div class="freq"> <p>Frequenz:</p> <select id="freq"> <option value="" selected disabled hidden>Hier auswählen</option> <option value="DAILY">täglich</option> <option value="WEEKLY">wöchentlich</option> <option value="MONTHLY">monatlich</option> <option value="YEARLY">jährlich</option> </select> </div> <div class="intervall"> <p>Intervall:</p> <input type="number" id="intervall" style="width:80%" placeholder="z.B. 1->jede Woche;2->alle 2 Wochen;usw." /> </div> <div class="weekdays"> <label> <input type="checkbox" value="MO" class="checkbox"> Montag </label> <br> <label> <input type="checkbox" value="TU" class="checkbox"> Dienstag </label> <br> <label> <input type="checkbox" value="WE" class="checkbox"> Mittwoch </label> <br> <label> <input type="checkbox" value="TH" class="checkbox"> Donnerstag </label> <br> <label> <input type="checkbox" value="FR" class="checkbox"> Freitag </label> <br> <label> <input type="checkbox" value="SA" class="checkbox"> Samstag </label> <br> <label> <input type="checkbox" value="SU" class="checkbox"> Sonntag </label> </div> </div>',
    showCancelButton: true,
    cancelButtonText: 'Abbrechen',
  }).then(data => {
    var freq = "WEEKLY";
    //document.getElementById("freq").value != "" ? freq = document.getElementById("freq").value : freq="weekly"
    
    var intervall;
    document.getElementById("intervall").value != "" ? intervall = document.getElementById("intervall").value : intervall="1"

    var weekdays = [];
    //var postData = new FormData();
    //postData.append("start", start)
    for (var i = 0; i < document.getElementsByClassName("checkbox").length; i++) {
      if (document.getElementsByClassName("checkbox")[i].checked) {
        weekdays.push(document.getElementsByClassName("checkbox")[i].value);
      }
    }
    //postData.append("weekdays", weekdays)
    if (freq === "WEEKLY") {
      var rrule = "DTSTART:" + start + "\\nRRULE:FREQ=" + freq + ";INTERVAL=" + intervall + ";BYDAY=" + weekdays.toString();
      var time = "&start=" + start.split("T")[1] + "&end=" + end.split("T")[1];
    } else {
      var time = "&start:" + start + "&end:" + end;
      var rrule = "BEGIN:" + start + "\nEND:" + end + "\nRRULE:FREQ=" + freq;
    }

    var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            calendar.addEvent({"title": title, "startTime": start, "endTime": end});
            //location.reload();
          }
        };
        xhttp.open("POST", "/tuesday.com/api/createEvent.php", true);
        xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhttp.send(req + "&rrule=" + rrule + time);//send(data)
  })
}