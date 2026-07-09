// Central content store — edit this file to update site copy without touching components.

export const profile = {
  name: "Y.C. Umayanga Sriyarathna",
  shortName: "Umayanga Sriyarathna",
  handle: "ycusriya",
  role: "Freelance Full-Stack Developer & Product Builder",
  location: "Sri Lanka",
  email: "csriyarathne@gmail.com",
  phone: "+94 75 805 4772",
  website: "ycusriya.online",
  linkedin: "linkedin.com/in/ycusriya",
  linkedinUrl: "https://linkedin.com/in/ycusriya",
  availability: "Available for new engagements",
  tagline: "Full-stack engineer who takes systems from architecture to production — and keeps them running.",
  summary:
    "Independent full-stack developer and product builder with 10+ years of experience turning ideas into shipped software. Recent work spans Voxora, an AI voice-cloning SaaS running on GPU infrastructure across GCP and AWS, and Ubiq Editor, a cloud coding platform with subscription billing and hardened Docker security. Earlier career built enterprise systems for banking and manufacturing clients, plus a full trading platform and a smart-infrastructure concept for Sri Lanka. Comfortable owning a project end to end: architecture, DevOps, payments, and go-to-market.",
};

export type Status = "live" | "building" | "concept";

export interface Project {
  slug: string;
  name: string;
  status: Status;
  statusLabel: string;
  url?: string;
  tagline: string;
  summary: string;
  problem: string;
  approach: string[];
  stack: string[];
  role: string;
  highlights: { label: string; value: string }[];
}

export const projects: Project[] = [
  {
    slug: "voxora",
    name: "Voxora",
    status: "live",
    statusLabel: "In production",
    url: "https://usevoxora.online",
    tagline: "AI voice-cloning SaaS running on GPU infrastructure across two clouds.",
    summary:
      "Voxora lets users build custom voice profiles from multi-clip audio uploads and generate high-quality synthetic speech, with a tiered subscription model and a production GPU inference pipeline spanning two providers.",
    problem:
      "Voice cloning tools are either research demos that don't survive contact with real traffic, or locked behind enterprise pricing. The brief was a subscription product that felt as reliable as any SaaS, backed by inference infrastructure that is genuinely expensive to run well.",
    approach: [
      "Built a multi-clip voice profile pipeline so users get higher-fidelity clones from several short samples instead of one long recording.",
      "Added an RVC-based post-processing stage to clean up model output before it reaches the user.",
      "Split inference across two GPU providers — F5-TTS on GCP, XTTS v2 on AWS — after migrating off a Kaggle notebook and cloudflared tunnel that couldn't hold production traffic.",
      "Diagnosed and resolved Docker disk-space exhaustion from CUDA libraries, pinned torch to CPU where GPU wasn't required, and fixed torch.xpu stub errors blocking F5-TTS.",
      "Designed a four-tier pricing structure (Free / Starter / Creator / Pro) and rebuilt the pricing UI around an ElevenLabs-style card layout driven by CSS variables.",
      "Worked through payment gateway rejection from Paddle over voice-impersonation risk, evaluating Lemon Squeezy, Polar, FastSpring, and crypto processors as alternatives.",
    ],
    stack: ["React", "TypeScript", "FastAPI", "Docker", "GCP GPU", "AWS GPU", "F5-TTS", "XTTS v2", "RVC"],
    role: "Solo architect, engineer, and infrastructure owner",
    highlights: [
      { label: "Inference pipeline", value: "2 cloud providers, 2 model backends" },
      { label: "Pricing tiers", value: "4, Free → Pro" },
      { label: "Core rebuild", value: "Notebook tunnel → dedicated GPU instances" },
    ],
  },
  {
    slug: "ubiq-editor",
    name: "Ubiq Editor",
    status: "live",
    statusLabel: "In production",
    url: "https://ubiq-editor.space",
    tagline: "Browser-based coding platform with hardened container security and real billing.",
    summary:
      "A cloud AI coding platform where users write, run, and manage code through a browser IDE with an integrated terminal — subscription-aware, and built on a Docker architecture hardened against the ways multi-tenant code execution can go wrong.",
    problem:
      "Letting strangers run arbitrary code in your infrastructure is a security problem before it's a product feature. The platform needed a real terminal and real execution, without turning into an open door.",
    approach: [
      "Designed a security-hardened Docker architecture: path traversal protection, per-container resource limits, rate limiting, and audit logging.",
      "Built a terminal panel with command history and subscription-aware UI states, so free vs paid access controls the experience, not just a paywall screen.",
      "Integrated Paddle Billing v2 end to end, tracing and fixing a full chain of webhook and subscription-persistence bugs until state stayed consistent between Paddle and the app.",
      "Resolved TypeScript and frontend state bugs surfaced under real subscription-transition scenarios (upgrade, downgrade, cancel, dunning).",
    ],
    stack: ["Laravel", "React", "Docker", "Paddle Billing v2", "TypeScript"],
    role: "Solo architect and engineer",
    highlights: [
      { label: "Security layers", value: "Path traversal, rate limits, audit logs" },
      { label: "Billing", value: "Paddle Billing v2, full webhook chain" },
      { label: "Interface", value: "Integrated terminal + command history" },
    ],
  },
  {
    slug: "sl-option",
    name: "SL Option",
    status: "building",
    statusLabel: "Production-ready, pre-launch",
    url: "https://www.sloption.com",
    tagline: "Binary options trading platform for the Sri Lankan market.",
    summary:
      "A full trading platform with live charts, a dual wallet system, and 2FA security — technically complete, currently held at the regulatory and payment-gateway line rather than the engineering one.",
    problem:
      "Building the platform was the tractable half of the problem. Binary options trading sits in a regulatory and payment-processing grey zone in Sri Lanka, and that constraint shaped the architecture as much as any technical requirement.",
    approach: [
      "Integrated real-time TradingView charting for live market visualization.",
      "Built a dual wallet system so users can practice on demo funds before trading real balance.",
      "Wired up Stripe and PayHere for payment processing, with 2FA on top of standard auth.",
      "Kept the system modular so it can be repointed at a different jurisdiction or payment stack if the regulatory picture changes.",
    ],
    stack: ["PHP", "Laravel", "JavaScript", "MySQL", "TradingView"],
    role: "Solo architect and engineer",
    highlights: [
      { label: "Wallets", value: "Demo + real, isolated" },
      { label: "Charting", value: "TradingView, real-time" },
      { label: "Status", value: "Built; blocked on regulatory/payments" },
    ],
  },
  {
    slug: "orel-innovation",
    name: "OREL Innovation",
    status: "concept",
    statusLabel: "Strategic concept",
    url: "https://orel.ycusriya.online",
    tagline: "Sri Lanka's first integrated smart-infrastructure ecosystem — payments, vending, EV charging.",
    summary:
      "A strategic concept combining digital payments (OREL Tap), IoT vending machines (OREL Vending), and EV charging stations (OREL Charge) into one shared-infrastructure ecosystem, originally conceived during my time at Orel IT.",
    problem:
      "Three infrastructure businesses — payments, vending, EV charging — are usually built as separate companies with separate hardware, software, and unit economics. The concept was to ask what happens if they share rails instead.",
    approach: [
      "Designed the '1+1+1=5' synergy model, laying out how shared infrastructure and cross-usage data create network effects beyond what each vertical earns alone.",
      "Produced investor-facing documentation and financial modeling across all three product lines.",
      "Sketched a technical architecture spanning IoT/MQTT device communication, a shared payments core, and mobile apps for end users.",
      "Built UI mockups translating the strategic model into a product people could actually picture using.",
    ],
    stack: ["Node.js", "React", "React Native", "IoT/MQTT", "PostgreSQL", "AWS"],
    role: "Concept design, architecture, and investor documentation",
    highlights: [
      { label: "Product lines", value: "3, one shared core" },
      { label: "Model", value: "\u201C1+1+1=5\u201D synergy thesis" },
      { label: "Deliverables", value: "Investor deck, financials, UI mockups" },
    ],
  },
];

export const portfolioProjects = [
  {
    name: "RDB Bank Assets Tracking",
    url: "https://rdb.ycusriya.online",
    description:
      "Barcode-based enterprise asset tracking for RDB Bank Sri Lanka: check-in/check-out, branch-level movement tracking, and depreciation calculations.",
    stack: ["Laravel", "MySQL", "JavaScript"],
  },
  {
    name: "Synergy Integrated Services (SISFS Australia)",
    url: "https://sisfs.ycusriya.online",
    description:
      "Property maintenance and cleaning services portal with a companion mobile app for the Australian market: task location tracking, employee management, job inspections, expense tracking.",
    stack: ["Laravel", "AngularJS", "REST API", "MySQL", "AWS"],
  },
  {
    name: "BB Productions",
    url: "https://bbp.ycusriya.online",
    description:
      "Event management system with ticket purchasing and payment integration, event creation, inventory management, and real-time sales tracking.",
    stack: ["Laravel", "AngularJS", "REST API", "MySQL", "AWS"],
  },
  {
    name: "Databank",
    url: "https://databank.ycusriya.online",
    description:
      "Document management system for organizational storage: categorization, version control, and secure access permissions.",
    stack: ["Laravel", "AngularJS", "AWS"],
  },
  {
    name: "Sales Force Automation System",
    url: "https://sfa.ycusriya.online",
    description:
      "Enterprise SFA streamlining sales through automated workflows, lead management, pipeline tracking, and reporting.",
    stack: ["Laravel", "MySQL", "jQuery", "AJAX"],
  },
  {
    name: "Debug Service Desk",
    url: "https://debug.ycusriya.online",
    description:
      "Service desk system for asset management, customer inquiries, warranty tracking, and support ticket management with automated workflows.",
    stack: ["Laravel", "AngularJS", "AWS"],
  },
  {
    name: "Southern Star Tattoo",
    url: "https://southernstartattoo.info/",
    description:
      "Full-stack responsive site with a custom Laravel backend and Angular frontend, covering UI/UX, API development, booking, and content management.",
    stack: ["Laravel", "Angular"],
  },
];

export interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
  duration: string;
  points: string[];
}

export const experience: ExperienceEntry[] = [
  {
    role: "Freelance Full-Stack Developer",
    company: "Independent",
    period: "Jul 2023 — Present",
    duration: "2+ years",
    points: [
      "Providing end-to-end development services for diverse clients across web applications and custom solutions.",
      "Delivering scalable solutions using Laravel, JavaScript, Python, and cloud infrastructure (AWS, Azure).",
      "Providing technical consulting, code reviews, and architecture guidance across industries.",
    ],
  },
  {
    role: "Senior Tech Lead, Web Development",
    company: "Orel IT Pvt Ltd",
    period: "Jan 2020 — Jul 2023",
    duration: "3.5 years",
    points: [
      "Managed the full development cycle from requirements gathering to deployment.",
      "Worked with the UI team to improve platform UX.",
      "Owned code review, team management, and database architecture.",
      "Managed internship programs and industrial training initiatives.",
    ],
  },
  {
    role: "Tech Lead, Co-Founder",
    company: "Inkspace Pvt Ltd",
    period: "Feb 2019 — Jan 2020",
    duration: "1 year",
    points: [
      "Co-founded the startup with two partners; owned all backend development.",
      "Developed multiple web applications, websites, and mobile applications.",
      "Led the team to acquisition by a major client within one year.",
      "Led technical teams and mentored junior developers.",
    ],
  },
  {
    role: "Senior Software Engineer",
    company: "Orel IT Pvt Ltd",
    period: "Dec 2017 — Feb 2019",
    duration: "1 year 3 months",
    points: [
      "Promoted to Senior Software Engineer in May 2018 for technical contributions.",
      "Built a barcode-based asset tracking system for RDB Bank Sri Lanka using Laravel.",
      "Built a Service Desk / ticketing system, improving internal support efficiency by 40%.",
      "Authored system documentation for complex enterprise applications.",
    ],
  },
  {
    role: "Software Engineer",
    company: "Orange IT Solutions Pvt Ltd",
    period: "Nov 2015 — Dec 2017",
    duration: "2 years 2 months",
    points: [
      "Developed ERP-integrated web apps using REST APIs and enterprise auth (SAML, JWT, OAuth 2.0).",
      "Built sales and manufacturing dashboards with Chart.js and D3.js.",
      "Designed modular architectures and normalized schemas for scalability.",
      "Optimized SQL queries, reducing average page load times by 65%.",
    ],
  },
  {
    role: "Software Developer",
    company: "Susila Inspire Pvt Ltd",
    period: "Jan 2015 — Nov 2015",
    duration: "11 months",
    points: [
      "Enhanced legacy systems using Laravel, CodeIgniter, and AngularJS.",
      "Built a Business Analysis Tool for marketing companies with advanced reporting.",
      "Achieved a 10x performance improvement via MySQL query optimization and AJAX.",
      "Introduced Git version control and improved deployment processes.",
    ],
  },
  {
    role: "Associate Software Engineer",
    company: "Ceylon Linux Pvt Ltd",
    period: "Oct 2013 — Dec 2014",
    duration: "1 year 3 months",
    points: [
      "Started as Trainee Software Engineer; promoted to Associate in April 2014.",
      "Developed an internal sales force automation system using CodeIgniter.",
      "Built foundational skills in PHP, Laravel, MySQL, JavaScript, HTML5, CSS3.",
    ],
  },
];

export const education = [
  {
    title: "Higher Diploma in Computer Science",
    org: "London School of Business and Finance (LSBF)",
    period: "2023 — 2024",
  },
  {
    title: "Associate Java Developer",
    org: "Institute of Java & Software Engineering (IJSE)",
    period: "2012 — 2013",
  },
  {
    title: "Secondary Education",
    org: "Devapathiraja National College, Rathgama",
    period: "2003 — 2011",
  },
];

export const skillGroups = [
  {
    title: "Languages",
    items: ["PHP", "JavaScript", "TypeScript", "Java", "Python", "SQL", "HTML5", "CSS3"],
  },
  {
    title: "Frameworks & Libraries",
    items: ["Laravel", "Node.js", "FastAPI", "React", "AngularJS", "jQuery", "Tailwind CSS"],
  },
  {
    title: "Data",
    items: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "Query Optimization", "Indexing"],
  },
  {
    title: "Cloud & DevOps",
    items: ["AWS (EC2, RDS, S3, Route53)", "GCP", "Azure", "Docker", "CI/CD", "Git"],
  },
  {
    title: "APIs & Integration",
    items: ["REST", "JSON", "OpenAPI", "SOAP", "Webhooks", "Third-party integrations"],
  },
  {
    title: "Auth & Security",
    items: ["OAuth 2.0", "JWT", "SAML", "2FA", "SSL/TLS", "PCI DSS"],
  },
  {
    title: "Payments",
    items: ["Stripe", "PayHere", "Paddle", "Skrill", "PayPal"],
  },
  {
    title: "Tooling",
    items: ["JIRA", "Redmine", "Azure DevOps", "Postman", "Composer", "npm", "Webpack"],
  },
];

export const referees = [
  {
    name: "Malintha Fernando",
    title: "Founder CEO, RapidM3",
    relationship: "Former CEO",
    phone: "+94 76 744 4780",
    email: "malintha@tutovp.com",
  },
  {
    name: "Yasith Samarawickrama",
    title: "Lead Software Engineer, Veracity Group",
    relationship: "Former Senior Team Lead",
    phone: "+94 71 979 9383",
    email: "yazith11@gmail.com",
  },
];
