# PeakBody Storefront

Clean-beauty e-commerce storefront for **PeakBody**, modeled on the Cosma / template51 layout (cream + charcoal + gold, Crimson Text + Roboto).

This is a static preview you can open locally or deploy anywhere. Cart state is stored in the browser. Connect it to **Shopify** or **WooCommerce** when you are ready for live checkout.

## Preview locally

From this folder:

```bash
python -m http.server 5173
```

Then open [http://localhost:5173](http://localhost:5173).

## What’s included

- Home, Shop, product pages, About, Contact, Cart, Checkout
- FAQs, Privacy, Terms, Returns, Shipping
- Journal / blog posts
- PeakBody logo in the header, footer, and on every product bottle image
- Template lifestyle photography, icons, and collection structure

## Brand note

The WhatsApp logo file was not attached in this chat, so a PeakBody wordmark + mark was created to match the template’s luxury skincare look. Drop your official logo over:

- `assets/brand/peakbody-logo.png`
- `assets/brand/peakbody-logo-horizontal.png`
- `assets/brand/peakbody-mark.png`

Then re-run branding if you want bottles updated:

```bash
python _build_store.py
```

## Shopify / WooCommerce next step

- **Shopify:** recreate products in Admin, upload images from `assets/products/`, and use this layout as a custom theme reference (or paste sections into a vintage/Horizon theme).
- **WooCommerce:** install WordPress + WooCommerce, add the same 8 products, set the PeakBody logo in Appearance → Customize, and match colors `#1a1a1a` / `#bf964a` / `#f8f3eb`.

Company details used: PeakBody, Tempe AZ · 1-800-249-4566 · 5801 S. McClintock Drive, Suite 107.
