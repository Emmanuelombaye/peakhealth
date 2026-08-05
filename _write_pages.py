from pathlib import Path

ROOT = Path(r"I:\ceo\peakhealth")
products = [
    "hydrating-serum",
    "dry-skin-lotion",
    "brightening-serum",
    "antioxidant-serum",
    "firming-look-serum",
    "daily-moisturizing-cream",
    "light-moisturising-cream",
    "nourishing-skin-cream",
]
posts = ["lightweight-serum", "naturally-inspired", "key-ingredients"]

product_tpl = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>PeakBody Product</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400&family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/styles.css">
  <link rel="icon" href="../assets/brand/peakbody-mark.png">
</head>
<body>
  <header data-header="shop"></header>
  <div id="product-root" data-slug="{slug}"></div>
  <footer data-footer></footer>
  <script src="../js/data.js"></script>
  <script src="../js/app.js"></script>
</body>
</html>
"""

blog_tpl = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>PeakBody Journal</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400&family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/styles.css">
  <link rel="icon" href="../assets/brand/peakbody-mark.png">
</head>
<body>
  <header data-header></header>
  <div id="blog-root" data-slug="{slug}"></div>
  <footer data-footer></footer>
  <script src="../js/data.js"></script>
  <script src="../js/app.js"></script>
</body>
</html>
"""

(ROOT / "products").mkdir(exist_ok=True)
(ROOT / "blog").mkdir(exist_ok=True)
for slug in products:
    (ROOT / "products" / f"{slug}.html").write_text(product_tpl.format(slug=slug), encoding="utf-8")
for slug in posts:
    (ROOT / "blog" / f"{slug}.html").write_text(blog_tpl.format(slug=slug), encoding="utf-8")
print("wrote product and blog pages")
