import json, os, urllib.request, ssl, pathlib, time

ctx = ssl.create_default_context()
base = pathlib.Path(r"I:\ceo\peakhealth\assets\source")
base.mkdir(parents=True, exist_ok=True)

uploads = json.load(open(r"I:\ceo\peakhealth\_tmp\uploads.json", encoding="utf-8"))
extra = [
    "https://template51.cardsshield.com/wp-content/uploads/2021/03/logo.png",
    "https://template51.cardsshield.com/wp-content/uploads/2026/04/banner.jpeg",
    "https://template51.cardsshield.com/wp-content/uploads/2021/03/Shop-01-1000x1200.png",
    "https://template51.cardsshield.com/wp-content/uploads/2021/03/Shop-02-1000x1200.png",
    "https://template51.cardsshield.com/wp-content/uploads/2021/03/Shop-03-1000x1200.png",
    "https://template51.cardsshield.com/wp-content/uploads/2021/03/Shop-10-1000x1200.png",
    "https://template51.cardsshield.com/wp-content/uploads/2021/03/Shop-01.png",
    "https://template51.cardsshield.com/wp-content/uploads/2021/03/Shop-02.png",
    "https://template51.cardsshield.com/wp-content/uploads/2021/03/Shop-03.png",
    "https://template51.cardsshield.com/wp-content/uploads/2021/03/Shop-04.png",
    "https://template51.cardsshield.com/wp-content/uploads/2021/03/Shop-05.png",
    "https://template51.cardsshield.com/wp-content/uploads/2021/03/Shop-06.png",
    "https://template51.cardsshield.com/wp-content/uploads/2021/03/Shop-07.png",
    "https://template51.cardsshield.com/wp-content/uploads/2021/03/Shop-08.png",
    "https://template51.cardsshield.com/wp-content/uploads/2021/03/Shop-09.png",
    "https://template51.cardsshield.com/wp-content/uploads/2021/03/Shop-10.png",
    "https://template51.cardsshield.com/wp-content/uploads/2021/03/Shop-04-1000x1200.png",
    "https://template51.cardsshield.com/wp-content/uploads/2021/03/Shop-05-1000x1200.png",
    "https://template51.cardsshield.com/wp-content/uploads/2021/03/Shop-06-1000x1200.png",
    "https://template51.cardsshield.com/wp-content/uploads/2021/03/Shop-07-1000x1200.png",
    "https://template51.cardsshield.com/wp-content/uploads/2021/03/Shop-08-1000x1200.png",
    "https://template51.cardsshield.com/wp-content/uploads/2021/03/Shop-09-1000x1200.png",
    "https://www.peakbody.com/favicon.ico",
]
urls = list(dict.fromkeys(uploads + extra))

# also try peakbody logo candidates after homepage parse
pb_path = pathlib.Path(r"I:\ceo\peakhealth\peakbody-home.html")
if pb_path.exists():
    import re
    html = pb_path.read_text(encoding="utf-8", errors="ignore")
    for m in re.findall(r'(https?://[^\"\']+\.(?:png|svg|jpg|jpeg|webp|ico))', html, re.I):
        if any(k in m.lower() for k in ["logo", "favicon", "apple-touch", "peakbody", "peak-body"]):
            urls.append(m)

opener = urllib.request.build_opener()
opener.addheaders = [("User-Agent", "Mozilla/5.0 PeakBodyStorefrontBuilder/1.0")]
urllib.request.install_opener(opener)

ok = fail = 0
for url in urls:
    name = url.split("?")[0].rstrip("/").split("/")[-1]
    # prefix year folders to avoid collisions
    parts = url.split("/uploads/")
    if len(parts) == 2:
        rel = parts[1].split("?")[0]
        dest = base / rel.replace("/", os.sep)
    else:
        dest = base / "misc" / name
    dest.parent.mkdir(parents=True, exist_ok=True)
    if dest.exists() and dest.stat().st_size > 0:
        continue
    try:
        urllib.request.urlretrieve(url, dest)
        print("OK", dest, dest.stat().st_size)
        ok += 1
        time.sleep(0.05)
    except Exception as e:
        print("FAIL", url, e)
        fail += 1

print("DONE ok", ok, "fail", fail)
