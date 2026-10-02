"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

// TODO: update before publishing
const CONTACT_EMAIL = "m.junaidkhanyt@gmail.com";

const inputClass =
  "w-full rounded-xl border border-[#E4DBB8] bg-[#FBF8ED] px-4 py-3 text-sm text-[#2F3620] outline-none transition-all duration-200 placeholder:text-[#7A7F5C]/60 hover:border-[#C9BE8F] focus:border-[#5A6B2F] focus:bg-[#FDFBF3] focus:ring-4 focus:ring-[#5A6B2F]/10";

const topics = ["General question", "Report a problem", "Feature request", "Blog / partnership", "Privacy request"];

const info = [
  {
    title: "Email us",
    desc: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    icon: (
      <path
        d="M4 6h16a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 011-1zm0 1l8 6 8-6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Response time",
    desc: "We usually reply within 1–2 business days.",
    icon: (
      <path
        d="M12 7v5l3 2M12 3a9 9 0 100 18 9 9 0 000-18z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Privacy requests",
    desc: "Ask us to access or delete your data any time.",
    href: "/privacy",
    icon: (
      <path
        d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6l8-3z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
];

export default function ContactPage() {
  const supabase = createClient();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState(topics[0]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const { error } = await supabase.from("contact_messages").insert({
        name: name.trim(),
        email: email.trim(),
        topic,
        message: message.trim(),
      });

      if (error) {
        throw error;
      }

      setSuccess("Thanks for reaching out! We'll get back to you soon.");
      setName("");
      setEmail("");
      setTopic(topics[0]);
      setMessage("");
    } catch (error) {
      console.error(error);
      setError(error.message || "Could not send your message.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#FBF8ED] px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-[#2F3620] sm:text-4xl">
            Contact us
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-[#7A7F5C] sm:text-base">
            Have a question, found a bug or want to work with us? Send a
            message and we&apos;ll get back to you.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          {/* Info */}
          <div className="space-y-4">
            {info.map((item) => {
              const content = (
                <div className="group flex items-start gap-3 rounded-2xl border border-[#E4DBB8] bg-[#FDFBF3] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C9BE8F] hover:shadow-md hover:shadow-[#3F4A22]/5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EFE6C4] text-[#5A6B2F] transition-all duration-300 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-[#5A6B2F] group-hover:text-[#FBF8ED]">
                    <svg
                      className="h-[18px] w-[18px]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                    >
                      {item.icon}
                    </svg>
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#2F3620]">
                      {item.title}
                    </p>
                    <p className="mt-0.5 break-words text-sm text-[#7A7F5C]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );

              return item.href ? (
                <a key={item.title} href={item.href} className="block">
                  {content}
                </a>
              ) : (
                <div key={item.title}>{content}</div>
              );
            })}
          </div>

          {/* Form */}
          <div className="overflow-hidden rounded-2xl border border-[#E4DBB8] bg-[#FDFBF3] shadow-lg shadow-[#3F4A22]/5">
            <form onSubmit={handleSubmit}>
              <div className="space-y-5 p-5 sm:p-8">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-[#2F3620]"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      required
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-[#2F3620]"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="topic"
                    className="mb-2 block text-sm font-medium text-[#2F3620]"
                  >
                    Topic
                  </label>
                  <select
                    id="topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className={inputClass}
                  >
                    {topics.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="message"
                      className="text-sm font-medium text-[#2F3620]"
                    >
                      Message
                    </label>
                    <span className="text-xs text-[#7A7F5C]">
                      {message.length}/2000
                    </span>
                  </div>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help?"
                    rows={7}
                    maxLength={2000}
                    required
                    className={`${inputClass} resize-y leading-7`}
                  />
                </div>

                {error && (
                  <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        d="M12 8v5m0 3h.01M12 3a9 9 0 100 18 9 9 0 000-18z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {error}
                  </div>
                )}

                {success && (
                  <div className="flex items-start gap-3 rounded-xl border border-[#C9D3A3] bg-[#EEF2DC] px-4 py-3 text-sm text-[#3F4A22]">
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0"
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
                    {success}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3 border-t border-[#E4DBB8] bg-[#FBF8ED] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                <p className="text-xs text-[#7A7F5C]">
                  We only use your details to reply to you.
                </p>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#5A6B2F] px-6 py-2.5 text-sm font-medium text-[#FBF8ED] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#46541F] hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading && (
                    <svg
                      className="h-4 w-4 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                  )}
                  {loading ? "Sending..." : "Send message"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}