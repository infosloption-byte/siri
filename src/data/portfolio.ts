// Curated portfolio: the five categories selected for the public Projects page.
// Keep project descriptions and source links independent from deployment availability.
export interface PortfolioEntry {
  title: string;
  repo: string;
  description: string;
  stack: string[];
  website?: string;
  caseStudy?: string;
}

export interface PortfolioCategory {
  id: "saas" | "startup" | "websites" | "concepts" | "legacy";
  shortLabel: string;
  title: string;
  eyebrow: string;
  description: string;
  items: PortfolioEntry[];
}

export const portfolioCategories: PortfolioCategory[] = [
  {
    "id": "saas",
    "shortLabel": "Personal SaaS",
    "title": "Personal SaaS Projects",
    "eyebrow": "01 / PRODUCT ENGINEERING",
    "description": "Full-stack platforms, developer tools, and AI-backed products developed end to end, from architecture through deployment.",
    "items": [
      {
        "title": "Ubiq Editor",
        "repo": "ubiq",
        "description": "A browser-based development environment with coding workspaces, terminal access, and subscription-aware tooling.",
        "stack": [
          "React",
          "TypeScript",
          "Docker",
          "Cloud IDE"
        ],
        "website": "https://ubiq-editor.space",
        "caseStudy": "ubiq-editor"
      },
      {
        "title": "Voxora — Video Director",
        "repo": "video-director",
        "description": "An AI-assisted research-to-video workflow covering briefs, storyboards, narration, editing, and rendering.",
        "stack": [
          "React",
          "Express",
          "FFmpeg",
          "AI"
        ],
        "website": "https://usevoxora.online"
      },
      {
        "title": "W-Bot",
        "repo": "w-bot",
        "description": "WhatsApp group translation and intelligent message monitoring, with configurable alerts and multiple language support.",
        "stack": [
          "TypeScript",
          "Node.js",
          "MySQL",
          "AI"
        ]
      },
      {
        "title": "BuildHire",
        "repo": "candidate",
        "description": "Recruitment and interview management with candidate pools, agency workspaces, evaluations, and scoring.",
        "stack": [
          "React",
          "TypeScript",
          "Recruitment"
        ]
      },
      {
        "title": "Voxora — Voice SaaS",
        "repo": "voice-saas",
        "description": "AI voice generation and cloning with multilingual speech, transcription, and dubbing workflows.",
        "stack": [
          "React",
          "Laravel",
          "FastAPI",
          "AI"
        ],
        "caseStudy": "voxora"
      },
      {
        "title": "AssetMov",
        "repo": "assetmov",
        "description": "A multi-tenant asset lifecycle platform for registration, assignment, transfers, returns, and audit history.",
        "stack": [
          "React",
          "Node.js",
          "Prisma",
          "MySQL"
        ]
      }
    ]
  },
  {
    "id": "startup",
    "shortLabel": "Startup",
    "title": "Startup — SL Options",
    "eyebrow": "02 / BUILDING A BUSINESS",
    "description": "My startup and the foundation for a growing family of software products and client solutions.",
    "items": [
      {
        "title": "SL Options",
        "repo": "sl-options",
        "description": "The SL Options company website, presenting services, approach, selected work, and ways to start a project.",
        "stack": [
          "React",
          "TypeScript",
          "Vite"
        ],
        "website": "https://sloptions.xyz"
      }
    ]
  },
  {
    "id": "websites",
    "shortLabel": "Websites",
    "title": "Website Development",
    "eyebrow": "03 / CLIENT WORK",
    "description": "Business websites and digital experiences developed for clients across advertising, maritime services, and events.",
    "items": [
      {
        "title": "KandyAds",
        "repo": "kandyads",
        "description": "An advertising company website covering capabilities, projects, and quote-request workflows.",
        "stack": [
          "React",
          "TypeScript",
          "Frontend"
        ],
        "website": "https://kandyads.lk"
      },
      {
        "title": "Earndeck Shipping",
        "repo": "earndeck-shipping",
        "description": "A maritime surveying and consultancy website with detailed service pages and search-focused content.",
        "stack": [
          "Next.js",
          "React",
          "TypeScript"
        ]
      },
      {
        "title": "BB Productions",
        "repo": "bbproductions",
        "description": "An events platform with event management, ticketing, inventory, and sales reporting.",
        "stack": [
          "Laravel",
          "AngularJS",
          "MySQL"
        ]
      },
      {
        "title": "Southern Star Tattoo",
        "repo": "sst",
        "description": "A responsive, search-friendly React website rebuilt for a tattoo studio.",
        "stack": [
          "React",
          "JavaScript",
          "SEO"
        ]
      }
    ]
  },
  {
    "id": "concepts",
    "shortLabel": "Concepts & ideas",
    "title": "Personal Concepts & Ideas",
    "eyebrow": "04 / EXPERIMENTS",
    "description": "Ideas, prototypes, and early-stage products built to explore new industries, interfaces, and technical directions.",
    "items": [
      {
        "title": "SL Spot",
        "repo": "slspot",
        "description": "A chart-first trading terminal concept with separate frontend, API, and administration interfaces.",
        "stack": [
          "React",
          "TypeScript",
          "Fastify"
        ]
      },
      {
        "title": "SL Ravan",
        "repo": "sl-ravan",
        "description": "A Ravana-inspired browser-based 3D open-world exploration prototype, developed with interactive scenery and terrain.",
        "stack": [
          "TypeScript",
          "3D",
          "WebGL"
        ]
      },
      {
        "title": "SL Options Market",
        "repo": "sl-ecom",
        "description": "A mobile-first Sri Lankan e-commerce concept with storefront, product management, cart, and checkout.",
        "stack": [
          "React",
          "Express",
          "MySQL"
        ]
      },
      {
        "title": "SL Hub",
        "repo": "sl-hub",
        "description": "A smart infrastructure concept bringing together payments, vending, and EV charging.",
        "stack": [
          "HTML",
          "IoT concept",
          "Product design"
        ]
      }
    ]
  },
  {
    "id": "legacy",
    "shortLabel": "Earlier work",
    "title": "Earlier Projects",
    "eyebrow": "05 / EXPERIENCE ARCHIVE",
    "description": "Enterprise and client systems from earlier work, highlighting the roots of my development experience.",
    "items": [
      {
        "title": "Databank",
        "repo": "databank",
        "description": "An organizational document management system for storage, categorization, versioning, and permissions.",
        "stack": [
          "Laravel",
          "MySQL",
          "Document management"
        ]
      },
      {
        "title": "RDB Asset Tracking",
        "repo": "asset-tracking",
        "description": "An enterprise asset-tracking system for recording and managing bank equipment and movement across locations.",
        "stack": [
          "Laravel",
          "MySQL",
          "Asset tracking"
        ]
      },
      {
        "title": "SISFS",
        "repo": "sisfs",
        "description": "A property services and field-work management platform for jobs, staff, and operational tracking.",
        "stack": [
          "Laravel",
          "AngularJS",
          "Operations"
        ]
      },
      {
        "title": "Sales Force Automation",
        "repo": "sales-automation",
        "description": "An enterprise sales automation system supporting workflows, field operations, and reporting.",
        "stack": [
          "Laravel",
          "JavaScript",
          "Sales"
        ]
      },
      {
        "title": "Debug Service Desk",
        "repo": "debug",
        "description": "A service desk application for customer support, warranty tracking, service tickets, and workflows.",
        "stack": [
          "Laravel",
          "AngularJS",
          "Support"
        ]
      }
    ]
  }
];

export const portfolioProjectCount = portfolioCategories.reduce(
  (total, group) => total + group.items.length,
  0
);
