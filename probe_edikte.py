
import requests
from bs4 import BeautifulSoup

url = "https://edikte.justiz.gv.at/edikte/ku/vledi02.nsf/suchedi?SearchView&subf=evl&SearchOrder=4&SearchMax=200&retfields=~%5BEdType%5D=ue&ftquery=&query=%28%5BEdType%5D%3D%28ue%29%29%20AND%20%28%5BDATBM%5D%3E%3D22.03.2025%29"

try:
    r = requests.get(url)
    soup = BeautifulSoup(r.text, 'html.parser')
    
    trs = soup.find_all('tr')
    for tr in trs:
        tds = tr.find_all('td')
        # Check if any cell has the "Surname, Givenname" format we use
        found_name = False
        
        for i, td in enumerate(tds):
            txt = td.get_text(strip=True)
            if "," in txt and len(txt.split(",")) == 2:
                if not txt.startswith("BG") and not txt.startswith("Aufruf"):
                    print(f"--- ROW MATCH: {txt} ---")
                    # Print ALL links in this row
                    links = tr.find_all('a')
                    for a in links:
                        print(f"LINK: {a.get('href')} TEXT: {a.get_text(strip=True)}")
                    print("------------------------")
                    exit() # Found one, good enough

except Exception as e:
    print(e)
