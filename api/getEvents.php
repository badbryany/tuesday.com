<?php
  include 'connectDB.php';
  include 'config.php';

  if (isset($_GET["start"]) && isset($_GET["end"])) {
    $events = [];
    $begin = $_GET["start"];
    $end = $_GET["end"];

    $sql = "SELECT e_id, title, type, begin, end, owner, tags FROM events WHERE begin > :begin AND end < :end;";

    $sth = $db->prepare($sql);
    $sth->bindValue(":begin", $begin);
    $sth->bindValue(":end", $end);
    $sth->execute();

    foreach ($sth->fetchAll() as $row) {
      for ($i=0; $i < sizeof($eventTypes); $i++) {
        if ($row["type"] === $eventTypes[$i]) {
          $color = $colors[$i];
        }
      }

      array_push($events, '{"id":"' . $row["e_id"] . '","e_id":"' . $row["e_id"] . '","title":"' . $row["title"] . '","start":"' . $row["begin"] . '","end":"' . $row["end"] . '", "backgroundColor":"' . $color . '", "borderColor":"' . "#999" . '", "owner":"' .
      $row["owner"] . '","tags":' . $row["tags"] . ',"type":"' . $row["type"] . '"}');
    }
    //echo sizeof($events);
    echo "[";
    echo implode( ", ", $events);
    echo "]";
  }
?>
