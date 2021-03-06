<?php
if (isset($_POST["e_id"]) && isset($_POST["action"])) {
  include "session.php";
  include "connectDB.php";

  $sql = "SELECT owner, rrule FROM events WHERE e_id=:eventID AND owner=:owner;";

  $sth = $db->prepare($sql);
  $sth->bindValue(":eventID", $_POST["e_id"]);
  $sth->bindValue(":owner", $_SESSION["uname"]);
  $sth->execute();
  $row = $sth->fetch();

  if ($_SESSION["uname"] != $row["owner"]) {
    header("Location: https://www.google.com/search?q=lernen+zu+hacken");
  }else {
    switch ($_POST["action"]) {
      case 'delete':
        if (isset($_POST["exdate"])) {
          $_POST["exdate"] = str_replace(":", "", $_POST["exdate"]);
          $_POST["exdate"] = str_replace("-", "", $_POST["exdate"]);
          $_POST["exdate"] = str_replace(".000Z", "", $_POST["exdate"]);
          $sql = "UPDATE events SET rrule=:newRRULE WHERE e_id=:event_ID AND owner=:owner;";
          $sth = $db->prepare($sql);
          $sth->bindValue(":newRRULE", $row["rrule"]."\nEXDATE:".$_POST["exdate"]);
        } else {
          $sql = "DELETE FROM events WHERE e_id=:event_ID AND owner=:owner;";
          $sth = $db->prepare($sql);
        }
      break;
      case 'save':
        $sql = "UPDATE events SET title=:newTitle, type=:newType, tags=:newTags WHERE e_id=:event_ID AND owner=:owner;";
        $sth = $db->prepare($sql);
        $sth->bindValue(":newTitle", $_POST["newTitle"]);
        $sth->bindValue(":newType", $_POST["newType"]);
        $sth->bindValue(":newTags", $_POST["newTags"]);
      break;
      case 'time':
        if ($row["rrule"] !== null) {
          $sql = "UPDATE events SET begin=:newBegin, end=:newEnd, rrule=:newRrule WHERE e_id=:event_ID AND owner=:owner;";
          $newRRULE = "";
          $time = explode("T", explode("\n", $row["rrule"])[0])[4];
          $newRRULE = str_replace($time, $_POST["newBegin"], $row["rrule"]);
          $sth = $db->prepare($sql);
          $sth->bindValue(":newRrule", $newRRULE);
        } else {
          $sql = "UPDATE events SET begin=:newBegin, end=:newEnd WHERE e_id=:event_ID AND owner=:owner;";
          $sth = $db->prepare($sql);
        }
        $sth->bindValue(":newBegin", $_POST["newBegin"]);
        $sth->bindValue(":newEnd", $_POST["newEnd"]);
      break;
    }
    $sth->bindValue(":event_ID", $_POST["e_id"]);
    $sth->bindValue(":owner", $_SESSION["uname"]);

    if ($sth->execute()) {
      echo "true";
    }else {
      print_r($sth->errorInfo()[2]);
    }
  }//end of owner else
}else {
  echo "bad request";
}

?>
