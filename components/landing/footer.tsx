import Link from "next/link";
import { BrandLogo } from "@/components/shared/brand-logo";
import { SectionContainer } from "@/components/shared/section-container";
import { COPYRIGHT_YEAR, footerLinks } from "@/lib/landing-data";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[oklch(0.06_0.01_280)]">
      <SectionContainer className="py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <BrandLogo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-500">
              Resumes, portfolios, and websites in one workspace. Build what you
              need, publish when it is ready.
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              Product
            </p>
            <ul className="mt-4 space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              Company
            </p>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              Legal
            </p>
            <ul className="mt-4 space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row">
          <p className="text-sm text-zinc-600">
            © {COPYRIGHT_YEAR} Pflio. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Twitter", "LinkedIn", "GitHub"].map((social) => (
              <Link
                key={social}
                href="#"
                className="text-sm text-zinc-500 transition-colors hover:text-white"
              >
                {social}
              </Link>
            ))}
          </div>
        </div>
      </SectionContainer>
    </footer>
  );
}
