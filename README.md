HTML5 APIs (german)
===================

Vortrag vom 14. Mai 2013 auf der SAE Wien über (guess what) HTML5 APIs.


Benutzung
---------

Um sich die Presentation einfach anzusehen, die `standalone.zip` downloaden,
entpacken und die index.html aufmachen. Die Standalone Version enthält keine
der Demo-JavaScripte. Hierfür muss die reguläre Version benutzt werden. (siehe
unten)


Voraussetzungen
----------------

Um WebSocket beispiele laufen zu lassen:

* nodejs

für die Weiterentwicklung:

* compass
* guard (für livereload)

Demo Modus
----------

Um die Live-Demos benutzen zu können muss nach Installation der
Voraussetzungen erstmal alle nötigen nodejs libraries installieren. Das geht einfach in dem ihr folgenden Command in diesem Ordner ausführt (dieser liest die `packages.json` ein):

    npm install

Anschließend kann die `server.js` ausgeführt werden:

    node server.js

Dadurch wird ein Server ausgeführt der auf allen Adressen des Computers
lauscht. Dieser ist daher über die lokale Netzwerk-IP, externe IP als auch
localhost erreichbar via `http://localhost:8000`.

Um ein externes Gerät (Smartphone,…) als Fernsteuerung für die Presentation
zu benutzen einfach `http://<eure ip>:8000/ctrl` aufrufen. Dieses Gerät
wird auch als Quelle für die WebSockets Device Orientation Stream Demo als
auch die User Media Demo benutzt.
