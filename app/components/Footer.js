import Link from "next/link";

const tools = [
  { name: "AI Summarizer", href: "/" },
  { name: "AI Humanizer", href: "/ai-humanizer" },
  { name: "AI Paraphraser", href: "/ai-paraphrasing" },
  { name: "Bullet Point Generator", href: "/bullet-point-generator" },
];

const company = [
  { name: "Blog", href: "/blog" },
 
  { name: "Contact", href: "/contact" },
  { name: "Privacy Policy", href: "/privacy" },
];

function FooterLink({ href, children }) {
  return (
    <Link
      href={href}
      className="group inline-flex w-fit items-center gap-1.5 text-sm text-[#7A7F5C] transition-all duration-300 hover:translate-x-1 hover:text-[#5A6B2F]"
    >
      <span className="h-px w-0 bg-[#5A6B2F] transition-all duration-300 group-hover:w-3" />
      {children}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[#E4DBB8] bg-[#FBF8ED]">
      {/* Decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#E9D98F]/30 blur-3xl" />
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#B9C77E]/25 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="text-2xl font-semibold tracking-tight text-[#2F3620] transition-colors duration-300 hover:text-[#5A6B2F]"
            >
              Textora
            </Link>

            <p className="mt-3 max-w-sm text-sm leading-6 text-[#7A7F5C]">
              Simple AI-powered tools for summarizing, humanizing,
              paraphrasing and organizing your text.
            </p>

            <Link
              href="/contact"
              className="mt-5 inline-flex items-center gap-2 rounded-xl border border-[#E4DBB8] bg-[#FDFBF3] px-4 py-2 text-sm font-medium text-[#5A6B2F] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#F5EFD6] hover:shadow-md active:scale-[0.97]"
            >
              Get in touch
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M5 12h14m-6-6l6 6-6 6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-sm font-semibold text-[#2F3620]">Tools</h3>
            <div className="mt-4 flex flex-col gap-2.5">
              {tools.map((item) => (
                <FooterLink key={item.href} href={item.href}>
                  {item.name}
                </FooterLink>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-[#2F3620]">Textora</h3>
            <div className="mt-4 flex flex-col gap-2.5">
              {company.map((item) => (
                <FooterLink key={item.href} href={item.href}>
                  {item.name}
                </FooterLink>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-[#E4DBB8] pt-6 text-sm text-[#7A7F5C] sm:flex-row">
          <p>© {new Date().getFullYear()} Textora. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="transition-colors duration-300 hover:text-[#5A6B2F]"
            >
              Privacy
            </Link>
            <span className="h-1 w-1 rounded-full bg-[#C9BE8F]" />
            <Link
              href="/contact"
              className="transition-colors duration-300 hover:text-[#5A6B2F]"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}