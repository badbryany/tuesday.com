<?php
  include 'connectDB.php';
  include 'config.php';

  header("Content-Type: application/json");
  if (isset($_GET["start"]) && isset($_GET["end"])) {
    $events = [];
    $begin = $_GET["start"];
    $end = $_GET["end"];

    $sql = "SELECT e_id, title, type, begin, end, owner, tags, rrule FROM events WHERE begin > :begin AND end < :end OR rrule <> 'null'";

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
      if ($row["rrule"] != "null") {   
        $start = new DateTime($row["begin"]);
        $end = new DateTime($row["end"]);
        $difference = strval($end->format("H") - $start->format("H")) . ":" . sprintf("%02d", strval($end->format("i") - $start->format("i"))) . ":" . strval($end->format("s") - $start->format("s"));

        $rrule = ',"rrule":"' . $row["rrule"]. '", "duration":"' . $difference . '"';

        $data = array(
          "id" => $row["e_id"],
          "e_id" => $row["e_id"],
          "title" => $row["title"],
          "backgroundColor" => $color,
          "borderColor" => "#999",
          "owner" => $row["owner"],
          "tags" => json_decode($row["tags"]),
          "type" => $row["type"],
          "rrule" => $row["rrule"],
          "duration" => $difference
        );

        array_push($events, $data);
      } else {
        $data = array(
          "id" => $row["e_id"],
          "e_id" => $row["e_id"],
          "title" => $row["title"],
          "backgroundColor" => $color,
          "borderColor" => "#999",
          "start" => $row["begin"],
          "end" => $row["end"],
          "owner" => $row["owner"],
          "tags" => json_decode($row["tags"]),
          "type" => $row["type"]
        );
        array_push($events, $data);
      }
      //array_push($events, '{"id":"' . $row["e_id"] . '","e_id":"' . $row["e_id"] . '","title":"' . $row["title"] . '","'.$startName.'":"' . $row["begin"] . '","'.$endName.'":"' . $row["end"] . '", "backgroundColor":"' . $color . '", "borderColor":"' . "#999" . '", "owner":"' .
      //  $row["owner"] . '","tags":' . $row["tags"] . ',"type":"' . $row["type"] . '" ' . $rrule . '}');
      
    }
    //echo sizeof($events);
    /*echo "[";
    echo implode( ", ", $events);
    echo "]";*/
    echo json_encode($events);
  }
?>
