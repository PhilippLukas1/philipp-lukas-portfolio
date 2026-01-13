#!/usr/bin/python3
import sys
import requests
from bs4 import BeautifulSoup
import csv
from difflib import SequenceMatcher

# HTTP Header so the browser recognizes the output as HTML
# Also ensure stdout is UTF-8 encoded
sys.stdout.reconfigure(encoding='utf-8')
print("Content-Type: text/html; charset=utf-8\n")

print("<!DOCTYPE html>")
print("<html>")
print("<head>")
print("<meta charset='utf-8'>")
print("<title>Edikte Checker Ergebnisse</title>")
print("<style>body { font-family: sans-serif; }</style>")
print("</head>")
print("<body>")
print("<h1>Edikte Checker Ergebnisse</h1>")

# --- Konfiguration ---
EDIKTE_URL = "https://edikte.justiz.gv.at/edikte/ku/vledi02.nsf/suchedi?SearchView&subf=evl&SearchOrder=4&SearchMax=4999&retfields=~%5BEdType%5D=ue&ftquery=&query=%28%5BEdType%5D%3D%28ue%29%29%20AND%20%28%5BDATBM%5D%3E%3D22.03.2025%29"
STAMMBAUM_CSV = "stammbaum_utf8.csv"
FUZZY_THRESHOLD = 0.9  # Ähnlichkeit von 0.0 bis 1.0

# --- Schritt 1: Namen von der Edikte-Seite extrahieren ---
try:
    response = requests.get(EDIKTE_URL)
    soup = BeautifulSoup(response.text, 'html.parser')

    names = []
    for td in soup.find_all('td'):
        text = td.get_text(strip=True)
        if (
            "," in text and
            not text.startswith("BG") and
            not text.startswith("Aufruf") and
            len(text.split(",")) == 2
        ):
            names.append(text)

except Exception as e:
    print(f"<p style='color:red'>Fehler beim Laden der Edikte-Seite: {e}</p>")
    names = []

# --- Schritt 2: Stammbaum laden ---
stammbaum = []
try:
    with open(STAMMBAUM_CSV, mode="r", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f, delimiter=";")
        for row in reader:
            if row["Surname"] and row["Given"]:
                full_name = f"{row['Surname'].strip()}, {row['Given'].strip()}"
                stammbaum.append(full_name)
except Exception as e:
    print(f"<p style='color:red'>Fehler beim Einlesen des Stammbaums: {e}</p>")
    print("</body></html>")
    sys.exit(0)

# --- Schritt 3: Fuzzy Matching ---
matches = []
for name_edikt in names:
    for name_stamm in stammbaum:
        ratio = SequenceMatcher(None, name_edikt.lower(), name_stamm.lower()).ratio()
        if ratio >= FUZZY_THRESHOLD:
            matches.append((name_edikt, name_stamm, ratio))

# --- Schritt 4: Ergebnis anzeigen ---
if matches:
    print("<h2>✅ Übereinstimmungen gefunden:</h2>")
    print("<ul>")
    for match in matches:
        # match[0]: Edikt Name, match[1]: Stammbaum Name, match[2]: Ratio
        print(f"<li>{match[0]} &approx; {match[1]} (Ähnlichkeit: {round(match[2], 2)})</li>")
    print("</ul>")
else:
    print("<h2>❌ Keine Übereinstimmungen gefunden.</h2>")

print("</body>")
print("</html>")