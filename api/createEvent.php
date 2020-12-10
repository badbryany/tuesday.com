<?php
  include 'session.php';
  include 'connectDB.php';
  //if (isset($_POST["start"]) && isset($_POST["end"]) && isset($_POST["type"]) && isset($_POST["title"])) {
    if ($_POST["title"] === "") {
      $_POST["title"] = "Neuer Termin";
    }

    $sql = "INSERT INTO events (title, owner, type, tags, begin, end, rrule) VALUES (:title, :owner, :type, :tags, :begin, :end, :rrule);";

    $sth = $db->prepare($sql);
    $sth->bindValue(":title", $_POST["title"]);
    $sth->bindValue(":owner", $_SESSION["uname"]);
    $sth->bindValue(":type", $_POST["type"]);
    $sth->bindValue(":tags", $_POST["tags"]);
    $sth->bindValue(":begin", $_POST["start"]);
    $sth->bindValue(":end", $_POST["end"]);
    if (isset($_POST["rrule"])) {
      $sth->bindValue(":rrule", $_POST["rrule"]);
    } else {
      $sth->bindValue(":rrule", "null");
    }

    var_dump($sth->execute());
    print_r($sth->errorInfo);
  //}
?>
