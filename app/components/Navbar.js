"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const tools = [
  {
    name: "Summarizer",
    href: "/",
    desc: "Condense long text into key points",
    color: "text-[#5A6B2F] bg-[#EFE6C4]",
    icon: (
      <path d="M4 6h16M4 12h10M4 18h6" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    name: "AI Humanizer",
    href: "/ai-humanizer",
    desc: "Make AI text sound natural",
    color: "text-[#5A6B2F] bg-[#EFE6C4]",
    icon: (
      <path d="M12 12a4 4 0 100-8 4 4 0 000 8zM4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    name: "Paraphraser",
    href: "/ai-paraphrasing",
    desc: "Rewrite text in a fresh voice",
    color: "text-[#5A6B2F] bg-[#EFE6C4]",
    icon: (
      <path d="M4 7h13l-3-3m3 3l-3 3M20 17H7l3-3m-3 3l3 3" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    name: "Bullet Points",
    href: "/bullet-point-generator",
    desc: "Turn paragraphs into clean lists",
    color: "text-[#5A6B2F] bg-[#EFE6C4]",
    icon: (
      <path d="M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
];

const links = [
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
  { name: "Privacy", href: "/privacy" },
];

function Chevron({ open }) {
  return (
    <svg
      className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? "rotate-180" : "group-hover/btn:translate-y-0.5"}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setToolsOpen(false);
  }, [pathname]);

  // Shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown on outside click / Escape
  useEffect(() => {
    const onClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setToolsOpen(false);
      }
    };
    const onKey = (e) => {
      if (e.key === "Escape") {
        setToolsOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href) => pathname === href;
  const toolActive = tools.some((t) => t.href === pathname);

  // Sliding underline + lift hover animation for top-level items
  const navItem = (active) =>
    `relative rounded-md px-3 py-2 text-sm transition-all duration-300 hover:-translate-y-0.5 hover:text-[#2F3620] after:absolute after:inset-x-3 after:bottom-1 after:h-0.5 after:origin-left after:rounded-full after:bg-[#5A6B2F] after:transition-transform after:duration-300 hover:after:scale-x-100 ${
      active
        ? "font-medium text-[#2F3620] after:scale-x-100"
        : "text-[#7A7F5C] after:scale-x-0"
    }`;

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled
          ? "border-[#E4DBB8] bg-[#FBF8ED]/80 shadow-sm shadow-[#3F4A22]/5 backdrop-blur-lg"
          : "border-transparent bg-[#FBF8ED]"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-semibold tracking-tight text-[#2F3620] transition-all duration-300 hover:tracking-wide hover:text-[#5A6B2F]"
        >
          Textora
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {/* Tools dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setToolsOpen((v) => !v)}
              aria-expanded={toolsOpen}
              aria-haspopup="true"
              className={`group/btn flex items-center gap-1.5 ${navItem(
                toolActive || toolsOpen
              )}`}
            >
              Tools
              <Chevron open={toolsOpen} />
            </button>

            <div
              className={`absolute right-0 top-full mt-2 w-80 origin-top-right rounded-2xl border border-[#E4DBB8] bg-[#FDFBF3] p-2 shadow-xl shadow-[#3F4A22]/10 transition-all duration-300 ${
                toolsOpen
                  ? "visible translate-y-0 scale-100 opacity-100"
                  : "invisible -translate-y-2 scale-95 opacity-0"
              }`}
            >
              {tools.map((tool, i) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  style={{ transitionDelay: toolsOpen ? `${i * 40}ms` : "0ms" }}
                  className={`group flex items-center gap-3 rounded-xl p-2.5 transition-all duration-300 hover:translate-x-1 hover:bg-[#F5EFD6] hover:shadow-sm ${
                    toolsOpen ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
                  } ${isActive(tool.href) ? "bg-[#F5EFD6]" : ""}`}
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-300 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-[#5A6B2F] group-hover:text-[#FBF8ED] ${tool.color}`}
                  >
                    <svg
                      className="h-[18px] w-[18px]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                    >
                      {tool.icon}
                    </svg>
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm font-medium text-[#2F3620] transition-colors duration-300 group-hover:text-[#5A6B2F]">
                      {tool.name}
                    </span>
                    <span className="block text-xs text-[#7A7F5C]">
                      {tool.desc}
                    </span>
                  </span>
                  <svg
                    className="h-4 w-4 -translate-x-2 text-[#5A6B2F] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>

          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={navItem(isActive(link.href))}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-[#3F4A22] transition-all duration-300 hover:bg-[#F5EFD6] active:scale-90 md:hidden"
        >
          <svg
            className={`h-5 w-5 transition-transform duration-300 ${mobileOpen ? "rotate-90" : ""}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
          >
            {mobileOpen ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`absolute inset-x-0 top-full overflow-y-auto border-t border-[#E4DBB8] bg-[#FBF8ED] transition-all duration-300 md:hidden ${
          mobileOpen
            ? "visible max-h-[calc(100vh-64px)] opacity-100"
            : "invisible max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-0.5 px-4 py-3">
          <button
            onClick={() => setMobileToolsOpen((v) => !v)}
            aria-expanded={mobileToolsOpen}
            className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-base text-[#2F3620] transition-all duration-300 hover:translate-x-1 hover:bg-[#F5EFD6] active:scale-[0.98]"
          >
            Tools
            <Chevron open={mobileToolsOpen} />
          </button>

          <div
            className={`grid transition-all duration-300 ${
              mobileToolsOpen
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="ml-3 space-y-0.5 border-l border-[#E4DBB8] pl-3">
                {tools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-300 hover:translate-x-1 hover:bg-[#F5EFD6] active:scale-[0.98] ${
                      isActive(tool.href) ? "bg-[#F5EFD6]" : ""
                    }`}
                  >
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-md transition-all duration-300 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-[#5A6B2F] group-hover:text-[#FBF8ED] ${tool.color}`}
                    >
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                      >
                        {tool.icon}
                      </svg>
                    </span>
                    <span className="text-sm text-[#3F4A22] transition-colors duration-300 group-hover:text-[#5A6B2F]">
                      {tool.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block rounded-lg px-3 py-3 text-base transition-all duration-300 hover:translate-x-1 hover:bg-[#F5EFD6] hover:text-[#2F3620] active:scale-[0.98] ${
                isActive(link.href)
                  ? "bg-[#F5EFD6] text-[#2F3620]"
                  : "text-[#6B7050]"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}