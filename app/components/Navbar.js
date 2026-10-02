"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const tools = [
  {
    name: "Summarizer",
    href: "/",
    desc: "Condense long text into key points",
    color: "text-[#5A6B2F] bg-[#EFE6C4]",
    icon: (
      <path
        d="M4 6h16M4 12h10M4 18h6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    name: "AI Humanizer",
    href: "/ai-humanizer",
    desc: "Make AI text sound natural",
    color: "text-[#5A6B2F] bg-[#EFE6C4]",
    icon: (
      <path
        d="M12 12a4 4 0 100-8 4 4 0 000 8zM4 20c0-3.3 3.6-6 8-6s8 2.7 8 6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    name: "Paraphraser",
    href: "/ai-paraphrasing",
    desc: "Rewrite text in a fresh voice",
    color: "text-[#5A6B2F] bg-[#EFE6C4]",
    icon: (
      <path
        d="M4 7h13l-3-3m3 3l-3 3M20 17H7l3-3m-3 3l3 3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    name: "Bullet Points",
    href: "/bullet-point-generator",
    desc: "Turn paragraphs into clean lists",
    color: "text-[#5A6B2F] bg-[#EFE6C4]",
    icon: (
      <path
        d="M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
      className={`h-3.5 w-3.5 transition-transform duration-300 ${
        open ? "rotate-180" : "group-hover/btn:translate-y-0.5"
      }`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      className="h-4 w-4 transition-transform duration-300 group-hover/write:rotate-90"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg
      className="h-4 w-4 transition-transform duration-300 group-hover/out:translate-x-0.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
    >
      <path
        d="M15 4h3a2 2 0 012 2v12a2 2 0 01-2 2h-3M10 8l-4 4m0 0l4 4m-4-4h11"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  const [user, setUser] = useState(null);
  const [isAuthor, setIsAuthor] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  const dropdownRef = useRef(null);

  // Create the client once instead of on every render
  const supabase = useMemo(() => createClient(), []);

  // Check logged-in user
  useEffect(() => {
    let mounted = true;

    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!mounted) return;

      setUser(user);

      if (user?.email) {
        const { data, error } = await supabase
          .from("blog_authors")
          .select("id")
          .eq("email", user.email)
          .maybeSingle();

        if (!error && data) {
          setIsAuthor(true);
        } else {
          setIsAuthor(false);
        }
      } else {
        setIsAuthor(false);
      }

      setAuthLoading(false);
    }

    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      checkUser();
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  // Logout
  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null);
    setIsAuthor(false);
    window.location.href = "/";
  }

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setToolsOpen(false);
    setMobileToolsOpen(false);
  }, [pathname]);

  // Shadow + scroll progress
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);

      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
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
      {/* Scroll progress */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gradient-to-r from-[#5A6B2F] via-[#B8923A] to-[#5A6B2F] transition-opacity duration-300 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
        style={{ transform: `scaleX(${progress})` }}
      />

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
                  style={{
                    transitionDelay: toolsOpen ? `${i * 40}ms` : "0ms",
                  }}
                  className={`group flex items-center gap-3 rounded-xl p-2.5 transition-all duration-300 hover:translate-x-1 hover:bg-[#F5EFD6] hover:shadow-sm ${
                    toolsOpen
                      ? "translate-y-0 opacity-100"
                      : "translate-y-1 opacity-0"
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
                    <path
                      d="M9 6l6 6-6 6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
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

          {/* Author link */}
          {!authLoading && user && isAuthor && (
            <Link
              href="/blog/my-posts"
              className={navItem(isActive("/blog/my-posts"))}
            >
              My Blogs
            </Link>
          )}

          {/* Divider */}
          <span className="mx-3 h-5 w-px bg-[#E4DBB8]" />

          {/* Auth loading placeholder (prevents layout shift) */}
          {authLoading && (
            <div className="flex items-center gap-2">
              <span className="h-8 w-16 animate-pulse rounded-lg bg-[#EFE6C4]" />
              <span className="h-8 w-20 animate-pulse rounded-lg bg-[#EFE6C4]" />
            </div>
          )}

          {/* Logged-out buttons */}
          {!authLoading && !user && (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="rounded-xl px-4 py-2 text-sm font-medium text-[#5A6B2F] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#F5EFD6]"
              >
                Log in
              </Link>

              <Link
                href="/signup"
                className="rounded-xl bg-[#5A6B2F] px-4 py-2 text-sm font-medium text-[#FBF8ED] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#46541F] hover:shadow-md active:scale-[0.98]"
              >
                Sign up
              </Link>
            </div>
          )}

          {/* Logged-in buttons */}
          {!authLoading && user && (
            <div className="flex items-center gap-2">
              {isAuthor && (
                <Link
                  href="/blog/create"
                  className="group/write flex items-center gap-1.5 rounded-xl bg-[#5A6B2F] px-4 py-2 text-sm font-medium text-[#FBF8ED] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#46541F] hover:shadow-md active:scale-[0.98]"
                >
                  <PlusIcon />
                  Write Blog
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="group/out flex items-center gap-1.5 rounded-xl border border-[#E4DBB8] px-3.5 py-2 text-sm font-medium text-[#7A7F5C] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C9BE8F] hover:bg-[#F5EFD6] hover:text-[#2F3620] active:scale-[0.98]"
              >
                <LogoutIcon />
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-[#3F4A22] transition-all duration-300 hover:bg-[#F5EFD6] active:scale-90 md:hidden"
        >
          <svg
            className={`h-5 w-5 transition-transform duration-300 ${
              mobileOpen ? "rotate-90" : ""
            }`}
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
        className={`absolute inset-x-0 top-full overflow-y-auto border-t border-[#E4DBB8] bg-[#FBF8ED] shadow-xl shadow-[#3F4A22]/10 transition-all duration-300 md:hidden ${
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

          {/* Mobile author links */}
          {!authLoading && user && isAuthor && (
            <>
              <Link
                href="/blog/my-posts"
                className={`block rounded-lg px-3 py-3 text-base transition-all duration-300 hover:translate-x-1 hover:bg-[#F5EFD6] active:scale-[0.98] ${
                  isActive("/blog/my-posts")
                    ? "bg-[#F5EFD6] text-[#2F3620]"
                    : "text-[#6B7050]"
                }`}
              >
                My Blogs
              </Link>

              <Link
                href="/blog/create"
                className="group/write mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#5A6B2F] px-3 py-3 text-base font-medium text-[#FBF8ED] shadow-sm transition-all duration-300 hover:bg-[#46541F] active:scale-[0.98]"
              >
                <PlusIcon />
                Write Blog
              </Link>
            </>
          )}

          {/* Mobile auth */}
          {!authLoading && !user && (
            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-[#E4DBB8] pt-4">
              <Link
                href="/login"
                className="rounded-xl border border-[#E4DBB8] px-3 py-3 text-center text-sm font-medium text-[#5A6B2F] transition-all duration-300 hover:bg-[#F5EFD6] active:scale-[0.98]"
              >
                Log in
              </Link>

              <Link
                href="/signup"
                className="rounded-xl bg-[#5A6B2F] px-3 py-3 text-center text-sm font-medium text-[#FBF8ED] shadow-sm transition-all duration-300 hover:bg-[#46541F] active:scale-[0.98]"
              >
                Sign up
              </Link>
            </div>
          )}

          {!authLoading && user && (
            <button
              onClick={handleLogout}
              className="group/out mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-[#E4DBB8] px-3 py-3 text-base text-[#7A7F5C] transition-all duration-300 hover:bg-[#F5EFD6] hover:text-[#2F3620] active:scale-[0.98]"
            >
              <LogoutIcon />
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}