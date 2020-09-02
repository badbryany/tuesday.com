<?php
  include 'connectDB.php';

  if (isset($_GET["start"]) && isset($_GET["end"])) {
    $events = [];
    $begin = $_GET["start"];
    $end = $_GET["end"];

    $types = ["freies_training", "privat_stunde", "angebot", "veranstaltung"];
    $colors = ["#52eecd", "#8ab94a", "#f5eb8c", "#ee5252"];

    $sql = "SELECT e_id, title, type, begin, end, owner FROM events WHERE begin > :begin AND end < :end;";

    $sth = $db->prepare($sql);
    $sth->bindValue(":begin", $begin);
    $sth->bindValue(":end", $end);
    $sth->execute();

    foreach ($sth->fetchAll() as $row) {
      for ($i=0; $i < sizeof($types); $i++) {
        if ($row["type"] === $types[$i]) {
          $color = $colors[$i];
        }
      }

      array_push($events, '{"e_id":"' . $row["e_id"] . '","title":"' . $row["title"] . '","start":"' . $row["begin"] . '","end":"' . $row["end"] . '", "backgroundColor":"' . $color . '", "owner":"' . $row["owner"] . '"}');
    }
    //echo sizeof($events);
    echo "[";
    echo implode( ", ", $events);
    echo "]";
  }
  if (isset($_POST["start"]) && isset($_POST["end"]) && isset($_POST["type"]) && isset($_POST["title"])) {
    include 'session.php';
    //echo $_POST["start"] . $_POST["end"] . " f" . $_POST["title"];

    $sql = "INSERT INTO events (title, owner, type, begin, end) VALUES (:title, :owner, :type, :begin, :end);";

    $sth = $db->prepare($sql);
    $sth->bindValue(":title", $_POST["title"]);
    $sth->bindValue(":owner", $_SESSION["uname"]);
    $sth->bindValue(":type", $_POST["type"]);
    $sth->bindValue(":begin", $_POST["start"]);
    $sth->bindValue(":end", $_POST["end"]);

    echo $sth->execute();
  }
?>
