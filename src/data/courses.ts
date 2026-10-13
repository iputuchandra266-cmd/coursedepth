export interface Course {
  slug: string;
  title: string;
  provider: string;
  category: string;
  categorySlug: string;
  instructor: string;
  instructorSlug: string;
  rating: number;
  reviews: number;
  price: number;
  oldPrice?: number;
  level: string;
  duration: string;
  updated: string;
  gradient: string;
  emoji: string;
  bestseller?: boolean;
  description: string;
  /** Cover image: local path ("/images/courses/my-course.jpg") or absolute URL ("https://…"). Defaults to "/images/courses/<slug>.svg". */
  image?: string;
  /** Outbound course URL (e.g. the Udemy landing/affiliate link). Omit if unavailable. */
  url?: string;
}

import { catalogCourses } from "./udemy-catalog";

const featured: Course[] = [
  {
    slug: "complete-python-bootcamp",
    title: "The Complete Python Bootcamp From Zero to Hero in Python",
    provider: "Udemy",
    category: "Python",
    categorySlug: "python",
    instructor: "Jose Portilla",
    instructorSlug: "jose-portilla",
    rating: 4.6,
    reviews: 566376,
    price: 199.99,
    level: "Beginner",
    duration: "22h total",
    updated: "09/2026",
    image: "https://img-c.udemycdn.com/course/480x270/567828_67d0.jpg",
    url: "https://www.udemy.com/course/complete-python-bootcamp/?couponCode=KEEPLEARNING",
    bestseller: false,
    description: "Learn Python like a Professional Start from the basics and go all the way to creating your own applications and games."
  },
  {
    slug: "excel-beginner-to-advanced",
    title: "Microsoft Excel - Excel from Beginner to Advanced 2026",
    provider: "Udemy",
    category: "Excel",
    categorySlug: "excel",
    instructor: "Kyle Pew",
    instructorSlug: "kyle-pew",
    rating: 4.7,
    reviews: 543696,
    price: 139.99,
    level: "All levels",
    duration: "18.5h total",
    updated: "10/2026",
    image: "https://img-c.udemycdn.com/course/480x270/793796_0e89_5.jpg",
    url: "https://www.udemy.com/course/microsoft-excel-2013-from-beginner-to-advanced-and-beyond/?couponCode=KEEPLEARNING",
    bestseller: true,
    description: "Master Excel: formulas, PivotTables, Power Query, dashboards, and VBA for analysts and finance teams."
  },
  {
    slug: "100-days-of-code",
    title: "100 Days of Code™: The Complete Python Pro Bootcamp",
    provider: "Udemy",
    category: "Python",
    categorySlug: "python",
    instructor: "Dr. Angela Yu",
    instructorSlug: "angela-yu",
    rating: 4.7,
    reviews: 437756,
    price: 124.99,
    level: "Beginner",
    duration: "65h total",
    updated: "10/2026",
    image: "https://img-c.udemycdn.com/course/480x270/2776760_f176_10.jpg",
    bestseller: true,
    description: "Master Python by building 100 projects in 100 days. Learn data science, automation, build websites, games and apps!"
  },
  {
    slug: "ultimate-aws-solutions-architect",
    title: "Ultimate AWS Certified Solutions Architect Associate 2026",
    provider: "Udemy",
    category: "Aws",
    categorySlug: "aws",
    instructor: "Stephane Maarek",
    instructorSlug: "stephane-maarek",
    rating: 4.7,
    reviews: 297485,
    price: 129.99,
    level: "Intermediate",
    duration: "27h total",
    updated: "09/2026",
    image: "https://img-c.udemycdn.com/course/480x270/2196488_8fc7_10.jpg",
    url: "https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/?couponCode=KEEPLEARNING",
    bestseller: true,
    description: "Pass the SAA-C03: EC2, S3, VPC, IAM, serverless, plus practice exams and hands-on labs."
  },
  {
    slug: "web-developer-bootcamp-2026",
    title: "The Web Developer Bootcamp 2026",
    provider: "Udemy",
    category: "Web Development",
    categorySlug: "web-development",
    instructor: "Colt Steele",
    instructorSlug: "colt-steele",
    rating: 4.7,
    reviews: 286415,
    price: 159.99,
    level: "Beginner",
    duration: "74h total",
    updated: "08/2026",
    image: "https://img-c.udemycdn.com/course/480x270/625204_436a_3.jpg",
    url: "https://www.udemy.com/course/the-web-developer-bootcamp/?couponCode=KEEPLEARNING",
    description: "The legendary bootcamp: HTML, CSS, JS, Node, Express, Mongo, auth, and deployment."
  },
  {
    slug: "complete-sql-bootcamp",
    title: "The Complete SQL Bootcamp: Go from Zero to Hero",
    provider: "Udemy",
    category: "Postgresql",
    categorySlug: "sql",
    instructor: "Jose Portilla",
    instructorSlug: "jose-portilla",
    rating: 4.7,
    reviews: 258007,
    price: 159.99,
    level: "Beginner",
    duration: "9h total",
    updated: "09/2026",
    image: "https://img-c.udemycdn.com/course/480x270/762616_7693_3.jpg",
    url: "https://www.udemy.com/course/the-complete-sql-bootcamp/?couponCode=KEEPLEARNING",
    bestseller: true,
    description: "PostgreSQL from SELECT to window functions, joins, and query optimization."
  },
  {
    slug: "react-complete-guide",
    title: "React - The Complete Guide (incl. Next.js, Redux)",
    provider: "Udemy",
    category: "Redux",
    categorySlug: "javascript",
    instructor: "Academind by Maximilian Schwarzmüller",
    instructorSlug: "academind",
    rating: 4.6,
    reviews: 242065,
    price: 199.99,
    level: "Intermediate",
    duration: "68h total",
    updated: "10/2026",
    image: "https://img-c.udemycdn.com/course/480x270/1362070_b9a1_2.jpg",
    url: "https://www.udemy.com/course/react-the-complete-guide-incl-redux/?couponCode=KEEPLEARNING",
    bestseller: true,
    description: "Hooks, Router, Redux, Next.js 15, Server Components, and TypeScript."
  },
  {
    slug: "angular-complete-guide",
    title: "Angular - The Complete Guide",
    provider: "Udemy",
    category: "Angular",
    categorySlug: "web-development",
    instructor: "Maximilian Schwarzmüller",
    instructorSlug: "academind",
    rating: 4.7,
    reviews: 224681,
    price: 129.99,
    level: "Intermediate",
    duration: "36h total",
    updated: "07/2026",
    image: "https://img-c.udemycdn.com/course/480x270/756150_c033_4.jpg",
    url: "https://www.udemy.com/course/the-complete-guide-to-angular-2/?couponCode=KEEPLEARNING",
    bestseller: true,
    description: "Standalone components, signals, RxJS, NgRx, and deployment."
  },
  {
    slug: "the-complete-agentic-ai-engineering-course",
    title: "AI Engineer Agentic Track: The Complete Agent & MCP Course",
    provider: "Udemy",
    category: "AI Agents & Agentic AI",
    categorySlug: "ai-agents",
    instructor: "Ed Donner",
    instructorSlug: "ed-donner",
    rating: 4.6,
    reviews: 1656,
    price: 18.99,
    level: "All levels",
    duration: "21h total",
    updated: "10/2026",
    image: "https://img-c.udemycdn.com/course/480x270/6566789_2e8a_10.jpg",
    url: "https://www.udemy.com/course/the-complete-agentic-ai-engineering-course/?couponCode=KEEPLEARNING",
    bestseller: true,
    description: "Master AI Agents in 30 days: build 8 real-world projects with OpenAI Agents SDK, CrewAI, LangGraph, AutoGen and MCP."
  },
  {
    slug: "the-ai-engineer-course-complete-ai-engineer-bootcamp",
    title: "The AI Engineer Course 2026: Complete AI Engineer Bootcamp",
    provider: "Udemy",
    category: "Artificial Intelligence (AI)",
    categorySlug: "artificial-intelligence",
    instructor: "365 Careers",
    instructorSlug: "365-careers",
    rating: 4.2,
    reviews: 1552,
    price: 16.99,
    level: "Beginner",
    duration: "8h total",
    updated: "10/2026",
    image: "https://img-c.udemycdn.com/course/480x270/6112535_7103.jpg",
    url: "https://www.udemy.com/course/the-ai-engineer-course-complete-ai-engineer-bootcamp/?couponCode=KEEPLEARNING",
    bestseller: true,
    description: "Complete AI Engineer Training: Python, NLP, Transformers, LLMs, LangChain, Hugging Face, APIs"
  },
  {
    slug: "playwright-tutorials-automation-testing",
    title: "Playwright JS/TS Automation Testing from Scratch & Framework",
    provider: "Udemy",
    category: "Microsoft Playwright",
    categorySlug: "microsoft-playwright",
    instructor: "Rahul Shetty Academy",
    instructorSlug: "rahul-shetty-academy",
    rating: 4.5,
    reviews: 1408,
    price: 13.99,
    level: "Intermediate",
    duration: "11h total",
    updated: "09/2026",
    image: "https://img-c.udemycdn.com/course/480x270/4574326_d02f_5.jpg",
    url: "https://www.udemy.com/course/playwright-tutorials-automation-testing/?couponCode=KEEPLEARNING",
    bestseller: true,
    description: "150k Learners- Playwright tutorials on TypeScript and JavaScript (Web - API )Testing, AI Agents, Cucumber, CI/CD etc."
  },
  {
    slug: "langchain",
    title: "LangChain- Agentic AI Engineering with LangChain & LangGraph",
    provider: "Udemy",
    category: "LangChain",
    categorySlug: "langchain",
    instructor: "Eden Marco",
    instructorSlug: "eden-marco",
    rating: 4.0,
    reviews: 1102,
    price: 17.99,
    level: "Beginner",
    duration: "9.5h total",
    updated: "10/2026",
    image: "https://img-c.udemycdn.com/course/480x270/5281528_8f36.jpg",
    url: "https://www.udemy.com/course/langchain/?couponCode=KEEPLEARNING",
    bestseller: true,
    description: "Facebook Ads and organic growth in 2026: targeting, creatives, and retargeting."
  },
];

export const courses: Course[] = [...featured, ...catalogCourses];

export function getCourse(slug: string) {
  return courses.find((c) => c.slug === slug);
}

export function formatReviews(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(0) + "K";
  return String(n);
}

export const providers = ["Udemy", "Coursera", "edX", "Udacity", "Pluralsight", "YouTube", "LinkedIn Learning"];
