<?php
    include "../connectDB.php";

    $sql = "SELECT * FROM events;";
    $sth = $db->prepare($sql);
    $sth->execute();
    $rows = $sth->fetchAll();

    $events = [];

    if (isset($_GET["tags"]) && !isset($_GET["type"])) {
        for ($i=0; $i < sizeof($rows); $i++) { 
            for ($j=0; $j < sizeof(json_decode($rows[$i]["tags"])); $j++) { 
                for ($a=0; $a < sizeof($_GET["tags"]); $a++) { 
                    if (json_decode($rows[$i]["tags"])[$j] === $_GET["tags"][$a]) {
                        array_push($events, $rows[$i]);
                    }
                }
            }
        }
    }
    if (isset($_GET["tags"]) && isset($_GET["type"])) {
        for ($i=0; $i < sizeof($rows); $i++) { 
            for ($j=0; $j < sizeof(json_decode($rows[$i]["tags"])); $j++) { 
                if (json_decode($rows[$i]["tags"])[$j] === $_GET["tags"][$j]) {
                    array_push($events, $rows[$i]);
                }
            }
        }
        for ($i=0; $i < sizeof($rows); $i++) { 
            if ($rows[$i]["type"] === $_GET["type"]) {
                $foo = true;
                for ($b=0; $b < sizeof($events); $b++) { 
                    if ($event[$b] === $rows[$i]) {
                        $foo = false;
                    }
                }
                if ($foo) {
                    array_push($events, $rows[$i]);
                }
            }
        }
    }
    if (!isset($_GET["tags"]) && isset($_GET["type"])) {
        for ($i=0; $i < sizeof($rows); $i++) { 
            if ($rows[$i]["type"] === $_GET["type"]) {
                array_push($events, $rows[$i]);
            }
        }
    }
    if (!isset($_GET["tags"]) && !isset($_GET["type"])) {
        $sql = "SELECT * from events;";
        for ($i=0; $i < sizeof($rows); $i++) { 
            array_push($events, $rows[$i]);
        }
    }
    
    header("Content-Type: text/Calendar; charset=utf-8");
    header("Content-Disposition: inline; filename=events.ics");

    require_once __DIR__ . '/vendor/autoload.php';
    use Spatie\IcalendarGenerator\Components\Calendar;
    use Spatie\IcalendarGenerator\Components\Event;

    $outputEvents = [];
    for ($x=0; $x < sizeof($events); $x++) { 
        $c = Calendar::create($events[$x]["title"])->event(Event::create($events[$x]["title"])
                    ->startsAt(new DateTime($events[$x]["begin"]))
                    ->endsAt(new DateTime($events[$x]["end"]))
            )
            ->get();
        array_push($outputEvents, $c);        
    }
    for ($i=0; $i < sizeof($outputEvents); $i++) { 
        print_r($outputEvents[$i]);
    }
?>