export interface BlogFAQ {
  question: string;
  answer: string;
}

export interface BlogSection {
  id: string;
  title: string;
  content: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  summary: string;
  author: string;
  publishedAt: string;
  readingTime: string;
  content: BlogSection[];
  faqs: BlogFAQ[];
  relatedTools: string[]; // Slugs of relevant tools
  relatedPosts: string[]; // Slugs of relevant posts
}

export const blogCategories = [
  { slug: "productivity", name: "Productivity", desc: "Tips and tools for streamlining your daily workflows." },
  { slug: "development", name: "Development", desc: "Technical guides, checklists, and dev optimizations." },
  { slug: "seo", name: "SEO", desc: "Rank higher on search engines and optimize metadata." },
  { slug: "marketing", name: "Marketing", desc: "Build traction and scale your product reach." },
  { slug: "business", name: "Business", desc: "Financial calculations, invoices, and growth strategies." },
  { slug: "technology", name: "Technology", desc: "Explainers and guides on modern software innovations." }
];

export const blogPosts: BlogPost[] = [
  {
    id: "boost-web-performance",
    title: "10 Essential Developer Utilities to Boost Web Performance",
    slug: "boost-web-performance",
    category: "development",
    summary: "Slow page loads hurt conversions. Discover how code minification, image compression, and precise regex testing can optimize your frontends.",
    author: "Elena Vance",
    publishedAt: "2026-06-15",
    readingTime: "5 min read",
    content: [
      {
        id: "importance-of-speed",
        title: "Why Web Performance Matters",
        content: "A one-second delay in page load time can reduce conversions by up to 20%. Mobile users expect instant interaction, making asset optimization critical. Fast applications rank higher on Google search results pages."
      },
      {
        id: "minification-basics",
        title: "Minification vs Compression",
        content: "Minification strips syntax spacing, developer comments, and empty code lines from HTML, CSS, and JS files. Compression algorithms like Brotli or Gzip shrink files further during transfer. Using tool minifiers client-side helps test layout performance before building bundles."
      },
      {
        id: "image-optimization",
        title: "Optimizing Web Images client-side",
        content: "High-resolution photos are the leading cause of heavy pages. Converting assets from PNG to WEBP, and compressing images by down-scaling resolution canvases directly in the browser saves bandwidth and helps optimize Largest Contentful Paint (LCP) scores."
      }
    ],
    faqs: [
      { question: "What is the difference between Minifying and Compressing?", answer: "Minification removes white spaces and comments in source files. Compression uses server-side compression algorithms (Gzip/Brotli) to shrink files during network transfer." },
      { question: "How does image resolution scale affect file sizes?", answer: "Slightly lowering image dimensions (resizing) can decrease file size by over 70% while maintaining visual clarity on retina screens." }
    ],
    relatedTools: ["html-minifier", "css-minifier", "javascript-minifier", "image-compressor", "image-resizer"],
    relatedPosts: ["seo-basics-guide", "financial-planning-business"]
  },
  {
    id: "seo-basics-guide",
    title: "The Ultimate Technical SEO Checklist for Modern Websites",
    slug: "seo-basics-guide",
    category: "seo",
    summary: "Meta descriptions, structured schemas, canonical tags, and fast assets are search engine essentials. Learn how to audit your site for maximum visibility.",
    author: "Marcus Aurelius",
    publishedAt: "2026-06-18",
    readingTime: "4 min read",
    content: [
      {
        id: "seo-foundation",
        title: "The Foundation of Search Engine Optimization",
        content: "Search engines parse metadata tags to understand page intent. If your titles exceed 60 characters or meta descriptions exceed 160 characters, Google cuts off the display snippet. Keeping length monitors active is crucial."
      },
      {
        id: "structured-data",
        title: "Injecting Structured Data Schemas",
        content: "JSON-LD schemas let search bots display rich snippet accordions in search listings. Injecting WebApplication, FAQPage, or Breadcrumb schemas provides distinct visual advantages and boosts search click-through rates (CTR)."
      },
      {
        id: "url-encoding",
        title: "SEO Friendly URL Slugs",
        content: "Keep URLs clean, readable, and query-friendly. Avoid special symbols or double spaces. Percent encode link parameters where necessary to prevent browser routing bugs."
      }
    ],
    faqs: [
      { question: "What is the ideal meta description length?", answer: "Keep it between 120 and 160 characters. Descriptions that are too long get truncated; descriptions that are too short fail to describe page context." },
      { question: "How does FAQ schema help SEO?", answer: "It allows google to display collapsible question lists under your website link directly in search engine search result pages (SERPs)." }
    ],
    relatedTools: ["ai-meta-description-generator", "ai-keyword-generator", "character-counter", "url-encoder-decoder", "ai-faq-generator"],
    relatedPosts: ["boost-web-performance"]
  },
  {
    id: "financial-planning-business",
    title: "Managing Cash Flow: Financial Calculators Every Founder Needs",
    slug: "financial-planning-business",
    category: "business",
    summary: "Understand your financial break-even points, estimate campaign returns, and streamline invoicing workflows to maintain business growth.",
    author: "Sarah Jenkins",
    publishedAt: "2026-06-22",
    readingTime: "6 min read",
    content: [
      {
        id: "cashflow-basics",
        title: "Why Cash Flow Management is King",
        content: "A business can be profitable on paper but fail if it runs out of immediate cash. Invoicing clients promptly and calculating exact project return rates (ROI) ensures that you maintain capital for daily operations."
      },
      {
        id: "break-even-analysis",
        title: "Determining Your Break-Even Point",
        content: "A break-even analysis identifies how many units you must sell at a specific price to cover fixed operating costs (like software licenses and salaries) and variable materials costs. Pricing without knowing this number is highly risky."
      },
      {
        id: "invoicing-best-practices",
        title: "Creating Professional Invoices",
        content: "Client payments are accelerated by sending clear, professional invoices. Invoices should detail line-item fees, tax calculations (like GST), clear payment terms, and support downloading or printing as clean, organized PDFs."
      }
    ],
    faqs: [
      { question: "How is Return on Investment (ROI) calculated?", answer: "ROI is calculated as (Net Profit / Initial Investment Cost) * 100. It measures the net return percentage relative to the amount invested." },
      { question: "What is compounding compounding frequency?", answer: "It refers to how often interest is calculated and added to the principal balance (e.g. monthly, quarterly, or yearly) to grow compound interest." }
    ],
    relatedTools: ["break-even-calculator", "roi-calculator", "invoice-generator", "profit-calculator", "loan-calculator"],
    relatedPosts: ["boost-web-performance", "seo-basics-guide"]
  }
];
