<?php
  $groups = ["streicher", "bläser", "dirigent", "schlagwerk", "pauken"];
  $eventTypes = ["angebot", "veranstaltung", "training", "privar_stunde","1", "2", "3", "4", "konzert"];

  $colors = ["#fff1d6", "#d3e6ff", "#ffd9d9", "#daffe5", '#67c0ff', '#1ce41', '#c5e8d6', '#4ab05d', '#da9911', '#7cc527', '#48e237', '#c51f01', '#10fdd3', '#9a2c80', '#19f638', '#af0f06', '#68890a', '#559885', '#719c42', '#bec031', '#fa08e6', '#1d399b', '#ecc1e0', '#2a3de', '#1a52e1', '#5c658d', '#2e8501', '#fee372', '#11fcf5', '#579c2b', '#caca47', '#72665c', '#9ad9d3', '#df9299', '#5385b0', '#9ddfc5', '#6b945c', '#a636e0', '#ca358e', '#7b0afc', '#e2d009', '#d0ef06', '#ef41f9', '#394b31'];


  $DBuname = "";
  $DBpassword = "";
  $DBurl = "sqlite:/var/www/tuesday.com";

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
