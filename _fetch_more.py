import urllib.request, pathlib, re, json, ssl

opener = urllib.request.build_opener()
opener.addheaders = [("User-Agent", "Mozilla/5.0 PeakBodyStorefrontBuilder/1.0")]
urllib.request.install_opener(opener)

out = pathlib.Path(r"I:\ceo\peakhealth\_tmp")
out.mkdir(exist_ok=True)

pages = {
    "shop": "https://template51.cardsshield.com/shop/",
    "about": "https://template51.cardsshield.com/about-us/",
    "contact": "https://template51.cardsshield.com/contact-us/",
    "hydrating-serum": "https://template51.cardsshield.com/product/hydrating-serum/",
    "dry-skin-lotion": "https://template51.cardsshield.com/product/dry-skin-lotion/",
    "faqs": "https://template51.cardsshield.com/faqs/",
    "privacy": "https://template51.cardsshield.com/privacy-policy/",
    "terms": "https://template51.cardsshield.com/terms-conditions/",
    "refund": "https://template51.cardsshield.com/return-refund/",
    "shipping": "https://template51.cardsshield.com/shipping-policy/",
    "peakbody": "https://www.peakbody.com/",
}

for name, url in pages.items():
    dest = out / f"{name}.html"
    try:
        urllib.request.urlretrieve(url, dest)
        print("OK", name, dest.stat().st_size)
    except Exception as e:
        print("FAIL", name, e)

# parse product description from hydrating serum
hs = (out / "hydrating-serum.html").read_text(encoding="utf-8", errors="ignore") if (out / "hydrating-serum.html").exists() else ""
# woocommerce product short description
m = re.search(r'woocommerce-product-details__short-description.*?>(.*?)</div>', hs, re.S)
print("\nSHORT DESC:", (m.group(1)[:800] if m else "none"))
m2 = re.search(r'id="tab-description".*?>(.*?)</div>\s*</div>', hs, re.S)
print("\nLONG DESC snippet:", (re.sub("<[^>]+>", " ", m2.group(1))[:1000] if m2 else "none"))

# peakbody logos
pb = (out / "peakbody.html").read_text(encoding="utf-8", errors="ignore") if (out / "peakbody.html").exists() else ""
print("\nPEAKBODY LEN", len(pb))
for pat in [
    r'src="([^"]*logo[^"]*)"',
    r'srcset="([^"]*logo[^"]*)"',
    r'href="([^"]*(?:favicon|apple-touch)[^"]*)"',
    r'og:image" content="([^"]+)"',
    r'content="(https://[^"]+\.(?:png|jpg|svg|webp))"',
]:
    ms = re.findall(pat, pb, re.I)
    if ms:
        print("PAT", pat)
        for x in ms[:12]:
            print(" ", x[:180])
