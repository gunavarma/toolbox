"use client";

import React, { useState, useEffect } from "react";
import {
  Terminal,
  Calculator,
  Type,
  Clock,
  Briefcase,
  FileText,
  Copy,
  Check,
  RefreshCw,
  Sliders,
  DollarSign,
  Calendar,
  Sparkles,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

interface FallbackToolProps {
  slug: string;
  category: string;
}

export default function FallbackTool({ slug, category }: FallbackToolProps) {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [copied, setCopied] = useState(false);

  // States for general calculators
  const [valA, setValA] = useState(100);
  const [valB, setValB] = useState(10);
  const [valC, setValC] = useState(5);
  const [calcResult, setCalcResult] = useState<number | string>(0);

  // States for clocks/alarms
  const [timeStr, setTimeStr] = useState("");
  const [countDown, setCountDown] = useState(60);

  // Simple copy output helper
  const handleCopy = () => {
    navigator.clipboard.writeText(String(outputText || calcResult));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInputText("");
    setOutputText("");
    setCalcResult(0);
  };

  // Run real computations in the fallback tool based on active slugs!
  useEffect(() => {
    // TEXT TOOLS (Case, breaks, sort, deduplicate, numbers)
    if (category === "text-tools") {
      if (slug === "character-counter") {
        setOutputText(`Total Characters: ${inputText.length}\nWithout Spaces: ${inputText.replace(/\s/g, "").length}`);
      } else if (slug === "case-converter") {
        setOutputText(`UPPERCASE:\n${inputText.toUpperCase()}\n\nlowercase:\n${inputText.toLowerCase()}`);
      } else if (slug === "remove-line-breaks") {
        setOutputText(inputText.replace(/\r?\n|\r/g, " "));
      } else if (slug === "text-sorter") {
        setOutputText(inputText.split("\n").sort().join("\n"));
      } else if (slug === "duplicate-line-remover") {
        const unique = Array.from(new Set(inputText.split("\n")));
        setOutputText(unique.join("\n"));
      } else if (slug === "random-number-generator") {
        const numbers = Array.from({ length: 5 }, () =>
          Math.floor(Math.random() * (valA - valB + 1)) + valB
        );
        setOutputText(`Generated Numbers between ${valB} and ${valA}:\n${numbers.join(", ")}`);
      } else if (slug === "online-notepad") {
        setOutputText(inputText);
      } else if (slug === "markdown-editor") {
        setOutputText(`<h1>Markdown Preview</h1><p>${inputText}</p>`);
      }
    }

    // DEVELOPER TOOLS (Base64, URL, Hash, UUID, Minifiers)
    if (category === "developer-tools") {
      if (slug === "base64-encode-decode") {
        try {
          setOutputText(`Encoded: ${btoa(inputText)}\nDecoded: ${inputText ? atob(inputText) : ""}`);
        } catch {
          setOutputText(`Encoded: ${btoa(inputText)}\nDecoded: [Cannot decode invalid Base64 input]`);
        }
      } else if (slug === "url-encoder-decoder") {
        setOutputText(`Encoded: ${encodeURIComponent(inputText)}\nDecoded: ${decodeURIComponent(inputText)}`);
      } else if (slug === "hash-generator") {
        setOutputText(`SHA-256 Checksum (simulated):\na1c390f7a7905f59c8${inputText.length}f5d4e12c1b9`);
      } else if (slug === "uuid-generator") {
        const uuids = Array.from({ length: 5 }, () =>
          "f81d4fae-7dec-11d0-a765-00a0c91e6bf6".replace(/[xy]/g, (c) => {
            const r = (Math.random() * 16) | 0;
            return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
          })
        );
        setOutputText(uuids.join("\n"));
      } else if (slug.includes("minifier")) {
        setOutputText(inputText.replace(/\s+/g, " ").replace(/\/\*[\s\S]*?\*\//g, "").trim());
      } else if (slug === "json-validator") {
        try {
          if (inputText) {
            JSON.parse(inputText);
            setOutputText("JSON Status: VALID");
          } else {
            setOutputText("JSON Status: Empty");
          }
        } catch (e: any) {
          setOutputText(`JSON Status: INVALID\nError: ${e.message}`);
        }
      }
    }

    // CALCULATORS (GST, Loan, Compound, Salary, Margin, Percentage)
    if (category === "calculators") {
      if (slug === "gst-calculator") {
        const gst = (valA * valB) / 100;
        setCalcResult(`GST Amount (${valB}%): ${(gst).toFixed(2)}\nTotal Price (Inclusive): ${(valA + gst).toFixed(2)}`);
      } else if (slug === "percentage-calculator") {
        const pct = (valA * valB) / 100;
        setCalcResult(`${valB}% of ${valA} is: ${pct.toFixed(2)}`);
      } else if (slug === "loan-calculator" || slug === "emi-calculator") {
        const r = valB / 12 / 100;
        const n = valC * 12;
        const emi = (valA * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        setCalcResult(`Monthly Payment (EMI): ${emi ? emi.toFixed(2) : "0.00"}\nTotal Payments: ${(emi * n).toFixed(2)}`);
      } else if (slug === "profit-margin-calculator") {
        const profit = valA - valB;
        const margin = (profit / valA) * 100;
        setCalcResult(`Gross Profit: $${profit.toFixed(2)}\nProfit Margin: ${margin.toFixed(2)}%`);
      } else if (slug === "compound-interest-calculator") {
        const futureValue = valA * Math.pow(1 + valB / 100, valC);
        setCalcResult(`Future Value (compounded annually): $${futureValue.toFixed(2)}\nTotal Interest: $${(futureValue - valA).toFixed(2)}`);
      } else if (slug === "salary-calculator") {
        const annual = valA * 40 * 52; // hourly rate * 40h * 52 weeks
        setCalcResult(`Annual Salary (based on 40h/week): $${annual.toFixed(2)}\nMonthly Take-Home estimate: $${(annual / 12).toFixed(2)}`);
      } else if (slug === "scientific-calculator") {
        setCalcResult("Scientific Calculator is available via the primary keypad dashboard.");
      }
    }

    // PRODUCTIVITY & BUSINESS TOOLS
    if (category === "productivity-tools" || category === "business-tools") {
      if (slug === "qr-code-generator") {
        setCalcResult(`QR Code Metadata target:\n${inputText || "https://toolbox.example.com"}`);
      } else if (slug === "quote-generator") {
        setCalcResult(`Quote Draft INV-${valA}:\nDiscount applied: ${valB}%\nSubtotal estimation: $${(valA * 10).toFixed(2)}`);
      } else if (slug === "profit-calculator") {
        setCalcResult(`Profit Margin: ${((valA - valB) / valA * 100).toFixed(1)}%`);
      } else if (slug === "break-even-calculator") {
        const units = valA / (valC - valB);
        setCalcResult(`Break-even Volume: ${units > 0 ? Math.ceil(units) : 0} units`);
      } else if (slug === "roi-calculator") {
        const gains = ((valB - valA) / valA) * 100;
        setCalcResult(`Return on Investment: ${gains.toFixed(1)}%`);
      }
    }

    // AI GENERATOR TOOLS
    if (category === "ai-tools") {
      const w = inputText.trim() || "modern web development";
      if (slug === "ai-meta-description-generator") {
        setOutputText(`Explore the ultimate guides to ${w}. Learn tips, tools, and technical details to master productivity workflows.`);
      } else if (slug === "ai-product-description-generator") {
        setOutputText(`Introducing our premium ${w} package. Engineered for high performance, ease of use, and world-class designs.`);
      } else if (slug === "ai-keyword-generator") {
        setOutputText(`${w.replace(/\s+/g, ", ")}, tools, dev, productivity, seo tags`);
      } else if (slug === "ai-faq-generator") {
        setOutputText(`Q: What is ${w}?\nA: It is a modern solution designed to optimize daily developer and calculations workflows.`);
      }
    }
  }, [inputText, category, slug, valA, valB, valC]);

  // Clock ticks
  useEffect(() => {
    if (category !== "time-tools") return;
    const interval = setInterval(() => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, [category]);

  // 1. Text category layout
  if (category === "text-tools" || category === "developer-tools" || category === "ai-tools") {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5 px-1">
              <Type className="h-4 w-4 text-violet-400" /> Input Sandbox
            </span>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste or type content parameters here to test..."
              className="w-full h-[220px] font-mono text-xs bg-zinc-900/40 border border-zinc-800 rounded-xl p-4 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all duration-200 resize-none outline-none"
            ></textarea>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <span className="text-xs font-semibold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                <Terminal className="h-4 w-4 text-emerald-400" /> Output Result
              </span>
              {outputText && (
                <button
                  onClick={handleCopy}
                  className="text-xs text-zinc-500 hover:text-violet-400 flex items-center gap-1.5 transition-colors duration-200 cursor-pointer"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? "Copied!" : "Copy"}</span>
                </button>
              )}
            </div>
            <textarea
              readOnly
              value={outputText}
              placeholder="Computed text output will appear here..."
              className="w-full h-[220px] font-mono text-xs bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 text-zinc-300 placeholder-zinc-700 focus:outline-none transition-all duration-200 resize-none outline-none"
            ></textarea>
          </div>
        </div>

        <div className="flex justify-end gap-2.5">
          <Button variant="ghost" onClick={handleClear} leftIcon={<RefreshCw className="h-4 w-4" />}>
            Clear Content
          </Button>
        </div>
      </div>
    );
  }

  // 2. Calculators layout
  if (category === "calculators" || category === "business-tools") {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 rounded-xl border border-zinc-800 bg-zinc-900/35 glass">
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-zinc-200 flex items-center gap-1.5">
              <Calculator className="h-4.5 w-4.5 text-violet-400" /> Parameter Inputs
            </h4>
            
            <Input
              label={slug.includes("gst") ? "Base Price ($)" : slug.includes("profit") ? "Revenue / Price ($)" : "Principal Amount ($)"}
              type="number"
              value={valA}
              onChange={(e) => setValA(Number(e.target.value))}
            />
            
            <Input
              label={slug.includes("gst") ? "GST Rate (%)" : slug.includes("roi") ? "Investment Final Value ($)" : "Annual Interest Rate (%)"}
              type="number"
              value={valB}
              onChange={(e) => setValB(Number(e.target.value))}
            />

            {(slug.includes("loan") || slug.includes("compound") || slug.includes("break")) && (
              <Input
                label={slug.includes("break") ? "Variable Cost ($)" : "Tenure / Length (Years)"}
                type="number"
                value={valC}
                onChange={(e) => setValC(Number(e.target.value))}
              />
            )}
          </div>

          <div className="flex flex-col justify-center space-y-3.5 p-4 rounded-lg bg-zinc-950/60 border border-zinc-850/60 relative overflow-hidden">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
              <Terminal className="h-4 w-4 text-emerald-400" /> Calculated Outcome
            </span>
            <div className="text-base font-mono text-zinc-200 leading-relaxed whitespace-pre-wrap select-all font-semibold">
              {calcResult}
            </div>

            {calcResult && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                leftIcon={copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                className="mt-4 self-start"
              >
                {copied ? "Copied" : "Copy Output"}
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 3. Time Tools Fallback (World clock, digital display overlays)
  if (category === "time-tools") {
    return (
      <div className="space-y-6">
        <div className="w-full bg-zinc-900/35 rounded-xl border border-zinc-800 p-8 flex flex-col items-center justify-center text-center glass relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-36 w-36 rounded-full bg-violet-600/10 blur-3xl pointer-events-none"></div>

          <span className="text-sm font-semibold tracking-wider text-zinc-500 uppercase flex items-center gap-1.5 mb-2 z-10">
            <Clock className="h-4 w-4 text-violet-400" /> Time Zone Context
          </span>

          <div className="text-5xl font-bold font-mono tracking-tight text-zinc-50 z-10">
            {timeStr || "Ticking..."}
          </div>
        </div>
      </div>
    );
  }

  // 4. Image Tools Fallback (uploader + scale)
  if (category === "image-tools") {
    return (
      <div className="space-y-6">
        <div className="w-full aspect-video rounded-xl border border-dashed border-zinc-800 bg-zinc-900/15 p-6 flex flex-col items-center justify-center text-center select-none glass">
          <div className="h-12 w-12 rounded-full bg-zinc-800/60 border border-zinc-700/30 flex items-center justify-center text-zinc-400 mb-3">
            <Sparkles className="h-6 w-6 text-violet-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-zinc-100">Upload Image to Crop/Resize</h3>
            <p className="text-xs text-zinc-500 mt-1 max-w-sm">
              Use the file selectors or upload images to crop, convert formats, or extract visual HEX palettes client-side.
            </p>
          </div>
          <input type="file" className="mt-4 text-xs text-zinc-500" />
        </div>
      </div>
    );
  }

  // Fallback layout
  return (
    <div className="w-full py-12 text-center border border-zinc-800 border-dashed rounded-xl bg-zinc-900/10 flex flex-col items-center justify-center text-zinc-500 gap-1.5">
      <Briefcase className="h-10 w-10 text-zinc-700 mb-2" />
      <span className="text-sm font-bold text-zinc-300">Tool Panel Active</span>
      <span className="text-xs max-w-xs text-zinc-500 leading-relaxed">
        This platform runs completely in the browser. Select or enter values to execute calculations.
      </span>
    </div>
  );
}
