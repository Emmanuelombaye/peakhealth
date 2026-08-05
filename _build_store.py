"""Build PeakBody storefront assets: copy logos, brand product images."""
from __future__ import annotations

import shutil
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageOps

ROOT = Path(r"I:\ceo\peakhealth")
BRAND = ROOT / "assets" / "brand"
PRODUCTS = ROOT / "assets" / "products"
SOURCE = ROOT / "assets" / "source"
CURSOR_ASSETS = Path(r"C:\Users\Administrator\.cursor\projects\i-ceo-peakhealth\assets")

BRAND.mkdir(parents=True, exist_ok=True)
PRODUCTS.mkdir(parents=True, exist_ok=True)

for name in ("peakbody-logo.png", "peakbody-mark.png", "peakbody-logo-horizontal.png"):
    src = CURSOR_ASSETS / name
    dest = BRAND / name
    if src.exists():
        shutil.copy2(src, dest)
        print("copied", src, "->", dest, dest.stat().st_size)
    elif dest.exists():
        print("already", dest)
    else:
        print("MISSING", name)


def trim_transparent(im: Image.Image, pad: int = 8) -> Image.Image:
    if im.mode != "RGBA":
        im = im.convert("RGBA")
    bbox = im.getbbox()
    if not bbox:
        return im
    im = im.crop(bbox)
    if pad:
        canvas = Image.new("RGBA", (im.width + pad * 2, im.height + pad * 2), (0, 0, 0, 0))
        canvas.paste(im, (pad, pad), im)
        return canvas
    return im


def recolor_nontransparent(im: Image.Image, color: tuple[int, int, int, int]) -> Image.Image:
    im = im.convert("RGBA")
    pixels = im.load()
    w, h = im.size
    r, g, b, a = color
    for y in range(h):
        for x in range(w):
            _, _, _, pa = pixels[x, y]
            if pa > 12:
                pixels[x, y] = (r, g, b, pa)
    return im


def make_white_logo(src: Path, dest: Path) -> None:
    im = Image.open(src).convert("RGBA")
    # knock out near-white background if any
    datas = im.getdata()
    out = []
    for r, g, b, a in datas:
        if a < 8:
            out.append((r, g, b, 0))
        elif r > 245 and g > 245 and b > 245:
            out.append((r, g, b, 0))
        else:
            # luminance as alpha, paint white/gold-ish
            lum = int(0.2126 * r + 0.7152 * g + 0.0722 * b)
            # keep gold-ish pixels gold, dark pixels white
            if r > 140 and g > 100 and b < 160 and r > b + 20:
                out.append((232, 204, 150, a))
            else:
                out.append((255, 255, 255, min(255, int(a * (1.15 if lum < 200 else 0.9)))))
    im.putdata(out)
    im = trim_transparent(im, 4)
    im.save(dest)
    print("white logo", dest, im.size)


logo_path = BRAND / "peakbody-logo.png"
mark_path = BRAND / "peakbody-mark.png"
white_logo = BRAND / "peakbody-logo-white.png"
white_mark = BRAND / "peakbody-mark-white.png"
if logo_path.exists():
    make_white_logo(logo_path, white_logo)
if mark_path.exists():
    make_white_logo(mark_path, white_mark)

MAP = {
    "hydrating-serum": SOURCE / "2021/03/Shop-01-1000x1200.png",
    "antioxidant-serum": SOURCE / "2021/03/Shop-02-1000x1200.png",
    "brightening-serum": SOURCE / "2021/03/Shop-03-1000x1200.png",
    "daily-moisturizing-cream": SOURCE / "2021/03/Shop-05-1000x1200.png",
    "nourishing-skin-cream": SOURCE / "2021/03/Shop-06-1000x1200.png",
    "light-moisturising-cream": SOURCE / "2021/03/Shop-08-1000x1200.png",
    "dry-skin-lotion": SOURCE / "2021/03/Shop-10-1000x1200.png",
    "firming-look-serum": SOURCE / "2021/03/Shop-04.png",
}


def brand_product(slug: str, src: Path) -> None:
    if not src.exists():
        print("skip missing", src)
        return
    base = Image.open(src).convert("RGBA")
    w, h = base.size
    overlay = Image.open(white_logo if white_logo.exists() else logo_path).convert("RGBA")
    # scale logo to sit on bottle body
    target_w = int(w * 0.36)
    ratio = target_w / overlay.width
    overlay = overlay.resize((target_w, max(1, int(overlay.height * ratio))), Image.Resampling.LANCZOS)

    # tall dark plate covering the full mockup label copy
    plate_w = int(w * 0.52)
    plate_h = int(h * 0.50)
    plate = Image.new("RGBA", (plate_w, plate_h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(plate)
    draw.rounded_rectangle(
        (0, 0, plate_w - 1, plate_h - 1),
        radius=int(min(plate_w, plate_h) * 0.14),
        fill=(8, 6, 4, 252),
    )

    cx, cy = w // 2, int(h * 0.57)
    px = cx - plate_w // 2
    py = cy - plate_h // 2
    lx = cx - overlay.width // 2
    ly = cy - overlay.height // 2

    composed = base.copy()
    composed.alpha_composite(plate, (px, py))
    composed.alpha_composite(overlay, (lx, ly))

    out = PRODUCTS / f"{slug}.png"
    composed.convert("RGB").save(out, "PNG", optimize=True)
    thumb = composed.copy()
    thumb.thumbnail((700, 840), Image.Resampling.LANCZOS)
    thumb.convert("RGB").save(PRODUCTS / f"{slug}-card.png", "PNG", optimize=True)
    print("branded", slug, out.stat().st_size)


for slug, src in MAP.items():
    brand_product(slug, src)

# copy lifestyle images into public folder
life = ROOT / "assets" / "lifestyle"
life.mkdir(exist_ok=True)
for name in ["banner.jpeg", "11.jpeg", "5.jpeg", "6.jpeg", "7.jpeg", "17.jpeg", "12.jpeg", "13.jpeg", "3.jpeg"]:
    src = SOURCE / "2026/04" / name
    if src.exists():
        shutil.copy2(src, life / name)
icons = ROOT / "assets" / "icons"
icons.mkdir(exist_ok=True)
for name in ["icn1.png", "icn2.png", "icn3.png", "badge-img-new.png"]:
    src = SOURCE / "2021/07" / name
    if src.exists():
        shutil.copy2(src, icons / name)
pay = SOURCE / "2021/03/footer-payment-new.png"
if pay.exists():
    shutil.copy2(pay, ROOT / "assets" / "footer-payment.png")
for name in ["home-test-01.jpg", "home-test-03.jpg"]:
    src = SOURCE / "2021/04" / name
    dest = life / name
    if src.exists():
        shutil.copy2(src, dest)
src = SOURCE / "2021/03/home-test-04.jpg"
if src.exists():
    shutil.copy2(src, life / "home-test-04.jpg")
# instagram thumbs
thumbs_dir = SOURCE / "elementor" / "thumbs"
if thumbs_dir.exists():
    for p in thumbs_dir.glob("*.jpeg"):
        shutil.copy2(p, life / p.name)

print("BUILD ASSETS DONE")
