import re, json, os

html = open(r"I:\ceo\peakhealth\template-home.html", encoding="utf-8", errors="ignore").read()

prices = re.findall(
    r'/product/([^"/]+)/" title="([^"]+)".*?background-image:url\(([^)]+)\).*?woocommerce-Price-currencySymbol">([^<]*)</span>([0-9.,]+)',
    html,
    re.S,
)
seen = set()
catalog = []
for slug, title, img, sym, price in prices:
    if slug in seen:
        continue
    seen.add(slug)
    catalog.append({"slug": slug, "title": title, "img": img, "symbol": sym, "price": price})

print("CATALOG")
print(json.dumps(catalog, indent=2))

uploads = sorted(set(re.findall(r"https://template51.cardsshield.com/wp-content/uploads/[^\"')\s]+", html)))
main = [u for u in uploads if not re.search(r"-\d+x\d+\.", u)]
print("\nMAIN UPLOADS", len(main))
for u in main:
    print(u)

print("\nPRODUCT LINKS")
for u in sorted(set(re.findall(r"https://template51.cardsshield.com/product/[^\"/#]+", html))):
    print(u)

os.makedirs(r"I:\ceo\peakhealth\_tmp", exist_ok=True)
json.dump(catalog, open(r"I:\ceo\peakhealth\_tmp\catalog.json", "w"), indent=2)
json.dump(main, open(r"I:\ceo\peakhealth\_tmp\uploads.json", "w"), indent=2)
