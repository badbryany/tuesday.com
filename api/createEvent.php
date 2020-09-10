<?php
  include 'session.php';
  include 'connectDB.php';
  if (isset($_POST["start"]) && isset($_POST["end"]) && isset($_POST["type"]) && isset($_POST["title"])) {

    $sql = "INSERT INTO events (title, owner, type, tags, begin, end) VALUES (:title, :owner, :type, :tags, :begin, :end);";

    $sth = $db->prepare($sql);
    $sth->bindValue(":title", $_POST["title"]);
    $sth->bindValue(":owner", $_SESSION["uname"]);
    $sth->bindValue(":type", $_POST["type"]);
    $sth->bindValue(":tags", $_POST["tags"]);
    $sth->bindValue(":begin", $_POST["start"]);
    $sth->bindValue(":end", $_POST["end"]);

    $sth->execute();
  }
?>
