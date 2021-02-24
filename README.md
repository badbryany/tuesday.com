# tuesday.com

tuesday.com ist eine Webanwendung, welche das Planen von Terminen in Vereinen erleichtert.

## Installation

1. einen Webserver, SQL-Datenbank und PHP 7 installieren

2.  ./api/config.php
    - alle existierenden Gruppen und Arten von Terminen in den Array schreiben. (Diese werden Automatisch verwendet)
    - für die Datenbank:
      1. Benutzername des Datenbanknutzers bei **$DBuname** eintragen
      2. Passwort des Datenbanknutzers bei **$DBpassword** eintragen
      3. Den Pfad der Datenbank bei **$DBurl** eintragen
    
3. vor dem benutzen der Anwendung **"http://localhost/getSession.php?uname=newUser"** aufrufen

## Codestruktur

### ./

- index.html ➔ Startseite
- calendar.html ➔ Seite, in der die Termine graphisch in einem Kalender dargestellt werden
- terminliste.php ➔ Seite, in der die Termine graphisch in einer Liste dargestellt werden (kann gefiltert werden)

### api/

REST Schnittstelle für alle clientseitigen Abfragen:
  - Datenbank abfragen
    - Termine auslesen
  - Daten speichern
  - Ical-Feed abrufen

Endpunkte:
  - editEvent.php ➔ Termin bearbeiten
  - createEvent.php ➔ Termine erstellen
  - getEvents.php ➔ Termine abrufen

### js/

der Clientseitige Code
  - Abfragen zu dem Server
  - Daten zu dem Server senden

Dateien:
  - calendar.js ➔ Stellt den Kalender dar (greift auf getEvents.php zu)
  - editEvent.js ➔ sendet Daten zu editEvent.php
  - createEvent.js ➔ zendet Daten zu createEvent.php

## Fremdcode
  - sweetalert.js (https://sweetalert2.github.io/) (Ordner: ./js/lib/) (Lizenz: MIT, © Tristan Edwards & Limon Monte 2014)
  - fullcalendar (https://fullcalendar.io/) (Ordner: ./calendar/) (Lizenz: MIT, © Adam Shaw 2020)
      - rrule plugin für den Fullcalendar (Ordner: ./js/lib/)
