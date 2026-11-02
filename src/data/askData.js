// Real stories, condensed into an "ask me anything" knowledge base.
// Each entry: id, question-as-asked (display), keywords for matching, and a short answer
// written in Anubhav's voice, grounded in facts that also appear elsewhere on this site
// (The Mess, The Platform / Nautilus Terminal, The Engine Room ledger).

export const SUGGESTED = [
  "Tell me about a time you led a project nobody asked you to do",
  "How do you handle a schedule that's slipping",
  "Walk me through a cost trade-off decision you made",
  "Why are you moving from engineering into PM/TPM roles",
  "What's the hardest technical problem you've solved solo",
  "How do you handle conflict with a stakeholder",
];

export const ENTRIES = [
  {
    id: "unprompted-project",
    keywords: ["nobody asked", "initiative", "self started", "proactive", "own project", "ownership", "unprompted", "mess", "dashboard", "parts tracked"],
    a: "Across 5 vehicle programs I had over 2,000 parts moving with no shared visibility into shortages or delivery risk — everyone was finding out about a line-down the day it happened. Nobody assigned me to fix that. I built a dashboard that tracks part status and delivery risk across every program so the team sees a shortage coming 3–10 days out instead of the morning it hits the line. Situation: no system existed. Task: none was assigned to me. Action: I built one anyway, on my own time, scoped to what the team actually needed. Result: shortages get caught before they cost a shift.",
  },
  {
    id: "schedule-slip",
    keywords: ["schedule slip", "behind schedule", "deadline", "late", "timeline risk", "delay", "slipping"],
    a: "My instinct is to surface the slip the moment I see it, not when it's unrecoverable — same logic as the parts dashboard: a 10-day amber warning is worth ten times a 1-day red one. Concretely: I separate what's actually blocking the critical path from what just feels urgent, get the people who can unblock it in a room within a day, and give leadership a real number for the new date plus the trade-off (cost, scope, or quality) instead of false comfort. The Case New Holland tooling decision is the clearest example — a $3M+ call on 3D printing vs. traditional tooling for tractor seat frames, which only works if you've already quantified the schedule and cost trade-off before anyone asks for it.",
  },
  {
    id: "cost-tradeoff",
    keywords: ["cost trade-off", "tradeoff", "trade off", "case new holland", "3d printing", "tooling", "cost savings", "savings"],
    a: "The biggest one: a cost trade-off study on 3D printing vs. traditional tooling for tractor seat frames at Case New Holland, which led to a $3M+ savings decision. On the Ford side it was smaller, sharper calls — a seat frame redesign for next-gen EVs ($160K/yr), an injection-molded seat structure optimization ($110K/yr), a 24% weight cut on a sunvisor with zero quality loss ($94K/yr), and a DFM redesign of an injection-molded seat belt bezel cover ($85K/yr). None of these shipped with a press release. The pattern is the same every time: find where the money or time is actually hiding, build the model that proves it, and make the call defensible before you present it.",
  },
  {
    id: "why-pm",
    keywords: ["why pm", "why tpm", "why program manager", "why product manager", "pivot", "career change", "moving into", "transition", "growth role"],
    a: "As a design release engineer I was already doing the program-management part of the job without the title — tracking 2,000+ parts across 5 programs, running cost trade-off studies that drove multi-million dollar decisions, building Nautilus Terminal solo to fuse six data feeds into one risk score. The skill underneath all of it is the same: find the pattern in a mess nobody's tracking, and build the system or the decision that makes it legible. I want to point that instinct somewhere with faster feedback loops and more cross-functional surface area — which is what PM and TPM roles are built for.",
  },
  {
    id: "hardest-problem",
    keywords: ["hardest problem", "solo", "built alone", "nautilus", "technical challenge", "biggest challenge"],
    a: "Building Nautilus Terminal. It's a supply chain intelligence tool I built on my own time — you type a raw material and it fuses six live data feeds (commodity prices, geopolitical risk, port congestion, sanctions screening, tariff codes, FX rates) into a single sourcing risk score, a recommended hub, and the chokepoint to watch. Nobody handed me a spec. The hard part wasn't any one feed — it was deciding what the six signals actually mean together, and compressing that into a score a non-expert can act on in seconds. You can try the real thing running live on this site.",
  },
  {
    id: "conflict",
    keywords: ["conflict", "disagreement", "pushback", "stakeholder", "difficult person", "difficult conversation"],
    a: "I treat pushback as missing information, not a personality problem — usually the other side is optimizing for a constraint I haven't made visible yet (cost, timing, their own team's bandwidth). So I lead with the data, not the ask: when I ran the Case New Holland trade-off study, the case for 3D printing wasn't going to win on opinion against an incumbent tooling process — it won because the model made the $3M+ gap impossible to argue with. Get to shared facts first, and most 'conflicts' resolve themselves.",
  },
  {
    id: "weakness",
    keywords: ["weakness", "biggest weakness", "area of improvement", "what are you working on"],
    a: "I default to building the system myself before asking whether someone already owns it — the parts dashboard and Nautilus Terminal both started that way. It's gotten results, but it means I have to be deliberate about looping in stakeholders early rather than showing up with a finished tool. That's actually a chunk of why I want to move into PM/TPM roles formally — the cross-functional alignment becomes the job instead of a thing I bolt on afterward.",
  },
  {
    id: "day-to-day",
    keywords: ["day to day", "typical day", "what do you do", "current role", "day in the life"],
    a: "Day to day I'm a design release engineer: I own part designs through DFMEA, cost and manufacturability trade-offs, and release across multiple vehicle programs, which means constant cross-functional coordination with manufacturing, suppliers, and program timing. The parts-tracking dashboard and the Ledger of shipped savings on this site are both outputs of that day job, not separate from it.",
  },
  {
    id: "contact",
    keywords: ["contact", "email", "reach you", "linkedin", "resume", "hire you", "get in touch"],
    a: "Easiest way: email anubhavtewari7@gmail.com or connect on LinkedIn (linkedin.com/in/anubhavtewari7). Hit \"Contact\" in the nav above, or scroll down to The Ask for the full pitch.",
  },
  {
    id: "work-history",
    keywords: ["where have you worked", "work history", "worked at", "previous companies", "previous company", "employers", "employer", "career history", "where do you work", "companies you've worked", "job history", "your background", "what companies"],
    a: "I'm currently working as a design release engineer across automotive and off-highway vehicle programs — the Ford Motor Company redesigns and the Case New Holland tooling decision on this site (The Engine Room) are real, shipped examples of that work, not hypotheticals. For the full employer-by-employer timeline with dates and titles, LinkedIn (linkedin.com/in/anubhavtewari7) or my resume has the detail — email anubhavtewari7@gmail.com and I'll send it directly.",
  },
  {
    id: "off-topic-personal",
    keywords: ["free time", "hobby", "hobbies", "weekend", "favorite", "favourite", "outside of work", "fun fact", "personal life", "what do you do for fun"],
    a: "That one's outside what this system actually knows — it's built on Anubhav's real work, not his personal life, so I'd rather not guess. If you're curious, that's a much better question for an actual conversation: anubhavtewari7@gmail.com or LinkedIn (linkedin.com/in/anubhavtewari7).",
  },
];

export const FALLBACK =
  "I don't have a grounded answer for that one yet — rather than guess, I'll point you to Anubhav directly. Email anubhavtewari7@gmail.com, or try one of the suggested questions above.";
