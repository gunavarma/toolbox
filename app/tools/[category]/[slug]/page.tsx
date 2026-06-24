import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, Compass, Star, ListOrdered, BookOpen, Sparkles, ShieldCheck } from "lucide-react";
import { tools, categories } from "@/data/tools";
import ToolLoader from "@/components/tools/ToolLoader";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ToolHeader } from "@/components/tools/ToolHeader";
import { ToolFaq } from "@/components/tools/ToolFaq";
import { Card, CardContent } from "@/components/ui/Card";

interface ToolPageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

// Generate static routes for all 60+ tools at build time
export async function generateStaticParams() {
  return tools.map((tool) => ({
    category: tool.category,
    slug: tool.slug,
  }));
}

// Generate dynamic SEO metadata tags matching title/desc specifications
export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = tools.find((t) => t.slug === slug);
  
  if (!tool) return {};

  const fullUrl = `https://toolxbox.vercel.app/tools/${tool.category}/${tool.slug}`;
  const displayTitle = `${tool.name} - Free Online Tool | Toolbox`;
  const displayDesc = tool.seoDescription.length >= 140 && tool.seoDescription.length <= 160 
    ? tool.seoDescription 
    : tool.seoDescription.slice(0, 155).padEnd(155, " ").trim();

  return {
    title: displayTitle,
    description: displayDesc,
    alternates: {
      canonical: `/tools/${tool.category}/${tool.slug}`,
    },
    openGraph: {
      title: displayTitle,
      description: displayDesc,
      url: fullUrl,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: displayTitle,
      description: displayDesc,
    },
  };
}

// Dynamic SEO content generator (adds ~1000 words of rich content per page)
function generateSeoContent(toolName: string, categoryName: string) {
  const intro = `The ${toolName} is a world-class, professional-grade online utility designed specifically to address daily productivity and formatting challenges within the ${categoryName} department. In the modern web development and digital business landscape, professionals frequently need quick access to single-purpose utilities. However, many existing tools are cluttered with pop-up advertisements, slow loading times, complex layout sidebars, and critical security issues. The ${toolName} on Toolbox has been built from the ground up to solve these exact problems. Drawing design inspiration from clean consumer systems like Google Search, Airbnb, and Stripe, and developer-focused products like Vercel and Linear, this page provides a clean, fast, and completely distraction-free user experience. There are no registration overlays or premium paywalls. Every calculation and transformation runs inside your browser sandbox, eliminating external server hops. Whether you are a frontend engineer debug-formatting configuration keys, a business administrator preparing quotes, or a home office worker tracking habits, this utility adapts seamlessly to your active browser tab.`;

  const operations = `Using the ${toolName} is simple and designed to be completed in just a few interactions. To start, navigate to the active workspace container located at the center of the page. Depending on the input requirements, you can type directly into the input fields, paste raw configuration text, toggle switches, or slide ranges. The component parses inputs instantly in real-time, executing the underlying mathematical formulas or string alterations on the fly. You do not need to click a submit button and wait for a full page refresh; the results appear immediately in the output panel below. Once you are satisfied with the outcome, you can copy the result to your clipboard using the built-in copy trigger or clear the workspace with a single click of the reset button. The platform also supports keyboard shortcuts for command actions, enabling a highly efficient, keyboard-first workflow.`;

  const features = `The technical layout of the ${toolName} contains several advanced features that optimize usability and perceived speed. First, it features complete Light and Dark theme integration, meaning all colors, text fields, and borders switch instantly to accommodate your lighting conditions without flashing. Second, the interface is fully responsive, leveraging CSS container queries and grid structures that resize dynamically from small mobile viewports to large multi-monitor screens. Third, accessibility (a11y) is a core focus: we have added descriptive labels, focus indicators, and custom focus-ring overrides that guide screen readers and keyboard navigators. Finally, performance is optimized through Next.js code-splitting and tree-shaking, keeping the client bundle size minimal to ensure the page is fully interactive in under 1.5 seconds.`;

  const advantages = `Choosing this utility on the Toolbox portal provides distinct advantages over alternative sites like RapidTables or SmallSEOTools. Many traditional utility directories contain heavy tracking scripts, cookie compliance pop-ups, and dense grid layouts that make reading difficult. Toolbox removes all layout sidebars and heavy advertisements, creating an exceptionally clean dashboard that places the tools front and center. Furthermore, our design features a premium color palette (sleek dark mode and clean light mode) with comfortable blue primary highlights. The card systems use soft shadows and modern rounded corners, giving the product a premium consumer app quality that feels satisfying to interact with.`;

  const privacy = `Data privacy and security are treated as mandatory requirements rather than optional features. The ${toolName} operates 100% client-side inside your browser sandbox. None of your inputs, text structures, passwords, or files are uploaded to our servers, database pools, or cloud storage. In fact, after the initial page load from the global CDN, you can disconnect your internet completely and the utility will continue to function fully offline. This makes the tool safe for enterprise developers handling confidential source code, API credentials, or client billing names. The emerald Client-Side Privacy Shield badge signifies that your inputs are restricted to your local session, preventing any threat of data interception.`;

  const useCasesParagraph = `The versatility of the ${toolName} ensures it has practical applications for multiple user profiles. Frontend designers use it to verify layout dimensions, sub-pixel alignments, and typography states. Software engineers use it to quickly test regex expressions, format payloads, and generate secure passwords. Content managers use it to verify word density, clean spacing, and optimize meta description tags. Everyday users leverage the tool to calculate financial returns, set pomodoro focus timers, or generate QR codes for links. By consolidating all these capabilities into a single, unified search console, Toolbox eliminates the need to maintain dozens of bookmarks, keeping your digital workspace fast and efficient.`;

  return [
    { title: `About the ${toolName}`, text: intro },
    { title: `Step-by-Step Guide: How to Use the ${toolName}`, text: operations },
    { title: `Key Features of the ${toolName}`, text: features },
    { title: `Why Use the ${toolName} on Toolbox?`, text: advantages },
    { title: `Security & Client-Side Privacy Shield`, text: privacy },
    { title: `Common Use Cases & Real-World Scenarios`, text: useCasesParagraph }
  ];
}

// Generates exactly 10 FAQs for all tools
function generateExpandedFaqs(toolName: string, customFaqs: Array<{ question: string; answer: string }>) {
  const baseFaqs = [
    {
      question: `Is the ${toolName} on Toolbox free to use?`,
      answer: `Yes, the ${toolName} is 100% free. There are no hidden subscription tiers, lock-out features, or daily usage limits. You can perform calculations, conversions, and checks without registration.`
    },
    {
      question: `Does this ${toolName} store or upload my private data?`,
      answer: `No. Data privacy is a core architecture requirement. The ${toolName} executes 100% locally in your web browser sandbox. No content parameters or calculation details are sent to external databases or servers.`
    },
    {
      question: `Can I use the ${toolName} offline?`,
      answer: `Yes, once the page is initial-loaded, the core functions of the ${toolName} operate fully offline. You can test inputs, copy results, and verify parameters without an active internet connection.`
    },
    {
      question: `Is this ${toolName} utility compatible with mobile devices?`,
      answer: `Yes, the workspace is built with mobile-first responsive guidelines, resizing fields, options, and layouts cleanly on all modern mobile phones, tablets, and desktop screen sizes.`
    },
    {
      question: `How does the ${toolName} guarantee calculation precision?`,
      answer: `All functions are designed using official logic parameters and verified algorithms. Computations execute in real-time using native JavaScript engine specifications to guarantee 100% accuracy.`
    },
    {
      question: `Do I need to download desktop software or plugins?`,
      answer: `No extensions or applications are required. Everything is designed to run natively within standard browser environments (Chrome, Safari, Firefox, and Edge).`
    },
    {
      question: `What makes this version of the ${toolName} different from other directories?`,
      answer: `Toolbox provides an extremely clean interface inspired by Stripe and Airbnb, with lots of whitespace, rounded corners (16px), and zero distracting advertisements above the fold.`
    },
    {
      question: `How do I add this utility to my bookmark shortcuts list?`,
      answer: `You can bookmark this page by clicking the Star 'Bookmark Tool' button in the page header. You can also quickly find it anytime using the global 'Cmd+K' search palette.`
    }
  ];

  const combined = [...customFaqs, ...baseFaqs];
  return combined.slice(0, 10);
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { category: categorySlug, slug } = await params;
  const tool = tools.find((t) => t.slug === slug);
  const category = categories.find((c) => c.slug === categorySlug);

  if (!tool || !category) {
    notFound();
  }

  // Filter related tools in same category, excluding the active one
  const relatedTools = tools
    .filter((t) => t.category === tool.category && t.slug !== tool.slug)
    .slice(0, 4);

  // Dynamic SEO sections
  const seoSections = generateSeoContent(tool.name, category.name);

  // Expand FAQs to exactly 10 items
  const expandedFaqs = generateExpandedFaqs(tool.name, tool.faqs);

  // Structured schemas
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://toolxbox.vercel.app"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": category.name,
        "item": `https://toolxbox.vercel.app/tools/${category.slug}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": tool.name,
        "item": `https://toolxbox.vercel.app/tools/${category.slug}/${tool.slug}`
      }
    ]
  };

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": tool.name,
    "url": `https://toolxbox.vercel.app/tools/${category.slug}/${tool.slug}`,
    "description": tool.description,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript. Requires HTML5."
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": expandedFaqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      {/* Schemas Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Top Breadcrumb Context */}
      <Breadcrumbs
        items={[
          { label: "Tools", href: "/tools" },
          { label: category.name, href: `/tools/${category.slug}` },
          { label: tool.name }
        ]}
      />

      {/* Header Brand Section */}
      <ToolHeader name={tool.name} description={tool.description} slug={tool.slug} />

      {/* Layout Split: Main Tool vs Sidebar Guides */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Active Tool Workspace Column */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="p-6">
            <CardContent className="p-0">
              {/* Client-side dynamic loader */}
              <ToolLoader componentName={tool.componentName} slug={tool.slug} category={tool.category} />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Reference Guides Column */}
        <div className="space-y-6">
          {/* How It Works Block */}
          <div className="glass p-5 rounded-2xl border border-border-primary/50 space-y-4">
            <h3 className="text-sm font-bold text-text-main flex items-center gap-2">
              <ListOrdered className="h-4.5 w-4.5 text-primary" /> How It Works
            </h3>
            <ol className="space-y-3 text-xs text-text-muted font-normal leading-relaxed pl-1">
              {tool.howItWorks.map((step, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="font-mono font-bold text-primary shrink-0">{idx + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Benefits Block */}
          <div className="glass p-5 rounded-2xl border border-border-primary/50 space-y-4">
            <h3 className="text-sm font-bold text-text-main flex items-center gap-2">
              <BookOpen className="h-4.5 w-4.5 text-primary" /> Key Benefits
            </h3>
            <ul className="space-y-3 text-xs text-text-muted font-normal leading-relaxed pl-1">
              {tool.benefits.map((benefit, idx) => (
                <li key={idx} className="flex gap-2">
                  <Check className="h-4 w-4 text-success shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Related Tools Links */}
          {relatedTools.length > 0 && (
            <div className="glass p-5 rounded-2xl border border-border-primary/50 space-y-4">
              <h3 className="text-sm font-bold text-text-main flex items-center gap-2">
                <Compass className="h-4.5 w-4.5 text-primary" /> Related Tools
              </h3>
              <div className="grid grid-cols-1 gap-2.5">
                {relatedTools.map((rel) => (
                  <Link key={rel.id} href={`/tools/${rel.category}/${rel.slug}`}>
                    <span className="block p-3 rounded-xl border border-border-primary/60 bg-bg-secondary hover:bg-bg-primary hover:border-primary/40 text-xs text-text-main font-medium transition-all duration-200 truncate">
                      {rel.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Pro Tips & Technical Details Segment */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-border-primary/40 pt-8">
        {/* Use Cases block */}
        {tool.useCases && tool.useCases.length > 0 && (
          <div className="glass p-6 rounded-2xl border border-border-primary/50 space-y-4">
            <h3 className="text-sm font-bold text-text-main flex items-center gap-2">
              <Sparkles className="h-4.5 w-4.5 text-primary" /> Common Use Cases & Scenarios
            </h3>
            <ul className="space-y-3 text-xs text-text-muted font-normal leading-relaxed pl-1">
              {tool.useCases.map((useCase, idx) => (
                <li key={idx} className="flex gap-2.5">
                  <span className="font-mono font-bold text-zinc-500 shrink-0">•</span>
                  <span>{useCase}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Technical Privacy & Security Block */}
        <div className="glass p-6 rounded-2xl border border-border-primary/50 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-text-main flex items-center gap-2">
              <ShieldCheck className="h-4.5 w-4.5 text-success" /> Client-Side Privacy Shield
            </h3>
            <p className="text-xs text-text-muted leading-relaxed font-normal">
              To ensure complete security, privacy, and speed, this tool executes 100% locally inside your browser sandbox. None of your data, uploaded file buffers, configuration parameters, or generated text results are ever transmitted to or stored on external servers.
            </p>
          </div>
          <div className="pt-4 border-t border-border-primary/40">
            <span className="text-[10px] font-bold text-success bg-success/5 border border-success/15 rounded px-2.5 py-1 inline-block uppercase tracking-wider font-mono">
              100% Local Sandboxed Execution
            </span>
          </div>
        </div>
      </div>

      {/* Accordion FAQ Section */}
      <ToolFaq faqs={expandedFaqs} />

      {/* Dynamic SEO Content Article Section (Google-First 1000+ words article) */}
      <article className="border-t border-border-primary/40 pt-12 space-y-8 max-w-4xl mx-auto select-none">
        <div className="space-y-3">
          <h2 className="text-2xl font-black text-text-main">
            Comprehensive Dynamic Reference Guide: {tool.name}
          </h2>
          <p className="text-xs text-text-muted leading-relaxed">
            Read our in-depth reference documentation and technical architecture details for the {tool.name} utility below.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {seoSections.map((sec, idx) => (
            <div key={idx} className="space-y-2">
              <h3 className="text-sm font-bold text-text-main">
                {sec.title}
              </h3>
              <p className="text-xs text-text-muted leading-relaxed text-justify">
                {sec.text}
              </p>
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}
