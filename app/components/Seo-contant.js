"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const highlights = [
  { title: "Smart Summaries", desc: "Summarize text and documents" },
  { title: "Accessible", desc: "Works on phone, tablet and desktop" },
  { title: "Output", desc: "Short, medium or long" },
];

const steps = [
  {
    title: "Add your text",
    desc: "Paste your text into the input box or upload a PDF, DOC, DOCX or TXT file.",
  },
  {
    title: "Choose the length",
    desc: "Use the slider above the tool to pick a short, medium or long summary.",
  },
  {
    title: "Click Summarize",
    desc: "Press the Summarize button and the AI starts working on your text.",
  },
  {
    title: "Copy your result",
    desc: "Copy the summary to your clipboard and paste it anywhere you like.",
  },
];

const features = [
  {
    title: "Adjustable Length",
    desc: "Set how short or detailed your summary should be using the length slider. The tool shapes the result to match your choice.",
  },
  {
    title: "Document Upload",
    desc: "Upload a PDF, DOC, DOCX or TXT file and the text is extracted for you, so there is no need to copy and paste long documents.",
  },
  {
    title: "Original Meaning Preserved",
    desc: "The summarizer keeps the key ideas and context of your writing while removing filler and repetition.",
  },
  {
    title: "Works on Any Content",
    desc: "Summarize essays, blog posts, articles, research papers, reports, emails and meeting notes.",
  },
  {
    title: "Free and Simple",
    desc: "No sign-up is needed. Paste your text, click a button and get your result in seconds.",
  },
  {
    title: "More Than Summaries",
    desc: "Textora also includes an AI Humanizer, a Paraphraser and a Bullet Point Generator, all in one place.",
  },
];

const tools = [
  {
    name: "AI Humanizer",
    href: "/ai-humanizer",
    desc: "Rewrite AI-generated text so it sounds natural and human, with smoother wording and sentence flow.",
  },
  {
    name: "AI Paraphraser",
    href: "/ai-paraphrasing",
    desc: "Rephrase any text in a fresh voice using different words and structures while keeping the meaning.",
  },
  {
    name: "Bullet Point Generator",
    href: "/bullet-point-generator",
    desc: "Turn dense paragraphs into clean, scannable bullet lists that are easy to read and share.",
  },
];

const reasons = [
  "Summarize pasted text or uploaded documents with one click.",
  "Choose a short, medium or long summary to fit your needs.",
  "Get clear, readable results that keep the main ideas intact.",
  "Handles blogs, articles, essays and other kinds of content.",
  "Save time by skipping the long reading and getting straight to the point.",
];

const faqs = [
  {
    q: "What is a summary?",
    a: "A summary is a shorter version of a longer text that covers only the most important points. It gives you the main ideas without the unnecessary details.",
  },
  {
    q: "Will the summarizer change the context of my writing?",
    a: "No. The tool is designed to pick out the main points of your content and shorten it while keeping the original context and meaning.",
  },
  {
    q: "Can I summarize a document file?",
    a: "Yes. You can upload a PDF, DOC, DOCX or TXT file, and Textora will read the text and prepare it for summarizing.",
  },
  {
    q: "Can I use it to shorten my college essay or research paper?",
    a: "Yes. The summarizer works well for essays, research papers, reports and other long-form writing.",
  },
  {
    q: "Is the summarizer free to use?",
    a: "Yes. You can start summarizing right away without creating an account.",
  },
  {
    q: "How do I adjust the summary length?",
    a: "Use the length slider above the tool. Move it toward Short for a brief overview or toward Long for a more detailed summary.",
  },
  {
    q: "What other tools does Textora offer?",
    a: "Along with the summarizer, you can use the AI Humanizer, the AI Paraphraser and the Bullet Point Generator from the tool switcher at the top of the page.",
  },
];

// Slide-up + fade when scrolled into view
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        show ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <Reveal className="text-center">
      {eyebrow && (
        <span className="inline-block rounded-full bg-[#EFE6C4] px-3 py-1 text-xs font-medium text-[#5A6B2F]">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#2F3620] sm:text-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-2 max-w-2xl text-sm text-[#7A7F5C] sm:text-base">
          {subtitle}
        </p>
      )}
      <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-gradient-to-r from-[#5A6B2F] to-[#B8923A]" />
    </Reveal>
  );
}

const cardBase =
  "rounded-2xl border border-[#E4DBB8] bg-[#FDFBF3] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#C9BE8F] hover:shadow-xl hover:shadow-[#3F4A22]/10";

export default function SeoContent() {
  return (
    <section className="relative px-4 pb-16 pt-4 sm:pb-20">
      <div className="mx-auto max-w-5xl space-y-20 sm:space-y-28">
        {/* Intro */}
        <div className="text-center">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-[#2F3620] sm:text-3xl">
              AI Text{" "}
              <span className="bg-gradient-to-r from-[#5A6B2F] via-[#B8923A] to-[#5A6B2F] bg-[length:200%_auto] bg-clip-text text-transparent">
                Summarizer
              </span>
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <div className="mx-auto mt-4 max-w-3xl space-y-3 text-sm leading-7 text-[#5F6444] sm:text-base">
              <p>
                The Textora AI Text Summarizer shortens your text while
                preserving all the main points it contains. It keeps the
                accuracy and the original context of your writing, so you get
                a summary you can trust.
              </p>
              <p>
                You can generate summaries for any type of content, including
                essays, blogs, articles, research papers, reports and large
                documents. Just enter your text, click Summarize and get a
                clear summary for free.
              </p>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {highlights.map((h, i) => (
              <Reveal key={h.title} delay={i * 120}>
                <div className={`${cardBase} group px-5 py-6`}>
                  <span className="mx-auto mb-3 block h-1.5 w-8 rounded-full bg-[#5A6B2F] transition-all duration-300 group-hover:w-14" />
                  <p className="text-sm font-semibold text-[#2F3620]">
                    {h.title}
                  </p>
                  <p className="mt-1 text-sm text-[#7A7F5C]">{h.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* How to */}
        <div>
          <SectionHeading
            eyebrow="Getting started"
            title="How to Summarize Text?"
            subtitle="Follow these simple steps to summarize your text with Textora."
          />

          <div className="relative mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Connecting line */}
            <div className="pointer-events-none absolute left-[12%] right-[12%] top-[38px] hidden h-px bg-gradient-to-r from-transparent via-[#C9BE8F] to-transparent lg:block" />

            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 120}>
                <div className={`${cardBase} group relative h-full p-5`}>
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#5A6B2F] text-sm font-semibold text-[#FBF8ED] shadow-md shadow-[#5A6B2F]/25 transition-all duration-300 group-hover:-rotate-6 group-hover:scale-110">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-sm font-semibold text-[#2F3620]">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-[#7A7F5C]">
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Features */}
        <div>
          <SectionHeading
            eyebrow="Features"
            title="Features of the AI Summarizer"
            subtitle="Everything you need to turn long content into short, clear summaries."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) * 120}>
                <div className={`${cardBase} group relative h-full overflow-hidden p-5`}>
                  <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#EFE6C4] opacity-0 transition-all duration-500 group-hover:scale-150 group-hover:opacity-70" />

                  <div className="relative">
                    <div className="mb-3 h-1 w-8 rounded-full bg-[#5A6B2F] transition-all duration-300 group-hover:w-16" />
                    <h3 className="text-sm font-semibold text-[#2F3620] transition-colors duration-300 group-hover:text-[#5A6B2F]">
                      {f.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-[#7A7F5C]">
                      {f.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Other tools */}
        <div>
          <SectionHeading
            eyebrow="More tools"
            title="Explore More Textora Tools"
            subtitle="Write, rewrite and refine your text with the rest of the toolkit."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {tools.map((tool, i) => (
              <Reveal key={tool.href} delay={i * 120}>
                <Link
                  href={tool.href}
                  className={`${cardBase} group block h-full p-5 hover:border-[#5A6B2F]`}
                >
                  <h3 className="text-sm font-semibold text-[#2F3620] transition-colors duration-300 group-hover:text-[#5A6B2F]">
                    {tool.name}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-[#7A7F5C]">
                    {tool.desc}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#5A6B2F]">
                    Try it
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
                      →
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Why + how it works */}
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className={`${cardBase} h-full p-6 sm:p-8`}>
              <h2 className="text-xl font-semibold tracking-tight text-[#2F3620]">
                Why Is Our Summarizer Useful?
              </h2>
              <ul className="mt-5 space-y-3">
                {reasons.map((r, i) => (
                  <li
                    key={r}
                    style={{ animationDelay: `${i * 80}ms` }}
                    className="group/item flex items-start gap-3 text-sm leading-6 text-[#5F6444] transition-transform duration-300 hover:translate-x-1"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#EFE6C4] text-[#5A6B2F] transition-all duration-300 group-hover/item:scale-110 group-hover/item:bg-[#5A6B2F] group-hover/item:text-[#FBF8ED]">
                      <svg
                        className="h-3 w-3"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <path
                          d="M5 13l4 4L19 7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className={`${cardBase} h-full p-6 sm:p-8`}>
              <h2 className="text-xl font-semibold tracking-tight text-[#2F3620]">
                How Does the Summarizer Work?
              </h2>
              <div className="mt-5 space-y-3 text-sm leading-7 text-[#5F6444]">
                <p>
                  Textora uses an AI-based approach that first reads your text
                  and identifies the sentences and ideas that matter most. It
                  then understands how those ideas connect to the rest of the
                  content.
                </p>
                <p>
                  Using modern language models, it rewrites those key ideas
                  into a shorter version that follows the length you selected,
                  so the summary stays accurate, clear and easy to read.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* FAQ */}
        <div>
          <SectionHeading
            eyebrow="FAQ"
            title="Frequently Asked Questions"
            subtitle="Quick answers to common questions about Textora and its features."
          />

          <div className="mx-auto mt-10 max-w-3xl space-y-3">
            {faqs.map((item, i) => (
              <Reveal key={item.q} delay={i * 70}>
                <details className="group rounded-xl border border-[#E4DBB8] bg-[#FDFBF3] px-5 py-4 transition-all duration-300 hover:border-[#C9BE8F] hover:shadow-md hover:shadow-[#3F4A22]/5 open:border-[#5A6B2F]/50 open:shadow-md open:shadow-[#3F4A22]/5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-[#2F3620] transition-colors duration-300 group-hover:text-[#5A6B2F] [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#EFE6C4] text-[#5A6B2F] transition-all duration-300 group-open:rotate-180 group-open:bg-[#5A6B2F] group-open:text-[#FBF8ED]">
                      <svg
                        className="h-3.5 w-3.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path
                          d="M6 9l6 6 6-6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </summary>

                  <p className="mt-3 animate-[seoDown_0.35s_ease-out_both] text-sm leading-7 text-[#7A7F5C]">
                    {item.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes seoDown {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}