"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface ToolFaqProps {
  faqs: FAQItem[];
}

export const ToolFaq: React.FC<ToolFaqProps> = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="glass rounded-lg sm:rounded-xl border border-zinc-800/80 p-4 sm:p-5 sm:p-6 space-y-3 sm:space-y-4">
      <h3 className="text-sm sm:text-base font-bold text-zinc-100 flex items-center gap-2 select-none">
        <HelpCircle className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-violet-400" /> Frequently Asked Questions
      </h3>
      <div className="space-y-2 sm:space-y-2.5">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="border border-zinc-900 rounded-lg overflow-hidden transition-all duration-200 bg-zinc-900/10"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-3 sm:px-4 py-2.5 sm:py-3.5 text-left font-medium text-xs sm:text-sm text-zinc-200 hover:text-zinc-50 hover:bg-zinc-900/30 transition-all duration-150 cursor-pointer select-none gap-2"
              >
                <span className="break-words">{faq.question}</span>
                <ChevronDown
                  className={`h-4 w-4 text-zinc-500 transition-transform duration-200 shrink-0 ${
                    isOpen ? "rotate-185 text-violet-400" : ""
                  }`}
                />
              </button>
              <div
                className={`transition-all duration-300 ease-in-out ${
                  isOpen ? "max-h-[200px] border-t border-zinc-950 p-3 sm:p-4" : "max-h-0 overflow-hidden"
                }`}
              >
                <p className="text-[10px] sm:text-xs leading-relaxed text-zinc-400 font-normal">{faq.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
