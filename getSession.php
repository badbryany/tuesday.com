<?php
  session_start();
  $_SESSION["uname"] = $_GET["uname"];
  echo "your session name is: <b>" . $_SESSION["uname"] . "</b>";
?>
