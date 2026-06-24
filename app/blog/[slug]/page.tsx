import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  BookOpen,
  Calendar,
  Clock,
  User,
  ArrowRight,
  ListOrdered,
  Wrench,
  HelpCircle,
  FolderOpen
} from "lucide-react";
import { blogPosts, blogCategories } from "@/data/blog";
import { tools } from "@/data/tools";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ToolFaq } from "@/components/tools/ToolFaq";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all blog posts at build time
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate SEO metadata for individual posts
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return {};

  const fullUrl = `https://toolxbox.vercel.app/blog/${post.slug}`;

  return {
    title: `${post.title} | Toolbox Journal`,
    description: post.summary,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.summary,
      url: fullUrl,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Load related tools details
  const relatedToolsList = tools.filter((t) => post.relatedTools.includes(t.slug));

  // Load related articles details
  const relatedPostsList = blogPosts.filter((p) => post.relatedPosts.includes(p.slug));

  // SEO Schemas
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
        "name": "Blog",
        "item": "https://toolxbox.vercel.app/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://toolxbox.vercel.app/blog/${post.slug}`
      }
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.summary,
    "datePublished": post.publishedAt,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Toolbox Platform",
      "logo": {
        "@type": "ImageObject",
        "url": "https://toolxbox.vercel.app/favicon.ico"
      }
    },
    "mainEntityOfPage": `https://toolxbox.vercel.app/blog/${post.slug}`
  };

  const faqSchema = post.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": post.faqs.map((faq) => ({
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
      {/* Dynamic SEO Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Blog", href: "/blog" },
          { label: post.title }
        ]}
      />

      {/* Grid Layout Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Article Content Column */}
        <div className="lg:col-span-2 space-y-8">
          <article className="glass p-6 sm:p-8 rounded-xl border border-zinc-800/80 space-y-6">
            {/* Metadata headers */}
            <div className="space-y-4 pb-6 border-b border-zinc-900/60 select-none">
              <span className="text-[10px] font-bold text-violet-400 bg-violet-600/10 border border-violet-500/20 px-3 py-1 rounded-full uppercase tracking-wider font-mono">
                {post.category}
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-zinc-50 leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500 pt-1">
                <span className="flex items-center gap-1.5 font-semibold">
                  <User className="h-4 w-4 text-zinc-650" /> {post.author}
                </span>
                <span className="flex items-center gap-1.5 font-semibold">
                  <Calendar className="h-4 w-4 text-zinc-650" /> {post.publishedAt}
                </span>
                <span className="flex items-center gap-1.5 font-semibold">
                  <Clock className="h-4 w-4 text-zinc-650" /> {post.readingTime}
                </span>
              </div>
            </div>

            {/* Table of Contents (TOC) */}
            <div className="p-4 rounded-lg bg-zinc-900/40 border border-zinc-850/60 space-y-2.5">
              <h3 className="text-xs font-bold text-zinc-350 uppercase tracking-widest flex items-center gap-1.5 select-none">
                <ListOrdered className="h-4 w-4 text-violet-400" /> Table of Contents
              </h3>
              <ul className="space-y-1.5 text-xs text-zinc-400 font-semibold pl-1 select-none">
                {post.content.map((sec) => (
                  <li key={sec.id}>
                    <a href={`#${sec.id}`} className="hover:text-violet-400 transition-colors duration-150 flex items-center gap-1.5">
                      <span className="h-1 w-1 rounded-full bg-violet-400"></span> {sec.title}
                    </a>
                  </li>
                ))}
                {post.faqs.length > 0 && (
                  <li>
                    <a href="#faqs" className="hover:text-violet-400 transition-colors duration-150 flex items-center gap-1.5">
                      <span className="h-1 w-1 rounded-full bg-violet-400"></span> Q&A FAQ
                    </a>
                  </li>
                )}
              </ul>
            </div>

            {/* Article Sections content */}
            <div className="space-y-8 pt-4 leading-relaxed text-zinc-300 text-sm font-normal">
              {post.content.map((sec) => (
                <section key={sec.id} id={sec.id} className="space-y-2.5 scroll-mt-20">
                  <h2 className="text-lg font-bold text-zinc-100 border-b border-zinc-950 pb-2">
                    {sec.title}
                  </h2>
                  <p className="opacity-90 leading-relaxed font-normal">{sec.content}</p>
                </section>
              ))}
            </div>
          </article>

          {/* FAQ accordion section */}
          <div id="faqs" className="scroll-mt-20">
            <ToolFaq faqs={post.faqs} />
          </div>
        </div>

        {/* Sidebar Widgets Column */}
        <div className="space-y-6">
          {/* Related Tools CTA Call-to-action */}
          {relatedToolsList.length > 0 && (
            <div className="glass p-5 rounded-xl border border-zinc-800/80 space-y-4">
              <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
                <Wrench className="h-4.5 w-4.5 text-violet-400" /> Recommended Utilities
              </h3>
              <p className="text-xs text-zinc-450 leading-relaxed font-normal">
                Try the following tools referenced in this article completely in your browser:
              </p>
              <div className="grid grid-cols-1 gap-2.5">
                {relatedToolsList.map((tool) => (
                  <Link key={tool.id} href={`/tools/${tool.category}/${tool.slug}`} className="group">
                    <span className="flex items-center justify-between p-3 rounded-lg border border-zinc-900 bg-zinc-950/40 group-hover:bg-zinc-900/40 group-hover:border-zinc-850 text-xs text-zinc-300 font-semibold transition-all duration-200">
                      <span className="truncate">{tool.name}</span>
                      <ArrowRight className="h-3.5 w-3.5 text-zinc-650 group-hover:text-violet-400 group-hover:translate-x-0.5 transition-all duration-200" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Related Posts Recommendations */}
          {relatedPostsList.length > 0 && (
            <div className="glass p-5 rounded-xl border border-zinc-800/80 space-y-4">
              <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
                <FolderOpen className="h-4.5 w-4.5 text-violet-400" /> Recommended Reading
              </h3>
              <div className="grid grid-cols-1 gap-3.5">
                {relatedPostsList.map((rel) => (
                  <Link key={rel.slug} href={`/blog/${rel.slug}`} className="group">
                    <div className="space-y-1">
                      <span className="text-[10px] text-zinc-550 block font-mono font-bold uppercase tracking-wider">{rel.readingTime}</span>
                      <span className="text-xs font-bold text-zinc-300 group-hover:text-violet-400 transition-colors duration-150 line-clamp-2 leading-snug">
                        {rel.title}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
