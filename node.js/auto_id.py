import json
import time

aktualisierungsintervall = 10
def add_auto_ids(json_file):
    # Lade die vorhandenen Daten aus der JSON-Datei
    with open(json_file, 'r') as file:
        data = json.load(file)
    
    # Überprüfe, ob die Daten bereits IDs enthalten
    if not all('id' in item for item in data):
        # Füge IDs hinzu
        for index, item in enumerate(data):
            item['id'] = index + 1
    
    # Speichere die aktualisierten Daten in der JSON-Datei
    with open(json_file, 'w') as file:
        json.dump(data, file, indent=4)

# Aufruf der Funktion mit dem Dateinamen
add_auto_ids('gaestebuch.json')

import json
import time

# Pfad zur Gästebuch-JSON-Datei
gaestebuch_path = 'gaestebuch.json'

# Funktion zum Lesen und Aktualisieren des Gästebuchs
def aktualisiere_gaestebuch():
    # Lese aktuelle Gästebuch-Daten
    with open(gaestebuch_path, 'r') as file:
        gaestebuch = json.load(file)

    # Speichere aktualisiertes Gästebuch
    with open(gaestebuch_path, 'w') as file:
        json.dump(gaestebuch, file, indent=4)

# Definiere das Aktualisierungsintervall (z.B. alle 10 Sekunden)
aktualisierungsintervall = 10

# Endlosschleife zur kontinuierlichen Aktualisierung des Gästebuchs
while True:
    aktualisiere_gaestebuch()
    print("Gästebuch aktualisiert")
    time.sleep(aktualisierungsintervall)


