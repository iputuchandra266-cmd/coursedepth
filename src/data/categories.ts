export interface Category {
  slug: string;
  name: string;
  group: string;
  courses: number;
  icon: string;
  color: string;
  description: string;
}

export const groups: string[] = [
  "Development",
  "IT & Software",
  "Design",
  "Business",
  "Marketing",
  "Office Productivity",
  "Finance & Accounting",
  "Photography & Video",
  "Personal Development",
  "Health & Fitness",
  "Music",
  "Teaching & Academics",
  "Lifestyle",
];

type CategorySeed = Omit<Category, "courses">;

// Category metadata only. Course counts are derived from the courses data below,
// so `courses.ts` stays the single source of truth.
const seeds: CategorySeed[] = [
  { slug: "web-development", name: "Web Development", group: "Development", icon: "🌐", color: "#4F46E5", description: "HTML, CSS, JavaScript, React, Next.js and the best full-stack bootcamps." },
  { slug: "python", name: "Python", group: "Development", icon: "🐍", color: "#3776AB", description: "From zero to hero: automation, Django, Flask, and data." },
  { slug: "sql", name: "SQL", group: "Development", icon: "🗄️", color: "#E38B00", description: "PostgreSQL, MySQL, query optimization and data modeling." },
  { slug: "javascript", name: "JavaScript", group: "Development", icon: "⚡", color: "#F7DF1E", description: "ES2026, TypeScript, Node, and modern frameworks." },
  { slug: "data-science", name: "Data Science", group: "Development", icon: "📊", color: "#10B981", description: "Pandas, ML, statistics, and portfolio projects." },
  { slug: "artificial-intelligence", name: "Artificial Intelligence", group: "Development", icon: "🤖", color: "#8B5CF6", description: "LLMs, prompt engineering, LangChain, and agents." },
  { slug: "claude-ai", name: "Claude AI", group: "Development", icon: "✳️", color: "#D97757", description: "Claude AI courses: prompting, agents and AI-assisted workflows." },
  { slug: "ai-agents", name: "AI Agents & Agentic AI", group: "Development", icon: "🧠", color: "#7C3AED", description: "Build autonomous agents with OpenAI SDK, CrewAI, AutoGen, and MCP." },
  { slug: "langchain", name: "LangChain", group: "Development", icon: "🦜", color: "#1C3C3C", description: "Agentic AI engineering with LangChain and LangGraph." },
  { slug: "it-and-software", name: "IT & Software", group: "IT & Software", icon: "💻", color: "#0EA5E9", description: "Networking, operating systems, troubleshooting, and IT support." },
  { slug: "it-certifications", name: "IT Certifications", group: "IT & Software", icon: "🎖️", color: "#EF4444", description: "AWS, Azure, CompTIA, CKA, and Security+." },
  { slug: "hacking", name: "Hacking", group: "IT & Software", icon: "🕶️", color: "#111827", description: "Ethical hacking, pentesting, and bug bounty." },
  { slug: "aws", name: "AWS", group: "IT & Software", icon: "☁️", color: "#FF9900", description: "Solutions Architect, DevOps, and serverless." },
  { slug: "microsoft-playwright", name: "Microsoft Playwright", group: "IT & Software", icon: "🎭", color: "#2EAD33", description: "Automation testing with Playwright in JavaScript and TypeScript." },
  { slug: "graphic-design", name: "Graphic Design", group: "Design", icon: "🎨", color: "#EC4899", description: "Figma, Illustrator, branding, and layout." },
  { slug: "ux-design", name: "UX Design", group: "Design", icon: "✏️", color: "#6366F1", description: "Research, wireframes, prototyping, and design systems." },
  { slug: "photoshop", name: "Photoshop", group: "Design", icon: "🖼️", color: "#31A8FF", description: "Retouching, compositing, and digital imaging." },
  { slug: "3d-modeling", name: "3D Modeling", group: "Design", icon: "🧊", color: "#7C3AED", description: "Blender, Maya, texturing, and rendering." },
  { slug: "business", name: "Business", group: "Business", icon: "💼", color: "#1E3A8A", description: "Strategy, startups, and entrepreneurship." },
  { slug: "data-analysis", name: "Data Analysis", group: "Business", icon: "📈", color: "#059669", description: "Excel, Power BI, Tableau, and SQL for analysts." },
  { slug: "project-management", name: "Project Management", group: "Business", icon: "📋", color: "#D97706", description: "PMP, Agile, Scrum, and team leadership." },
  { slug: "leadership", name: "Leadership & Management", group: "Business", icon: "🧭", color: "#0F766E", description: "People management, communication, and coaching." },
  { slug: "digital-marketing", name: "Digital Marketing", group: "Marketing", icon: "📣", color: "#F59E0B", description: "Ads, funnels, email, and growth." },
  { slug: "seo", name: "SEO", group: "Marketing", icon: "🔍", color: "#16A34A", description: "Technical SEO, content, and link building." },
  { slug: "social-media-marketing", name: "Social Media Marketing", group: "Marketing", icon: "📱", color: "#E11D48", description: "Instagram, TikTok, and Facebook Ads." },
  { slug: "excel", name: "Excel", group: "Office Productivity", icon: "📗", color: "#217346", description: "Formulas, PivotTables, Power Query, and VBA." },
  { slug: "office-productivity", name: "Office Productivity", group: "Office Productivity", icon: "🗂️", color: "#475569", description: "Notion, Google Workspace, and automation." },
  { slug: "finance-and-accounting", name: "Finance & Accounting", group: "Finance & Accounting", icon: "💰", color: "#15803D", description: "Investing, accounting, and financial modeling." },
  { slug: "bitcoin", name: "Bitcoin", group: "Finance & Accounting", icon: "₿", color: "#F7931A", description: "Crypto, blockchain, and DeFi." },
  { slug: "photography", name: "Photography", group: "Photography & Video", icon: "📷", color: "#334155", description: "Camera basics, portrait, landscape, and Lightroom." },
  { slug: "video-editing-and-animation", name: "Video Editing & Animation", group: "Photography & Video", icon: "🎬", color: "#7C2D12", description: "Premiere, After Effects, and DaVinci." },
  { slug: "personal-development", name: "Personal Development", group: "Personal Development", icon: "🌱", color: "#65A30D", description: "Productivity, habits, and public speaking." },
  { slug: "health-and-fitness", name: "Health & Fitness", group: "Health & Fitness", icon: "💪", color: "#DC2626", description: "Yoga, nutrition, coaching, and mental health." },
  { slug: "music", name: "Music", group: "Music", icon: "🎵", color: "#9333EA", description: "Piano, guitar, theory, and production." },
  { slug: "guitar", name: "Guitar", group: "Music", icon: "🎸", color: "#B45309", description: "Acoustic, electric, and fingerstyle." },
  { slug: "language-learning", name: "Language Learning", group: "Teaching & Academics", icon: "🗣️", color: "#0284C7", description: "English, IELTS, Spanish, and Japanese." },
  { slug: "engineering", name: "Engineering", group: "Teaching & Academics", icon: "⚙️", color: "#52525B", description: "Electrical, mechanical, and civil engineering." },
  { slug: "lifestyle", name: "Lifestyle", group: "Lifestyle", icon: "🌻", color: "#EA580C", description: "Cooking, drawing, travel, and gaming." },
];

import { courses } from "./courses";

const counts = courses.reduce<Record<string, number>>((acc, c) => {
  acc[c.categorySlug] = (acc[c.categorySlug] ?? 0) + 1;
  return acc;
}, {});

export const categories: Category[] = seeds.map((s) => ({
  ...s,
  courses: counts[s.slug] ?? 0,
}));

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
