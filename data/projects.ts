export interface Project {
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  highlight?: string;
}

export const projects: Project[] = [
  {
    title: "ML Mule Account Detection System",
    description:
      "A pipeline that flags money laundering mule accounts in bank transaction data. The hard part wasn't the model — it was engineering 180+ fraud-pattern features that could process 400M+ rows without melting memory. Final LightGBM + XGBoost ensemble hit 0.983 AUC. Also built a temporal window algorithm to catch suspicious activity periods for flagged accounts.",
    techStack: ["Python", "Scikit-learn", "LightGBM", "XGBoost", "Pandas"],
    githubUrl: "https://github.com/Mahir-bot-2003",
    highlight: "0.983 AUC on 400M+ transactions",
  },
  {
    title: "Samwaad AI",
    description:
      "An AI meeting intelligence platform that transcribes meetings in real-time, then extracts summaries, sentiment, action items, and chapter breaks. Integrated Google Speech-to-Text and Gemini AI for diarization and decision tracking. Backend runs on FastAPI with WebSockets, Redis pub/sub, PostgreSQL, and JWT auth. Also automated post-meeting workflows — Google Calendar events, SendGrid emails, CRM logs — all triggered by what the AI detected in the conversation.",
    techStack: [
      "Python",
      "FastAPI",
      "WebSockets",
      "Redis",
      "PostgreSQL",
      "Google Speech-to-Text",
      "Gemini AI",
    ],
    githubUrl: "https://github.com/Mahir-bot-2003",
    highlight: "Real-time transcription + automated workflows",
  },
  {
    title: "Smart Budget Tracker",
    description:
      "A cross-platform personal finance app built with Flutter. Tracks expenses, visualizes monthly budgets with interactive pie charts, and has an AI-powered assistant that gives personalized savings suggestions. Includes CSV export and a dark-themed responsive UI.",
    techStack: ["Flutter", "Dart", "Firebase"],
    githubUrl: "https://github.com/Mahir-bot-2003",
    highlight: "AI-powered budgeting assistant",
  },
];
