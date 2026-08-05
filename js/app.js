(() => {
  const CART_KEY = "peakbody-cart";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  const money = (n) => `$${Number(n).toFixed(2)}`;
  const stars = (n) => "★★★★★".slice(0, n) + "☆☆☆☆☆".slice(0, 5 - n);

  function loadCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    } catch {
      return [];
    }
  }
  function saveCart(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    renderCartBadges();
  }
  function cartCount(items = loadCart()) {
    return items.reduce((s, i) => s + i.qty, 0);
  }
  function cartTotal(items = loadCart()) {
    return items.reduce((s, i) => s + i.qty * i.price, 0);
  }
  function addToCart(slug, qty = 1) {
    const product = PB.products.find((p) => p.slug === slug);
    if (!product) return;
    const items = loadCart();
    const existing = items.find((i) => i.slug === slug);
    if (existing) existing.qty += qty;
    else items.push({ slug, name: product.name, price: product.price, image: product.image, qty });
    saveCart(items);
    toast(`${product.name} added to cart`);
  }
  function setQty(slug, qty) {
    let items = loadCart();
    if (qty <= 0) items = items.filter((i) => i.slug !== slug);
    else items = items.map((i) => (i.slug === slug ? { ...i, qty } : i));
    saveCart(items);
  }

  function toast(msg) {
    let el = $(".toast");
    if (!el) {
      el = document.createElement("div");
      el.className = "toast";
      el.id = "toast";
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.classList.remove("show"), 2200);
  }

  function asset(path) {
    if (!path) return path;
    if (path.startsWith("http") || path.startsWith("assets/") === false) return path;
    const depth = (location.pathname.match(/\//g) || []).length;
    // files in /products/ or /blog/ need ../
    if (location.pathname.includes("/products/") || location.pathname.includes("/blog/")) {
      return `../${path}`;
    }
    return path;
  }

  function href(path) {
    if (!path) return path;
    let target = path;
    if (location.protocol !== "file:") {
      if (target === "index.html") target = "./";
      else if (target.endsWith(".html")) target = target.slice(0, -5);
    }
    if (location.pathname.includes("/products/") || location.pathname.includes("/blog/")) {
      return target === "./" ? "../" : `../${target}`;
    }
    return target;
  }

  function headerHTML(active) {
    return `
      <div class="container header-inner">
        <a class="brand" href="${href("index.html")}" aria-label="PeakBody home">
          <img src="${asset("assets/brand/peakbody-logo-horizontal.png")}" alt="PeakBody" onerror="this.style.display='none'; this.nextElementSibling.style.display='inline';">
          <span class="brand-fallback" style="display:none">PeakBody</span>
        </a>
        <button class="icon-btn menu-toggle" data-menu-toggle aria-label="Open menu">Menu</button>
        <nav class="nav" data-nav>
          <a class="${active === "home" ? "active" : ""}" href="${href("index.html")}">Home</a>
          <a class="${active === "shop" ? "active" : ""}" href="${href("shop.html")}">Shop</a>
          <a class="${active === "about" ? "active" : ""}" href="${href("about.html")}">About Us</a>
          <a class="${active === "contact" ? "active" : ""}" href="${href("contact.html")}">Contact us</a>
        </nav>
        <div class="header-actions">
          <a class="icon-btn" href="${href("login.html")}">Log In</a>
          <a class="icon-btn" href="${href("cart.html")}" data-cart-link>
            <span data-cart-total>${money(cartTotal())}</span>
          </a>
        </div>
      </div>`;
  }

  function footerHTML() {
    return `
      <div class="container footer-grid">
        <div>
          <a class="brand" href="${href("index.html")}">
            <img src="${asset("assets/brand/peakbody-logo.png")}" alt="PeakBody" style="height:72px">
          </a>
          <p style="margin-top:16px">Ultra-high purity HPLC-tested research peptides from PeakBody — precision formulations engineered for laboratory analytical standards.</p>
        </div>
        <div>
          <h6>Company</h6>
          <ul>
            <li><a href="${href("about.html")}">Our Story</a></li>
            <li><a href="${href("about.html")}">About Us</a></li>
            <li><a href="${href("contact.html")}">Contact us</a></li>
            <li><a href="${href("faqs.html")}">FAQs</a></li>
          </ul>
        </div>
        <div>
          <h6>Useful Links</h6>
          <ul>
            <li><a href="${href("privacy.html")}">Privacy Policy</a></li>
            <li><a href="${href("terms.html")}">Terms & Conditions</a></li>
            <li><a href="${href("refund.html")}">Return & Refund</a></li>
            <li><a href="${href("shipping.html")}">Shipping Policy</a></li>
          </ul>
        </div>
        <div>
          <h6>Visit / Call</h6>
          <p>5801 S. McClintock Drive<br>Suite 107, Tempe, AZ 85283</p>
          <p><a href="tel:18002494566">1-800-249-4566</a><br>support@peakbody.com</p>
        </div>
      </div>
      <div class="container legal">
        <span>© ${new Date().getFullYear()} PeakBody. All Rights Reserved.</span>
        <img class="pay-icons" src="${asset("assets/footer-payment.png")}" alt="Payment methods">
      </div>`;
  }

  function productCard(p, index = 0) {
    const delay = (index % 4) * 100;
    return `
      <article class="product-card" data-animate="fadeInUp" data-delay="${delay}">
        <a class="thumb" href="${href("products/" + p.slug + ".html")}">
          <img src="${asset(p.image)}" alt="${p.name}">
          <span class="product-thumb-overlay"></span>
          <span class="product-hover-actions">
            <button class="add-btn" type="button" data-add="${p.slug}">Add to cart</button>
          </span>
        </a>
        <h3><a href="${href("products/" + p.slug + ".html")}">${p.name}</a></h3>
        <div><span class="stars">${stars(p.rating)}</span><span class="rating-count">(${p.reviews})</span></div>
        <div class="price">${money(p.price)}</div>
      </article>`;
  }

  function renderCartBadges() {
    $$("[data-cart-total]").forEach((el) => {
      el.textContent = money(cartTotal());
    });
  }

  function mountChrome() {
    const header = $("[data-header]");
    const footer = $("[data-footer]");
    if (header) {
      header.className = "site-header";
      header.innerHTML = headerHTML(header.dataset.header || "");
    }
    if (footer) {
      footer.className = "site-footer";
      footer.innerHTML = footerHTML();
    }
    $("[data-menu-toggle]")?.addEventListener("click", () => {
      $("[data-nav]")?.classList.toggle("open");
    });
    const onScroll = () => {
      header?.classList.toggle("scrolled", window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    document.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-add]");
      if (!btn) return;
      e.preventDefault();
      e.stopPropagation();
      addToCart(btn.dataset.add, Number(btn.dataset.qty || 1));
    });
  }

  function initReveals() {
    const nodes = $$("[data-animate]");
    if (!nodes.length) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    nodes.forEach((el) => {
      if (el.dataset.revealReady) return;
      el.dataset.revealReady = "1";
      el.classList.add("el-invisible");
      if (reduced) {
        el.classList.add("el-animated", `el-${el.dataset.animate || "fadeInUp"}`);
        return;
      }
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const name = el.dataset.animate || "fadeInUp";
          const delay = Number(el.dataset.delay || 0);
          el.style.animationDelay = `${delay}ms`;
          el.classList.add("el-animated", `el-${name}`);
          io.unobserve(el);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    nodes.forEach((el) => io.observe(el));
  }

  function initParallax() {
    const hero = $("[data-parallax]");
    if (!hero) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const update = () => {
      const y = Math.min(window.scrollY, 700);
      hero.style.backgroundPosition = `center ${50 + y * 0.08}%`;
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  function renderHome() {
    const featured = $("#featured-products");
    const collection = $("#collection-products");
    if (featured) featured.innerHTML = PB.products.slice(0, 3).map((p, i) => productCard(p, i)).join("");
    if (collection) collection.innerHTML = PB.products.map((p, i) => productCard(p, i)).join("");
    const quotes = $("#testimonials");
    if (quotes) {
      quotes.innerHTML = PB.testimonials
        .map(
          (t, i) => `<article class="testimonial" data-animate="fadeInUp" data-delay="${i * 100}">
            <img src="${asset(t.image)}" alt="${t.name}">
            <div class="stars">★★★★★</div>
            <p>“${t.quote}”</p>
            <strong>${t.name}</strong>
          </article>`
        )
        .join("");
    }
    const blogs = $("#blog-list");
    if (blogs) {
      blogs.innerHTML = PB.posts
        .map(
          (p, i) => `<article class="blog-card" data-animate="fadeInUp" data-delay="${i * 100}">
            <a href="${href("blog/" + p.slug + ".html")}"><img src="${asset(p.image)}" alt="${p.title}"></a>
            <time>${p.date}</time>
            <h3><a href="${href("blog/" + p.slug + ".html")}">${p.title}</a></h3>
            <p>${p.excerpt}</p>
          </article>`
        )
        .join("");
    }
  }

  function renderShop() {
    const grid = $("#shop-grid");
    if (grid) grid.innerHTML = PB.products.map((p, i) => productCard(p, i)).join("");
  }

  function renderProductPage() {
    const root = $("#product-root");
    if (!root) return;
    const slug = root.dataset.slug;
    const p = PB.products.find((x) => x.slug === slug);
    if (!p) {
      root.innerHTML = "<p>Product not found.</p>";
      return;
    }
    document.title = `${p.name} – PeakBody`;
    root.innerHTML = `
      <div class="container product-layout">
        <div><img src="${asset(p.gallery[0])}" alt="${p.name}" style="background:#111;width:100%"></div>
        <div>
          <p class="kicker">PeakBody Collection</p>
          <h1>${p.name}</h1>
          <div><span class="stars">${stars(p.rating)}</span><span class="rating-count">(${p.reviews} review)</span></div>
          <p class="price" style="font-size:28px;margin:12px 0 18px">${money(p.price)}</p>
          <p>${p.short}</p>
          <p>${p.description}</p>
          <ul>${p.details.map((d) => `<li>${d}</li>`).join("")}</ul>
          <div style="display:flex;gap:12px;align-items:center;margin:22px 0">
            <div class="qty">
              <button type="button" data-qty-minus>-</button>
              <input id="qty" type="number" min="1" value="1">
              <button type="button" data-qty-plus>+</button>
            </div>
            <button class="btn" data-add="${p.slug}" id="add-detail">Add to cart</button>
          </div>
        </div>
      </div>`;
    const qtyInput = $("#qty");
    $("[data-qty-minus]").onclick = () => {
      qtyInput.value = Math.max(1, Number(qtyInput.value) - 1);
    };
    $("[data-qty-plus]").onclick = () => {
      qtyInput.value = Number(qtyInput.value) + 1;
    };
    $("#add-detail").addEventListener("click", (e) => {
      e.preventDefault();
      addToCart(p.slug, Number(qtyInput.value || 1));
    });
  }

  function renderCartPage() {
    const root = $("#cart-root");
    if (!root) return;
    const draw = () => {
      const items = loadCart();
      if (!items.length) {
        root.innerHTML = `<div class="empty"><h2>Your cart is empty</h2><p>Discover gentle PeakBody essentials.</p><a class="btn" href="${href("shop.html")}">Shop now</a></div>`;
        return;
      }
      root.innerHTML = `
        <div class="cart-layout">
          <div>
            ${items
              .map(
                (i) => `<div class="cart-row">
                  <img src="${asset(i.image)}" alt="${i.name}">
                  <div>
                    <strong>${i.name}</strong>
                    <div class="muted">${money(i.price)}</div>
                    <div class="qty" style="margin-top:8px">
                      <button data-set-qty="${i.slug}" data-next="${i.qty - 1}">-</button>
                      <input value="${i.qty}" readonly>
                      <button data-set-qty="${i.slug}" data-next="${i.qty + 1}">+</button>
                    </div>
                  </div>
                  <div>${money(i.price * i.qty)}</div>
                  <button class="icon-btn" data-set-qty="${i.slug}" data-next="0">Remove</button>
                </div>`
              )
              .join("")}
          </div>
          <aside class="panel">
            <h3>Order summary</h3>
            <p>Subtotal <strong style="float:right">${money(cartTotal(items))}</strong></p>
            <p class="muted">Shipping calculated at checkout.</p>
            <a class="btn" href="${href("checkout.html")}" style="width:100%">Checkout</a>
          </aside>
        </div>`;
    };
    root.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-set-qty]");
      if (!btn) return;
      setQty(btn.dataset.setQty, Number(btn.dataset.next));
      draw();
    });
    draw();
  }

  function renderCheckout() {
    const form = $("#checkout-form");
    if (!form) return;
    const items = loadCart();
    $("#checkout-summary").innerHTML = items.length
      ? items.map((i) => `<p>${i.name} × ${i.qty} <span style="float:right">${money(i.price * i.qty)}</span></p>`).join("") +
        `<hr><p><strong>Total</strong> <strong style="float:right">${money(cartTotal(items))}</strong></p>`
      : "<p>Your cart is empty.</p>";
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!items.length) return toast("Your cart is empty");
      localStorage.removeItem(CART_KEY);
      renderCartBadges();
      form.innerHTML = `<div class="panel"><h2>Thank you</h2><p>Your PeakBody order request has been received. A specialist will confirm fulfillment shortly.</p><a class="btn" href="${href("index.html")}">Back home</a></div>`;
    });
  }

  function renderAbout() {
    const team = $("#team-grid");
    if (team) {
      team.innerHTML = PB.team
        .map(
          (m) => `<article class="team-card">
            <img src="${asset(m.image)}" alt="${m.name}">
            <h3>${m.name}</h3>
            <p class="muted">${m.role}</p>
          </article>`
        )
        .join("");
    }
  }

  function renderBlog() {
    const root = $("#blog-root");
    if (!root) return;
    const slug = root.dataset.slug;
    const post = PB.posts.find((p) => p.slug === slug);
    if (!post) return;
    document.title = `${post.title} – PeakBody`;
    root.innerHTML = `
      <div class="page-hero" style="background-image:linear-gradient(rgba(248,243,235,.82),rgba(248,243,235,.88)),url('${asset(post.image)}')">
        <div class="container"><time class="muted">${post.date}</time><h1>${post.title}</h1></div>
      </div>
      <section class="section"><div class="container" style="max-width:760px">
        <img src="${asset(post.image)}" alt="" style="margin-bottom:24px">
        <p>${post.body}</p>
        <p>${post.excerpt}</p>
      </div></section>`;
  }

  mountChrome();
  renderHome();
  renderShop();
  renderProductPage();
  renderCartPage();
  renderCheckout();
  renderAbout();
  renderBlog();
  renderCartBadges();
  initParallax();
  initReveals();

  window.PBCart = { addToCart, loadCart, money };
})();
