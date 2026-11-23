/* ==========================================================================
   THE TAC ENGINEER — Site behaviour
   Renders listings from content.js, builds the table of contents,
   related articles, previous/next links and code copy buttons.
   You should not need to edit this file to publish content.
   ========================================================================== */
(function () {
  "use strict";
  var doc = document.documentElement;
  doc.classList.remove("no-js");
  var ROOT = doc.getAttribute("data-root") || "";
  var SITE = window.SITE || {};
  var CATS = window.CATEGORIES || [];
  var ARTICLES = (window.ARTICLES || []).slice().sort(byDateDesc);
  var LABS = window.LABS || [];
  var CASES = (window.CASES || []).slice().sort(byDateDesc);
  var PROJECTS = window.PROJECTS || [];

  function byDateDesc(a, b) { return (b.date || "").localeCompare(a.date || ""); }
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function catName(id) { for (var i = 0; i < CATS.length; i++) if (CATS[i].id === id) return CATS[i].name; return id || ""; }
  function fmtDate(iso) {
    if (!iso) return "";
    var d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  }
  function link(url) { return ROOT + url; }
  function currentPath() {
    var p = location.pathname.replace(/\/index\.html$/, "/").replace(/\.html$/, "");
    return p;
  }
  function samePage(url) {
    var u = "/" + url.replace(/\.html$/, "").replace(/index$/, "");
    return currentPath().slice(-u.length) === u;
  }
  var STATUS = {
    planned: { label: "Planned", cls: "badge-planned" },
    progress: { label: "In Progress", cls: "badge-progress" },
    completed: { label: "Completed", cls: "badge-completed" }
  };
  function statusBadge(s) { var x = STATUS[s] || STATUS.planned; return '<span class="badge ' + x.cls + '">' + x.label + "</span>"; }
  var demoBadge = '<span class="badge badge-demo" title="Demonstration content">Demo</span>';

  /* ---------- Mobile navigation ---------- */
  var toggle = $(".nav-toggle"), nav = $(".site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) { nav.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); toggle.focus(); }
    });
  }

  /* ---------- Site-wide links (email / LinkedIn / GitHub) ---------- */
  $all("[data-site]").forEach(function (el) {
    var key = el.getAttribute("data-site");
    if (key === "email" && SITE.email) { el.href = "mailto:" + SITE.email; if (el.hasAttribute("data-site-text")) el.textContent = SITE.email; }
    else if (SITE[key]) { el.href = SITE[key]; if (el.hasAttribute("data-site-text")) el.textContent = SITE[key].replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""); }
  });
  $all("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- Card templates ---------- */
  function articleCard(a) {
    return '<article class="card linkable">' +
      '<div class="card-top"><span class="cat-label">' + esc(catName(a.category)) + "</span>" + (a.demo ? demoBadge : "") + "</div>" +
      '<h3><a href="' + esc(link(a.url)) + '">' + esc(a.title) + "</a></h3>" +
      '<p class="excerpt">' + esc(a.excerpt) + "</p>" +
      '<div class="card-meta"><time datetime="' + esc(a.date) + '">' + fmtDate(a.date) + '</time><span class="read" aria-hidden="true">Read Article →</span></div>' +
      "</article>";
  }
  function caseCard(c) {
    return '<article class="card linkable">' +
      '<div class="card-top"><span class="cat-label">' + esc(c.id) + " · " + esc(catName(c.category)) + "</span>" + (c.demo ? demoBadge : "") + "</div>" +
      '<h3><a href="' + esc(link(c.url)) + '">' + esc(c.title) + "</a></h3>" +
      '<p class="excerpt">' + esc(c.excerpt) + "</p>" +
      '<div class="card-meta"><time datetime="' + esc(c.date) + '">' + fmtDate(c.date) + '</time><span class="read" aria-hidden="true">Read Case →</span></div>' +
      "</article>";
  }
  function labCard(l) {
    var titleHtml = l.url ? '<a href="' + esc(link(l.url)) + '">' + esc(l.title) + "</a>" : esc(l.title);
    return '<article class="card lab-card' + (l.url ? " linkable" : "") + '">' +
      '<div class="lab-thumb"><img src="' + esc(ROOT + "assets/img/diagrams/" + (l.diagram || "networking") + ".svg") + '" alt="" width="480" height="210"></div>' +
      '<div class="lab-body">' +
      '<div class="card-top"><span class="cat-label">' + esc(catName(l.category)) + "</span>" + statusBadge(l.status) + "</div>" +
      "<h3>" + titleHtml + "</h3>" +
      "<dl><dt>Objective</dt><dd>" + esc(l.objective) + "</dd>" +
      "<dt>Environment</dt><dd>" + esc(l.environment) + "</dd></dl>" +
      '<ul class="chips">' + (l.tech || []).map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>" +
      "</div></article>";
  }
  function projectCard(p) {
    return '<article class="card linkable">' +
      '<div class="card-top"><span class="cat-label">Project</span>' + statusBadge(p.status) + "</div>" +
      '<h3><a href="' + esc(link(p.url)) + '">' + esc(p.title) + "</a></h3>" +
      '<p class="excerpt">' + esc(p.excerpt) + "</p>" +
      '<ul class="chips">' + (p.tech || []).map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>" +
      '<div class="card-meta"><span>' + (p.github ? "Source on GitHub" : "Documentation") + '</span><span class="read" aria-hidden="true">View Project →</span></div>' +
      "</article>";
  }
  function empty(msg) { return '<div class="empty-state">' + esc(msg) + "</div>"; }

  /* ---------- Renderers (by data-render attribute) ---------- */
  var renderers = {
    "latest-articles": function (el) {
      var n = parseInt(el.getAttribute("data-limit") || "3", 10);
      el.innerHTML = ARTICLES.length ? ARTICLES.slice(0, n).map(articleCard).join("") : empty("Articles coming soon.");
    },
    "featured-labs": function (el) {
      var f = LABS.filter(function (l) { return l.featured; }).slice(0, 3);
      el.innerHTML = f.length ? f.map(labCard).join("") : empty("Labs coming soon.");
    },
    "latest-cases": function (el) {
      el.innerHTML = CASES.length ? CASES.slice(0, 2).map(caseCard).join("") : empty("Case studies coming soon.");
    },
    "category-count": function (el) {
      var id = el.getAttribute("data-category");
      var n = ARTICLES.filter(function (a) { return a.category === id; }).length;
      el.textContent = n === 1 ? "1 article" : n + " articles";
    },
    "articles-list": function (el) { filterableList(el, ARTICLES, articleCard, "articles"); },
    "cases-list": function (el) { filterableList(el, CASES, caseCard, "case studies"); },
    "labs-list": function (el) {
      var html = "";
      CATS.forEach(function (c) {
        var items = LABS.filter(function (l) { return l.category === c.id; });
        if (!items.length) return;
        var done = items.filter(function (l) { return l.status === "completed"; }).length;
        html += '<div class="group-title" id="' + c.id + '"><h2>' + esc(c.name) + "</h2><span>" + done + " of " + items.length + " completed</span></div>" +
          '<div class="grid grid-3">' + items.map(labCard).join("") + "</div>";
      });
      el.innerHTML = html || empty("Labs coming soon.");
    },
    "projects-list": function (el) {
      el.innerHTML = PROJECTS.length ? PROJECTS.map(projectCard).join("") : empty("Projects coming soon.");
    },
    "related": function (el) {
      var me = null;
      for (var i = 0; i < ARTICLES.length; i++) if (samePage(ARTICLES[i].url)) me = ARTICLES[i];
      var pool = ARTICLES.filter(function (a) { return a !== me; });
      if (me) {
        pool.sort(function (a, b) {
          var sa = (a.category === me.category ? 2 : 0) + overlap(a.tags, me.tags);
          var sb = (b.category === me.category ? 2 : 0) + overlap(b.tags, me.tags);
          return sb - sa;
        });
      }
      var list = pool.slice(0, 3);
      if (!list.length) { var sec = el.closest(".related"); if (sec) sec.hidden = true; return; }
      el.innerHTML = list.map(articleCard).join("");
    },
    "prev-next": function (el) {
      var type = el.getAttribute("data-type") || "articles";
      var list = type === "cases" ? CASES : ARTICLES;
      var idx = -1;
      for (var i = 0; i < list.length; i++) if (samePage(list[i].url)) idx = i;
      if (idx < 0) return;
      var newer = list[idx - 1], older = list[idx + 1], html = "";
      if (older) html += '<a class="prev" href="' + esc(link(older.url)) + '"><small>← Previous</small><span>' + esc(older.title) + "</span></a>";
      if (newer) html += '<a class="next" href="' + esc(link(newer.url)) + '"><small>Next →</small><span>' + esc(newer.title) + "</span></a>";
      el.innerHTML = html;
    }
  };
  function overlap(a, b) { a = a || []; b = b || []; return a.filter(function (t) { return b.indexOf(t) > -1; }).length; }

  function filterableList(el, items, cardFn, noun) {
    var bar = $(".toolbar");
    var input = bar && $("input[type=search]", bar);
    var chipsBox = bar && $(".filter-chips", bar);
    var countEl = $(".result-count");
    var active = "all";
    var params = new URLSearchParams(location.search);
    if (params.get("category")) active = params.get("category");
    if (params.get("q") && input) input.value = params.get("q");

    if (chipsBox) {
      var used = CATS.filter(function (c) { return items.some(function (i) { return i.category === c.id; }); });
      chipsBox.innerHTML = '<button type="button" data-cat="all">All</button>' +
        used.map(function (c) { return '<button type="button" data-cat="' + c.id + '">' + esc(c.name) + "</button>"; }).join("");
      chipsBox.addEventListener("click", function (e) {
        var b = e.target.closest("button"); if (!b) return;
        active = b.getAttribute("data-cat"); draw();
      });
    }
    if (input) input.addEventListener("input", draw);

    function draw() {
      var q = input ? input.value.trim().toLowerCase() : "";
      var res = items.filter(function (i) {
        if (active !== "all" && i.category !== active) return false;
        if (!q) return true;
        var hay = [i.title, i.excerpt, catName(i.category), (i.tags || []).join(" "), i.id || ""].join(" ").toLowerCase();
        return q.split(/\s+/).every(function (w) { return hay.indexOf(w) > -1; });
      });
      if (chipsBox) $all("button", chipsBox).forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-cat") === active ? "true" : "false"); });
      el.innerHTML = res.length ? res.map(cardFn).join("") : empty("No " + noun + " match your search.");
      if (countEl) countEl.textContent = res.length + " of " + items.length + " " + noun;
    }
    draw();
  }

  $all("[data-render]").forEach(function (el) {
    var fn = renderers[el.getAttribute("data-render")];
    if (fn) fn(el);
  });

  /* ---------- Table of contents ---------- */
  var tocList = $("[data-toc]");
  var prose = $(".prose[data-toc-source]");
  if (tocList && prose) {
    var heads = $all("h2", prose);
    heads.forEach(function (h, i) {
      if (!h.id) h.id = "s-" + (i + 1) + "-" + h.textContent.toLowerCase().replace(/^\d+\s*/, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    });
    tocList.innerHTML = heads.map(function (h) {
      var text = h.cloneNode(true); var num = $(".num", text); if (num) num.remove();
      return '<li><a href="#' + h.id + '">' + esc(text.textContent.trim()) + "</a></li>";
    }).join("");
    if ("IntersectionObserver" in window) {
      var links = $all("a", tocList);
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            links.forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id); });
          }
        });
      }, { rootMargin: "-90px 0px -70% 0px" });
      heads.forEach(function (h) { obs.observe(h); });
    }
  }

  /* ---------- Code copy buttons ---------- */
  $all(".code-block").forEach(function (block) {
    var btn = $(".copy-btn", block), pre = $("pre", block);
    if (!btn || !pre || !navigator.clipboard) { if (btn) btn.hidden = true; return; }
    btn.addEventListener("click", function () {
      navigator.clipboard.writeText(pre.innerText).then(function () {
        btn.textContent = "Copied"; setTimeout(function () { btn.textContent = "Copy"; }, 1600);
      });
    });
  });
})();
