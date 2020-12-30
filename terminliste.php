<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Terminliste</title>
    <link rel="stylesheet" href="./css/main.css">
    <link rel="stylesheet" href="./css/style.css">
    <link rel="stylesheet" href="./css/list.css">
</head>
<body>
    <?php
        include 'api/connectDB.php';
        $sql = "SELECT e_id, title, type, begin, end, owner, tags, rrule FROM events";

        $sth = $db->prepare($sql);
        $sth->execute();
        $counter = 0;
        echo '<div class="events">';
        foreach($sth->fetchAll() as $row) {
            $counter += 1;
            if ($counter === 5) {
                $counter = 0;
                echo '</div><div class="events">';

            }
            ?>
                <div class="event">                
                    <p class="eventTitle"><?php echo $row["title"] ?></p>
                    <p class="eventTime">Anfang: <?php echo (new DateTime($row["begin"]))->format("h:m:s, d.m.Y") ?></p>
                    <p class="eventTime">Ende: <?php echo (new DateTime($row["end"]))->format("h:m:s, d.m.Y") ?></p>
                    <p class="eventType">Art: <?php echo $row["type"] ?></p>
                    <p class="eventGroups">Gruppen: <?php 
                        if (sizeof(json_decode($row["tags"])) === 0) {
                            echo "alle";
                        }
                        for ($i=0; $i < sizeof(json_decode($row["tags"])); $i++) {
                            $add = "";
                            if ($i !== sizeof(json_decode($row["tags"]))-1) {
                                $add = ", ";
                            }
                            echo json_decode($row["tags"])[$i] . $add;
                        }
                    ?></p>
                    <p class="eventOwner">Ersteller: <?php echo $row["owner"] ?></p>
                </div>
            <?php
        } 
    ?>
    </div>
</body>
</html>