<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Setup</title>
</head>
<body>
    <?php
        // NUR EINMAL AUFRUFEN !!!
        include "config.php";
        include 'connectDB.php';

        $sql = 'CREATE TABLE "events" (
            "e_id"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            "title"	TEXT NOT NULL,
            "description"	TEXT,
            "owner"	TEXT NOT NULL,
            "type"	TEXT NOT NULL,
            "tags"	TEXT,
            "begin"	DATE NOT NULL,
            "end"	DATE NOT NULL,
            "rrule"	TEXT
        )';

        $sth = $db->prepare($sql);
        $sth->execute();
    ?>
    <h1>Die Datenbankstruktur wurde erfolgreich erstellt...</h1>
    <h1>Damit die Datenbank nicht gelöscht werden kann empfehle ich diese Datei sofort zu löschen, damit sie nicht ein 2. mal aufgerufen werden kann.</h1>
    <h1 style="color:red;font-size:3rem;">BITTE DIESE DATEI LÖSCHEN!</h1>
</body>
</html>