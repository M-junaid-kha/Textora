"use client";

import Link from "next/link";
import { useState } from "react";

const tabs = [
  { name: "Summarizer", href: "/" },
  { name: "Humanizer", href: "/ai-humanizer" },
  { name: "Paraphraser", href: "/ai-paraphrasing" },
  { name: "Bullet Points", href: "/bullet-point-generator" },
];

export default function Humanizer() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const [length, setLength] = useState(50);

  async function humanize() {
    if (!text.trim()) return;

    setLoading(true);
    setResult("");

    try {
      const response = await fetch("/api/summarizer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          mode: "humanize",
          length,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setResult(data.result);
    } catch (error) {
      console.error(error);
      setResult(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function pasteText() {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setText(clipboardText);
    } catch (error) {
      console.error(error);
    }
  }

  async function copyResult() {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      console.error(error);
    }
  }

  const lengthLabel =
    length <= 33 ? "Short" : length <= 66 ? "Medium" : "Long";

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <main className="min-h-screen bg-[#FBF8ED] px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-3xl">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-[#2F3620] sm:text-4xl">
            AI Humanizer
          </h1>
          <p className="mt-2 text-sm text-[#7A7F5C] sm:text-base">
            Rewrite AI-generated text so it sounds natural and human.
          </p>
        </div>

        {/* Tool switcher */}
        <div className="mt-8 flex justify-center">
          <div className="flex max-w-full gap-1 overflow-x-auto rounded-xl bg-[#F5EFD6] p-1">
            {tabs.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm transition-colors ${
                  tab.href === "/ai-humanizer"
                    ? "bg-[#FDFBF3] font-medium text-[#2F3620] shadow-sm"
                    : "text-[#7A7F5C] hover:text-[#2F3620]"
                }`}
              >
                {tab.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Input card */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-[#E4DBB8] bg-[#FDFBF3] shadow-lg shadow-[#3F4A22]/5">
          {/* Toolbar */}
          <div className="flex flex-col gap-3 border-b border-[#E4DBB8] px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-[#2F3620]">Length</span>
              <input
                type="range"
                min="10"
                max="90"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-36 cursor-pointer accent-[#5A6B2F]"
              />
              <span className="w-16 rounded-md bg-[#EFE6C4] px-2 py-0.5 text-center text-xs font-medium text-[#5A6B2F]">
                {lengthLabel}
              </span>
            </div>

            <span className="text-xs text-[#7A7F5C]">{wordCount} words</span>
          </div>

          {/* Textarea */}
          <div className="relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your AI-generated text here, then click Humanize."
              className="h-64 w-full resize-none bg-transparent p-5 text-[#2F3620] outline-none placeholder:text-[#7A7F5C]/70 sm:h-72"
            />

            {!text && (
              <div className="pointer-events-none absolute inset-x-0 bottom-5 flex justify-center">
                <button
                  onClick={pasteText}
                  className="pointer-events-auto flex items-center gap-2 rounded-lg border border-[#E4DBB8] bg-[#FBF8ED] px-4 py-2 text-sm text-[#5A6B2F] transition-colors hover:bg-[#F5EFD6]"
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                  >
                    <path
                      d="M9 4h6a1 1 0 011 1v1H8V5a1 1 0 011-1zM8 6H6a1 1 0 00-1 1v13a1 1 0 001 1h12a1 1 0 001-1V7a1 1 0 00-1-1h-2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Paste text
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2 border-t border-[#E4DBB8] bg-[#FBF8ED] px-5 py-4">
            {text && (
              <button
                onClick={() => {
                  setText("");
                  setResult("");
                }}
                className="rounded-lg border border-[#E4DBB8] px-5 py-2.5 text-sm font-medium text-[#5A6B2F] transition-colors hover:bg-[#F5EFD6]"
              >
                Clear
              </button>
            )}
            <button
              onClick={humanize}
              disabled={loading || !text.trim()}
              className="w-full rounded-lg bg-[#5A6B2F] px-6 py-2.5 text-sm font-medium text-[#FBF8ED] transition-colors hover:bg-[#46541F] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              {loading ? "Humanizing..." : "Humanize"}
            </button>
          </div>
        </div>

        {/* Result */}
        {result && (
          <div className="mt-6 overflow-hidden rounded-2xl border border-[#E4DBB8] bg-[#FDFBF3] shadow-lg shadow-[#3F4A22]/5">
            <div className="flex items-center justify-between border-b border-[#E4DBB8] px-5 py-3">
              <h2 className="text-sm font-semibold text-[#2F3620]">
                Humanized Text
              </h2>

              <button
                onClick={copyResult}
                className="rounded-lg border border-[#E4DBB8] px-4 py-1.5 text-sm text-[#5A6B2F] transition-colors hover:bg-[#F5EFD6]"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>

            <div className="whitespace-pre-wrap p-5 leading-7 text-[#3F4A22]">
              {result}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}