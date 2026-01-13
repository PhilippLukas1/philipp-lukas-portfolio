from http.server import BaseHTTPRequestHandler
import json
import os
import sys

# Ensure dependencies are available (Vercel installs them, but good practice)
try:
    import requests
    from bs4 import BeautifulSoup
    from difflib import SequenceMatcher
except ImportError:
    # Fallback for dev environment if not installed
    pass

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        
        try:
            # --- Configuration ---
            # Use current directory to find the CSV
            base_path = os.path.dirname(__file__)
            csv_path = os.path.join(base_path, 'stammbaum_utf8.csv')
            
            EDIKTE_URL = "https://edikte.justiz.gv.at/edikte/ku/vledi02.nsf/suchedi?SearchView&subf=evl&SearchOrder=4&SearchMax=4999&retfields=~%5BEdType%5D=ue&ftquery=&query=%28%5BEdType%5D%3D%28ue%29%29%20AND%20%28%5BDATBM%5D%3E%3D22.03.2025%29"
            FUZZY_THRESHOLD = 0.9

            # --- Step 1: Fetch Edikte ---
            names = []
            response = requests.get(EDIKTE_URL)
            soup = BeautifulSoup(response.text, 'html.parser')

            for td in soup.find_all('td'):
                text = td.get_text(strip=True)
                if (
                    "," in text and
                    not text.startswith("BG") and
                    not text.startswith("Aufruf") and
                    len(text.split(",")) == 2
                ):
                    names.append(text)
            
            # --- Step 2: Load Stammbaum ---
            stammbaum = []
            if os.path.exists(csv_path):
                 import csv
                 # utf-8-sig to handle BOM if present
                 with open(csv_path, mode="r", encoding="utf-8-sig") as f:
                    reader = csv.DictReader(f, delimiter=";")
                    for row in reader:
                        if row.get("Surname") and row.get("Given"):
                            full_name = f"{row['Surname'].strip()}, {row['Given'].strip()}"
                            stammbaum.append(full_name)
            else:
                 self.wfile.write(json.dumps({"error": "CSV file not found"}).encode('utf-8'))
                 return

            # --- Step 3: Fuzzy Matching ---
            matches = []
            for name_edikt in names:
                for name_stamm in stammbaum:
                    ratio = SequenceMatcher(None, name_edikt.lower(), name_stamm.lower()).ratio()
                    if ratio >= FUZZY_THRESHOLD:
                        matches.append({
                            "ediktName": name_edikt,
                            "stammbaumName": name_stamm,
                            "similarity": round(ratio, 2)
                        })

            # --- Step 4: Return JSON ---
            response_data = {
                "count": len(matches),
                "matches": matches
            }
            self.wfile.write(json.dumps(response_data).encode('utf-8'))

        except Exception as e:
            error_response = {"error": str(e)}
            self.wfile.write(json.dumps(error_response).encode('utf-8'))
