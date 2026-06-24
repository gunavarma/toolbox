export interface ToolFAQ {
  question: string;
  answer: string;
}

export interface ToolItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  howItWorks: string[];
  benefits: string[];
  useCases: string[];
  faqs: ToolFAQ[];
  componentName: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
}

const rawCategories: CategoryItem[] = [
  {
    id: "screen-tools",
    name: "Screen Tools",
    slug: "screen-tools",
    description: "Monitor tests, color screens, and pixel calibrators.",
    icon: "Tv"
  },
  {
    id: "time-tools",
    name: "Time Tools",
    slug: "time-tools",
    description: "Stopwatches, count-downs, alarms, and clocks.",
    icon: "Clock"
  },
  {
    id: "calculators",
    name: "Calculators",
    slug: "calculators",
    description: "Financial, medical, mathematical, and everyday calculators.",
    icon: "Calculator"
  },
  {
    id: "text-tools",
    name: "Text Tools",
    slug: "text-tools",
    description: "Word counters, text formatting, password makers, and editors.",
    icon: "Type"
  },
  {
    id: "developer-tools",
    name: "Developer Tools",
    slug: "developer-tools",
    description: "JSON checkers, Base64 converter, regex tester, and code minifiers.",
    icon: "Code"
  },
  {
    id: "image-tools",
    name: "Image Tools",
    slug: "image-tools",
    description: "Compress, resize, crop, convert, and inspect images.",
    icon: "Image"
  },
  {
    id: "productivity-tools",
    name: "Productivity Tools",
    slug: "productivity-tools",
    description: "Task lists, habit logs, notebooks, and dynamic QR generators.",
    icon: "CheckSquare"
  },
  {
    id: "ai-tools",
    name: "AI Tools",
    slug: "ai-tools",
    description: "SEO description helpers, keyword tags, blog titles, and outline makers.",
    icon: "Sparkles"
  },
  {
    id: "business-tools",
    name: "Business Tools",
    slug: "business-tools",
    description: "Invoicing, estimates, cost break-even sheets, and ROI templates.",
    icon: "Briefcase"
  }
];

const rawTools: ToolItem[] = [
  // SCREEN TOOLS (10)
  {
    id: "white-screen",
    name: "White Screen",
    slug: "white-screen",
    category: "screen-tools",
    description: "Generate a pure white screen to test monitor brightness, clean dust, or use as light.",
    seoTitle: "White Screen Tool - Test Pixels and Display Brightness",
    seoDescription: "Use our free fullscreen white screen tool to inspect monitor display quality, clean dust, find dead pixels, or use as a reading light.",
    howItWorks: [
      "Click the Go Fullscreen button to hide all browser UI elements.",
      "Inspect the screen for dust, shadows, or screen defects.",
      "Press Escape key to exit fullscreen mode."
    ],
    benefits: [
      "Instant pure white background",
      "Perfect for finding dark dust or backlight bleed",
      "Can be used as a soft light source for video calls"
    ],
    useCases: [
      "Cleaning mobile or laptop screens",
      "Backlighting physical drawings or documents",
      "Screen flashlight on mobile devices"
    ],
    faqs: [
      { question: "What is this white screen tool used for?", answer: "It is commonly used to clean laptop screens, test backlight uniformity, or highlight dust particles on your physical display screen." },
      { question: "How do I exit the white screen mode?", answer: "Simply press the 'Esc' key or click anywhere on the screen if on mobile to hide the fullscreen window overlay." }
    ],
    componentName: "screen/ColorScreen"
  },
  {
    id: "black-screen",
    name: "Black Screen",
    slug: "black-screen",
    category: "screen-tools",
    description: "Generate a pure black screen to inspect backlight bleed, halos, or clean screens.",
    seoTitle: "Black Screen Tool - Backlight Bleed & Dead Pixel Inspector",
    seoDescription: "Open a pure black fullscreen overlay to evaluate your monitor's contrast, find stuck pixels, or clean your screen.",
    howItWorks: ["Toggle fullscreen.", "Look for pixels glowing other colors (stuck pixels).", "Check corner glow for backlight bleeding."],
    benefits: ["Zero light pollution source", "Highlights glowing hot/stuck pixels", "Enables clean, streak-free manual screen wiping"],
    useCases: ["Inspecting dark room monitor bleed", "Secondary monitor distraction black-out", "Sticking/bright pixel checks"],
    faqs: [{ question: "Is my screen off during black screen?", answer: "No, your screen is still powered on, but it is rendering pure black. This allows you to check if the backlight is leaking through." }],
    componentName: "screen/ColorScreen"
  },
  {
    id: "red-screen",
    name: "Red Screen",
    slug: "red-screen",
    category: "screen-tools",
    description: "Pure red display background for sub-pixel pixel testing and cleaning.",
    seoTitle: "Red Screen - Sub-Pixel Display Quality Check",
    seoDescription: "View a pure red fullscreen color block to identify subpixel problems and verify color calibration.",
    howItWorks: ["Launch fullscreen mode.", "Verify color output uniformity.", "Exit with Escape."],
    benefits: ["Isolates red subpixels", "Checks color accuracy", "Sleek fullscreen calibration support"],
    useCases: ["Display calibration testing", "Subpixel fault identification", "Atmospheric ambient lighting"],
    faqs: [{ question: "Why test red subpixels?", answer: "Every LCD pixel consists of red, green, and blue subpixels. Inspecting red helps detect if individual red subpixels are faulty." }],
    componentName: "screen/ColorScreen"
  },
  {
    id: "green-screen",
    name: "Green Screen",
    slug: "green-screen",
    category: "screen-tools",
    description: "Pure green display background for chroma key testing or pixel diagnostics.",
    seoTitle: "Green Screen Tool - Chromakey Color and Subpixel Test",
    seoDescription: "Turn your browser into a pure green display for photography, video chromakey, or display testing.",
    howItWorks: ["Enable green screen.", "Optionally capture for photo/video overlays.", "Deactivate via Esc."],
    benefits: ["Highly saturated chroma key green", "Tests green subpixel clusters", "Clean workspace overlay"],
    useCases: ["Mobile device camera backdrop", "Chroma key simulation", "Display panels checks"],
    faqs: [{ question: "Can I use this for video production?", answer: "Yes, you can use your tablet or screen as a minor green-screen backdrop for recording simple items." }],
    componentName: "screen/ColorScreen"
  },
  {
    id: "blue-screen",
    name: "Blue Screen",
    slug: "blue-screen",
    category: "screen-tools",
    description: "Pure blue display background for subpixel diagnostics and panel verification.",
    seoTitle: "Blue Screen - Fullscreen Blue Subpixel Diagnostic",
    seoDescription: "Generate a pure blue background to examine display panel consistency and subpixel health.",
    howItWorks: ["Trigger fullscreen.", "Examine panel consistency.", "Exit with Escape."],
    benefits: ["Pure blue sub-pixel isolation", "Verifies light uniformity", "Minimalist visual focus"],
    useCases: ["OLED screen test", "Monitor calibration", "Chromakey testing support"],
    faqs: [{ question: "Does this damage my screen?", answer: "No, displaying solid colors is perfectly safe and is standard practice for screen testing." }],
    componentName: "screen/ColorScreen"
  },
  {
    id: "yellow-screen",
    name: "Yellow Screen",
    slug: "yellow-screen",
    category: "screen-tools",
    description: "Pure yellow display background to inspect composite subpixels.",
    seoTitle: "Yellow Screen - Fullscreen Display Warmth Test",
    seoDescription: "Activate a pure yellow fullscreen overlay to check composite color rendering and panel warmth.",
    howItWorks: ["Launch yellow fullscreen mode.", "Evaluate pixel blending.", "Exit using escape."],
    benefits: ["Composite color verification", "Checks blue light filter settings", "Ambient screen light"],
    useCases: ["Warm light simulation", "Display check", "Color balance verification"],
    faqs: [{ question: "Is this yellow screen useful for checking panel yellowing?", answer: "Yes, it helps check if certain sections of the panel are warmer or mismatched compared to the rest." }],
    componentName: "screen/ColorScreen"
  },
  {
    id: "dead-pixel-test",
    name: "Dead Pixel Test",
    slug: "dead-pixel-test",
    category: "screen-tools",
    description: "Cycle through black, white, red, green, and blue backgrounds to easily locate dead or stuck pixels.",
    seoTitle: "Dead Pixel Test - Online Monitor Pixel Inspector",
    seoDescription: "Easily inspect and locate dead or stuck pixels on your computer screen or mobile device with our online checker.",
    howItWorks: [
      "Click the start test button.",
      "Click anywhere on screen to cycle through white, black, red, green, and blue.",
      "Look closely for dark spots (dead pixels) or bright color spots (stuck pixels).",
      "Press Esc when done."
    ],
    benefits: [
      "Thorough multi-color cycle testing",
      "Works on any resolution desktop or mobile",
      "100% client side privacy"
    ],
    useCases: [
      "Inspecting a newly purchased monitor",
      "Checking TV screens before return periods end",
      "Confirming mobile phone display health"
    ],
    faqs: [
      { question: "What is the difference between a dead and stuck pixel?", answer: "A dead pixel is completely dark/unresponsive (usually black), while a stuck pixel is frozen on a specific color (red, green, or blue)." },
      { question: "Can I fix a stuck pixel?", answer: "Sometimes stuck pixels can be fixed by rapidly cycling colors, but dead pixels usually indicate hardware failure." }
    ],
    componentName: "screen/DeadPixelTest"
  },
  {
    id: "screen-cleaner",
    name: "Screen Cleaner",
    slug: "screen-cleaner",
    category: "screen-tools",
    description: "A dark workspace overlay that captures all clicks and keystrokes, letting you wipe down your keyboard and display without issues.",
    seoTitle: "Screen & Keyboard Cleaner Mode - Safe Wiping Tool",
    seoDescription: "Lock your device's input channels with a blank, dark UI block so you can clean screen dust and keyboard keys without clicking anything.",
    howItWorks: [
      "Launch cleaning mode to make your screen solid black.",
      "Wipe down your display and laptop keys safely.",
      "To exit, hold the escape key for 3 seconds as instructed."
    ],
    benefits: [
      "Locks key and mouse event registration",
      "Solid black panel highlights smudges/dust",
      "Prevents launching random apps or actions"
    ],
    useCases: [
      "Wiping laptop screens",
      "Cleaning mechanical keyboards",
      "Cleaning touch screens on mobile devices"
    ],
    faqs: [
      { question: "Does this lock my entire OS system?", answer: "No, it only blocks clicks and keypress events inside the browser window overlay." },
      { question: "How do I exit this mode?", answer: "Press and hold the ESC key for 3 full seconds. A countdown is displayed to prevent accidental exit." }
    ],
    componentName: "screen/ScreenCleaner"
  },
  {
    id: "fullscreen-tool",
    name: "Fullscreen Tool",
    slug: "fullscreen-tool",
    category: "screen-tools",
    description: "Easily test your browser's fullscreen capabilities or use it for distractions-free web viewing.",
    seoTitle: "Online Fullscreen Checker - Browser Fullscreen Toggle",
    seoDescription: "Toggle distraction-free browser window fullscreen views to check viewport scaling and test layout responses.",
    howItWorks: ["Click Toggle Fullscreen.", "Check scaling.", "Press ESC to return."],
    benefits: ["Distraction-free focus", "Instant UI toggle", "Works with browser layouts"],
    useCases: ["Testing responsive design layouts", "Media streaming distraction hide", "Presentations"],
    faqs: [{ question: "Why is fullscreen not working?", answer: "Ensure you give permission when the browser prompts. Some browsers require direct user interactions to trigger it." }],
    componentName: "screen/FullscreenTool"
  },
  {
    id: "screen-resolution-checker",
    name: "Screen Resolution Checker",
    slug: "screen-resolution-checker",
    category: "screen-tools",
    description: "Quickly detect your screen resolution, viewport width and height, pixel ratio, and orientation data.",
    seoTitle: "Screen Resolution Checker - Display & Viewport Diagnostics",
    seoDescription: "Find your monitor's screen resolution, physical pixel count, browser viewport size, and color depth specs.",
    howItWorks: [
      "Open the page on the device you want to test.",
      "Read out the physical resolution vs current browser viewport size.",
      "Resize your browser window to see live viewport updates."
    ],
    benefits: [
      "Real-time viewport update listeners",
      "Identifies retina/high-DPI pixel scaling",
      "Displays full graphics card color-depth information"
    ],
    useCases: [
      "Responsive design testing",
      "Determining device DPI scaling",
      "Troubleshooting monitor connection resolutions"
    ],
    faqs: [
      { question: "Why does my screen resolution look smaller than advertised?", answer: "Modern screens use High-DPI scaling (like Apple Retina). The browser reports logical pixels (CSS pixels), which is physical resolution divided by pixel ratio." },
      { question: "What is device pixel ratio (DPR)?", answer: "DPR is the ratio of physical screen pixels to logical CSS pixels. A DPR of 2 means 1 CSS pixel contains 4 physical pixels." }
    ],
    componentName: "screen/ResolutionChecker"
  },

  // TIME TOOLS (6)
  {
    id: "stopwatch",
    name: "Stopwatch",
    slug: "stopwatch",
    category: "time-tools",
    description: "High-accuracy stopwatch with lap timer, splits, and storage history.",
    seoTitle: "Online Stopwatch - Accurate Lap and Split Timer",
    seoDescription: "Use our clean, premium online stopwatch with millisecond precision to log splits, record laps, and analyze workout or workflow metrics.",
    howItWorks: ["Click Start to begin counting.", "Use Lap to log a split time.", "Press Stop and Reset to clear."],
    benefits: ["Millisecond precise ticking", "Lap log with details", "Autosave layout list"],
    useCases: ["Timing runs or fitness tests", "Productivity time logs", "Speedrunning recordings"],
    faqs: [{ question: "Are my stopwatch lap logs saved?", answer: "Yes, they are saved locally to your device's browser cache so they remain if you accidentally reload." }],
    componentName: "time/Stopwatch"
  },
  {
    id: "countdown-timer",
    name: "Countdown Timer",
    slug: "countdown-timer",
    category: "time-tools",
    description: "Set countdown timers with presets, sound alerts, and full screen support.",
    seoTitle: "Online Countdown Timer - Set Timer with Alarms",
    seoDescription: "Create a countdown timer with customizable presets, looping options, and alert sounds.",
    howItWorks: ["Configure duration using hours, minutes, seconds dials.", "Click start.", "Wait for sound alert or pause anytime."],
    benefits: ["Sleek radial progress loop", "Multiple bell/chime ring options", "Fullscreen focus view"],
    useCases: ["Kitchen cooking intervals", "Classroom timer dashboards", "Interval exercise timings"],
    faqs: [{ question: "Does the timer sound if tab is backgrounded?", answer: "Yes, standard HTML5 Audio will play the alert sound when completed even if the tab is inactive." }],
    componentName: "time/CountdownTimer"
  },
  {
    id: "online-clock",
    name: "Online Clock",
    slug: "online-clock",
    category: "time-tools",
    description: "Digital and analog clock displaying precise local time, day, and date.",
    seoTitle: "Online Clock - Precision Local Time Display",
    seoDescription: "Display precise local system time in beautiful fullscreen digital and analog formats.",
    howItWorks: ["Configure digital or analog views.", "Toggle 12/24 hour display formats.", "Activate fullscreen model for screensaver layout."],
    benefits: ["Custom dark clock screensavers", "Time synchronized to milliseconds", "Clean day-date tracking block"],
    useCases: ["Home office desk secondary clock", "Fullscreen kiosk screensaver", "Local hour accuracy validation"],
    faqs: [{ question: "Can I adjust the timezone of this clock?", answer: "This clock reads your local device time. Use the World Clock tool to see hours in different areas." }],
    componentName: "time/OnlineClock"
  },
  {
    id: "world-clock",
    name: "World Clock",
    slug: "world-clock",
    category: "time-tools",
    description: "Keep track of current local time across major global cities.",
    seoTitle: "Online World Clock - Multiple Time Zone Tracker",
    seoDescription: "Compare and track multiple global time zones in real-time. Keep up with timezone offsets.",
    howItWorks: ["Add cities to your custom dashboard.", "View local offsets, UTC, and coordinates.", "Delete or re-order cities easily."],
    benefits: ["Displays time difference values relative to you", "Custom list saved in localStorage", "Visual indicators for day/night hours"],
    useCases: ["Scheduling cross-border meetings", "Tracking family members abroad", "Remote development workflows"],
    faqs: [{ question: "How many cities can I add?", answer: "You can add as many cities as you like; the interface layout will adapt responsively." }],
    componentName: "time/WorldClock"
  },
  {
    id: "alarm-clock",
    name: "Alarm Clock",
    slug: "alarm-clock",
    category: "time-tools",
    description: "Configure multiple customized online alarms with labels, custom sounds, and snooze support.",
    seoTitle: "Online Alarm Clock - Create Custom Daily Alarms",
    seoDescription: "Set multiple alarms online with custom alarm sounds, snoozing options, and text labels.",
    howItWorks: ["Click Add Alarm.", "Set hours, minutes, ring tone, and text label.", "Save it and keep the tab open."],
    benefits: ["Set multiple concurrent alarms", "Clean snooze controls", "Modern notifications support"],
    useCases: ["Waking up", "Work meeting reminders", "Task switching reminders"],
    faqs: [{ question: "Will the alarm work if my computer goes to sleep?", answer: "No, if your computer enters deep sleep or is powered down, the browser script cannot execute. Keep screen active." }],
    componentName: "time/AlarmClock"
  },
  {
    id: "pomodoro-timer",
    name: "Pomodoro Timer",
    slug: "pomodoro-timer",
    category: "time-tools",
    description: "Professional focus timer based on the Pomodoro Technique with work, short break, and long break intervals.",
    seoTitle: "Pomodoro Timer - Boost Your Daily Productivity",
    seoDescription: "Use our clean, customizable Pomodoro timer to practice focus blocks, track rounds, and balance work cycles.",
    howItWorks: [
      "Select Focus (25m), Short Break (5m), or Long Break (15m).",
      "Click start and focus on your work.",
      "Work until the alarm rings, take your break, and repeat."
    ],
    benefits: [
      "Configurable cycle intervals",
      "Saves round tallies automatically",
      "Visual countdown wheel"
    ],
    useCases: [
      "Dedicated study sessions",
      "Programming focus time",
      "Timeboxing micro-tasks"
    ],
    faqs: [
      { question: "What is the standard Pomodoro split?", answer: "Traditionally, it is 25 minutes of work followed by a 5-minute break, with a 15-20 minute long break after four work rounds." },
      { question: "Can I customize the timing?", answer: "Yes, open the settings menu to adjust focus, short break, and long break durations." }
    ],
    componentName: "time/PomodoroTimer"
  },

  // CALCULATORS (10)
  {
    id: "age-calculator",
    name: "Age Calculator",
    slug: "age-calculator",
    category: "calculators",
    description: "Calculate your exact age in years, months, days, hours, and minutes, with a next birthday countdown.",
    seoTitle: "Age Calculator - Find Exact Age and Next Birthday",
    seoDescription: "Instantly calculate your exact age in years, months, weeks, days, and minutes. See how many days are left until your next birthday.",
    howItWorks: ["Select your date of birth.", "Click Calculate.", "Examine the detailed breakdown and next birthday countdown."],
    benefits: ["Breakdown by minutes and seconds", "Next birthday countdown clock", "Clean responsive outputs"],
    useCases: ["Verifying age for registrations", "Birthday celebrations preparation", "Fun time calculations"],
    faqs: [{ question: "How does the calculation treat leap years?", answer: "It accurately counts leap years, assessing the precise days in February for each year elapsed." }],
    componentName: "calculators/AgeCalculator"
  },
  {
    id: "bmi-calculator",
    name: "BMI Calculator",
    slug: "bmi-calculator",
    category: "calculators",
    description: "Calculate Body Mass Index (BMI) using metric or imperial inputs with visual weight category gauges.",
    seoTitle: "BMI Calculator - Online Body Mass Index Checker",
    seoDescription: "Calculate your Body Mass Index (BMI) instantly. Supports metric/imperial scales with customized weight status zones.",
    howItWorks: ["Choose metric or imperial unit tabs.", "Input weight and height.", "Read BMI index and ideal weight estimates."],
    benefits: ["Supports metric and imperial units", "Visual range slider (underweight, normal, overweight, obese)", "Displays ideal healthy weight ranges"],
    useCases: ["Fitness progress logs", "Medical checklists", "Personal health checks"],
    faqs: [{ question: "Is BMI accurate for everyone?", answer: "BMI is a general gauge. It may not be fully accurate for athletes with high muscle mass or pregnant individuals." }],
    componentName: "calculators/BmiCalculator"
  },
  {
    id: "percentage-calculator",
    name: "Percentage Calculator",
    slug: "percentage-calculator",
    category: "calculators",
    description: "Solve basic percentage questions, percentage increases, and ratio balances.",
    seoTitle: "Percentage Calculator - Solve Percentages Online",
    seoDescription: "Solve any percentage math problem including percentage change, discounts, ratios, and proportion changes.",
    howItWorks: ["Select your formula template.", "Enter numerical inputs.", "Copy calculated output results instantly."],
    benefits: ["Multiple percentage models", "Instant math computing", "Clear explanation layouts"],
    useCases: ["Calculating tax or tips", "Discount calculations during shopping", "Math homework helper"],
    faqs: [{ question: "Does this save calculator state?", answer: "It updates outputs in real-time as inputs are changed. No state persistence is necessary." }],
    componentName: "calculators/PercentageCalculator"
  },
  {
    id: "scientific-calculator",
    name: "Scientific Calculator",
    slug: "scientific-calculator",
    category: "calculators",
    description: "Solve scientific, trigonometric, logarithmic, and advanced equations with a digital equation screen.",
    seoTitle: "Online Scientific Calculator - Advanced Scientific Math",
    seoDescription: "Perform advanced arithmetic, algebra, trigonometry, and calculus equations with our scientific calculator.",
    howItWorks: ["Use the screen keypad to enter expressions.", "Evaluate with '='.", "Use trigonometric, power, and log variables."],
    benefits: ["Supports keyboard equations", "Maintains equation history", "Sleek Vercel-style layout"],
    useCases: ["Engineering calculations", "High school math", "Quick scientific formula solving"],
    faqs: [{ question: "Are angles computed in radians or degrees?", answer: "You can toggle between RAD (radians) and DEG (degrees) dynamically on the layout." }],
    componentName: "calculators/ScientificCalculator"
  },
  {
    id: "loan-calculator",
    name: "Loan Calculator",
    slug: "loan-calculator",
    category: "calculators",
    description: "Calculate payments, total interest, and amortization breakdowns for commercial loans.",
    seoTitle: "Loan Calculator - Find Interest & Monthly Payments",
    seoDescription: "Compute car, student, or personal loan payments with detailed charts and annual breakdown tables.",
    howItWorks: ["Input loan amount, annual interest rate, and term length.", "Read summary outputs.", "Examine amortization growth charts."],
    benefits: ["Amortization grid", "Principal vs Interest charts", "Payment calculations"],
    useCases: ["Comparing car loan offers", "Planning personal finances", "Mortgage estimates"],
    faqs: [{ question: "What is an amortization schedule?", answer: "It is a table showing the breakdown of each periodic payment between principal reduction and interest cost." }],
    componentName: "calculators/LoanCalculator"
  },
  {
    id: "emi-calculator",
    name: "EMI Calculator",
    slug: "emi-calculator",
    category: "calculators",
    description: "Calculate Equated Monthly Installments (EMI) with charts and repayment schedules.",
    seoTitle: "EMI Calculator - Calculate Monthly Loan Installments",
    seoDescription: "Instantly check your monthly home or car loan EMI and preview complete principal and interest payment balances.",
    howItWorks: ["Input loan principal, rate, and tenure.", "Check monthly EMI output.", "Examine yearly amortization charts."],
    benefits: ["Interactive sliders", "Repayment breakdown charts", "Exportable schedule summaries"],
    useCases: ["Estimating home loan EMIs", "Car financing preparation", "Debt repayment scheduling"],
    faqs: [{ question: "How does EMI differ from simple interest?", answer: "EMI stands for Equated Monthly Installment, which covers both interest and principal reduction on a reducing balance basis." }],
    componentName: "calculators/EmiCalculator"
  },
  {
    id: "gst-calculator",
    name: "GST Calculator",
    slug: "gst-calculator",
    category: "calculators",
    description: "Calculate inclusive/exclusive GST values, CGST, and SGST breakdowns.",
    seoTitle: "GST Calculator - Calculate Goods and Services Tax",
    seoDescription: "Add or remove Goods and Services Tax (GST) from price tags. Customize rates with instant CGST/SGST separations.",
    howItWorks: ["Enter base price.", "Select GST percentage rate.", "Toggle 'Add GST' or 'Remove GST' option."],
    benefits: ["Saves custom GST rate presets", "Displays CGST & SGST splits", "Interactive tax output grids"],
    useCases: ["Business invoicing preparation", "Tax expense calculations", "Pricing goods and products"],
    faqs: [{ question: "What are CGST and SGST?", answer: "Under dual GST systems (like India), tax is split evenly between the Central Government (CGST) and State Government (SGST)." }],
    componentName: "calculators/GstCalculator"
  },
  {
    id: "profit-margin-calculator",
    name: "Profit Margin Calculator",
    slug: "profit-margin-calculator",
    category: "calculators",
    description: "Calculate sales price, cost price, markup, gross profit, and margin percentages.",
    seoTitle: "Profit Margin Calculator - Determine Markups and Prices",
    seoDescription: "Input cost price and desired profit margin to calculate the appropriate selling price and markup ratio.",
    howItWorks: ["Enter item cost.", "Input profit margin % or selling price.", "Review generated gross profit and markup metrics."],
    benefits: ["Computes gross profit cash values", "Computes markup percentage", "Formulas updated dynamically"],
    useCases: ["SaaS pricing tiers optimization", "E-commerce product pricing", "Retail inventory analysis"],
    faqs: [{ question: "What is the difference between margin and markup?", answer: "Margin is profit divided by selling price, while markup is profit divided by cost price." }],
    componentName: "calculators/ProfitMarginCalculator"
  },
  {
    id: "compound-interest-calculator",
    name: "Compound Interest Calculator",
    slug: "compound-interest-calculator",
    category: "calculators",
    description: "Compute compound interest over custom periods with periodic deposits and compound frequency selections.",
    seoTitle: "Compound Interest Calculator - Future Value Estimator",
    seoDescription: "Estimate investment returns with compound interest. Supports monthly contributions, compound intervals, and interactive charts.",
    howItWorks: ["Enter principal amount, interest rate, and years.", "Configure monthly contributions and compounding frequency.", "Examine future value and compound growth table."],
    benefits: ["Graphical compound charts", "Compounding frequencies (monthly, quarterly, annually)", "Amortization grids"],
    useCases: ["Retirement savings estimates", "Stock market yield forecasts", "Comparing savings accounts"],
    faqs: [{ question: "What compounding frequency yields the highest return?", answer: "More frequent compounding (e.g. daily or monthly) generates slightly higher returns than annual compounding over time." }],
    componentName: "calculators/CompoundInterestCalculator"
  },
  {
    id: "salary-calculator",
    name: "Salary Calculator",
    slug: "salary-calculator",
    category: "calculators",
    description: "Convert hourly rates to weekly, biweekly, monthly, and annual salaries, with editable tax projections.",
    seoTitle: "Salary Calculator - Convert Hourly to Yearly Income",
    seoDescription: "Convert salaries across different intervals. Estimate tax burdens, deductions, and weekly take-home income.",
    howItWorks: ["Enter base rate value (hourly, weekly, annual).", "Configure hours worked per week.", "Review payment breakdowns and tax estimates."],
    benefits: ["Flexible period inputs", "Built-in tax bracket simulations", "Comprehensive hourly-to-annual output list"],
    useCases: ["Evaluating job offers", "Freelance rate estimates", "Income tax planning"],
    faqs: [{ question: "Are tax brackets accurate for my state?", answer: "This tool uses general federal/progressive brackets for estimation. Real taxes vary based on exact local codes and filing status." }],
    componentName: "calculators/SalaryCalculator"
  },

  // TEXT TOOLS (10)
  {
    id: "word-counter",
    name: "Word Counter",
    slug: "word-counter",
    category: "text-tools",
    description: "Count words, characters, sentences, paragraphs, reading speed, and keyword occurrences in real-time.",
    seoTitle: "Online Word Counter - Live Character & Reading Time Metrics",
    seoDescription: "Paste or type text to calculate live word counts, character lengths, sentence numbers, keyword density, and estimated reading duration.",
    howItWorks: ["Paste your text in the editing area.", "Examine live stat boxes.", "Analyze key density lists or clear block content."],
    benefits: ["Live count updates", "Displays keyword frequencies", "Auto-estimates reading and speaking durations"],
    useCases: ["Blog post writing checks", "Academic essay length validation", "Social media post character limits"],
    faqs: [{ question: "Does this count include spaces?", answer: "Yes, it displays separate statistics for characters with spaces and characters without spaces." }],
    componentName: "text/WordCounter"
  },
  {
    id: "character-counter",
    name: "Character Counter",
    slug: "character-counter",
    category: "text-tools",
    description: "Track character counts with custom limit parameters and whitespace filters.",
    seoTitle: "Character Counter - Free Character Length Utility",
    seoDescription: "Simple live character count tool for tracking maximum character lengths. Set limits for Twitter, SEO, and SMS.",
    howItWorks: ["Type or paste text.", "Configure character limit alerts.", "Check character count progress bars."],
    benefits: ["Set custom limit indicators", "Toggles spaces calculations", "Clean copy option"],
    useCases: ["SMS length verification", "SEO Meta titles length validation (max 60 characters)", "Twitter post drafts"],
    faqs: [{ question: "What is the limit for Google meta description?", answer: "Google generally indexes around 150-160 characters. This tool lets you set a 160-char warning threshold." }],
    componentName: "text/CharacterCounter"
  },
  {
    id: "case-converter",
    name: "Case Converter",
    slug: "case-converter",
    category: "text-tools",
    description: "Convert text case format to UPPERCASE, lowercase, sentence case, Title Case, and AlTeRnAtInG cAsE.",
    seoTitle: "Case Converter - Convert Text Formats Online",
    seoDescription: "Change text formats instantly. Convert between uppercase, lowercase, sentence case, title case, and camelCase.",
    howItWorks: ["Input text block.", "Select target case buttons (e.g. UPPERCASE).", "Copy converted text."],
    benefits: ["6 case formatting models", "One-click copy to clipboard", "Keeps paragraphs structure intact"],
    useCases: ["Correcting accidental Caps Lock text", "Formatting blog headings", "Coding variable casing adjustments"],
    faqs: [{ question: "How does Title Case convert words?", answer: "It capitalizes the first letter of each word while keeping minor prepositions lowercase." }],
    componentName: "text/CaseConverter"
  },
  {
    id: "remove-line-breaks",
    name: "Remove Line Breaks",
    slug: "remove-line-breaks",
    category: "text-tools",
    description: "Strip carriage returns and newlines from text, replacing them with spaces or custom dividers.",
    seoTitle: "Remove Line Breaks - Clean PDF and Formatted Text",
    seoDescription: "Quickly strip newline breaks from copy-pasted PDF text. Choose replacement parameters (spaces, commas, tabs).",
    howItWorks: ["Paste text with breaks.", "Choose replacement options (e.g. comma).", "Click Format and Copy."],
    benefits: ["Cleans copy-pasted PDF columns", "Supports custom substitute characters", "Preserves custom spacing blocks"],
    useCases: ["Copying academic PDF paragraphs", "Formatting database inputs", "Sanitizing logs files"],
    faqs: [{ question: "Why do PDFs copy with line breaks?", answer: "PDF columns are formatted with hard line breaks at the end of visual rows. This tool strips them to form continuous paragraphs." }],
    componentName: "text/RemoveLineBreaks"
  },
  {
    id: "text-sorter",
    name: "Text Sorter",
    slug: "text-sorter",
    category: "text-tools",
    description: "Sort lines of text alphabetically (A-Z, Z-A), by length, or using custom regex selectors.",
    seoTitle: "Text Sorter - Sort Lines and Lists Online",
    seoDescription: "Sort list items or lines of text alphabetically, numerically, by length, or reversed. Supports case sensitivity filters.",
    howItWorks: ["Paste line list text.", "Configure sort parameters (A-Z vs length).", "Click Sort and Copy."],
    benefits: ["Handles lists, names, or values", "Toggles case sensitivity", "One-click copy outputs"],
    useCases: ["Sorting code import statements", "Organizing names list alphabetically", "Clean data sorting before database inserts"],
    faqs: [{ question: "How are numbers sorted?", answer: "You can toggle numeric sorting to ensure 10 comes after 2, instead of alphabetical sort placing 10 first." }],
    componentName: "text/TextSorter"
  },
  {
    id: "duplicate-line-remover",
    name: "Duplicate Line Remover",
    slug: "duplicate-line-remover",
    category: "text-tools",
    description: "Strip repeating rows from lists and text blocks, displaying original vs deduplicated statistics.",
    seoTitle: "Duplicate Line Remover - Clean and Deduplicate Lists",
    seoDescription: "Remove all duplicate lines from list rows. Check counts and view output reports instantly.",
    howItWorks: ["Input lines list.", "Choose case sensitivity and space stripping.", "Click Remove Duplicates and Copy."],
    benefits: ["Calculates lines removed ratio", "Option to sort output list automatically", "Deduplicates in real-time"],
    useCases: ["Cleaning email or marketing lists", "De-duplicating CSV content rows", "Sanitizing logs arrays"],
    faqs: [{ question: "Are trailing spaces handled?", answer: "Yes, you can toggle the 'ignore whitespace' parameter to match lines despite trailing spaces." }],
    componentName: "text/DuplicateLineRemover"
  },
  {
    id: "password-generator",
    name: "Password Generator",
    slug: "password-generator",
    category: "text-tools",
    description: "Create highly secure passwords with customizable character options and live entropy meters.",
    seoTitle: "Password Generator - Create Secure Custom Passwords",
    seoDescription: "Generate strong passwords with customizable parameters (uppercase, lowercase, numbers, symbols). Test password strength in real-time.",
    howItWorks: ["Set password length using the slider.", "Toggle character type checkmarks.", "Click Generate and Copy."],
    benefits: ["Visual color-coded strength slider", "100% browser-side generation (safe)", "Option to exclude similar characters (e.g. I, l, O, 0)"],
    useCases: ["Creating social media credentials", "Generating SSH/database access passwords", "Developing Wi-Fi router keys"],
    faqs: [{ question: "Are my passwords safe here?", answer: "Yes. The passwords are generated locally in your browser sandbox using javascript. They are never sent to a server." }],
    componentName: "text/PasswordGenerator"
  },
  {
    id: "random-number-generator",
    name: "Random Number Generator",
    slug: "random-number-generator",
    category: "text-tools",
    description: "Generate lists of randomized numbers inside defined minimum and maximum limits.",
    seoTitle: "Random Number Generator - Quick Online Picker",
    seoDescription: "Generate single or multiple random numbers within your custom bounds. Toggle duplicates and sorting options.",
    howItWorks: ["Input min/max bounds.", "Set how many numbers you want to generate.", "Toggle duplicates permission and click Generate."],
    benefits: ["Set bulk generation options", "Toggle unique or duplicate values", "Visual roll animations"],
    useCases: ["Selecting sweepstakes winners", "Math probability simulation tests", "Creating random mock data for tables"],
    faqs: [{ question: "What random algorithm is used?", answer: "It uses `crypto.getRandomValues` when available for secure randomness, falling back to standard math models." }],
    componentName: "text/RandomNumberGenerator"
  },
  {
    id: "online-notepad",
    name: "Online Notepad",
    slug: "online-notepad",
    category: "text-tools",
    description: "A premium, minimalist notepad with auto-save capability and text download support.",
    seoTitle: "Online Notepad - Auto-Saving Text Drafts Editor",
    seoDescription: "Draft notes, code snippets, or logs using our distraction-free notepad. Saves your work locally in the browser.",
    howItWorks: ["Type directly in the notepad editor.", "Notes are autosaved as you type.", "Click Download to save as `.txt` file."],
    benefits: ["Persistent local storage auto-saves", "Clear controls", "Displays real-time character and word count"],
    useCases: ["Temporary copy-paste board", "Drafting emails", "Writing quick notes while browsing"],
    faqs: [{ question: "Will my note disappear if I close the tab?", answer: "No, your text is auto-saved to localStorage and will reload when you open the page again." }],
    componentName: "text/OnlineNotepad"
  },
  {
    id: "markdown-editor",
    name: "Markdown Editor",
    slug: "markdown-editor",
    category: "text-tools",
    description: "Write and preview formatted Markdown code in real-time, with styled HTML outputs.",
    seoTitle: "Markdown Editor - Live Markdown Preview & Compiler",
    seoDescription: "Write markup formatting online. Use our split-screen editor to preview bold, italics, tables, and code formatting, then copy clean HTML.",
    howItWorks: ["Type markdown code in left panel.", "Review styled preview on the right.", "Click copy HTML or download file."],
    benefits: ["Synchronized split scrolling", "Converts markdown to responsive HTML structure", "Includes markdown cheat sheet panel"],
    useCases: ["Drafting GitHub README files", "Formatting blog post markdown files", "Writing styled forum answers"],
    faqs: [{ question: "Does it support image uploads?", answer: "You can reference online images via URL links; physical image uploads are not hosted." }],
    componentName: "text/MarkdownEditor"
  },

  // DEVELOPER TOOLS (10)
  {
    id: "json-formatter",
    name: "JSON Formatter",
    slug: "json-formatter",
    category: "developer-tools",
    description: "Format, beautify, inspect, and minifying JSON data streams with tree-nodes navigation.",
    seoTitle: "JSON Formatter - Beautify and Structure JSON Online",
    seoDescription: "Paste unformatted JSON to validate, minifying, or restructure it with custom spacing tabs. Includes collapsible tree viewer.",
    howItWorks: ["Paste unformatted JSON string.", "Choose indentation width.", "Click Format to preview formatted code and the collapsible tree."],
    benefits: ["Interactive tree view", "Instant minification switch", "Copy or download formatted JSON file"],
    useCases: ["Debugging API responses", "Structuring config configuration settings", "Prettifying database records"],
    faqs: [{ question: "Will this validate syntax?", answer: "Yes, it reports validation failures with detail on incorrect lines or syntax tokens." }],
    componentName: "developer/JsonFormatter"
  },
  {
    id: "json-validator",
    name: "JSON Validator",
    slug: "json-validator",
    category: "developer-tools",
    description: "Inspect JSON syntax accuracy with character location error pointers.",
    seoTitle: "JSON Validator - Validate and Lint JSON Code",
    seoDescription: "Linter and validator for JSON data. Check JSON validity, find syntax errors, and format code.",
    howItWorks: ["Enter JSON code.", "Click Validate.", "Review syntax validity indicators or precise error warnings."],
    benefits: ["Precise validation error reporting", "Auto-correct brackets validation features", "Format outputs option"],
    useCases: ["Validating API requests templates", "Linting configuration parameters", "Troubleshooting json files"],
    faqs: [{ question: "What is RFC 8259 compliance?", answer: "It is the standard standard defining the JSON format. This validator evaluates compliance with that standard." }],
    componentName: "developer/JsonValidator"
  },
  {
    id: "base64-encode-decode",
    name: "Base64 Encode Decode",
    slug: "base64-encode-decode",
    category: "developer-tools",
    description: "Encode and decode text strings or file uploads to Base64 format.",
    seoTitle: "Base64 Encode & Decode - Convert Strings & Files Online",
    seoDescription: "Encode text strings and images to Base64 format or decode Base64 data back into readable text or binary formats.",
    howItWorks: ["Select Encode or Decode tab.", "Paste your text or upload a file.", "Examine base64 output block."],
    benefits: ["Supports file uploads", "Instantly copies base64 string", "100% client side conversion support"],
    useCases: ["Embedding small image data in CSS/HTML templates", "Transmitting safe data string parameters", "Decoding API response parameters"],
    faqs: [{ question: "Is Base64 encryption?", answer: "No, Base64 is an encoding system for representing binary data as ASCII text. It offers no security or protection." }],
    componentName: "developer/Base64Codec"
  },
  {
    id: "url-encoder-decoder",
    name: "URL Encoder Decoder",
    slug: "url-encoder-decoder",
    category: "developer-tools",
    description: "Encode or decode strings to be safe for URL query parameter segments.",
    seoTitle: "URL Encoder & Decoder - Percent Encoding Tool",
    seoDescription: "Convert strings to percent-encoded URL values or decode encoded links back to clear text.",
    howItWorks: ["Paste URL parameter text.", "Click Encode or Decode button.", "Copy sanitized output URL string."],
    benefits: ["One-click copy actions", "Handles full query params structures", "Support UTF-8 symbols mapping"],
    useCases: ["Formatting GET request variables", "Sanitizing special characters in slugs", "Decoding tracker parameters"],
    faqs: [{ question: "Why encode URLs?", answer: "URLs can only contain specific ASCII characters. Special characters like spaces or symbols are replaced with percent signs (`%`) and hex codes." }],
    componentName: "developer/UrlCodec"
  },
  {
    id: "hash-generator",
    name: "Hash Generator",
    slug: "hash-generator",
    category: "developer-tools",
    description: "Generate MD5, SHA-1, SHA-256, and SHA-512 cryptographic hashes as you type.",
    seoTitle: "Online Hash Generator - MD5, SHA-256, SHA-512 Hash maker",
    seoDescription: "Instantly generate cryptographic hash strings from text inputs. Computes SHA-256, MD5, SHA-1, and SHA-512 hashes in the browser.",
    howItWorks: ["Type or paste input text.", "Check live hashes generated for each algorithm.", "Click Copy beside the target hash."],
    benefits: ["Computes multiple hashes concurrently", "Generates hashes locally for security", "Sleek card-layout grids"],
    useCases: ["Verifying downloaded file checksums", "Generating database record hashes", "Creating checksum values for caching"],
    faqs: [{ question: "Is MD5 secure?", answer: "MD5 is now considered cryptographically broken. For secure hashing, we recommend using SHA-256 or SHA-512." }],
    componentName: "developer/HashGenerator"
  },
  {
    id: "uuid-generator",
    name: "UUID Generator",
    slug: "uuid-generator",
    category: "developer-tools",
    description: "Bulk generate UUID/GUID v1 and v4 identifiers.",
    seoTitle: "UUID Generator - Generate Random UUID v4 Online",
    seoDescription: "Bulk generate unique random UUIDs (v4) and time-based UUIDs (v1). Configure batch sizes and formats.",
    howItWorks: ["Choose UUID version (v4 or v1).", "Select quantity to generate.", "Click Generate and Copy list or Download text."],
    benefits: ["Bulk output generation (up to 500 UUIDs)", "Option for uppercase formatting", "Include or exclude hyphen dividers"],
    useCases: ["Creating primary key IDs for mock databases", "Configuring request transaction logs", "Generating test identifiers"],
    faqs: [{ question: "What is UUID v4?", answer: "UUID v4 is a universally unique identifier generated using random numbers. The chance of collision is practically zero." }],
    componentName: "developer/UuidGenerator"
  },
  {
    id: "regex-tester",
    name: "Regex Tester",
    slug: "regex-tester",
    category: "developer-tools",
    description: "Test regular expressions with syntax highlighting, live match highlights, capture groups, and code cheatsheets.",
    seoTitle: "Regex Tester - Online Regular Expression Check",
    seoDescription: "Write and test regular expressions in real-time. View match highlight listings, extract capture groups, and read regex documentation.",
    howItWorks: ["Input your regex pattern (e.g. `[a-z]+`).", "Input target test text.", "Review matched selections and capture group grids."],
    benefits: ["Live matching highlighting", "Capture groups extraction", "Interactive regex reference panel"],
    useCases: ["Debugging code parsing patterns", "Validating email/password regex filters", "Learning regular expression syntax"],
    faqs: [{ question: "What regex engine is used?", answer: "This tool uses JavaScript's native RegExp engine. Flags like global (`g`) and case-insensitive (`i`) are supported." }],
    componentName: "developer/RegexTester"
  },
  {
    id: "html-minifier",
    name: "HTML Minifier",
    slug: "html-minifier",
    category: "developer-tools",
    description: "Minify HTML markup by removing comments, redundant spaces, and linebreaks.",
    seoTitle: "HTML Minifier - Compress and Minify HTML Code",
    seoDescription: "Minify your HTML documents online. Remove unnecessary comments, whitespace, and line breaks to improve page load speed.",
    howItWorks: ["Paste HTML markup code.", "Select minification settings.", "Click Minify and copy compressed result."],
    benefits: ["Strips inline comments and formatting spacing", "Reduces file size for production", "One-click copy and reset buttons"],
    useCases: ["Compressing server templates", "Optimizing client responses", "Minifying inline assets"],
    faqs: [{ question: "Does this affect execution of script tags?", answer: "No, script and style contents are preserved, but HTML tags themselves are stripped of comments and unnecessary whitespace." }],
    componentName: "developer/HtmlMinifier"
  },
  {
    id: "css-minifier",
    name: "CSS Minifier",
    slug: "css-minifier",
    category: "developer-tools",
    description: "Compress CSS files by stripping spaces, comments, and empty selectors.",
    seoTitle: "CSS Minifier - Compress CSS Stylesheets",
    seoDescription: "Minify stylesheets to improve page speeds. Removes whitespace, redundant semicolons, and styling comments.",
    howItWorks: ["Paste your raw CSS style lines.", "Click Minify CSS.", "Copy output minimized styles."],
    benefits: ["Optimizes style bundles", "Removes comments blocks", "Fast client-side compression"],
    useCases: ["Reducing CSS bundle size", "Optimizing production sites", "Compressing widget styling declarations"],
    faqs: [{ question: "Will this break my styling layout?", answer: "No, standard minification strictly removes redundant formatting symbols without changing selector hierarchy or definitions." }],
    componentName: "developer/CssMinifier"
  },
  {
    id: "javascript-minifier",
    name: "JavaScript Minifier",
    slug: "javascript-minifier",
    category: "developer-tools",
    description: "Minify Javascript files client-side to improve web performance.",
    seoTitle: "JavaScript Minifier - Compress and Minify JS Code",
    seoDescription: "Compress JavaScript files client-side. Remove whitespaces, structure declarations, and strip comments.",
    howItWorks: ["Paste raw JavaScript code blocks.", "Click Minify JS.", "Copy minimized code."],
    benefits: ["Fast browser-side minification", "Strips JS comments and whitespace", "Clean, modern output"],
    useCases: ["Optimizing browser widgets scripts", "Reducing loading times", "Sanitizing script templates"],
    faqs: [{ question: "Does this perform code obfuscation?", answer: "This is a basic minifier that strips whitespace and comments. It does not obfuscate or rename variables." }],
    componentName: "developer/JsMinifier"
  },

  // IMAGE TOOLS (5)
  {
    id: "image-compressor",
    name: "Image Compressor",
    slug: "image-compressor",
    category: "image-tools",
    description: "Compress JPEG, PNG, and WEBP images in the browser with quality controls and live file size diagnostics.",
    seoTitle: "Online Image Compressor - Reduce Image File Size",
    seoDescription: "Compress JPEG, PNG, and WEBP image files online. Adjust quality sliders to reduce dimensions and file sizes locally.",
    howItWorks: ["Drag and drop an image file.", "Adjust the quality slider to change compression levels.", "Review file size savings and download."],
    benefits: ["100% browser-based compression (secure)", "Before/after file size comparisons", "Supports multiple image formats"],
    useCases: ["Optimizing images for blog posts", "Reducing image dimensions for form attachments", "Preparing assets for web development"],
    faqs: [{ question: "Do my images get uploaded to a server?", answer: "No, compression runs completely in your local browser using HTML5 Canvas. Your images never leave your computer." }],
    componentName: "image/ImageCompressor"
  },
  {
    id: "image-converter",
    name: "Image Converter",
    slug: "image-converter",
    category: "image-tools",
    description: "Convert images between PNG, JPEG, WEBP, and GIF formats client-side.",
    seoTitle: "Online Image Converter - Change Image Formats Free",
    seoDescription: "Convert PNG to WEBP, JPEG to PNG, or other formats instantly in the browser. High quality, safe, and free.",
    howItWorks: ["Upload an image file.", "Choose target output format (e.g. WEBP).", "Click Convert and download the image file."],
    benefits: ["Fast format transformations", "No registration required", "Maintains original image quality"],
    useCases: ["Converting PNG assets to WEBP for SEO", "Converting screenshots to JPEG format", "Format normalization for social media posts"],
    faqs: [{ question: "Are conversion formats limited?", answer: "It supports converting between JPEG, PNG, WEBP, and basic Canvas GIF outputs." }],
    componentName: "image/ImageConverter"
  },
  {
    id: "image-resizer",
    name: "Image Resizer",
    slug: "image-resizer",
    category: "image-tools",
    description: "Resize images to custom width and height parameters, keeping aspect ratios locked.",
    seoTitle: "Online Image Resizer - Resize Images Free",
    seoDescription: "Resize images online to custom dimensions (pixels or percentage scale). Lock aspect ratios and download instantly.",
    howItWorks: ["Upload an image.", "Enter new width/height values or use percentage slide dials.", "Download resized image file."],
    benefits: ["Aspect ratio locks toggle", "Pixel and percentage adjustment models", "Instant responsive downloads"],
    useCases: ["Sizing images for profiles", "Adjusting banners dimensions", "Scaling down layout assets"],
    faqs: [{ question: "Can I upscale an image here?", answer: "Yes, you can input larger dimensions, but note that upscaling will stretch pixels and may result in blurriness." }],
    componentName: "image/ImageResizer"
  },
  {
    id: "color-picker",
    name: "Color Picker",
    slug: "color-picker",
    category: "image-tools",
    description: "Extract HEX, RGB, and HSL color values from uploaded images, or build custom palettes.",
    seoTitle: "Online Image Color Picker - Extract Hex from Image",
    seoDescription: "Upload an image to pick colors. Inspect pixels, generate palettes, and copy HEX, RGB, or HSL color codes.",
    howItWorks: ["Upload an image.", "Hover and click on the canvas to pick a color.", "Copy generated color codes from the palette sidebar."],
    benefits: ["Interactive canvas zoom loupe", "Maintains color picking history", "Displays HEX, RGB, and HSL formats"],
    useCases: ["Extracting palette colors from logos", "Checking color contrasts", "Getting exact codes from mockups"],
    faqs: [{ question: "Does it support the native browser Eyedropper API?", answer: "Yes, on supported browsers (like Chrome/Edge), you can click the Eyedropper button to pick colors from anywhere on your desktop." }],
    componentName: "image/ColorPicker"
  },
  {
    id: "image-cropper",
    name: "Image Cropper",
    slug: "image-cropper",
    category: "image-tools",
    description: "Crop images client-side with aspect-ratio selections and drag grids.",
    seoTitle: "Online Image Cropper - Crop Images Easily",
    seoDescription: "Crop your images online. Adjust cropping boxes to 1:1, 16:9, or custom dimensions, and download.",
    howItWorks: ["Upload an image file.", "Drag and adjust the bounding crop box.", "Download cropped image output."],
    benefits: ["Preset aspect ratio blocks (1:1, 4:3, 16:9)", "Fluid drag adjustments", "Download as high-res PNG file"],
    useCases: ["Cropping social profile photos", "Reframing banner pictures", "Centering screenshot areas"],
    faqs: [{ question: "Are my high-resolution images compressed during cropping?", answer: "No, cropping runs on a high-fidelity canvas container that preserves original pixel densities." }],
    componentName: "image/ImageCropper"
  },

  // PRODUCTIVITY TOOLS (6)
  {
    id: "qr-code-generator",
    name: "QR Code Generator",
    slug: "qr-code-generator",
    category: "productivity-tools",
    description: "Generate customized QR codes for URLs, text, Wi-Fi details, and email addresses, with custom colors and center logo uploads.",
    seoTitle: "Online QR Code Generator - Customize QR Codes Free",
    seoDescription: "Create custom QR codes. Customize foreground and background colors, add center logos, and download as PNG format.",
    howItWorks: ["Choose content format (URL, text, WiFi).", "Enter values.", "Select custom colors, upload a logo, and click Download."],
    benefits: ["Add custom center logos", "Custom foreground/background color picker", "Download as high-res PNG file"],
    useCases: ["Business card links", "Restaurant digital menus", "Quick Wi-Fi password shares"],
    faqs: [{ question: "Will my custom logo break the QR code?", answer: "QR codes have error correction levels (configured to High here) that allow them to be scanned even with a logo covering the center." }],
    componentName: "productivity/QrCodeGenerator"
  },
  {
    id: "to-do-list",
    name: "To Do List",
    slug: "to-do-list",
    category: "productivity-tools",
    description: "A premium, card-based tasks organizer with priorities, categories, and due dates.",
    seoTitle: "Online To-Do List - Organize Tasks & Projects",
    seoDescription: "Manage your tasks and daily work schedules with our premium online to-do list, featuring category filters and local storage.",
    howItWorks: ["Add items with title, description, and priority level.", "Sort items by dragging or category filter tabs.", "Check items off to update the progress bar."],
    benefits: ["Saves tasks automatically in local cache", "Progress completion percentages bar", "Filter by Category or Priority tags"],
    useCases: ["Tracking daily study goals", "Organizing shopping lists", "Micro-project management"],
    faqs: [{ question: "Can I recover deleted tasks?", answer: "Deleted tasks are permanently removed from localStorage. Mark tasks complete instead to keep them in view." }],
    componentName: "productivity/TodoList"
  },
  {
    id: "habit-tracker",
    name: "Habit Tracker",
    slug: "habit-tracker",
    category: "productivity-tools",
    description: "Monitor daily habit streaks with interactive calendar blocks and completion trackers.",
    seoTitle: "Online Habit Tracker - Track Habits & Streaks",
    seoDescription: "Track daily habits and monitor streak achievements with our responsive habit checker dashboard.",
    howItWorks: ["Add custom habits (e.g. Drink Water).", "Check completion blocks on the weekly log.", "Analyze streak status stats."],
    benefits: ["Saves streaks across sessions", "Interactive day checkmarks matrix", "Clean dashboard statistics"],
    useCases: ["Exercise routine consistency", "Reading daily target tracking", "Dietary habit maintenance"],
    faqs: [{ question: "How does the streak calculation work?", answer: "It counts the consecutive number of days you check off a habit up to the current date." }],
    componentName: "productivity/HabitTracker"
  },
  {
    id: "notes",
    name: "Notes",
    slug: "notes",
    category: "productivity-tools",
    description: "Manage multiple notes folders with tags, search indexes, and text downloading features.",
    seoTitle: "Online Notes - Multi-Note Folder Manager",
    seoDescription: "A premium text note organizer. Keep folders, tag items, search notes, and download drafts securely.",
    howItWorks: ["Click New Note.", "Type title, tags, and content.", "Search or filter items using the left side list."],
    benefits: ["Supports multiple text folders", "Filter notes by custom tags", "Instant local storage auto-saving"],
    useCases: ["Drafting essays or blogs", "Saving code snippets libraries", "Daily logs bookkeeping"],
    faqs: [{ question: "Where are my notes stored?", answer: "Notes are stored locally in your browser's private localStorage sandbox. We never send your notes to any servers." }],
    componentName: "productivity/Notes"
  },
  {
    id: "grocery-list",
    name: "Grocery List",
    slug: "grocery-list",
    category: "productivity-tools",
    description: "Build categorized grocery lists, tracking prices, quantities, and checklist completions.",
    seoTitle: "Online Grocery List - Calculate Shopping Budgets",
    seoDescription: "Build shopping lists, add items with price estimations, and track checklist tallies while shopping.",
    howItWorks: ["Add item name, quantity, category, and estimated unit cost.", "Mark items off as you fill your cart.", "Review total estimated shopping budget vs checked items budget."],
    benefits: ["Categorized grocery lists", "Tallies shopping budget metrics", "Maintains items in browser history"],
    useCases: ["Planning weekly family meals shopping", "Tracking market budgets", "Creating quick shopping checklists"],
    faqs: [{ question: "Does it convert weights?", answer: "No, it is a simple price and quantity counter, though you can specify units (e.g. '1 kg') in item descriptions." }],
    componentName: "productivity/GroceryList"
  },
  {
    id: "meeting-notes",
    name: "Meeting Notes",
    slug: "meeting-notes",
    category: "productivity-tools",
    description: "Create meeting summaries, agendas, and action items with structured templates, then export directly to Markdown format.",
    seoTitle: "Online Meeting Notes - Minutes & Action items Templates",
    seoDescription: "Write meeting notes online. Use structural layouts to record attendees, agendas, action items, and export formatted notes.",
    howItWorks: ["Input meeting details, date, and goals.", "Fill out agenda columns, action items, and key decisions.", "Click Export Markdown or Copy text."],
    benefits: ["Structured outlines", "Instant Markdown formatting templates", "One-click copy and download options"],
    useCases: ["Daily stands logs", "Project check-ins", "Client sync reviews"],
    faqs: [{ question: "Can I save meeting templates?", answer: "Yes, current note structures are autosaved so you can pause and return to finish writing." }],
    componentName: "productivity/MeetingNotes"
  },

  // AI TOOLS (5)
  {
    id: "ai-blog-title-generator",
    name: "AI Blog Title Generator",
    slug: "ai-blog-title-generator",
    category: "ai-tools",
    description: "Generate catchy, SEO-optimized blog titles based on keywords and tone settings. Integrates with API keys.",
    seoTitle: "AI Blog Title Generator - Catchy SEO Headline Generator",
    seoDescription: "Create viral and SEO-friendly headlines for your blog posts. Generates title ideas based on keywords and content tone.",
    howItWorks: ["Enter core keywords and target audience description.", "Select Tone setting (e.g. Professional, Casual).", "Click Generate to output headline matches. Connect API key for advanced generation."],
    benefits: ["Provides instantly usable title variations", "Optional Gemini/OpenAI API key inputs", "100% secure client key storage"],
    useCases: ["Generating blog post headings", "Crafting newsletter subject lines", "Brainstorming YouTube titles"],
    faqs: [{ question: "How does the template work without an API key?", answer: "It uses optimized heuristic templates to generate 8 headlines based on keyword structures." }],
    componentName: "ai/BlogTitleGenerator"
  },
  {
    id: "ai-meta-description-generator",
    name: "AI Meta Description Generator",
    slug: "ai-meta-description-generator",
    category: "ai-tools",
    description: "Generate CTR-focused SEO meta descriptions from pages context and titles.",
    seoTitle: "AI SEO Meta Description Generator - Optimize CTR",
    seoDescription: "Create search-engine friendly meta descriptions. Optimize lengths and include keywords to boost CTR.",
    howItWorks: ["Enter page title and core keywords.", "Select tone and set max length rules.", "Click Generate and Copy optimized descriptor."],
    benefits: ["Maintains character warnings (max 160 chars)", "Optional API key support", "Includes CTA suggestions"],
    useCases: ["Writing e-commerce page meta descriptions", "SEO optimizing blog posts", "Creating portfolio metadata"],
    faqs: [{ question: "Why is the character limit important?", answer: "Google cuts off descriptions after 155-160 characters, so keeping descriptions within this length ensures the entire snippet shows." }],
    componentName: "ai/MetaDescGenerator"
  },
  {
    id: "ai-product-description-generator",
    name: "AI Product Description Generator",
    slug: "ai-product-description-generator",
    category: "ai-tools",
    description: "Generate persuasive e-commerce product descriptions from features checklists.",
    seoTitle: "AI Product Description Generator - E-commerce Descriptions",
    seoDescription: "Generate persuasive, keyword-rich product descriptions. Input product details and features to get instant copies.",
    howItWorks: ["Enter product name and core attributes.", "Select layout tone and platforms.", "Generate description copy block."],
    benefits: ["Outputs bullet points and summary variations", "API Key compatibility", "Highlight features formatting"],
    useCases: ["Writing Shopify product pages descriptions", "Sizing Amazon product descriptions", "Creating marketing copy pitches"],
    faqs: [{ question: "Does this write descriptions for any niche?", answer: "Yes, you can input specific features and tone requirements to guide the templates for any product." }],
    componentName: "ai/ProductDescGenerator"
  },
  {
    id: "ai-keyword-generator",
    name: "AI Keyword Generator",
    slug: "ai-keyword-generator",
    category: "ai-tools",
    description: "Extract and generate relevant search-intent SEO keywords from seed phrases or topics.",
    seoTitle: "AI SEO Keyword Generator - Brainstorm Search Terms",
    seoDescription: "Generate keyword variants, long-tail search terms, and tag metadata lists for your website pages.",
    howItWorks: ["Input seed keyword topic.", "Configure category focus (Productivity, Dev, etc.).", "Click Generate to list search keywords."],
    benefits: ["Exports as comma-separated tags lists", "Groups keywords by intent (informational, transactional)", "API key support"],
    useCases: ["Planning search content keywords", "Adding tags to blog posts", "Drafting PPC campaign keywords lists"],
    faqs: [{ question: "Can I copy these keywords as a comma list?", answer: "Yes, you can copy the results as a comma-separated string, ready to paste directly into your tags fields or SEO code." }],
    componentName: "ai/KeywordGenerator"
  },
  {
    id: "ai-faq-generator",
    name: "AI FAQ Generator",
    slug: "ai-faq-generator",
    category: "ai-tools",
    description: "Generate structured Q&A sections and FAQ schemas based on your content topic or target audience.",
    seoTitle: "AI FAQ Generator - Create Q&A Accordions and Schemas",
    seoDescription: "Brainstorm frequently asked questions for your articles or product landing pages. Generates copyable JSON-LD schemas.",
    howItWorks: ["Paste your page copy or enter a topic.", "Select question counts.", "Generate FAQs list and JSON-LD schema scripts."],
    benefits: ["Generates structured JSON-LD FAQ schemas", "Suggests common user questions", "Optional API key integration"],
    useCases: ["Adding Q&As to landing pages", "SEO optimization of service pages", "Answering product support queries"],
    faqs: [{ question: "What is FAQ Schema?", answer: "FAQ schema is structured markup code (JSON-LD) that helps search engines display rich snippets in search results." }],
    componentName: "ai/FaqGenerator"
  },

  // BUSINESS TOOLS (5)
  {
    id: "invoice-generator",
    name: "Invoice Generator",
    slug: "invoice-generator",
    category: "business-tools",
    description: "Create professional, downloadable PDF invoices with custom items, taxes, currency selection, and logo uploads.",
    seoTitle: "Online Invoice Generator - Create Free PDF Invoices",
    seoDescription: "Create and print professional invoices. Customize line items, tax rates, currencies, client info, and download PDFs locally.",
    howItWorks: [
      "Upload your company logo and fill in sender and client details.",
      "Add billing line items, setting quantities, rates, and tax rates.",
      "Review the total breakdown and click Print/Download PDF."
    ],
    benefits: [
      "Custom currency selector and tax rate inputs",
      "Upload logo and customize accent colors",
      "Generates print-optimized layout files"
    ],
    useCases: [
      "Freelance work billing",
      "Contractor invoice preparation",
      "Small business transaction logs"
    ],
    faqs: [
      { question: "Is my business data sent to any servers?", answer: "No, all invoice compilation and PDF exporting runs locally in your browser. None of your client data is saved or uploaded." },
      { question: "Can I save this invoice to edit later?", answer: "Your invoice draft is autosaved to localStorage so if you reload the tab, your items will stay in place." }
    ],
    componentName: "business/InvoiceGenerator"
  },
  {
    id: "quote-generator",
    name: "Quote Generator",
    slug: "quote-generator",
    category: "business-tools",
    description: "Generate professional business quotes or estimates, easily exportable to PDF format.",
    seoTitle: "Online Quote Generator - Create Estimates Free",
    seoDescription: "Draft quotes and cost estimates. Customize lines items, discount options, company details, and export to PDF.",
    howItWorks: ["Fill out sender/receiver boxes.", "Input pricing items, quantities, and discounts.", "Click Download quote PDF."],
    benefits: ["Easy conversion layouts", "Custom notes and validity limits", "Generates clean estimates print files"],
    useCases: ["SaaS consulting proposals", "Construction project estimates", "Freelance design quotes"],
    faqs: [{ question: "How does this quote template differ from invoices?", answer: "Estimates include terms for proposal validity and a client sign-off block instead of payment details." }],
    componentName: "business/QuoteGenerator"
  },
  {
    id: "profit-calculator",
    name: "Profit Calculator",
    slug: "profit-calculator",
    category: "business-tools",
    description: "Determine cost, sales prices, quantities sold, and taxes to compute net margins.",
    seoTitle: "Profit Calculator - Net Income and Margins",
    seoDescription: "Input purchase prices, sales margins, quantities, and tax levels to calculate total gross revenue, expenses, and net profit margins.",
    howItWorks: ["Enter cost price and sales price.", "Set quantity sold and tax percentages.", "Read net profit values and margins ratios."],
    benefits: ["Displays gross vs net profit cash values", "Evaluates tax burdens calculations", "Shows markup metrics"],
    useCases: ["Product margin analytics", "Shop inventory profit estimations", "Business financial reviews"],
    faqs: [{ question: "Why deduct tax from net profit?", answer: "Taxes represent a direct liability, so subtracting taxes yields true net take-home profit values." }],
    componentName: "business/ProfitCalculator"
  },
  {
    id: "break-even-calculator",
    name: "Break Even Calculator",
    slug: "break-even-calculator",
    category: "business-tools",
    description: "Find the point where your business revenue equals its expenses, with units and sales calculations.",
    seoTitle: "Break-Even Calculator - Find Break-Even Point",
    seoDescription: "Calculate your break-even point in units sold or total sales revenue. Input fixed costs, variables costs, and price per unit.",
    howItWorks: ["Enter total fixed costs (e.g. rent).", "Enter variable cost per unit and sales price.", "Read out break-even units and revenue charts."],
    benefits: ["Displays break-even thresholds", "Breakdown units and sales revenue", "Interactive charts showing costs vs revenue lines"],
    useCases: ["Business viability planning", "Setting production targets", "Pricing product inventories"],
    faqs: [{ question: "What is a fixed cost?", answer: "Fixed costs are business expenses that do not change based on production volume, such as rent, salaries, and insurance." }],
    componentName: "business/BreakEvenCalculator"
  },
  {
    id: "roi-calculator",
    name: "ROI Calculator",
    slug: "roi-calculator",
    category: "business-tools",
    description: "Calculate Return on Investment (ROI) and annualized yields for investments.",
    seoTitle: "ROI Calculator - Return on Investment Tracker",
    seoDescription: "Determine investment yields. Compute ROI percentage, total gains, and annualized growth rates.",
    howItWorks: ["Input initial investment value.", "Enter final value or returns cash.", "Set investment length in years to see annualized yield."],
    benefits: ["Yields annualized returns metrics", "Visual progress graphs", "Investment gains calculation"],
    useCases: ["Stock market investment audits", "Real estate project yields estimations", "Marketing campaign performance metrics"],
    faqs: [{ question: "What is annualized ROI?", answer: "Annualized ROI calculates the average geometric return per year, allowing direct comparison between investments of different term lengths." }],
    componentName: "business/RoiCalculator"
  }
];

export const categories: CategoryItem[] = rawCategories.filter((c) => c.id !== "ai-tools");
export const tools: ToolItem[] = rawTools.filter((t) => t.category !== "ai-tools");
