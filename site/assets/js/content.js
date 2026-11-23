/* ==========================================================================
   THE TAC ENGINEER — CONTENT REGISTRY
   --------------------------------------------------------------------------
   This is the ONE file you edit to make new content appear in listings,
   the homepage, search, "related articles" and previous/next navigation.

   1. Create the page (copy a file from /templates into the right folder).
   2. Add an entry below.  Newest articles can go anywhere — they are
      sorted by date automatically.
   3. Commit & push (or re-upload) — Cloudflare redeploys.

   Paths are relative to the site root (no leading slash).
   Set demo: true for demonstration / fictional content. A "Demo" badge
   is shown automatically. Remove it once you replace the content with
   your own real work.
   ========================================================================== */

window.SITE = {
  name: "The TAC Engineer",
  tagline: "Understand the Problem. Analyse the Evidence. Find the Root Cause.",
  // ---- EDIT THESE THREE LINES ----
  email: "harshkadu312@gmail.com",
  linkedin: "https://www.linkedin.com/in/harshcybersecurity/",
  github: ""   // add your GitHub profile URL here, e.g. "https://github.com/yourname" (links stay hidden while empty)
};

/* Category names must match exactly across articles, labs and cases. */
window.CATEGORIES = [
  { id: "networking", name: "Networking & Protocols" },
  { id: "f5",         name: "F5 & Application Delivery" },
  { id: "linux",      name: "Linux & Infrastructure" },
  { id: "cloud",      name: "Cloud & Network Security" }
];

/* ---------------------------- TECHNICAL ARTICLES ------------------------- */
window.ARTICLES = [
  {
    title: "F5 BIG-IP Software Upgrade: Standalone and HA Pair",
    url: "articles/f5-big-ip-software-upgrade.html",
    category: "f5",
    date: "2026-11-23",
    excerpt: "Step-by-step BIG-IP upgrade from 17.5 to 21.1 in the Configuration utility: UCS backup, image install, license reactivation, boot location activation and HA sequencing.",
    tags: ["F5 LTM", "BIG-IP", "Upgrade", "High Availability"],
    demo: false
  },
  // Add your articles here. Example:
  // {
  //   title: "My Article Title",
  //   url: "articles/my-article.html",
  //   category: "networking",        // networking | f5 | linux | cloud
  //   date: "2026-11-23",
  //   excerpt: "One or two sentences for the article card.",
  //   tags: ["DNS", "Troubleshooting"],
  //   demo: false
  // },
];

/* ---------------------------- HANDS-ON LABS ------------------------------
   status: "planned" | "progress" | "completed"
   Only mark a lab "completed" when you have actually done it.
   diagram: networking | f5 | linux | cloud  (thumbnail in assets/img/diagrams)
   url: leave "" until the lab page exists.
   featured: true → shown on the homepage (max 3 are displayed).
   ------------------------------------------------------------------------ */
window.LABS = [
  // Networking
  { title: "TCP Handshake Analysis", category: "networking", status: "planned", featured: true,
    url: "labs/tcp-handshake-analysis.html", diagram: "networking",
    objective: "Capture and annotate the three-way handshake, options negotiation and connection teardown.",
    environment: "Two Linux VMs on an isolated virtual network", tech: ["tcpdump", "Wireshark", "Linux"] },
  { title: "TCP Retransmission Investigation", category: "networking", status: "planned",
    url: "", diagram: "networking",
    objective: "Introduce controlled packet loss and latency and measure their effect on throughput.",
    environment: "Two Linux VMs, tc netem", tech: ["tc netem", "iperf3", "Wireshark"] },
  { title: "DNS Troubleshooting", category: "networking", status: "planned",
    url: "", diagram: "networking",
    objective: "Trace recursive resolution and reproduce NXDOMAIN, SERVFAIL and timeout scenarios.",
    environment: "Linux VM running a local resolver", tech: ["dig", "Unbound", "Wireshark"] },
  { title: "HTTP Request Analysis", category: "networking", status: "planned",
    url: "", diagram: "networking",
    objective: "Compare HTTP/1.1 and HTTP/2 requests, headers, status codes and keep-alive behaviour.",
    environment: "Linux VM with Nginx", tech: ["curl", "Nginx", "Wireshark"] },
  { title: "TLS Handshake Analysis", category: "networking", status: "planned",
    url: "", diagram: "networking",
    objective: "Decode TLS 1.2 and 1.3 handshakes and decrypt a test session using an SSLKEYLOGFILE.",
    environment: "Linux VM with Nginx and a test CA", tech: ["openssl", "Wireshark", "Nginx"] },

  // F5
  { title: "Virtual Server and Pool Configuration", category: "f5", status: "planned", featured: true,
    url: "", diagram: "f5",
    objective: "Build a working HTTP virtual server with a two-member pool and verify traffic distribution.",
    environment: "BIG-IP Virtual Edition (lab licence) + two web servers", tech: ["BIG-IP LTM", "tmsh", "Nginx"] },
  { title: "Health Monitor Troubleshooting", category: "f5", status: "planned",
    url: "", diagram: "f5",
    objective: "Break and repair HTTP monitors; correlate monitor state with packet captures.",
    environment: "BIG-IP VE + two web servers", tech: ["BIG-IP LTM", "tcpdump", "curl"] },
  { title: "SSL Offloading", category: "f5", status: "planned",
    url: "", diagram: "f5",
    objective: "Terminate TLS on BIG-IP with a client SSL profile and validate the certificate chain.",
    environment: "BIG-IP VE + test CA", tech: ["BIG-IP LTM", "openssl"] },
  { title: "Persistence", category: "f5", status: "planned",
    url: "", diagram: "f5",
    objective: "Compare source-address and cookie persistence and observe the persistence table.",
    environment: "BIG-IP VE + two web servers", tech: ["BIG-IP LTM", "tmsh"] },
  { title: "WAF Policy Testing", category: "f5", status: "planned",
    url: "", diagram: "f5",
    objective: "Deploy a WAF policy in transparent mode against a deliberately vulnerable test app.",
    environment: "BIG-IP VE with Advanced WAF (lab licence), OWASP Juice Shop", tech: ["Advanced WAF", "OWASP Top 10"] },
  { title: "False-Positive Investigation", category: "f5", status: "planned",
    url: "", diagram: "f5",
    objective: "Use request logs to identify a violation triggered by legitimate traffic and tune the policy.",
    environment: "BIG-IP VE with Advanced WAF", tech: ["Advanced WAF", "Request logs"] },

  // Linux
  { title: "Service Troubleshooting", category: "linux", status: "planned", featured: true,
    url: "", diagram: "linux",
    objective: "Diagnose a systemd service that fails to start using unit status, journal and config checks.",
    environment: "Linux VM", tech: ["systemd", "journalctl", "Nginx"] },
  { title: "Log Analysis", category: "linux", status: "planned",
    url: "", diagram: "linux",
    objective: "Extract error patterns and status code distributions from web server logs.",
    environment: "Linux VM", tech: ["grep", "awk", "journalctl"] },
  { title: "Network Diagnostics", category: "linux", status: "planned",
    url: "", diagram: "linux",
    objective: "Work through connectivity layer by layer: link, IP, routing, ports, application.",
    environment: "Two Linux VMs", tech: ["ip", "ping", "mtr", "nc"] },
  { title: "Process and Socket Investigation", category: "linux", status: "planned",
    url: "", diagram: "linux",
    objective: "Map listening sockets to processes and inspect TCP state and per-socket metrics.",
    environment: "Linux VM", tech: ["ss", "lsof", "ps"] },

  // Cloud
  { title: "AWS VPC Networking", category: "cloud", status: "planned",
    url: "", diagram: "cloud",
    objective: "Build a VPC with public and private subnets, route tables, NAT and security groups.",
    environment: "AWS Free Tier account", tech: ["AWS VPC", "Security Groups", "VPC Flow Logs"] },
  { title: "Azure Networking", category: "cloud", status: "planned",
    url: "", diagram: "cloud",
    objective: "Create a VNet with subnets and NSGs and verify flows with Network Watcher.",
    environment: "Azure free account", tech: ["Azure VNet", "NSG", "Network Watcher"] },
  { title: "Cloud Load Balancing", category: "cloud", status: "planned",
    url: "", diagram: "cloud",
    objective: "Front two instances with a managed load balancer and test health checks and failover.",
    environment: "AWS or Azure free tier", tech: ["AWS ALB", "Azure Load Balancer"] },
  { title: "Cloud WAF Concepts", category: "cloud", status: "planned",
    url: "", diagram: "cloud",
    objective: "Compare managed WAF rule sets with on-box WAF and document the trade-offs.",
    environment: "Documentation study + free-tier test", tech: ["AWS WAF", "Azure WAF"] }
];

/* ----------------------- TROUBLESHOOTING CASE STUDIES -------------------- */
window.CASES = [
  // Add your case studies here (fictional or fully sanitised only). Example:
  // {
  //   id: "CASE-001",
  //   title: "My Case Title",
  //   url: "cases/case-001-short-name.html",
  //   category: "linux",              // networking | f5 | linux | cloud
  //   date: "2026-11-23",
  //   excerpt: "One or two sentences for the case card.",
  //   tags: ["Nginx", "TCP/IP"],
  //   demo: false
  // },
];

/* -------------------------------- PROJECTS ------------------------------- */
window.PROJECTS = [
  // Add your projects here. Example:
  // {
  //   title: "My Project",
  //   url: "projects/my-project.html",
  //   status: "progress",            // planned | progress | completed
  //   excerpt: "One or two sentences for the project card.",
  //   tech: ["Linux", "Nginx"],
  //   github: "https://github.com/you/repo"
  // },
];
