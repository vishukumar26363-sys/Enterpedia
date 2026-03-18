const baseGaps = [
  { title: "AI-Driven Local SEO for Small Biz", market: "$5B+ Market", status: "High Demand", industry: "AI/ML", potential: "High ($1M+)", difficulty: "Medium", strategy: "Develop a specialized LLM that crawls local business data and automates GMB optimization, review responses, and local citation building." },
  { title: "Micro-SaaS for Substack Growth", market: "$800M+ Market", status: "Unsolved", industry: "SaaS", potential: "High ($1M+)", difficulty: "Easy", strategy: "Build a cross-platform analytics dashboard that tracks subscriber churn and recommends content topics based on high-performing Substack niches." },
  { title: "No-Code CRM for Boutique Agencies", market: "$2B+ Market", status: "High Demand", industry: "SaaS", potential: "High ($1M+)", difficulty: "Medium", strategy: "Create a simplified CRM with built-in automation for client onboarding and project tracking specifically for 1-5 person creative agencies." },
  { title: "Automated Compliance for Crypto", market: "$10B+ Market", status: "Unsolved", industry: "AI/ML", potential: "Very High ($10M+)", difficulty: "Hard", strategy: "Implement a real-time monitoring tool that uses smart contract analysis to ensure DeFi protocols remain compliant with evolving global regulations." },
  { title: "Personalized Nutrition via Wearables", market: "$15B+ Market", status: "High Demand", industry: "HealthTech", potential: "Very High ($10M+)", difficulty: "Hard", strategy: "Integrate CGM and smartwatch data to provide real-time meal recommendations that optimize blood sugar and energy levels throughout the day." },
  { title: "B2B Marketplace for Recycled Plastics", market: "$50B+ Market", status: "Unsolved", industry: "E-commerce", potential: "Unicorn ($1B+)", difficulty: "Hard", strategy: "Establish a verified marketplace connecting plastic recyclers with manufacturers, featuring automated quality certification and logistics tracking." },
  { title: "Virtual Reality Training for Surgeons", market: "$4B+ Market", status: "High Demand", industry: "HealthTech", potential: "Very High ($10M+)", difficulty: "Hard", strategy: "Develop high-fidelity VR simulations for rare surgical procedures, allowing residents to practice in a risk-free, haptic-feedback environment." },
  { title: "AI Legal Assistant for Freelancers", market: "$1B+ Market", status: "Unsolved", industry: "AI/ML", potential: "High ($1M+)", difficulty: "Medium", strategy: "Build an AI tool that automatically reviews freelance contracts for predatory clauses and generates legally binding counter-offers." },
  { title: "Sustainable Packaging for E-com", market: "$100B+ Market", status: "High Demand", industry: "E-commerce", potential: "Unicorn ($1B+)", difficulty: "Medium", strategy: "Create a subscription service for reusable, IoT-tracked shipping containers that e-commerce brands can use to eliminate single-use plastic." },
  { title: "Mental Health Platform for Gamers", market: "$3B+ Market", status: "Unsolved", industry: "HealthTech", potential: "High ($1M+)", difficulty: "Easy", strategy: "Launch a community-focused app that provides gamified therapy and ergonomic advice specifically tailored to the lifestyle of professional and hardcore gamers." },
];

const industries = ["AI/ML", "SaaS", "E-commerce", "HealthTech"];
const potentials = ["High ($1M+)", "Very High ($10M+)", "Unicorn ($1B+)"];
const difficulties = ["Easy", "Medium", "Hard"];
const statuses = ["High Demand", "Unsolved"];

export const marketGapsData = Array.from({ length: 10000 }, (_, i) => {
  const base = baseGaps[i % baseGaps.length];
  return {
    id: `GAP-${(i + 1).toString().padStart(5, '0')}`,
    title: `${base.title} ${i > 9 ? `v${i}` : ''}`,
    market: base.market,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    industry: industries[Math.floor(Math.random() * industries.length)],
    potential: potentials[Math.floor(Math.random() * potentials.length)],
    difficulty: difficulties[Math.floor(Math.random() * difficulties.length)],
    strategy: base.strategy,
  };
});
