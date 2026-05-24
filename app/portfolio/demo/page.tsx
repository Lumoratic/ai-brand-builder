import { PortfolioView } from "@/components/portfolio/PortfolioView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio — BrandSpark",
  description: "Your generated personal portfolio.",
};

export default function PortfolioDemoPage() {
  return <PortfolioView />;
}
