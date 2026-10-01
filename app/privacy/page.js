import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Textora",
  description:
    "Learn how Textora collects, uses and protects your information when you use our AI text tools.",
};

// TODO: update these before publishing
const LAST_UPDATED = "October 1, 2026";
const CONTACT_EMAIL = "m.junaidkhanyt@gmail.com";

const sections = [
  {
    id: "consent",
    title: "Consent",
    body: [
      "By using Textora, you agree to this Privacy Policy and its terms. If you do not agree, please do not use the website.",
    ],
  },
  {
    id: "information-we-collect",
    title: "Information we collect",
    body: [
      "We only ask for the information we need, and we make it clear when we ask for it. Depending on how you use Textora, we may collect the following:",
    ],
    list: [
      "Account information: your name, email address and password when you create an account.",
      "Text and files you submit: the text you paste into our tools, and the documents (PDF, DOC, DOCX or TXT) you upload so we can extract their text.",
      "Blog content: titles, descriptions, categories, cover image links and the posts you write, if you publish on our blog.",
      "Messages: your name, email address and message when you contact us, along with any attachments or details you choose to share.",
      "Usage data: technical information such as IP address, browser type, device, pages visited and the date and time of your visit.",
    ],
  },
  {
    id: "how-we-use",
    title: "How we use your information",
    body: ["We use the information we collect to:"],
    list: [
      "Provide, operate and maintain Textora and its tools, including the Summarizer, AI Humanizer, Paraphraser and Bullet Point Generator.",
      "Create and manage your account and let you publish blog posts.",
      "Process the text and files you submit and return your results.",
      "Improve, personalize and expand the website and understand how it is used.",
      "Respond to your messages and provide support.",
      "Send important updates about your account or the website.",
      "Detect, prevent and address fraud, abuse and technical issues.",
    ],
  },
  {
    id: "your-text-and-files",
    title: "Your text and uploaded files",
    body: [
      "When you use a tool, the text you enter or the text extracted from your uploaded file is sent to our servers and to an AI service provider so that the summary, rewrite or bullet points can be generated. We use this content only to deliver the result you asked for.",
      "Please avoid submitting highly sensitive information such as passwords, financial details or government identification numbers. Textora is not intended for that kind of content.",
    ],
  },
  {
    id: "log-files",
    title: "Log files",
    body: [
      "Like most websites, Textora uses log files as part of normal hosting and analytics. These can include IP addresses, browser type, Internet Service Provider, date and time stamps, referring and exit pages and the number of clicks. This information is not used to personally identify you. We use it to analyze trends, administer the site and understand how visitors move around it.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies",
    body: [
      "Textora uses cookies and similar technologies to keep you signed in, remember your preferences and understand how the website is used. You can disable cookies in your browser settings, but some parts of the site, such as logging in, may not work properly without them.",
    ],
  },
  {
    id: "third-party-services",
    title: "Third-party services",
    body: [
      "We rely on trusted third-party providers to run Textora, for example for authentication and database hosting, website hosting and AI text processing. These providers only receive the information needed to perform their service and are expected to protect it.",
      "If we use advertising or analytics partners in the future, they may use cookies or similar technologies, and we will update this policy to say so. We do not control third-party cookies, so please review the privacy policies of those services for details.",
    ],
  },
  {
    id: "data-retention-security",
    title: "Data retention and security",
    body: [
      "We keep account and blog information for as long as your account is active or as needed to provide the service. You can ask us to delete your account and related data at any time.",
      "We take reasonable steps to protect your information, but no method of transmission or storage on the internet is completely secure, so we cannot guarantee absolute security.",
    ],
  },
  {
    id: "your-rights",
    title: "Your privacy rights",
    body: [
      "Depending on where you live, such as under the GDPR or the CCPA, you may have the right to:",
    ],
    list: [
      "Request a copy of the personal data we hold about you.",
      "Ask us to correct or delete your personal data.",
      "Object to or ask us to restrict certain uses of your data.",
      "Ask that we do not sell your personal data. We do not sell personal data.",
    ],
    after:
      "To exercise any of these rights, contact us. We aim to respond within one month.",
  },
  {
    id: "children",
    title: "Children's information",
    body: [
      "Protecting children online is important to us. Textora does not knowingly collect personal information from children under 13. If you believe your child has provided this kind of information on our website, please contact us immediately and we will do our best to remove it promptly.",
    ],
  },
  {
    id: "external-links",
    title: "Links to other websites",
    body: [
      "Textora may contain links to other websites, including links inside blog posts. This Privacy Policy does not apply to those websites, and we encourage you to read their privacy policies.",
    ],
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: [
      "We may update this Privacy Policy from time to time. When we do, we will change the date at the top of this page. We encourage you to review it periodically.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#FBF8ED] px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <span className="inline-block rounded-full bg-[#EFE6C4] px-3 py-1 text-xs font-medium text-[#5A6B2F]">
            Last updated {LAST_UPDATED}
          </span>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[#2F3620] sm:text-4xl">
            Privacy Policy
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm text-[#7A7F5C] sm:text-base">
            At Textora, your privacy is one of our main priorities. This policy
            explains what information we collect, how we use it and the choices
            you have. It applies to our online activities on this website only,
            not to information collected offline or through other channels.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
          {/* Table of contents */}
          <aside className="hidden lg:block">
            <nav className="sticky top-24 rounded-2xl border border-[#E4DBB8] bg-[#FDFBF3] p-4">
              <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-[#7A7F5C]">
                On this page
              </p>

              <ul className="space-y-0.5">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="block rounded-lg px-2 py-1.5 text-sm text-[#7A7F5C] transition-all duration-200 hover:translate-x-0.5 hover:bg-[#F5EFD6] hover:text-[#2F3620]"
                    >
                      {i + 1}. {s.title}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="#contact"
                    className="block rounded-lg px-2 py-1.5 text-sm text-[#7A7F5C] transition-all duration-200 hover:translate-x-0.5 hover:bg-[#F5EFD6] hover:text-[#2F3620]"
                  >
                    {sections.length + 1}. Contact us
                  </a>
                </li>
              </ul>
            </nav>
          </aside>

          {/* Content */}
          <div className="overflow-hidden rounded-2xl border border-[#E4DBB8] bg-[#FDFBF3] shadow-lg shadow-[#3F4A22]/5">
            {sections.map((s, i) => (
              <section
                key={s.id}
                id={s.id}
                className="scroll-mt-24 border-b border-[#E4DBB8] p-6 last:border-b-0 sm:p-8"
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#EFE6C4] text-xs font-semibold text-[#5A6B2F]">
                    {i + 1}
                  </span>

                  <h2 className="text-lg font-semibold tracking-tight text-[#2F3620]">
                    {s.title}
                  </h2>
                </div>

                <div className="mt-4 space-y-3 pl-0 text-sm leading-7 text-[#5F6444] sm:pl-10 sm:text-[15px]">
                  {s.body.map((p) => (
                    <p key={p}>{p}</p>
                  ))}

                  {s.list && (
                    <ul className="space-y-2.5">
                      {s.list.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <svg
                            className="mt-1.5 h-4 w-4 shrink-0 text-[#5A6B2F]"
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
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {s.after && <p>{s.after}</p>}
                </div>
              </section>
            ))}

            {/* Contact */}
            <section id="contact" className="scroll-mt-24 bg-[#FBF8ED] p-6 sm:p-8">
              <div className="flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#EFE6C4] text-xs font-semibold text-[#5A6B2F]">
                  {sections.length + 1}
                </span>

                <h2 className="text-lg font-semibold tracking-tight text-[#2F3620]">
                  Contact us
                </h2>
              </div>

              <div className="mt-4 pl-0 sm:pl-10">
                <p className="text-sm leading-7 text-[#5F6444] sm:text-[15px]">
                  If you have questions about this Privacy Policy or want to
                  exercise your privacy rights, we are happy to help.
                </p>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/contact"
                    className="rounded-xl bg-[#5A6B2F] px-5 py-2.5 text-center text-sm font-medium text-[#FBF8ED] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#46541F] hover:shadow-md active:scale-[0.98]"
                  >
                    Contact page
                  </Link>

                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="rounded-xl border border-[#E4DBB8] px-5 py-2.5 text-center text-sm font-medium text-[#5A6B2F] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#F5EFD6] active:scale-[0.98]"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}