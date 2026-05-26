import { PortfolioPageContent } from "@/components/portfolio/PortfolioPageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio — BrandSpark",
  description: "Your generated personal portfolio.",
};

export default function PortfolioDemoPage() {
  return <PortfolioPageContent />;
}
