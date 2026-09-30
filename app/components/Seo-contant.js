import Link from "next/link";

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

function SectionHeading({ title, subtitle }) {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold tracking-tight text-[#2F3620] sm:text-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-2 max-w-2xl text-sm text-[#7A7F5C] sm:text-base">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default function SeoContent() {
  return (
    <section className="bg-[#FBF8ED] px-4 pb-16 pt-4 sm:pb-20">
      <div className="mx-auto max-w-5xl space-y-16 sm:space-y-20">
        {/* Intro */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-[#2F3620] sm:text-3xl">
            AI Text Summarizer
          </h2>
          <div className="mx-auto mt-4 max-w-3xl space-y-3 text-sm leading-7 text-[#5F6444] sm:text-base">
            <p>
              The Textora AI Text Summarizer shortens your text while
              preserving all the main points it contains. It keeps the
              accuracy and the original context of your writing, so you get a
              summary you can trust.
            </p>
            <p>
              You can generate summaries for any type of content, including
              essays, blogs, articles, research papers, reports and large
              documents. Just enter your text, click Summarize and get a clear
              summary for free.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {highlights.map((h) => (
              <div
                key={h.title}
                className="rounded-2xl border border-[#E4DBB8] bg-[#FDFBF3] px-5 py-5"
              >
                <p className="text-sm font-semibold text-[#2F3620]">
                  {h.title}
                </p>
                <p className="mt-1 text-sm text-[#7A7F5C]">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How to */}
        <div>
          <SectionHeading
            title="How to Summarize Text?"
            subtitle="Follow these simple steps to summarize your text with Textora."
          />

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="rounded-2xl border border-[#E4DBB8] bg-[#FDFBF3] p-5"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#5A6B2F] text-sm font-semibold text-[#FBF8ED]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-sm font-semibold text-[#2F3620]">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm leading-6 text-[#7A7F5C]">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div>
          <SectionHeading
            title="Features of the AI Summarizer"
            subtitle="Everything you need to turn long content into short, clear summaries."
          />

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-[#E4DBB8] bg-[#FDFBF3] p-5"
              >
                <div className="mb-3 h-1 w-8 rounded-full bg-[#5A6B2F]" />
                <h3 className="text-sm font-semibold text-[#2F3620]">
                  {f.title}
                </h3>
                <p className="mt-1 text-sm leading-6 text-[#7A7F5C]">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Other tools */}
        <div>
          <SectionHeading
            title="Explore More Textora Tools"
            subtitle="Write, rewrite and refine your text with the rest of the toolkit."
          />

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group rounded-2xl border border-[#E4DBB8] bg-[#FDFBF3] p-5 transition-colors hover:border-[#5A6B2F]"
              >
                <h3 className="text-sm font-semibold text-[#2F3620]">
                  {tool.name}
                </h3>
                <p className="mt-1 text-sm leading-6 text-[#7A7F5C]">
                  {tool.desc}
                </p>
                <span className="mt-3 inline-block text-sm font-medium text-[#5A6B2F]">
                  Try it{" "}
                  <span className="inline-block transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Why + how it works */}
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-[#E4DBB8] bg-[#FDFBF3] p-6 sm:p-8">
            <h2 className="text-xl font-semibold tracking-tight text-[#2F3620]">
              Why Is Our Summarizer Useful?
            </h2>
            <ul className="mt-4 space-y-3">
              {reasons.map((r) => (
                <li
                  key={r}
                  className="flex items-start gap-3 text-sm leading-6 text-[#5F6444]"
                >
                  <svg
                    className="mt-1 h-4 w-4 shrink-0 text-[#5A6B2F]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {r}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-[#E4DBB8] bg-[#FDFBF3] p-6 sm:p-8">
            <h2 className="text-xl font-semibold tracking-tight text-[#2F3620]">
              How Does the Summarizer Work?
            </h2>
            <div className="mt-4 space-y-3 text-sm leading-7 text-[#5F6444]">
              <p>
                Textora uses an AI-based approach that first reads your text
                and identifies the sentences and ideas that matter most. It
                then understands how those ideas connect to the rest of the
                content.
              </p>
              <p>
                Using modern language models, it rewrites those key ideas into
                a shorter version that follows the length you selected, so the
                summary stays accurate, clear and easy to read.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div>
          <SectionHeading
            title="Frequently Asked Questions"
            subtitle="Quick answers to common questions about Textora and its features."
          />

          <div className="mx-auto mt-8 max-w-3xl space-y-3">
            {faqs.map((item) => (
              <details
                key={item.q}
                className="group rounded-xl border border-[#E4DBB8] bg-[#FDFBF3] px-5 py-4"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-[#2F3620] [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <svg
                    className="h-4 w-4 shrink-0 text-[#7A7F5C] transition-transform duration-200 group-open:rotate-180"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      d="M6 9l6 6 6-6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </summary>
                <p className="mt-3 text-sm leading-7 text-[#7A7F5C]">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}