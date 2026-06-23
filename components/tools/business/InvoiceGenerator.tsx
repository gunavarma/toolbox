"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Printer, FileText, Landmark, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

export default function InvoiceGenerator() {
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  
  const [invoiceNumber, setInvoiceNumber] = useState("INV-1001");
  const [issueDate, setIssueDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [currency, setCurrency] = useState("$");
  const [taxPercent, setTaxPercent] = useState(10);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [isQuote, setIsQuote] = useState(false);

  const [items, setItems] = useState<InvoiceItem[]>([
    { id: "1", description: "Design Consulting Services", quantity: 10, rate: 75 },
  ]);

  // Set default dates on mount
  useEffect(() => {
    const today = new Date().toISOString().substring(0, 10);
    setIssueDate(today);
    const in30Days = new Date();
    in30Days.setDate(in30Days.getDate() + 30);
    setDueDate(in30Days.toISOString().substring(0, 10));
    
    const quoteMode = window.location.pathname.includes("quote-generator");
    setIsQuote(quoteMode);
    if (quoteMode) {
      setInvoiceNumber("QT-1001");
    }
  }, []);

  const handleAddItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: "Custom Service Item",
      quantity: 1,
      rate: 100,
    };
    setItems([...items, newItem]);
  };

  const handleItemChange = (id: string, field: keyof InvoiceItem, value: any) => {
    const updated = items.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          [field]: field === "description" ? value : Number(value),
        };
      }
      return item;
    });
    setItems(updated);
  };

  const handleItemDelete = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const calculateSubtotal = () => {
    return items.reduce((acc, curr) => acc + curr.quantity * curr.rate, 0);
  };

  const handlePrint = () => {
    window.print();
  };

  const subtotal = calculateSubtotal();
  const discountAmount = (subtotal * discountPercent) / 100;
  const taxAmount = ((subtotal - discountAmount) * taxPercent) / 100;
  const grandTotal = subtotal - discountAmount + taxAmount;

  return (
    <div className="space-y-6">
      {/* Printable Sheet Wrapper */}
      <div className="w-full bg-zinc-950 p-6 sm:p-8 rounded-xl border border-zinc-800 shadow-2xl relative overflow-hidden print:p-0 print:border-none print:shadow-none print:bg-white print:text-black">
        {/* Glow (hides on print) */}
        <div className="absolute top-0 right-0 h-48 w-48 rounded-full bg-violet-600/5 blur-3xl pointer-events-none print:hidden"></div>

        {/* Invoice Header Details */}
        <div className="flex flex-col sm:flex-row justify-between gap-6 pb-8 border-b border-zinc-900 print:border-zinc-200">
          <div className="space-y-3 print:space-y-2">
            <h3 className="text-xl font-bold tracking-tight text-zinc-100 flex items-center gap-2 print:text-black select-none">
              <Landmark className="h-5 w-5 text-violet-500 print:text-black" /> {isQuote ? "QUOTE SHEET" : "INVOICE SHEET"}
            </h3>
            
            {/* Input boxes for Sender */}
            <div className="grid grid-cols-1 gap-2 max-w-xs print:hidden">
              <input
                type="text"
                placeholder="Your Company Name"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="bg-zinc-900/60 border border-zinc-800 rounded px-2.5 py-1 text-xs text-zinc-200 outline-none focus:border-violet-500"
              />
              <input
                type="email"
                placeholder="Sender Email Address"
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                className="bg-zinc-900/60 border border-zinc-800 rounded px-2.5 py-1 text-xs text-zinc-200 outline-none focus:border-violet-500"
              />
            </div>
            
            {/* Printed view only values */}
            <div className="hidden print:block text-xs font-mono">
              <div className="font-bold text-zinc-800">{senderName || "Sender Company"}</div>
              <div className="text-zinc-500">{senderEmail || "sender@example.com"}</div>
            </div>
          </div>

          <div className="space-y-3.5 sm:text-right print:text-right">
            <div>
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">{isQuote ? "Quote ID" : "Invoice ID"}</span>
              <input
                type="text"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                className="bg-transparent border-none text-right sm:text-right font-mono font-bold text-sm text-zinc-200 outline-none focus:bg-zinc-900 p-1 rounded max-w-[140px] print:text-black print:p-0 print:text-right"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 text-left sm:text-right print:text-right text-xs">
              <div>
                <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider block">Issued Date</span>
                <input
                  type="date"
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                  className="bg-transparent border-none text-zinc-400 font-mono focus:bg-zinc-900 p-0.5 rounded max-w-[120px] print:text-black print:p-0"
                />
              </div>
              <div>
                <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider block">{isQuote ? "Expiry Date" : "Due Date"}</span>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="bg-transparent border-none text-zinc-400 font-mono focus:bg-zinc-900 p-0.5 rounded max-w-[120px] print:text-black print:p-0"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Client details details */}
        <div className="py-6 flex flex-col sm:flex-row justify-between gap-6 text-xs">
          <div className="space-y-2">
            <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider block">Billed To</span>
            <div className="grid grid-cols-1 gap-2 max-w-xs print:hidden">
              <input
                type="text"
                placeholder="Client Business Name"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="bg-zinc-900/60 border border-zinc-800 rounded px-2.5 py-1 text-xs text-zinc-200 outline-none focus:border-violet-500"
              />
              <input
                type="email"
                placeholder="Client Email Address"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                className="bg-zinc-900/60 border border-zinc-800 rounded px-2.5 py-1 text-xs text-zinc-200 outline-none focus:border-violet-500"
              />
            </div>

            <div className="hidden print:block font-mono">
              <div className="font-bold text-zinc-800">{clientName || "Client Business"}</div>
              <div className="text-zinc-500">{clientEmail || "client@example.com"}</div>
            </div>
          </div>

          <div className="flex gap-4 items-end justify-start sm:justify-end print:hidden select-none">
            <div className="w-24">
              <Select
                label="Currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                options={[
                  { value: "$", label: "USD ($)" },
                  { value: "€", label: "EUR (€)" },
                  { value: "£", label: "GBP (£)" },
                  { value: "₹", label: "INR (₹)" },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Invoice lines table grid */}
        <div className="mt-4 space-y-4">
          <div className="border border-zinc-900 rounded-xl overflow-hidden print:border-zinc-200">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-zinc-900/40 text-zinc-400 font-bold uppercase tracking-wider border-b border-zinc-900 print:bg-zinc-100 print:text-zinc-700 print:border-zinc-200">
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3 text-center w-20">Qty</th>
                  <th className="px-4 py-3 text-right w-28">Rate</th>
                  <th className="px-4 py-3 text-right w-28">Amount</th>
                  <th className="px-4 py-3 text-center w-12 print:hidden"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-950 print:divide-zinc-200">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-zinc-900/10 print:text-black">
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => handleItemChange(item.id, "description", e.target.value)}
                        className="bg-transparent border-none w-full text-zinc-100 font-medium outline-none focus:bg-zinc-900 p-0.5 rounded print:text-black print:p-0"
                      />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(item.id, "quantity", e.target.value)}
                        className="bg-transparent border-none w-full text-center font-mono outline-none focus:bg-zinc-900 p-0.5 rounded print:text-black print:p-0"
                      />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <input
                        type="number"
                        value={item.rate}
                        onChange={(e) => handleItemChange(item.id, "rate", e.target.value)}
                        className="bg-transparent border-none w-full text-right font-mono outline-none focus:bg-zinc-900 p-0.5 rounded print:text-black print:p-0"
                      />
                    </td>
                    <td className="px-4 py-3 text-right font-mono font-semibold text-zinc-300 print:text-black">
                      {currency}{(item.quantity * item.rate).toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-center print:hidden">
                      <button
                        onClick={() => handleItemDelete(item.id)}
                        className="p-1 hover:bg-zinc-900 rounded text-zinc-600 hover:text-red-400 transition-all duration-200 cursor-pointer"
                        title="Delete item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-start print:hidden">
            <Button variant="outline" size="sm" onClick={handleAddItem} leftIcon={<Plus className="h-4 w-4" />}>
              Add Line Item
            </Button>
          </div>
        </div>

        {/* Invoice calculations totals */}
        <div className="flex flex-col sm:flex-row justify-between gap-6 pt-8 border-t border-zinc-900 print:border-zinc-200 mt-8 text-xs">
          <div className="max-w-xs space-y-4 print:hidden">
            <div>
              <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">Tax Percentage (%)</span>
              <input
                type="number"
                value={taxPercent}
                onChange={(e) => setTaxPercent(Number(e.target.value))}
                className="bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1 w-20 text-zinc-200 outline-none focus:border-violet-500 font-mono"
              />
            </div>
            <div>
              <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">Discount (%)</span>
              <input
                type="number"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(Number(e.target.value))}
                className="bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1 w-20 text-zinc-200 outline-none focus:border-violet-500 font-mono"
              />
            </div>
          </div>

          <div className="w-full sm:max-w-xs divide-y divide-zinc-900 print:divide-zinc-200 text-right print:text-right print:text-black">
            <div className="flex justify-between py-2 items-center">
              <span className="text-zinc-500 font-medium">Subtotal</span>
              <span className="font-mono text-zinc-300 print:text-black font-semibold">{currency}{subtotal.toFixed(2)}</span>
            </div>
            {discountPercent > 0 && (
              <div className="flex justify-between py-2 items-center">
                <span className="text-zinc-500 font-medium">Discount ({discountPercent}%)</span>
                <span className="font-mono text-red-400 font-semibold">-{currency}{discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between py-2 items-center">
              <span className="text-zinc-500 font-medium">Tax ({taxPercent}%)</span>
              <span className="font-mono text-zinc-300 print:text-black font-semibold">{currency}{taxAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-3 items-center text-sm font-bold border-t-2 border-zinc-800 print:border-zinc-400">
              <span className="text-zinc-100 print:text-black">{isQuote ? "Total Estimate" : "Total Due"}</span>
              <span className="font-mono text-violet-400 print:text-black">{currency}{grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Print Trigger Button */}
      <div className="flex justify-center select-none print:hidden">
        <Button variant="primary" onClick={handlePrint} leftIcon={<Printer className="h-4 w-4" />}>
          {isQuote ? "Print or Save PDF Quote" : "Print or Save PDF Invoice"}
        </Button>
      </div>
    </div>
  );
}
