<?php
  include 'connectDB.php';

  if (isset($_GET["start"]) && isset($_GET["end"])) {
    $events = [];
    $begin = $_GET["start"];
    $end = $_GET["end"];

    $types = ["freies_training", "privat_stunde", "angebot", "veranstaltung"];
    $colors = ["#fff1d6", "#d3e6ff", "#ffd9d9", "#daffe5"];

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

      array_push($events, '{"e_id":"' . $row["e_id"] . '","title":"' . $row["title"] . '","start":"' . $row["begin"] . '","end":"' . $row["end"] . '", "backgroundColor":"' . $color . '", "borderColor":"' . "#999" . '", "owner":"' . $row["owner"] . '"}');
    }
    //echo sizeof($events);
    echo "[";
    echo implode( ", ", $events);
    echo "]";
  }
?>
