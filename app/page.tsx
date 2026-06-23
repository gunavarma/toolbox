import type { Metadata } from "next";
import Link from "next/link";
import {
  Search,
  Sparkles,
  Zap,
  Layers,
  ArrowRight,
  Tv,
  Clock,
  Calculator,
  Type,
  Code,
  Image,
  CheckSquare,
  Briefcase,
  Terminal,
  Star,
  ShieldCheck,
  HelpCircle
} from "lucide-react";
import { categories, tools } from "@/data/tools";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

// Icon mapping dictionary
const iconMap: Record<string, React.ComponentType<any>> = {
  Tv,
  Clock,
  Calculator,
  Type,
  Code,
  Image,
  CheckSquare,
  Sparkles,
  Briefcase,
};

export default function HomePage() {
  const popularTools = tools.filter((t) =>
    ["word-counter", "json-formatter", "bmi-calculator", "password-generator", "qr-code-generator", "stopwatch"].includes(t.slug)
  );

  const trendingTools = tools.filter((t) =>
    ["invoice-generator", "dead-pixel-test", "pomodoro-timer", "regex-tester", "screen-cleaner", "ai-blog-title-generator"].includes(t.slug)
  );

  const developerSectionTools = tools.filter((t) => t.category === "developer-tools").slice(0, 4);
  const aiSectionTools = tools.filter((t) => t.category === "ai-tools").slice(0, 4);

  return (
    <div className="flex-1 w-full pb-20 space-y-24">
      {/* 1. Hero Spotlight Section */}
      <section className="relative w-full pt-20 pb-16 px-4 sm:px-6 flex flex-col items-center justify-center text-center overflow-hidden border-b border-zinc-900/60">
        {/* Neon Blur Spots */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-violet-600/10 blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/3 left-1/3 h-48 w-48 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none"></div>

        <div className="max-w-3xl space-y-6 z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-violet-500/25 bg-violet-500/5 text-violet-400 text-xs font-semibold select-none animate-float">
            <Sparkles className="h-3.5 w-3.5" /> <span>Version 1.0 Live</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-zinc-50 leading-[1.1] glow-text select-none">
            Everything You Need.<br />
            <span className="bg-gradient-to-r from-violet-400 via-indigo-300 to-violet-500 bg-clip-text text-transparent">One Toolbox.</span>
          </h1>

          <p className="text-sm sm:text-base text-zinc-450 max-w-xl mx-auto leading-relaxed">
            50+ professional online tools for productivity, calculations, content creation, development, testing, and daily workflows.
          </p>

          {/* Interactive Hero Search Input click overlay trigger */}
          <div className="max-w-md mx-auto pt-4 w-full">
            <Link href="/tools">
              <div className="flex items-center w-full bg-zinc-900/40 border border-zinc-800 rounded-xl h-12 px-4 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900/80 transition-all duration-250 cursor-pointer shadow-lg select-none">
                <Search className="h-5 w-5 text-zinc-500 mr-3 shrink-0" />
                <span className="text-left text-sm flex-1">Search or browse 50+ tools (Press ⌘K)...</span>
                <span className="hidden sm:inline-flex items-center gap-1 border border-zinc-850 rounded px-1.5 py-0.5 bg-zinc-950 text-[10px] font-semibold text-zinc-500">
                  ⌘K
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Popular & Trending Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Popular column */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 select-none">
            <div className="h-7 w-7 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-amber-500">
              <Star className="h-4 w-4 fill-amber-500/25" />
            </div>
            <h2 className="text-lg font-bold text-zinc-50">Popular Utilities</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {popularTools.map((tool) => (
              <Link key={tool.id} href={`/tools/${tool.category}/${tool.slug}`} className="group">
                <Card hoverEffect className="p-4 h-full flex flex-col justify-between">
                  <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-zinc-200 group-hover:text-violet-400 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">{tool.description}</p>
                  </div>
                  <div className="text-[9px] font-bold text-zinc-600 uppercase tracking-wider pt-3.5">
                    Popular
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Trending column */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 select-none">
            <div className="h-7 w-7 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-violet-500">
              <Zap className="h-4 w-4" />
            </div>
            <h2 className="text-lg font-bold text-zinc-50">Trending Tools</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {trendingTools.map((tool) => (
              <Link key={tool.id} href={`/tools/${tool.category}/${tool.slug}`} className="group">
                <Card hoverEffect className="p-4 h-full flex flex-col justify-between">
                  <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-zinc-200 group-hover:text-violet-400 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">{tool.description}</p>
                  </div>
                  <div className="text-[9px] font-bold text-zinc-600 uppercase tracking-wider pt-3.5">
                    Trending
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Category Dashboard Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center space-y-2 select-none">
          <h2 className="text-2xl font-extrabold tracking-tight text-zinc-50">Explore by Category</h2>
          <p className="text-sm text-zinc-500">Tools organized logically to speed up your productivity.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((category) => {
            const IconComponent = iconMap[category.icon] || Layers;
            const categoryToolsCount = tools.filter((t) => t.category === category.id).length;

            return (
              <Link key={category.id} href={`/tools/${category.slug}`} className="group">
                <Card hoverEffect className="h-full flex flex-col justify-between min-h-[150px] p-5">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="h-10 w-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-violet-400 group-hover:border-violet-500/30 transition-all duration-300">
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <span className="text-[9px] font-bold text-zinc-500 border border-zinc-900 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono">
                        {categoryToolsCount} Tools
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-zinc-100 group-hover:text-violet-400 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-xs text-zinc-400 leading-relaxed font-normal line-clamp-2">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest pt-4 flex items-center justify-between border-t border-zinc-900/40">
                    <span>Explore Tools</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 group-hover:text-violet-400 transition-all duration-200" />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 4. Highlight Developer Panels */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center bg-zinc-900/10 border border-zinc-900 rounded-2xl p-6 sm:p-8 glass relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 h-36 w-36 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none"></div>

        <div className="space-y-4 lg:col-span-1 select-none">
          <div className="h-9 w-9 rounded-lg bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
            <Terminal className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-extrabold tracking-tight text-zinc-50">Developer Workbench</h2>
          <p className="text-xs text-zinc-450 leading-relaxed max-w-xs font-normal">
            Quick formatting, validations, and hashing tools to help debug code configurations client-side.
          </p>
          <Link href="/tools/developer-tools" className="inline-flex">
            <Button variant="glass" size="sm" rightIcon={<ArrowRight className="h-4 w-4" />}>
              All Dev Tools
            </Button>
          </Link>
        </div>

        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {developerSectionTools.map((tool) => (
            <Link key={tool.id} href={`/tools/${tool.category}/${tool.slug}`} className="group">
              <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950/40 hover:border-zinc-700/60 hover:bg-zinc-900/30 transition-all duration-200">
                <h3 className="text-xs font-bold text-zinc-200 group-hover:text-violet-400 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-[11px] text-zinc-500 mt-1 line-clamp-1 leading-relaxed">{tool.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Highlight AI Tools */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center bg-zinc-900/10 border border-zinc-900 rounded-2xl p-6 sm:p-8 glass relative overflow-hidden">
        <div className="space-y-4 lg:col-span-1 select-none">
          <div className="h-9 w-9 rounded-lg bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
            <Sparkles className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-extrabold tracking-tight text-zinc-50">AI Content Helpers</h2>
          <p className="text-xs text-zinc-455 leading-relaxed max-w-xs font-normal">
            SEO description tags, keywords generators, and headline compilers using optimized templates.
          </p>
          <Link href="/tools/ai-tools" className="inline-flex">
            <Button variant="glass" size="sm" rightIcon={<ArrowRight className="h-4 w-4" />}>
              All AI Tools
            </Button>
          </Link>
        </div>

        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {aiSectionTools.map((tool) => (
            <Link key={tool.id} href={`/tools/${tool.category}/${tool.slug}`} className="group">
              <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950/40 hover:border-zinc-700/60 hover:bg-zinc-900/30 transition-all duration-200">
                <h3 className="text-xs font-bold text-zinc-200 group-hover:text-violet-400 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-[11px] text-zinc-500 mt-1 line-clamp-1 leading-relaxed">{tool.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8 select-none">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-extrabold tracking-tight text-zinc-50">Loved by Makers</h2>
          <p className="text-sm text-zinc-500">How developers and creators streamline work with Toolbox.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass p-5 rounded-xl border border-zinc-800/80 space-y-4">
            <p className="text-xs text-zinc-450 leading-relaxed italic">
              &ldquo;The JSON Formatter and Case Converter have saved me countless tab switches. It is extremely fast, dark, and requires no cookies alerts.&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="h-7 w-7 rounded-full bg-violet-600 flex items-center justify-center font-bold text-xs text-zinc-100 font-mono">
                TH
              </div>
              <div>
                <span className="text-xs font-bold text-zinc-200 block">Thomas Harris</span>
                <span className="text-[10px] text-zinc-500">Frontend Engineer</span>
              </div>
            </div>
          </div>

          <div className="glass p-5 rounded-xl border border-zinc-800/80 space-y-4">
            <p className="text-xs text-zinc-450 leading-relaxed italic">
              &ldquo;I check all my new screens with the Dead Pixel cycle and Screen Cleaner overlay. Having locked input keys is so helpful when cleaning displays.&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="h-7 w-7 rounded-full bg-indigo-500 flex items-center justify-center font-bold text-xs text-zinc-100 font-mono">
                LK
              </div>
              <div>
                <span className="text-xs font-bold text-zinc-200 block">Lisa K.</span>
                <span className="text-[10px] text-zinc-500">Hardware Reviewer</span>
              </div>
            </div>
          </div>

          <div className="glass p-5 rounded-xl border border-zinc-800/80 space-y-4">
            <p className="text-xs text-zinc-450 leading-relaxed italic">
              &ldquo;The Invoice Generator is outstanding! It exports clean PDF vectors locally without sending my client details to third-party databases.&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="h-7 w-7 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-xs text-zinc-100 font-mono">
                DJ
              </div>
              <div>
                <span className="text-xs font-bold text-zinc-200 block">Dan Jenkins</span>
                <span className="text-[10px] text-zinc-500">Freelance Designer</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ Section */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6 select-none">
        <h2 className="text-xl font-extrabold tracking-tight text-zinc-50 text-center flex items-center justify-center gap-2">
          <HelpCircle className="h-5 w-5 text-violet-400" /> Platform FAQs
        </h2>

        <div className="space-y-3">
          <div className="glass p-5 rounded-xl border border-zinc-800/80 space-y-1.5">
            <h4 className="text-sm font-semibold text-zinc-100">Are my details secure?</h4>
            <p className="text-xs text-zinc-450 leading-relaxed font-normal">
              Yes, 100%. All computations, image resizing, hashing, password creations, and invoicing lists are processed client-side inside your browser sandbox. We do not host or save client files on external servers.
            </p>
          </div>

          <div className="glass p-5 rounded-xl border border-zinc-800/80 space-y-1.5">
            <h4 className="text-sm font-semibold text-zinc-100">How do I trigger the search?</h4>
            <p className="text-xs text-zinc-450 leading-relaxed font-normal">
              You can click on the search bar in the navbar or press the `Cmd+K` / `Ctrl+K` keyboard shortcut keys anywhere on the platform to launch the command search dashboard.
            </p>
          </div>

          <div className="glass p-5 rounded-xl border border-zinc-800/80 space-y-1.5">
            <h4 className="text-sm font-semibold text-zinc-100">Are there limit counts for PDF invoices?</h4>
            <p className="text-xs text-zinc-450 leading-relaxed font-normal">
              No, there are zero usage limits or pricing tiers. You can generate, customize, and print as many quotes or invoices as you need completely free.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
