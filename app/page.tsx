import { existsSync } from "node:fs";
import path from "node:path";
import { profile } from "@/data/profile";
import { PortfolioShell } from "@/components/PortfolioShell";

function checkResume() {
  try {
    const resumePath = profile.links.resume?.replace(/^\//, "");
    if (!resumePath) return false;
    return existsSync(path.join(process.cwd(), "public", resumePath));
  } catch {
    return false;
  }
}

export default function Home() {
  const resumeAvailable = checkResume();

  return <PortfolioShell resumeAvailable={resumeAvailable} />;
}
