<?php
  session_start();
  if (!isset($_SESSION["uname"])) {
    echo "Keine Berechtigung!";
    exit();
  }
?>
