(function () {
  const S = window.SITE, $ = (s, r = document) => r.querySelector(s), esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const SI = (n) => `<span class="ico" style="--i:url(https://cdn.jsdelivr.net/npm/simple-icons@11.14.0/icons/${n}.svg)" aria-hidden="true"></span>`;

  /* ---- Theme ---- */
  const root = document.documentElement;
  let saved = null; try { saved = localStorage.getItem("theme"); } catch (e) {}
  root.dataset.theme = saved || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");

  /* ---- Header & footer (shared by both pages) ---- */
  const links = [["Home", "index.html#home"], ["Portfolio", "portfolio.html"], ["About", "index.html#about"], ["Skills", "index.html#skills"], ["Contact", "index.html#contact"]];
  const page = document.body.dataset.page;
  $("#site-header").innerHTML = `<div class="wrap bar"><a class="logo" href="index.html#home">Areeba<span>.</span></a>
    <nav id="nav" aria-label="Main"><ul>${links.map(([n, h]) => `<li><a href="${h}"${page === "portfolio" && n === "Portfolio" ? ' aria-current="page"' : ""}>${n}</a></li>`).join("")}</ul></nav>
    <button class="icon-btn" id="theme" aria-label="Toggle dark and light mode">◐</button>
    <button class="icon-btn menu" id="menu" aria-label="Open menu" aria-expanded="false" aria-controls="nav">☰</button></div>`;
  $("#site-footer").innerHTML = `<div class="wrap foot"><div><a class="logo" href="index.html#home">Areeba<span>.</span></a><p>Web Developer &amp; WordPress Developer</p></div>
    <ul>${links.map(([n, h]) => `<li><a href="${h}">${n}</a></li>`).join("")}</ul>
    <div class="socials"><a href="${S.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn">${SI("linkedin")}</a><a href="${S.github}" target="_blank" rel="noopener" aria-label="GitHub">${SI("github")}</a><a href="mailto:${S.email}" aria-label="Email">✉</a></div></div>
    <p class="copy wrap">© ${new Date().getFullYear()} Areeba. All rights reserved.</p>`;
  $("#theme").onclick = () => { const t = root.dataset.theme === "dark" ? "light" : "dark"; root.dataset.theme = t; try { localStorage.setItem("theme", t); } catch (e) {} };
  const menu = $("#menu"), nav = $("#nav");
  menu.onclick = () => { const o = nav.classList.toggle("open"); menu.setAttribute("aria-expanded", o); };
  nav.addEventListener("click", (e) => e.target.tagName === "A" && (nav.classList.remove("open"), menu.setAttribute("aria-expanded", "false")));
  document.addEventListener("keydown", (e) => e.key === "Escape" && nav.classList.remove("open"));

  /* ---- Scroll reveal + counters ---- */
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return; e.target.classList.add("in"); io.unobserve(e.target);
    const n = e.target.querySelector("[data-n]");
    if (n) { const to = +n.dataset.n; if (reduce) n.textContent = to; else { let i = 0; const t = setInterval(() => { n.textContent = ++i; if (i >= to) clearInterval(t); }, 70); } }
  }), { threshold: 0.15 });
  function observe() { document.querySelectorAll(".reveal:not(.in)").forEach((el) => reduce ? el.classList.add("in") : io.observe(el)); }

  /* ---- Project cards ---- */
  const card = (p) => `<article class="card reveal"><a class="shot" href="${p.url}" target="_blank" rel="noopener" aria-label="Open ${esc(p.title)}">
      ${p.image ? `<img src="${p.image}" alt="Screenshot of ${esc(p.title)}" loading="lazy" width="1200" height="750">` : `<div class="ph"><span>Project image</span><small>1200 × 750</small></div>`}</a>
    <div class="body"><h3>${esc(p.title)}</h3><p>${esc(p.description)}</p>
    <ul class="tags">${p.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
    <a class="btn small" href="${p.url}" target="_blank" rel="noopener">View Project <span aria-hidden="true">↗</span></a></div></article>`;
  const feat = $("#featured"); if (feat) feat.innerHTML = PROJECTS.filter((p) => p.featured).slice(0, 3).map(card).join("");
  const grid = $("#grid");
  if (grid) {
    const render = (c) => (grid.innerHTML = PROJECTS.filter((p) => c === "all" || p.category === c).map(card).join(""), observe());
    document.querySelectorAll("[data-filter]").forEach((b) => (b.onclick = () => { document.querySelectorAll("[data-filter]").forEach((x) => x.setAttribute("aria-pressed", x === b)); render(b.dataset.filter); }));
    render("all");
  }

  /* ---- Skills ---- */
  const sk = $("#skillGrid");
  if (sk) sk.innerHTML = SKILLS.map((s) => `<div class="skill reveal"><div class="sk-head">${s.icon ? `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/${s.icon}" alt="" width="32" height="32" loading="lazy">` : `<span class="badge-e" aria-hidden="true">E</span>`}<strong>${s.name}</strong><span class="pct">${s.level}%</span></div>
    <div class="track" role="progressbar" aria-label="${s.name}" aria-valuenow="${s.level}" aria-valuemin="0" aria-valuemax="100"><i style="--w:${s.level}%"></i></div></div>`).join("");

  /* ---- Counters (derived from the real project list) ---- */
  const ct = $("#counters");
  if (ct) ct.innerHTML = [["Projects showcased", PROJECTS.length], ["Technologies", PROJECTS.filter((p) => p.category === "websites").length], ["Web applications", PROJECTS.filter((p) => p.category === "webapps").length]]
    .map(([l, n]) => `<div class="count reveal"><b data-n="${n}">0</b><span>${l}</span></div>`).join("");

  /* ---- Contact links ---- */
  document.querySelectorAll("[data-bind]").forEach((el) => {
    const k = el.dataset.bind;
    if (k === "email") { el.href = "mailto:" + S.email; const t = el.querySelector(".em"); if (t) t.textContent = S.email; else if (!el.children.length) el.textContent = "Email Me"; }
    if (k === "phone") { el.href = "tel:" + S.phoneTel; el.innerHTML = "<span>☎</span><span>" + S.phoneDisplay + "</span>"; }
    if (k === "whatsapp") el.href = S.whatsapp;
    if (k === "linkedin") el.href = S.linkedin;
    if (k === "github") el.href = S.github;
  });
  document.querySelectorAll("[data-ico]").forEach((el) => (el.innerHTML = SI(el.dataset.ico) + el.innerHTML));

  observe(); /* run after all sections are rendered */
})();
