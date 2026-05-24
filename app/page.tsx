import {
  Navbar,
  Hero,
  Features,
  HowItWorks,
  Testimonials,
  CTA,
  Footer,
} from "@/components/landing";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
