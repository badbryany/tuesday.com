<?php
if (isset($_POST["e_id"]) && isset($_POST["action"])) {
  include "session.php";
  include "connectDB.php";

  $sql = "SELECT owner FROM events WHERE e_id=:eventID AND owner=:owner;";

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
        $sql = "DELETE FROM events WHERE e_id=:event_ID AND owner=:owner;";
        $sth = $db->prepare($sql);
      break;
      case 'save':
        $sql = "UPDATE events SET title=:newTitle, type=:newType, tags=:newTags WHERE e_id=:event_ID AND owner=:owner;";
        $sth = $db->prepare($sql);
        $sth->bindValue(":newTitle", $_POST["newTitle"]);
        $sth->bindValue(":newType", $_POST["newType"]);
        $sth->bindValue(":newTags", $_POST["newTags"]);
      break;
      case 'time':
        $sql = " UPDATE events SET begin=:newBegin, end=:newEnd WHERE e_id=:event_ID AND owner=:owner;";
        $sth = $db->prepare($sql);
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
