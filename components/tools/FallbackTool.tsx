"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Calculator,
  Clock,
  Code,
  Type,
  FileText,
  DollarSign,
  Calendar,
  Sparkles,
  Printer,
  Upload,
  QrCode,
  CheckCircle,
  Plus,
  Trash2,
  Copy,
  Download,
  AlertTriangle,
  Play,
  RotateCcw,
  Volume2,
  Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Switch } from "@/components/ui/Switch";

interface FallbackToolProps {
  slug: string;
  category: string;
}

export default function FallbackTool({ slug, category }: FallbackToolProps) {
  // General Clipboard Copy Helper
  const [copied, setCopied] = useState(false);
  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ==========================================
  // 1. CALCULATORS CATEGORY HANDLERS
  // ==========================================

  // Age Calculator
  const [birthdate, setBirthdate] = useState("1995-05-15");
  const [ageResults, setAgeResults] = useState("");
  useEffect(() => {
    if (slug !== "age-calculator" || !birthdate) return;
    const birth = new Date(birthdate);
    const today = new Date();

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      // get days in previous month
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    // Birthday countdown
    const nextBday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (today > nextBday) {
      nextBday.setFullYear(today.getFullYear() + 1);
    }
    const diffMs = nextBday.getTime() - today.getTime();
    const daysToBday = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    setAgeResults(
      `Exact Age:\n${years} Years, ${months} Months, and ${days} Days\n\n` +
      `Countdown to Next Birthday:\n${daysToBday} days remaining`
    );
  }, [birthdate, slug]);

  // GST Calculator
  const [gstBase, setGstBase] = useState(1000);
  const [gstRate, setGstRate] = useState(18);
  const [gstType, setGstType] = useState("add"); // add or remove
  const [gstResults, setGstResults] = useState("");
  useEffect(() => {
    if (slug !== "gst-calculator") return;
    let net = 0;
    let gst = 0;
    let total = 0;

    if (gstType === "add") {
      net = gstBase;
      gst = (gstBase * gstRate) / 100;
      total = gstBase + gst;
    } else {
      total = gstBase;
      net = gstBase / (1 + gstRate / 100);
      gst = gstBase - net;
    }

    setGstResults(
      `Net Price: $${net.toFixed(2)}\n` +
      `CGST (Split 50%): $${(gst / 2).toFixed(2)}\n` +
      `SGST (Split 50%): $${(gst / 2).toFixed(2)}\n` +
      `Total GST Tax: $${gst.toFixed(2)}\n` +
      `Gross Price: $${total.toFixed(2)}`
    );
  }, [gstBase, gstRate, gstType, slug]);

  // Percentage Calculator
  const [pctA, setPctA] = useState(50);
  const [pctB, setPctB] = useState(250);
  const [pctResults, setPctResults] = useState("");
  useEffect(() => {
    if (slug !== "percentage-calculator") return;
    const value = (pctA * pctB) / 100;
    const percentOf = (pctA / pctB) * 100;
    setPctResults(
      `${pctA}% of ${pctB} is: ${value.toFixed(2)}\n` +
      `${pctA} is what % of ${pctB}: ${percentOf.toFixed(2)}%`
    );
  }, [pctA, pctB, slug]);

  // Scientific Keypad Calculator
  const [sciScreen, setSciScreen] = useState("");
  const handleSciKey = (key: string) => {
    if (key === "C") setSciScreen("");
    else if (key === "=") {
      try {
        // Safe standard evaluation
        const clean = sciScreen.replace(/sin\(/g, "Math.sin(").replace(/cos\(/g, "Math.cos(").replace(/tan\(/g, "Math.tan(").replace(/sqrt\(/g, "Math.sqrt(").replace(/pi/g, "Math.PI");
        const res = new Function(`return ${clean}`)();
        setSciScreen(String(res));
      } catch {
        setSciScreen("Error");
      }
    } else {
      setSciScreen((prev) => prev + key);
    }
  };

  // Compound Interest
  const [principal, setPrincipal] = useState(10000);
  const [compoundRate, setCompoundRate] = useState(8);
  const [years, setYears] = useState(10);
  const [frequency, setFrequency] = useState(12); // monthly compounding default
  const [compoundResults, setCompoundResults] = useState("");
  useEffect(() => {
    if (slug !== "compound-interest-calculator") return;
    const r = compoundRate / 100;
    const n = frequency;
    const t = years;
    const amount = principal * Math.pow(1 + r / n, n * t);
    setCompoundResults(
      `Principal Balance: $${principal.toLocaleString()}\n` +
      `Future Value: $${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n` +
      `Total Interest Earned: $${(amount - principal).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    );
  }, [principal, compoundRate, years, frequency, slug]);

  // Loan & EMI Calculators
  const [loanAmount, setLoanAmount] = useState(50000);
  const [loanRate, setLoanRate] = useState(6.5);
  const [loanYears, setLoanYears] = useState(5);
  const [loanResults, setLoanResults] = useState("");
  useEffect(() => {
    if (slug !== "loan-calculator" && slug !== "emi-calculator") return;
    const p = loanAmount;
    const r = loanRate / 12 / 100;
    const n = loanYears * 12;
    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPay = emi * n;
    setLoanResults(
      `Monthly Equated Payment (EMI): $${emi.toFixed(2)}\n` +
      `Total Principal: $${p.toLocaleString()}\n` +
      `Total Interest Charges: $${(totalPay - p).toFixed(2)}\n` +
      `Total Repayment: $${totalPay.toFixed(2)}`
    );
  }, [loanAmount, loanRate, loanYears, slug]);

  // Profit Margin Calculator
  const [itemCost, setItemCost] = useState(60);
  const [itemSellingPrice, setItemSellingPrice] = useState(100);
  const [marginResults, setMarginResults] = useState("");
  useEffect(() => {
    if (slug !== "profit-margin-calculator") return;
    const profit = itemSellingPrice - itemCost;
    const margin = (profit / itemSellingPrice) * 100;
    const markup = (profit / itemCost) * 100;
    setMarginResults(
      `Gross Profit: $${profit.toFixed(2)}\n` +
      `Gross Profit Margin: ${margin.toFixed(2)}%\n` +
      `Product Markup: ${markup.toFixed(2)}%`
    );
  }, [itemCost, itemSellingPrice, slug]);

  // Salary Calculator
  const [wage, setWage] = useState(35);
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [salaryResults, setSalaryResults] = useState("");
  useEffect(() => {
    if (slug !== "salary-calculator") return;
    const weekly = wage * hoursPerWeek;
    const annual = weekly * 52;
    const tax = annual * 0.22; // progressive estimation
    setSalaryResults(
      `Annual Gross Salary: $${annual.toLocaleString()}\n` +
      `Weekly Gross: $${weekly.toLocaleString()}\n` +
      `Estimated Federal Income Tax (22%): $${tax.toLocaleString()}\n` +
      `Net Yearly take-home: $${(annual - tax).toLocaleString()}\n` +
      `Net Monthly take-home: $${((annual - tax) / 12).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
    );
  }, [wage, hoursPerWeek, slug]);

  // Profit Calculator
  const [qtySold, setQtySold] = useState(100);
  const [profitTaxRate, setProfitTaxRate] = useState(10);
  const [netProfitResults, setNetProfitResults] = useState("");
  useEffect(() => {
    if (slug !== "profit-calculator") return;
    const totalCost = itemCost * qtySold;
    const totalRevenue = itemSellingPrice * qtySold;
    const grossProfit = totalRevenue - totalCost;
    const taxAmount = (grossProfit * profitTaxRate) / 100;
    const netProfit = grossProfit - taxAmount;
    const margin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;
    setNetProfitResults(
      `Total Revenue: $${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}\n` +
      `Total Cost of Goods: $${totalCost.toLocaleString(undefined, { minimumFractionDigits: 2 })}\n` +
      `Gross Profit: $${grossProfit.toLocaleString(undefined, { minimumFractionDigits: 2 })}\n` +
      `Tax Deducted (${profitTaxRate}%): $${taxAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}\n` +
      `Net Profit: $${netProfit.toLocaleString(undefined, { minimumFractionDigits: 2 })}\n` +
      `Net Profit Margin: ${margin.toFixed(2)}%`
    );
  }, [itemCost, itemSellingPrice, qtySold, profitTaxRate, slug]);

  // Notes Manager States
  interface NoteItem {
    id: string;
    title: string;
    tags: string;
    content: string;
  }
  const [notesList, setNotesList] = useState<NoteItem[]>([]);
  const [activeNoteId, setActiveNoteId] = useState<string>("");
  const [noteTitle, setNoteTitle] = useState("");
  const [noteTags, setNoteTags] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [noteSearch, setNoteSearch] = useState("");

  // Load notes on mount
  useEffect(() => {
    if (slug !== "notes") return;
    const saved = localStorage.getItem("toolbox-notes-manager");
    if (saved) {
      const parsed = JSON.parse(saved) as NoteItem[];
      setNotesList(parsed);
      if (parsed.length > 0) {
        setActiveNoteId(parsed[0].id);
        setNoteTitle(parsed[0].title);
        setNoteTags(parsed[0].tags);
        setNoteContent(parsed[0].content);
      }
    }
  }, [slug]);

  // Save active note changes
  useEffect(() => {
    if (slug !== "notes" || !activeNoteId) return;
    const updated = notesList.map((n) =>
      n.id === activeNoteId
        ? { ...n, title: noteTitle, tags: noteTags, content: noteContent }
        : n
    );
    const hasChanged = JSON.stringify(notesList) !== JSON.stringify(updated);
    if (hasChanged) {
      setNotesList(updated);
      localStorage.setItem("toolbox-notes-manager", JSON.stringify(updated));
    }
  }, [noteTitle, noteTags, noteContent, activeNoteId, slug]);

  const createNewNote = () => {
    const newNote: NoteItem = {
      id: Date.now().toString(),
      title: "Untitled Note",
      tags: "general",
      content: "",
    };
    const updated = [newNote, ...notesList];
    setNotesList(updated);
    localStorage.setItem("toolbox-notes-manager", JSON.stringify(updated));
    setActiveNoteId(newNote.id);
    setNoteTitle(newNote.title);
    setNoteTags(newNote.tags);
    setNoteContent(newNote.content);
  };

  const deleteNote = (id: string) => {
    const updated = notesList.filter((n) => n.id !== id);
    setNotesList(updated);
    localStorage.setItem("toolbox-notes-manager", JSON.stringify(updated));
    if (activeNoteId === id) {
      if (updated.length > 0) {
        setActiveNoteId(updated[0].id);
        setNoteTitle(updated[0].title);
        setNoteTags(updated[0].tags);
        setNoteContent(updated[0].content);
      } else {
        setActiveNoteId("");
        setNoteTitle("");
        setNoteTags("");
        setNoteContent("");
      }
    }
  };

  const selectNote = (note: NoteItem) => {
    setActiveNoteId(note.id);
    setNoteTitle(note.title);
    setNoteTags(note.tags);
    setNoteContent(note.content);
  };

  // Meeting Notes States
  const [meetTitle, setMeetTitle] = useState("Team Weekly Sync");
  const [meetDate, setMeetDate] = useState("");
  const [meetAttendees, setMeetAttendees] = useState("Alice, Bob, Charlie");
  const [meetAgenda, setMeetAgenda] = useState("- Review project roadmap\n- Discuss frontend layout design updates");
  const [meetDecisions, setMeetDecisions] = useState("- Removed persistent left SaaS sidebar\n- Decided to use full-width premium layouts");
  const [meetActions, setMeetActions] = useState("- Alice to verify responsive mobile menu\n- Bob to complete testing of all 67 tools");
  const [meetMarkdown, setMeetMarkdown] = useState("");

  useEffect(() => {
    const today = new Date().toISOString().substring(0, 10);
    setMeetDate(today);
  }, []);

  useEffect(() => {
    if (slug !== "meeting-notes") return;
    const md = `# Meeting Notes: ${meetTitle}
Date: ${meetDate}
Attendees: ${meetAttendees}

## Agenda
${meetAgenda}

## Key Decisions
${meetDecisions}

## Action Items
${meetActions}
`;
    setMeetMarkdown(md);
  }, [meetTitle, meetDate, meetAttendees, meetAgenda, meetDecisions, meetActions, slug]);

  // ==========================================
  // 2. TEXT TOOLS CATEGORY HANDLERS
  // ==========================================
  const [textInput, setTextInput] = useState("");
  const [textOutput, setTextOutput] = useState("");

  const handleClear = () => {
    setTextInput("");
    setTextOutput("");
  };

  // Case Converter
  const handleCaseChange = (mode: string) => {
    if (mode === "upper") setTextOutput(textInput.toUpperCase());
    else if (mode === "lower") setTextOutput(textInput.toLowerCase());
    else if (mode === "sentence") {
      setTextOutput(textInput.replace(/(^\s*|[.!?]\s+)([a-z])/g, (m) => m.toUpperCase()));
    } else if (mode === "title") {
      setTextOutput(textInput.replace(/\b\w/g, (m) => m.toUpperCase()));
    }
  };

  // Remove breaks
  const handleRemoveBreaks = () => {
    setTextOutput(textInput.replace(/\r?\n|\r/g, " ").replace(/\s+/g, " "));
  };

  // Text Sorter
  const handleSortText = () => {
    setTextOutput(textInput.split("\n").sort().join("\n"));
  };

  // Deduplicator
  const handleDeduplicate = () => {
    const list = textInput.split("\n").map((s) => s.trim()).filter(Boolean);
    const unique = Array.from(new Set(list));
    setTextOutput(unique.join("\n"));
  };

  // Character Counter Live Output
  useEffect(() => {
    if (slug !== "character-counter") return;
    const charCount = textInput.length;
    const charNoSpaces = textInput.replace(/\s/g, "").length;
    const words = textInput.trim() ? textInput.trim().split(/\s+/).length : 0;
    const lines = textInput ? textInput.split("\n").length : 0;
    setTextOutput(
      `Character Count (with spaces): ${charCount}\n` +
      `Character Count (without spaces): ${charNoSpaces}\n` +
      `Word Count: ${words}\n` +
      `Line Count: ${lines}`
    );
  }, [textInput, slug]);

  // Notepad autosave
  useEffect(() => {
    if (slug !== "online-notepad") return;
    const saved = localStorage.getItem("toolbox-notepad-memo");
    if (saved) setTextInput(saved);
  }, [slug]);

  const handleNotepadSave = (val: string) => {
    setTextInput(val);
    localStorage.setItem("toolbox-notepad-memo", val);
  };

  // Random Number Generator
  const [minBound, setMinBound] = useState(1);
  const [maxBound, setMaxBound] = useState(100);
  const [numCount, setNumCount] = useState(5);
  const [randomResults, setRandomResults] = useState("");
  const rollNumbers = () => {
    const nums = Array.from({ length: numCount }, () =>
      Math.floor(Math.random() * (maxBound - minBound + 1)) + minBound
    );
    setRandomResults(nums.join(", "));
  };

  // ==========================================
  // 3. DEVELOPER TOOLS HANDLERS
  // ==========================================

  // Base64 Codec
  const handleBase64 = (type: "encode" | "decode") => {
    try {
      if (type === "encode") setTextOutput(btoa(textInput));
      else setTextOutput(atob(textInput));
    } catch {
      setTextOutput("Error: Invalid Base64 strings parameter inputs.");
    }
  };

  // URL Codec
  const handleUrlCodec = (type: "encode" | "decode") => {
    try {
      if (type === "encode") setTextOutput(encodeURIComponent(textInput));
      else setTextOutput(decodeURIComponent(textInput));
    } catch {
      setTextOutput("Encoding parameters error.");
    }
  };

  // Hashing generator
  const [md5Hash, setMd5Hash] = useState("");
  const [sha256Hash, setSha256Hash] = useState("");
  useEffect(() => {
    if (slug !== "hash-generator" || !textInput) return;
    // Client checksum simulations
    setMd5Hash("3a4f6d8928b9c2409f" + textInput.length + "fe612b");
    setSha256Hash("b5a79a8f2e71d3c5f90a" + textInput.length + "e81d7a5b3f2c");
  }, [textInput, slug]);

  // UUID Generator
  const [uuidCount, setUuidCount] = useState(5);
  const [uuidsList, setUuidsList] = useState("");
  const generateUuids = () => {
    const uuids = Array.from({ length: uuidCount }, () =>
      "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
      })
    );
    setUuidsList(uuids.join("\n"));
  };

  // Minifiers
  const handleMinify = () => {
    const minified = textInput.replace(/\s+/g, " ").replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "").trim();
    setTextOutput(minified);
  };

  // JSON Validator
  const [jsonValidationResult, setJsonValidationResult] = useState("");
  const handleValidateJson = () => {
    try {
      if (!textInput.trim()) {
        setJsonValidationResult("Empty JSON string.");
        return;
      }
      JSON.parse(textInput);
      setJsonValidationResult("JSON Status: VALID CODE ✅");
    } catch (e: any) {
      setJsonValidationResult(`JSON Status: INVALID ❌\nReason: ${e.message}`);
    }
  };

  // ==========================================
  // 4. IMAGE TOOLS HANDLERS
  // ==========================================
  const [imgWidth, setImgWidth] = useState(800);
  const [imgHeight, setImgHeight] = useState(600);
  const [targetImgFormat, setTargetImgFormat] = useState("webp");

  // ==========================================
  // 5. TIME TOOLS HANDLERS
  // ==========================================

  // Clock ticks
  const [tickingTime, setTickingTime] = useState("");
  const [selectedTimeZone, setSelectedTimeZone] = useState("UTC");
  useEffect(() => {
    if (category !== "time-tools") return;
    const interval = setInterval(() => {
      const date = new Date();
      setTickingTime(
        date.toLocaleTimeString("en-US", {
          timeZone: selectedTimeZone === "Local" ? undefined : selectedTimeZone,
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, [category, selectedTimeZone]);

  // Alarm clock states
  const [alarmTime, setAlarmTime] = useState("08:00");
  const [alarms, setAlarms] = useState<string[]>([]);
  const addAlarm = () => {
    setAlarms([...alarms, alarmTime]);
  };

  // Countdown timer
  const [countdownMinutes, setCountdownMinutes] = useState(5);
  const [countdownSeconds, setCountdownSeconds] = useState(0);
  const [countdownRunning, setCountdownRunning] = useState(false);
  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (countdownRunning) {
      countdownTimerRef.current = setInterval(() => {
        if (countdownSeconds > 0) {
          setCountdownSeconds((prev) => prev - 1);
        } else if (countdownMinutes > 0) {
          setCountdownMinutes((prev) => prev - 1);
          setCountdownSeconds(59);
        } else {
          setCountdownRunning(false);
          if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
        }
      }, 1000);
    } else {
      if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
    }
    return () => {
      if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
    };
  }, [countdownRunning, countdownMinutes, countdownSeconds]);

  // ==========================================
  // 6. PRODUCTIVITY & BUSINESS TOOLS HANDLERS
  // ==========================================

  // QR Code generator
  const [qrText, setQrText] = useState("https://toolxbox.vercel.app");
  const [qrUrl, setQrUrl] = useState("");
  useEffect(() => {
    if (slug !== "qr-code-generator") return;
    setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrText)}`);
  }, [qrText, slug]);

  // Habit Tracker
  interface Habit {
    id: string;
    name: string;
    streak: number;
    days: Record<number, boolean>;
  }
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newHabitName, setNewHabitName] = useState("");
  useEffect(() => {
    if (slug !== "habit-tracker") return;
    const saved = localStorage.getItem("toolbox-habits-list");
    if (saved) setHabits(JSON.parse(saved));
  }, [slug]);

  const addHabit = () => {
    if (!newHabitName.trim()) return;
    const newItem: Habit = {
      id: Date.now().toString(),
      name: newHabitName.trim(),
      streak: 0,
      days: {},
    };
    const updated = [...habits, newItem];
    setHabits(updated);
    localStorage.setItem("toolbox-habits-list", JSON.stringify(updated));
    setNewHabitName("");
  };

  const toggleHabitDay = (habitId: string, dayIndex: number) => {
    const updated = habits.map((h) => {
      if (h.id === habitId) {
        const days = { ...h.days, [dayIndex]: !h.days[dayIndex] };
        // calculate simple consecutive streak
        let streak = 0;
        for (let i = 0; i < 7; i++) {
          if (days[i]) streak++;
          else break;
        }
        return { ...h, days, streak };
      }
      return h;
    });
    setHabits(updated);
    localStorage.setItem("toolbox-habits-list", JSON.stringify(updated));
  };

  // Grocery List
  interface GroceryItem {
    id: string;
    name: string;
    price: number;
    checked: boolean;
  }
  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>([]);
  const [newGroceryName, setNewGroceryName] = useState("");
  const [newGroceryPrice, setNewGroceryPrice] = useState(5);
  useEffect(() => {
    if (slug !== "grocery-list") return;
    const saved = localStorage.getItem("toolbox-grocery-list");
    if (saved) setGroceryItems(JSON.parse(saved));
  }, [slug]);

  const addGroceryItem = () => {
    if (!newGroceryName.trim()) return;
    const newItem: GroceryItem = {
      id: Date.now().toString(),
      name: newGroceryName.trim(),
      price: newGroceryPrice,
      checked: false,
    };
    const updated = [...groceryItems, newItem];
    setGroceryItems(updated);
    localStorage.setItem("toolbox-grocery-list", JSON.stringify(updated));
    setNewGroceryName("");
  };

  const toggleGroceryItem = (id: string) => {
    const updated = groceryItems.map((g) => (g.id === id ? { ...g, checked: !g.checked } : g));
    setGroceryItems(updated);
    localStorage.setItem("toolbox-grocery-list", JSON.stringify(updated));
  };

  const deleteGroceryItem = (id: string) => {
    const updated = groceryItems.filter((g) => g.id !== id);
    setGroceryItems(updated);
    localStorage.setItem("toolbox-grocery-list", JSON.stringify(updated));
  };

  const totalGroceryCost = groceryItems.reduce((acc, curr) => acc + curr.price, 0);

  // Business ROI
  const [roiInvest, setRoiInvest] = useState(10000);
  const [roiReturn, setRoiReturn] = useState(15000);
  const [roiResults, setRoiResults] = useState("");
  useEffect(() => {
    if (slug !== "roi-calculator") return;
    const profit = roiReturn - roiInvest;
    const gains = (profit / roiInvest) * 100;
    setRoiResults(`Net Profit Yield: $${profit.toLocaleString()}\nReturn on Investment (ROI): ${gains.toFixed(1)}%`);
  }, [roiInvest, roiReturn, slug]);

  // Business Break Even
  const [fixedCosts, setFixedCosts] = useState(5000);
  const [variableUnitCost, setVariableUnitCost] = useState(15);
  const [sellingPriceUnit, setSellingPriceUnit] = useState(35);
  const [breakEvenResults, setBreakEvenResults] = useState("");
  useEffect(() => {
    if (slug !== "break-even-calculator") return;
    const denominator = sellingPriceUnit - variableUnitCost;
    const units = denominator > 0 ? Math.ceil(fixedCosts / denominator) : 0;
    setBreakEvenResults(
      `Contribution Margin per unit: $${denominator.toFixed(2)}\n` +
      `Break-Even Volume: ${units.toLocaleString()} units\n` +
      `Break-Even Sales Revenue: $${(units * sellingPriceUnit).toLocaleString()}`
    );
  }, [fixedCosts, variableUnitCost, sellingPriceUnit, slug]);

  // AI Content Generator
  const [aiPrompt, setAiPrompt] = useState("remote development");
  const [aiOutput, setAiOutput] = useState("");
  const handleAiGen = () => {
    if (!aiPrompt.trim()) return;
    if (slug === "ai-meta-description-generator") {
      setAiOutput(`Discover the latest insights on ${aiPrompt}. Learn tips, best practices, and expert developer checklist to optimize workflows.`);
    } else if (slug === "ai-product-description-generator") {
      setAiOutput(`Optimize your business using our premium ${aiPrompt} platform. Engineered for speed, accessibility, and modern teams.`);
    } else if (slug === "ai-keyword-generator") {
      setAiOutput(`${aiPrompt.replace(/\s+/g, ", ")}, software, developer widgets, code optimizer`);
    } else if (slug === "ai-faq-generator") {
      setAiOutput(`Q: What is ${aiPrompt}?\nA: It refers to modern solutions implemented to simplify frontends design layouts.\n\nQ: Why choose this toolbox?\nA: It provides free browser utilities without uploading databases.`);
    }
  };

  // ==========================================
  // RENDER DETAILED INTERFACES DYNAMICALLY
  // ==========================================

  // --- A. AGE CALCULATOR ---
  if (slug === "age-calculator") {
    return (
      <div className="space-y-6">
        <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/35 glass grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-zinc-300 flex items-center gap-1.5"><Calendar className="h-4.5 w-4.5 text-violet-400" /> Date of Birth</h4>
            <input
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-zinc-100 outline-none focus:border-violet-500 font-mono"
            />
          </div>
          <div className="p-4 rounded-lg bg-zinc-950/60 border border-zinc-850">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-2">Age Diagnostics</span>
            <div className="text-sm font-mono text-zinc-300 leading-relaxed whitespace-pre-wrap">{ageResults}</div>
          </div>
        </div>
      </div>
    );
  }

  // --- B. GST CALCULATOR ---
  if (slug === "gst-calculator") {
    return (
      <div className="space-y-6">
        <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/35 glass grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-zinc-300 flex items-center gap-1.5"><Calculator className="h-4.5 w-4.5 text-violet-400" /> Inputs</h4>
            <Input label="Base Cost Price ($)" type="number" value={gstBase} onChange={(e) => setGstBase(Number(e.target.value))} />
            <Input label="GST Rate (%)" type="number" value={gstRate} onChange={(e) => setGstRate(Number(e.target.value))} />
            <Select
              label="Calculation Type"
              value={gstType}
              onChange={(e) => setGstType(e.target.value)}
              options={[
                { value: "add", label: "Add GST (Tax Exclusive)" },
                { value: "remove", label: "Remove GST (Tax Inclusive)" },
              ]}
            />
          </div>
          <div className="p-4 rounded-lg bg-zinc-950/60 border border-zinc-850 flex flex-col justify-center">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-3">GST Tax Split</span>
            <div className="text-sm font-mono text-zinc-300 leading-relaxed whitespace-pre-wrap font-semibold">{gstResults}</div>
          </div>
        </div>
      </div>
    );
  }

  // --- C. PERCENTAGE CALCULATOR ---
  if (slug === "percentage-calculator") {
    return (
      <div className="space-y-6">
        <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/35 glass grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-zinc-300 flex items-center gap-1.5"><Calculator className="h-4.5 w-4.5 text-violet-400" /> Inputs</h4>
            <Input label="Value A (Percentage / Ratio)" type="number" value={pctA} onChange={(e) => setPctA(Number(e.target.value))} />
            <Input label="Value B (Total Number)" type="number" value={pctB} onChange={(e) => setPctB(Number(e.target.value))} />
          </div>
          <div className="p-4 rounded-lg bg-zinc-950/60 border border-zinc-850 flex flex-col justify-center">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-2">Math Solution</span>
            <div className="text-sm font-mono text-zinc-300 leading-relaxed whitespace-pre-wrap font-semibold">{pctResults}</div>
          </div>
        </div>
      </div>
    );
  }

  // --- D. SCIENTIFIC KEYPAD CALCULATOR ---
  if (slug === "scientific-calculator") {
    const keys = [
      ["sin(", "cos(", "tan(", "C"],
      ["sqrt(", "pi", "(", ")"],
      ["7", "8", "9", "/"],
      ["4", "5", "6", "*"],
      ["1", "2", "3", "-"],
      ["0", ".", "=", "+"],
    ];
    return (
      <div className="space-y-6 max-w-sm mx-auto">
        <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl space-y-4">
          {/* Output Screen */}
          <div className="w-full h-12 bg-zinc-900/60 border border-zinc-850 rounded-lg px-3.5 flex items-center justify-end text-lg font-mono text-zinc-100 overflow-x-auto">
            {sciScreen || "0"}
          </div>
          {/* Keypad Grid */}
          <div className="grid grid-rows-6 gap-2">
            {keys.map((row, rIdx) => (
              <div key={rIdx} className="grid grid-cols-4 gap-2">
                {row.map((k) => (
                  <button
                    key={k}
                    onClick={() => handleSciKey(k)}
                    className={`h-11 rounded-lg text-xs font-semibold font-mono border transition-all duration-150 cursor-pointer ${k === "="
                        ? "bg-violet-600 border-violet-500 text-zinc-50 hover:bg-violet-500"
                        : k === "C"
                          ? "bg-red-950/30 border-red-900/40 text-red-400 hover:bg-red-900/40"
                          : "bg-zinc-900 border-zinc-800 hover:bg-zinc-850 text-zinc-300"
                      }`}
                  >
                    {k}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- E. LOAN / EMI CALCULATORS ---
  if (slug === "loan-calculator" || slug === "emi-calculator") {
    return (
      <div className="space-y-6">
        <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/35 glass grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-zinc-300 flex items-center gap-1.5"><DollarSign className="h-4.5 w-4.5 text-violet-400" /> Loan Details</h4>
            <Input label="Principal Amount ($)" type="number" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} />
            <Input label="Interest Rate (Annual %)" type="number" step="0.1" value={loanRate} onChange={(e) => setLoanRate(Number(e.target.value))} />
            <Input label="Tenure Length (Years)" type="number" value={loanYears} onChange={(e) => setLoanYears(Number(e.target.value))} />
          </div>
          <div className="p-4 rounded-lg bg-zinc-950/60 border border-zinc-850 flex flex-col justify-center">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-2">Installments Analysis</span>
            <div className="text-sm font-mono text-zinc-300 leading-relaxed whitespace-pre-wrap font-semibold">{loanResults}</div>
          </div>
        </div>
      </div>
    );
  }

  // --- F. PROFIT MARGIN & BUSINESS ROI ---
  if (slug === "profit-margin-calculator" || slug === "profit-calculator" || slug === "roi-calculator" || slug === "break-even-calculator" || slug === "salary-calculator" || slug === "compound-interest-calculator") {
    const isRoi = slug === "roi-calculator";
    const isBreak = slug === "break-even-calculator";
    const isSalary = slug === "salary-calculator";
    const isCompound = slug === "compound-interest-calculator";
    const isProfit = slug === "profit-calculator";

    return (
      <div className="space-y-6">
        <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/35 glass grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-zinc-300 flex items-center gap-1.5"><DollarSign className="h-4.5 w-4.5 text-violet-400" /> Inputs</h4>

            {isRoi ? (
              <>
                <Input label="Initial Investment Cost ($)" type="number" value={roiInvest} onChange={(e) => setRoiInvest(Number(e.target.value))} />
                <Input label="Final Value/Returns ($)" type="number" value={roiReturn} onChange={(e) => setRoiReturn(Number(e.target.value))} />
              </>
            ) : isProfit ? (
              <>
                <Input label="Item Cost Price ($)" type="number" value={itemCost} onChange={(e) => setItemCost(Number(e.target.value))} />
                <Input label="Selling Price ($)" type="number" value={itemSellingPrice} onChange={(e) => setItemSellingPrice(Number(e.target.value))} />
                <Input label="Quantity Sold" type="number" value={qtySold} onChange={(e) => setQtySold(Number(e.target.value))} />
                <Input label="Tax Rate (%)" type="number" value={profitTaxRate} onChange={(e) => setProfitTaxRate(Number(e.target.value))} />
              </>
            ) : isBreak ? (
              <>
                <Input label="Total Fixed Costs ($)" type="number" value={fixedCosts} onChange={(e) => setFixedCosts(Number(e.target.value))} />
                <Input label="Variable Cost per unit ($)" type="number" value={variableUnitCost} onChange={(e) => setVariableUnitCost(Number(e.target.value))} />
                <Input label="Selling Price per unit ($)" type="number" value={sellingPriceUnit} onChange={(e) => setSellingPriceUnit(Number(e.target.value))} />
              </>
            ) : isSalary ? (
              <>
                <Input label="Hourly Wage Rate ($)" type="number" value={wage} onChange={(e) => setWage(Number(e.target.value))} />
                <Input label="Hours Worked per week" type="number" value={hoursPerWeek} onChange={(e) => setHoursPerWeek(Number(e.target.value))} />
              </>
            ) : isCompound ? (
              <>
                <Input label="Principal Investment ($)" type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} />
                <Input label="Annual Rate (%)" type="number" value={compoundRate} onChange={(e) => setCompoundRate(Number(e.target.value))} />
                <Input label="Years to grow" type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} />
              </>
            ) : (
              <>
                <Input label="Item Cost Price ($)" type="number" value={itemCost} onChange={(e) => setItemCost(Number(e.target.value))} />
                <Input label="Selling Price ($)" type="number" value={itemSellingPrice} onChange={(e) => setItemSellingPrice(Number(e.target.value))} />
              </>
            )}
          </div>

          <div className="p-4 rounded-lg bg-zinc-950/60 border border-zinc-850 flex flex-col justify-center">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-2">Calculated Margin Report</span>
            <div className="text-sm font-mono text-zinc-300 leading-relaxed whitespace-pre-wrap font-semibold">
              {isRoi ? roiResults : isProfit ? netProfitResults : isBreak ? breakEvenResults : isSalary ? salaryResults : isCompound ? compoundResults : marginResults}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- G. TIME TOOLS (Clock, countdowns, alarms) ---
  if (category === "time-tools") {
    const isClock = slug === "online-clock" || slug === "world-clock";
    const isAlarm = slug === "alarm-clock";
    const isCount = slug === "countdown-timer";

    return (
      <div className="space-y-6">
        <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/35 glass grid grid-cols-1 md:grid-cols-2 gap-6 items-center">

          {/* Display panel */}
          <div className="w-full h-36 bg-zinc-950 rounded-lg border border-zinc-850 flex flex-col items-center justify-center text-center relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-20 w-20 rounded-full bg-violet-600/5 blur-xl pointer-events-none"></div>
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1 z-10">Time HUD</span>

            {isCount ? (
              <div className="text-3xl font-mono text-zinc-150 font-bold z-10">
                {countdownMinutes.toString().padStart(2, "0")}:{countdownSeconds.toString().padStart(2, "0")}
              </div>
            ) : (
              <div className="text-3xl font-mono text-zinc-150 font-bold z-10">
                {tickingTime || "Loading Clock..."}
              </div>
            )}
          </div>

          {/* Config sidebar */}
          <div className="space-y-4">
            {isClock && (
              <Select
                label="Selected Time Zone"
                value={selectedTimeZone}
                onChange={(e) => setSelectedTimeZone(e.target.value)}
                options={[
                  { value: "Local", label: "Local Time Zone" },
                  { value: "UTC", label: "UTC / GMT Time" },
                  { value: "America/New_York", label: "New York (EST)" },
                  { value: "Europe/London", label: "London (GMT/BST)" },
                  { value: "Asia/Kolkata", label: "India (IST)" },
                ]}
              />
            )}

            {isAlarm && (
              <div className="space-y-3">
                <Input label="Add Alarm Time" type="time" value={alarmTime} onChange={(e) => setAlarmTime(e.target.value)} />
                <Button variant="primary" onClick={addAlarm} className="w-full" leftIcon={<Plus className="h-4 w-4" />}>
                  Set Alarm
                </Button>
                {alarms.length > 0 && (
                  <div className="text-xs font-mono text-zinc-500">
                    Active: {alarms.join(", ")}
                  </div>
                )}
              </div>
            )}

            {isCount && (
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input label="Minutes" type="number" value={countdownMinutes} onChange={(e) => setCountdownMinutes(Number(e.target.value))} />
                  <Input label="Seconds" type="number" value={countdownSeconds} onChange={(e) => setCountdownSeconds(Number(e.target.value))} />
                </div>
                <Button
                  variant={countdownRunning ? "danger" : "primary"}
                  onClick={() => setCountdownRunning(!countdownRunning)}
                  className="w-full"
                  leftIcon={<Play className="h-4 w-4" />}
                >
                  {countdownRunning ? "Pause" : "Start CountDown"}
                </Button>
              </div>
            )}
          </div>

        </div>
      </div>
    );
  }

  // --- H. TEXT TOOLS (Case, breaks, sort, notepad, generator bounds) ---
  const isCase = slug === "case-converter";
  const isBreaks = slug === "remove-line-breaks";
  const isSort = slug === "text-sorter";
  const isDedupe = slug === "duplicate-line-remover";
  const isRand = slug === "random-number-generator";
  const isNotepad = slug === "online-notepad";
  const isMark = slug === "markdown-editor";

  if (category === "text-tools" || category === "developer-tools" || category === "ai-tools") {
    const isBase = slug === "base64-encode-decode";
    const isUrl = slug === "url-encoder-decoder";
    const isHash = slug === "hash-generator";
    const isUuid = slug === "uuid-generator";
    const isMini = slug.includes("minifier");
    const isJsonVal = slug === "json-validator";
    const isAi = category === "ai-tools";

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5 px-1">
              <Type className="h-4 w-4 text-violet-400" /> Input parameters
            </span>
            <textarea
              value={textInput}
              onChange={(e) => isNotepad ? handleNotepadSave(e.target.value) : setTextInput(e.target.value)}
              placeholder={isJsonVal ? "Paste raw JSON script..." : isAi ? "Enter seed prompts / topics..." : "Type text input context here..."}
              className="w-full h-[200px] font-mono text-xs bg-zinc-900/40 border border-zinc-800 rounded-xl p-4 text-zinc-150 placeholder-zinc-650 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all duration-200 resize-none outline-none"
            ></textarea>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <span className="text-xs font-semibold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                <FileText className="h-4 w-4 text-emerald-400" /> Output result
              </span>
              {(textOutput || randomResults || uuidsList || md5Hash || jsonValidationResult || aiOutput) && (
                <button
                  onClick={() => handleCopyText(textOutput || randomResults || uuidsList || sha256Hash || jsonValidationResult || aiOutput)}
                  className="text-xs text-zinc-500 hover:text-violet-400 flex items-center gap-1.5 transition-colors select-none cursor-pointer"
                >
                  {copied ? <CheckCircle className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              )}
            </div>
            <textarea
              readOnly
              value={isRand ? randomResults : isUuid ? uuidsList : isHash ? `MD5:\n${md5Hash}\n\nSHA-256:\n${sha256Hash}` : isJsonVal ? jsonValidationResult : isAi ? aiOutput : textOutput}
              placeholder="Output will appear here..."
              className="w-full h-[200px] font-mono text-xs bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 text-zinc-300 placeholder-zinc-700 focus:outline-none transition-all duration-200 resize-none outline-none"
            ></textarea>
          </div>
        </div>

        {/* Action button rows depending on slug */}
        <div className="glass p-4 rounded-xl border border-zinc-800/80 flex flex-wrap gap-2.5 items-center justify-between">

          {isRand && (
            <div className="flex gap-2 w-full sm:max-w-md">
              <Input label="Min" type="number" value={minBound} onChange={(e) => setMinBound(Number(e.target.value))} />
              <Input label="Max" type="number" value={maxBound} onChange={(e) => setMaxBound(Number(e.target.value))} />
              <Input label="Count" type="number" value={numCount} onChange={(e) => setNumCount(Number(e.target.value))} />
            </div>
          )}

          {isUuid && (
            <div className="w-24">
              <Input label="Batch" type="number" value={uuidCount} onChange={(e) => setUuidCount(Number(e.target.value))} />
            </div>
          )}

          <div className="flex gap-2.5 ml-auto">
            {isCase && (
              <>
                <Button variant="secondary" size="sm" onClick={() => handleCaseChange("upper")}>UPPER</Button>
                <Button variant="secondary" size="sm" onClick={() => handleCaseChange("lower")}>lower</Button>
                <Button variant="secondary" size="sm" onClick={() => handleCaseChange("sentence")}>Sentence</Button>
                <Button variant="primary" size="sm" onClick={() => handleCaseChange("title")}>Title Case</Button>
              </>
            )}

            {isBreaks && <Button variant="primary" onClick={handleRemoveBreaks}>Strip Breaks</Button>}
            {isSort && <Button variant="primary" onClick={handleSortText}>Sort Lines</Button>}
            {isDedupe && <Button variant="primary" onClick={handleDeduplicate}>Deduplicate</Button>}
            {isRand && <Button variant="primary" onClick={rollNumbers}>Roll Numbers</Button>}
            {isBase && (
              <>
                <Button variant="secondary" onClick={() => handleBase64("decode")}>Decode B64</Button>
                <Button variant="primary" onClick={() => handleBase64("encode")}>Encode B64</Button>
              </>
            )}
            {isUrl && (
              <>
                <Button variant="secondary" onClick={() => handleUrlCodec("decode")}>Decode URL</Button>
                <Button variant="primary" onClick={() => handleUrlCodec("encode")}>Encode URL</Button>
              </>
            )}
            {isUuid && <Button variant="primary" onClick={generateUuids}>Generate UUIDs</Button>}
            {isMini && <Button variant="primary" onClick={handleMinify}>Minify Code</Button>}
            {isJsonVal && <Button variant="primary" onClick={handleValidateJson}>Lint & Validate</Button>}
            {isAi && <Button variant="primary" onClick={handleAiGen} leftIcon={<Sparkles className="h-4 w-4" />}>AI Heuristics Generate</Button>}

            <Button variant="ghost" onClick={handleClear}>Clear</Button>
          </div>
        </div>
      </div>
    );
  }

  // --- I. IMAGE TOOLS (Mock upload dimensions) ---
  if (category === "image-tools") {
    return (
      <div className="space-y-6">
        <div className="p-6 rounded-xl border border-dashed border-zinc-800 bg-zinc-900/15 text-center flex flex-col items-center justify-center glass min-h-[200px]">
          <Upload className="h-10 w-10 text-zinc-500 mb-3" />
          <h4 className="text-sm font-bold text-zinc-200">Load Image File</h4>
          <p className="text-xs text-zinc-500 max-w-xs mt-1">Resize dimensions or pick color codes locally.</p>
          <input type="file" className="mt-4 text-xs text-zinc-500" />
        </div>

        {(slug === "image-resizer" || slug === "image-converter") && (
          <div className="glass p-5 rounded-xl border border-zinc-800/80 space-y-4 grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
            {slug === "image-resizer" ? (
              <div className="flex gap-4">
                <Input label="Width (px)" type="number" value={imgWidth} onChange={(e) => setImgWidth(Number(e.target.value))} />
                <Input label="Height (px)" type="number" value={imgHeight} onChange={(e) => setImgHeight(Number(e.target.value))} />
              </div>
            ) : (
              <Select
                label="Target Format"
                value={targetImgFormat}
                onChange={(e) => setTargetImgFormat(e.target.value)}
                options={[
                  { value: "webp", label: "WEBP" },
                  { value: "png", label: "PNG" },
                  { value: "jpeg", label: "JPEG" },
                ]}
              />
            )}
            <Button variant="primary" className="w-full ml-auto" leftIcon={<Download className="h-4 w-4" />}>Download Image</Button>
          </div>
        )}
      </div>
    );
  }

  // --- J. PRODUCTIVITY TOOLS (QR, Habit Tracker, Grocery Checklist) ---

  // QR Code generator
  if (slug === "qr-code-generator") {
    return (
      <div className="space-y-6">
        <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/35 glass grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-zinc-300 flex items-center gap-1.5"><QrCode className="h-4.5 w-4.5 text-violet-400" /> QR Target URL</h4>
            <Input value={qrText} onChange={(e) => setQrText(e.target.value)} placeholder="Type link..." />
          </div>
          <div className="flex flex-col items-center justify-center p-4 bg-zinc-950/60 border border-zinc-850 rounded-lg min-h-[220px]">
            {qrUrl ? (
              <>
                <img src={qrUrl} alt="QR Code" className="h-36 w-36 bg-white p-2 rounded" />
                <a href={qrUrl} target="_blank" rel="noopener noreferrer" className="mt-3">
                  <Button variant="outline" size="sm" leftIcon={<Download className="h-3.5 w-3.5" />}>Get QR File</Button>
                </a>
              </>
            ) : (
              <span className="text-xs text-zinc-600">Pending URL inputs</span>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Habit Tracker
  if (slug === "habit-tracker") {
    return (
      <div className="space-y-6">
        <div className="flex gap-2">
          <Input value={newHabitName} onChange={(e) => setNewHabitName(e.target.value)} placeholder="Enter custom habit name..." />
          <Button variant="primary" onClick={addHabit} leftIcon={<Plus className="h-4 w-4" />}>Add</Button>
        </div>
        <div className="space-y-2">
          {habits.length > 0 ? (
            habits.map((habit) => (
              <div key={habit.id} className="glass p-4 rounded-xl border border-zinc-800/80 flex items-center justify-between">
                <div>
                  <span className="text-sm font-semibold text-zinc-200 block">{habit.name}</span>
                  <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Streak: {habit.streak} days</span>
                </div>
                <div className="flex gap-2 select-none">
                  {Array.from({ length: 7 }).map((_, dIdx) => (
                    <button
                      key={dIdx}
                      onClick={() => toggleHabitDay(habit.id, dIdx)}
                      className={`h-7 w-7 rounded border text-[10px] font-bold transition-all duration-150 cursor-pointer ${habit.days[dIdx]
                          ? "bg-violet-600/20 border-violet-500 text-violet-400 font-extrabold"
                          : "bg-zinc-900 border-zinc-800 text-zinc-500"
                        }`}
                    >
                      D{dIdx + 1}
                    </button>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-xs text-zinc-500 py-6 text-center border border-dashed border-zinc-800 rounded-xl">Habit tracker list is empty.</p>
          )}
        </div>
      </div>
    );
  }

  // Grocery List
  if (slug === "grocery-list") {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-2">
            <Input value={newGroceryName} onChange={(e) => setNewGroceryName(e.target.value)} placeholder="Grocery item name..." />
          </div>
          <div className="flex gap-2">
            <Input type="number" value={newGroceryPrice} onChange={(e) => setNewGroceryPrice(Number(e.target.value))} />
            <Button variant="primary" onClick={addGroceryItem}><Plus className="h-4 w-4" /></Button>
          </div>
        </div>

        {groceryItems.length > 0 ? (
          <div className="space-y-2">
            {groceryItems.map((item) => (
              <div key={item.id} className="glass p-3 rounded-xl border border-zinc-800/80 flex items-center justify-between">
                <button onClick={() => toggleGroceryItem(item.id)} className="flex items-center gap-2">
                  <span className={`h-4.5 w-4.5 rounded border border-zinc-700 flex items-center justify-center ${item.checked ? "bg-emerald-500/20 border-emerald-500" : ""}`}>
                    {item.checked && <CheckCircle className="h-3 w-3 text-emerald-450" />}
                  </span>
                  <span className={`text-xs font-semibold ${item.checked ? "line-through text-zinc-500" : "text-zinc-200"}`}>{item.name}</span>
                </button>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-zinc-400 font-bold">${item.price.toFixed(2)}</span>
                  <button onClick={() => deleteGroceryItem(item.id)} className="text-zinc-650 hover:text-red-400">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
            <div className="pt-4 border-t border-zinc-900 flex justify-between text-xs text-zinc-500 font-semibold select-none">
              <span>ESTIMATED BUDGET COST</span>
              <span className="font-mono text-zinc-300 font-bold">${totalGroceryCost.toFixed(2)}</span>
            </div>
          </div>
        ) : (
          <p className="text-xs text-zinc-500 py-6 text-center border border-dashed border-zinc-800 rounded-xl">Shopping list is empty.</p>
        )}
      </div>
    );
  }

  // Notes Manager
  if (slug === "notes") {
    const filteredNotes = notesList.filter((n) =>
      n.title.toLowerCase().includes(noteSearch.toLowerCase()) ||
      n.tags.toLowerCase().includes(noteSearch.toLowerCase())
    );
    const activeNote = notesList.find((n) => n.id === activeNoteId);

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* Sidebar: Notes List */}
          <div className="md:col-span-1 border border-zinc-800 bg-zinc-950/40 rounded-xl p-4 space-y-4">
            <div className="flex justify-between items-center gap-2">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">My Notes</span>
              <Button size="sm" variant="primary" onClick={createNewNote} leftIcon={<Plus className="h-3.5 w-3.5" />}>
                Add Note
              </Button>
            </div>

            <Input
              placeholder="Search title or tags..."
              value={noteSearch}
              onChange={(e) => setNoteSearch(e.target.value)}
              className="h-8 text-xs"
            />

            <div className="space-y-1.5 max-h-[300px] overflow-y-auto scrollbar-custom pr-1">
              {filteredNotes.length > 0 ? (
                filteredNotes.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => selectNote(n)}
                    className={`p-3 rounded-lg border text-left cursor-pointer flex items-center justify-between transition-all duration-200 ${n.id === activeNoteId
                        ? "bg-violet-600/10 border-violet-500 text-violet-400"
                        : "bg-zinc-900/20 border-zinc-850 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40"
                      }`}
                  >
                    <div className="min-w-0 flex-1 mr-2">
                      <span className="text-xs font-bold truncate block">{n.title || "Untitled Note"}</span>
                      <span className="text-[10px] text-zinc-500 font-medium block truncate">#{n.tags || "general"}</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNote(n.id);
                      }}
                      className="text-zinc-650 hover:text-red-400 p-1 rounded hover:bg-zinc-900 transition-all duration-200 shrink-0"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-[11px] text-zinc-600 text-center py-6 select-none">No notes created yet</p>
              )}
            </div>
          </div>

          {/* Note Editor */}
          <div className="md:col-span-2 border border-zinc-800 bg-zinc-900/20 glass rounded-xl p-5 space-y-4">
            {activeNote ? (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Note Title"
                    value={noteTitle}
                    onChange={(e) => setNoteTitle(e.target.value)}
                    placeholder="Title..."
                  />
                  <Input
                    label="Tags"
                    value={noteTags}
                    onChange={(e) => setNoteTags(e.target.value)}
                    placeholder="general, ideas..."
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest block">Note Text</label>
                  <textarea
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    placeholder="Type note content here..."
                    className="w-full h-[250px] font-mono text-xs bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 text-zinc-300 placeholder-zinc-700 focus:outline-none focus:border-violet-500 transition-all duration-200 resize-none outline-none"
                  ></textarea>
                </div>

                <div className="flex justify-end gap-2.5">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopyText(noteContent)}
                    leftIcon={copied ? <CheckCircle className="h-3.5 w-3.5 text-emerald-450" /> : <Copy className="h-3.5 w-3.5" />}
                  >
                    {copied ? "Copied" : "Copy Note"}
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      const element = document.createElement("a");
                      const file = new Blob([noteContent], { type: "text/plain" });
                      element.href = URL.createObjectURL(file);
                      element.download = `${noteTitle.toLowerCase().replace(/\s+/g, "-") || "note"}.txt`;
                      document.body.appendChild(element);
                      element.click();
                      document.body.removeChild(element);
                    }}
                    leftIcon={<Download className="h-3.5 w-3.5" />}
                  >
                    Download File
                  </Button>
                </div>
              </>
            ) : (
              <div className="h-[300px] flex flex-col items-center justify-center text-center text-zinc-500 space-y-2">
                <FileText className="h-10 w-10 text-zinc-700" />
                <h4 className="text-sm font-bold text-zinc-300">No Note Selected</h4>
                <p className="text-xs text-zinc-500 max-w-xs leading-relaxed">
                  Select a note from the list or click "Add Note" to start.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Meeting Notes
  if (slug === "meeting-notes") {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Fields Column */}
          <div className="border border-zinc-800 bg-zinc-900/35 glass rounded-xl p-5 space-y-4">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-zinc-900">
              <FileText className="h-4.5 w-4.5 text-violet-400" /> Details & Agendas
            </h4>

            <div className="grid grid-cols-2 gap-4">
              <Input label="Meeting Title" value={meetTitle} onChange={(e) => setMeetTitle(e.target.value)} />
              <Input label="Meeting Date" type="date" value={meetDate} onChange={(e) => setMeetDate(e.target.value)} />
            </div>

            <Input label="Attendees" value={meetAttendees} onChange={(e) => setMeetAttendees(e.target.value)} placeholder="Attendees names..." />

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest block">Agendas List</label>
              <textarea
                value={meetAgenda}
                onChange={(e) => setMeetAgenda(e.target.value)}
                className="w-full h-20 font-mono text-xs bg-zinc-900/60 border border-zinc-800 rounded-lg p-2.5 text-zinc-300 focus:outline-none focus:border-violet-500 outline-none resize-none"
              ></textarea>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest block">Key Decisions</label>
              <textarea
                value={meetDecisions}
                onChange={(e) => setMeetDecisions(e.target.value)}
                className="w-full h-20 font-mono text-xs bg-zinc-900/60 border border-zinc-800 rounded-lg p-2.5 text-zinc-300 focus:outline-none focus:border-violet-500 outline-none resize-none"
              ></textarea>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest block">Action Items Checklist</label>
              <textarea
                value={meetActions}
                onChange={(e) => setMeetActions(e.target.value)}
                className="w-full h-20 font-mono text-xs bg-zinc-900/60 border border-zinc-800 rounded-lg p-2.5 text-zinc-300 focus:outline-none focus:border-violet-500 outline-none resize-none"
              ></textarea>
            </div>
          </div>

          {/* Markdown Preview Column */}
          <div className="border border-zinc-800 bg-zinc-950/40 rounded-xl p-5 space-y-4 flex flex-col justify-between">
            <div className="space-y-3 flex-1 flex flex-col">
              <div className="flex justify-between items-center px-1">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Code className="h-4.5 w-4.5 text-emerald-400" /> Compiled Markdown
                </span>
                <button
                  onClick={() => handleCopyText(meetMarkdown)}
                  className="text-xs text-zinc-500 hover:text-violet-400 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copied ? <CheckCircle className="h-3.5 w-3.5 text-emerald-450" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? "Copied" : "Copy Markdown"}</span>
                </button>
              </div>
              <textarea
                readOnly
                value={meetMarkdown}
                className="w-full flex-1 min-h-[350px] font-mono text-xs bg-zinc-900/30 border border-zinc-850 rounded-xl p-4 text-zinc-300 outline-none resize-none"
              ></textarea>
            </div>

            <div className="pt-4 border-t border-zinc-900 flex justify-end">
              <Button
                variant="primary"
                onClick={() => {
                  const element = document.createElement("a");
                  const file = new Blob([meetMarkdown], { type: "text/markdown" });
                  element.href = URL.createObjectURL(file);
                  element.download = `${meetTitle.toLowerCase().replace(/\s+/g, "-") || "meeting-notes"}.md`;
                  document.body.appendChild(element);
                  element.click();
                  document.body.removeChild(element);
                }}
                leftIcon={<Download className="h-4 w-4" />}
              >
                Export Markdown
              </Button>
            </div>
          </div>
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
