# The TAC Engineer

A technical blog, knowledge base and engineering portfolio. It's a static website hosted free on Cloudflare and deployed automatically from GitHub.

> *Understand the Problem. Analyse the Evidence. Find the Root Cause.*

---

## 1. What's in this repository

```
README.md                  This guide
wrangler.jsonc             Cloudflare deploy settings: serves the site/ folder
site/                      The website
  index.html               Home
  about.html, contact.html, 404.html
  articles/                Technical articles  (+ index.html listing)
  labs/                    Hands-on labs       (+ index.html listing)
  cases/                   Troubleshooting case studies
  projects/                Projects
  assets/css/style.css     Design: colours, fonts, layout
  assets/js/content.js     ★ CONTENT LIST — edit this to publish or change status
  assets/js/site.js        Builds listings, search, table of contents (don't edit)
  assets/img/              Favicon, diagrams, your screenshots
  _headers, robots.txt, sitemap.xml
templates/                 Blank pages to copy when adding new content
```

---

## 2. Deployment (already set up)

Cloudflare is connected to this GitHub repository. **Every commit redeploys the site automatically within about a minute.**

`wrangler.jsonc` must stay at the top level of the repository, next to this README. Its `"name"` must match the project name shown in the Cloudflare dashboard (Workers & Pages).

If a build fails, open the project in Cloudflare → **Deployments** → the failed build → **View logs**.

---

## 3. Everyday tasks (all on github.com, in your browser)

### Put in your email, LinkedIn and GitHub links (do this first)
1. Open `site/assets/js/content.js` and click the **pencil icon** (Edit).
2. Near the top, replace `you@example.com` and the two example URLs with your own.
3. Click **Commit changes**.

### Change a lab's status
1. Open `site/assets/js/content.js` → pencil icon.
2. Press **Ctrl+F** (or **Cmd+F** on a Mac) and search for the lab title.
3. Change `status: "planned"` to `"progress"` or `"completed"`.
   **Only use `completed` once you've actually done the lab.**
4. Click **Commit changes**.

The TCP Handshake Analysis lab also has its own page, `site/labs/tcp-handshake-analysis.html`. Change the word `Planned` and `badge-planned` there as well:
- `badge-progress">In Progress` for a lab in progress
- `badge-completed">Completed` for a finished lab

### Add a screenshot or diagram
1. Open the `site/assets/img/` folder.
2. Click **Add file → Upload files**, drag the image in, and click **Commit changes**.
3. Use it in a page like this (from inside `articles/`, `labs/`, `cases/` or `projects/`):
   `<img src="../assets/img/your-image.png" alt="What the image shows">`

Sanitise screenshots first: hide real hostnames, IP addresses, usernames and customer names.

### Publish a new article
1. Open `templates/article-template.html` → **Raw** → select all → copy.
2. Go to `site/articles/` → **Add file → Create new file**. Name it, e.g. `dns-troubleshooting-basics.html`, then paste.
3. Replace every `[placeholder]`: the title in `<title>` and `<h1>`, the description, the date and each section. Delete the purple *Demonstration content* box, since this is your own real article.
4. Commit.
5. Open `site/assets/js/content.js` → pencil icon, and add an entry inside `window.ARTICLES = [ ... ]`:
   ```js
   {
     title: "DNS Troubleshooting Basics",
     url: "articles/dns-troubleshooting-basics.html",
     category: "networking",        // networking | f5 | linux | cloud
     date: "2026-11-23",            // newest shows first
     excerpt: "One or two sentences for the article card.",
     tags: ["DNS", "Troubleshooting"],
     demo: false
   },
   ```
6. Commit. The article appears on the homepage, in the article list and in search.

**Shortcut:** give your article text to Claude and ask for the finished HTML file and the `content.js` entry. Then you only need steps 2 and 5.

### Add a troubleshooting case, lab page or project
Use the same steps as for an article, with:
- `templates/case-template.html` → `site/cases/`, registered in `window.CASES`
- `templates/lab-template.html` → `site/labs/`, then set that lab's `url` in `window.LABS`
- `templates/project-template.html` → `site/projects/`, registered in `window.PROJECTS`

Cases must be **fictional or fully sanitised**. Never publish real customer or employer incidents.

---

## 4. Your own domain

1. Buy it in Cloudflare → **Domain Registration**. Cloudflare charges cost price and sets up DNS automatically.
2. Open your project in Cloudflare → **Settings → Domains & Routes → Add → Custom domain**, and enter your domain.
3. Replace `https://www.example.com` with your domain in `site/sitemap.xml` and `site/robots.txt`.

---

## 5. Design notes

- Colours: navy `#0B1424` / `#17263B`, accent `#3B82F6`, text `#172033` / `#64748B`, light `#F8FAFC`, border `#E2E8F0`. You can change them all at the top of `style.css`.
- Font: Inter.
- On white backgrounds, links and buttons use `#2563EB`, a slightly darker blue, for readable contrast.
- Lab statuses are always honest. Demonstration content carries a **Demo** badge.
