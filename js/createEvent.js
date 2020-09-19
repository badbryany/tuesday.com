async function createEvent(start, end) {
  var html = "<div class='event_config'><div class='title'><h1>Titel</h1><input type='text' id='title' placeholder='Titel'></div><div class='type'><h1>Welche art von Termin ist das?</h1><select id='type'><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option></select></div><div class='tags'><h1>Für wen ist dieser Termin relevant?</h1><span id='tags'><label><input type='checkbox' class='checkbox' value='1'>group 1</label><label><input type='checkbox' class='checkbox' value='2'>group 2</label><label><input type='checkbox' class='checkbox' value='3'>group 3</label><label><input type='checkbox' class='checkbox' value='4'>group 4</label></span></div></div>";
  Swal.fire({
    title: 'Termin erstellen',
    icon: 'question',
    html: html,
    customClass: "swal-wide",
    showCloseButton: true,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText: 'OK',
    cancelButtonText: 'Abbrechen',
    }).then((foo) => {
      console.log(foo);
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
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            calendar.addEvent({"title": title,"start": start,"end":end});
            //location.reload();
          }
        };
        xhttp.open("POST", "/terminplanung/api/createEvent.php", true);
        xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhttp.send("start=" + start + "&end=" + end + "&type=" + type + "&title=" + title + "&tags=" + JSON.stringify(tags));
      }
    });
}
