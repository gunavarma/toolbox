import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, Compass, Star, ListOrdered, BookOpen } from "lucide-react";
import { tools, categories } from "@/data/tools";
import { toolComponents } from "@/components/tools/registry";
import FallbackTool from "@/components/tools/FallbackTool";
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

// Generate static routes for all 67 tools at build time
export async function generateStaticParams() {
  return tools.map((tool) => ({
    category: tool.category,
    slug: tool.slug,
  }));
}

// Generate dynamic SEO metadata tags
export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = tools.find((t) => t.slug === slug);
  
  if (!tool) return {};

  const fullUrl = `https://toolbox.example.com/tools/${tool.category}/${tool.slug}`;

  return {
    title: tool.seoTitle,
    description: tool.seoDescription,
    alternates: {
      canonical: `/tools/${tool.category}/${tool.slug}`,
    },
    openGraph: {
      title: tool.seoTitle,
      description: tool.seoDescription,
      url: fullUrl,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: tool.seoTitle,
      description: tool.seoDescription,
    },
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { category: categorySlug, slug } = await params;
  const tool = tools.find((t) => t.slug === slug);
  const category = categories.find((c) => c.slug === categorySlug);

  if (!tool || !category) {
    notFound();
  }

  // Load custom coded component or fall back to the smart utility component
  const ActiveTool = toolComponents[tool.componentName] || FallbackTool;

  // Filter related tools in same category, excluding the active one
  const relatedTools = tools
    .filter((t) => t.category === tool.category && t.slug !== tool.slug)
    .slice(0, 4);

  // Structured schemas
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://toolbox.example.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": category.name,
        "item": `https://toolbox.example.com/tools/${category.slug}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": tool.name,
        "item": `https://toolbox.example.com/tools/${category.slug}/${tool.slug}`
      }
    ]
  };

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": tool.name,
    "url": `https://toolbox.example.com/tools/${category.slug}/${tool.slug}`,
    "description": tool.description,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript. Requires HTML5."
  };

  const faqSchema = tool.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": tool.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Schemas Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

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
              {/* Dynamic import load */}
              <ActiveTool slug={tool.slug} category={tool.category} />
            </CardContent>
          </Card>

          {/* AdSense Placement Space Placeholder */}
          <div className="w-full h-24 rounded-lg bg-zinc-900/10 border border-zinc-900 border-dashed flex items-center justify-center text-xs text-zinc-600 tracking-wider font-semibold select-none">
            [Advertisement Placeholder - Google AdSense Space]
          </div>
        </div>

        {/* Sidebar Reference Guides Column */}
        <div className="space-y-6">
          {/* How It Works Block */}
          <div className="glass p-5 rounded-xl border border-zinc-800/80 space-y-4">
            <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
              <ListOrdered className="h-4.5 w-4.5 text-violet-400" /> How It Works
            </h3>
            <ol className="space-y-3 text-xs text-zinc-400 font-normal leading-relaxed pl-1">
              {tool.howItWorks.map((step, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="font-mono font-bold text-violet-500 shrink-0">{idx + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Benefits Block */}
          <div className="glass p-5 rounded-xl border border-zinc-800/80 space-y-4">
            <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
              <BookOpen className="h-4.5 w-4.5 text-violet-400" /> Key Benefits
            </h3>
            <ul className="space-y-3 text-xs text-zinc-400 font-normal leading-relaxed pl-1">
              {tool.benefits.map((benefit, idx) => (
                <li key={idx} className="flex gap-2">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Related Tools Links */}
          {relatedTools.length > 0 && (
            <div className="glass p-5 rounded-xl border border-zinc-800/80 space-y-4">
              <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
                <Compass className="h-4.5 w-4.5 text-violet-400" /> Related Utilities
              </h3>
              <div className="grid grid-cols-1 gap-2.5">
                {relatedTools.map((rel) => (
                  <Link key={rel.id} href={`/tools/${rel.category}/${rel.slug}`}>
                    <span className="block p-3 rounded-lg border border-zinc-900 bg-zinc-950/40 hover:bg-zinc-900/40 hover:border-zinc-855 text-xs text-zinc-300 font-medium transition-all duration-200 truncate">
                      {rel.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Accordion FAQ Section */}
      <ToolFaq faqs={tool.faqs} />
    </div>
  );
}
