<?php
  $groups = ["streicher", "bläser", "dirigent", "schlagwerk"];
  $eventTypes = ["angebot", "veranstaltung", "training", "privar_stunde"];

  $DBuname = "";
  $DBpassword = "";
  $DBurl = "sqlite:/var/www/tc-saxonia";

  if (isset($_POST["config"])) {
    switch ($_POST["config"]) {
      case 'groups':
        echo json_encode($groups);
      break;
      case 'eventtypes':
        echo json_encode($eventTypes);
      break;
    }//end of switch
  }
?>
