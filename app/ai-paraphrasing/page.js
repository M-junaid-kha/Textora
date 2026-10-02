"use client";

import Link from "next/link";
import SeoContent from "../components/Seo-contant";
import { useEffect, useRef, useState } from "react";

const tabs = [
  {
    name: "Summarizer",
    href: "/",
    icon: "M4 6h16M4 12h10M4 18h6",
  },
  {
    name: "Humanizer",
    href: "/ai-humanizer",
    icon: "M12 12a4 4 0 100-8 4 4 0 000 8zM4 20c0-3.3 3.6-6 8-6s8 2.7 8 6",
  },
  {
    name: "Paraphraser",
    href: "/ai-paraphrasing",
    icon: "M4 7h13l-3-3m3 3l-3 3M20 17H7l3-3m-3 3l3 3",
  },
  {
    name: "Bullet Points",
    href: "/bullet-point-generator",
    icon: "M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01",
  },
];

const chips = [
  "Free to use",
  "No sign-up needed",
  "PDF, DOC, DOCX & TXT",
  "Short, medium or long",
];

export default function Paraphrasing() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const [length, setLength] = useState(50);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const errorTimer = useRef(null);
  const successTimer = useRef(null);
  const resultRef = useRef(null);

  function showError(message) {
    setError(message);

    clearTimeout(errorTimer.current);
    errorTimer.current = setTimeout(() => {
      setError("");
    }, 5000);
  }

  function showSuccess(message) {
    setSuccess(message);

    clearTimeout(successTimer.current);
    successTimer.current = setTimeout(() => {
      setSuccess("");
    }, 3500);
  }

  useEffect(() => {
    return () => {
      clearTimeout(errorTimer.current);
      clearTimeout(successTimer.current);
    };
  }, []);

  async function handleFileUpload(event) {
    const file = event.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setFileLoading(true);
    setResult("");
    setError("");

    try {
      const response = await fetch("/api/extract", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not read the file.");
      }

      setText(data.text);
    } catch (error) {
      console.error(error);
      showError(error.message || "Could not read the file.");
    } finally {
      setFileLoading(false);
      event.target.value = "";
    }
  }

  async function paraphrase() {
    if (!text.trim()) return;

    setLoading(true);
    setResult("");
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/summarizer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          mode: "paraphrase",
          length,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setResult(data.result);
      showSuccess("Your paraphrased text is ready.");

      setTimeout(() => {
        resultRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 150);
    } catch (error) {
      console.error(error);
      showError(error.message || "Something went wrong.");
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
      showError("Could not access your clipboard.");
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
      showError("Could not copy the text.");
    }
  }

  const lengthLabel =
    length <= 33 ? "Short" : length <= 66 ? "Medium" : "Long";

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <main className="relative isolate overflow-hidden bg-[#FBF8ED] px-4 pb-10 pt-10 sm:pt-16">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 -top-24 h-96 w-96 animate-[floatA_14s_ease-in-out_infinite] rounded-full bg-[#E9D98F]/40 blur-3xl" />
        <div className="absolute -right-24 top-10 h-96 w-96 animate-[floatB_17s_ease-in-out_infinite] rounded-full bg-[#B9C77E]/40 blur-3xl" />
        <div className="absolute left-1/2 top-[520px] h-80 w-[36rem] -translate-x-1/2 animate-[floatA_20s_ease-in-out_infinite] rounded-full bg-[#EFE6C4]/70 blur-3xl" />
        <div
          className="absolute inset-0 animate-[dotsDrift_30s_linear_infinite] opacity-[0.35]"
          style={{
            backgroundImage: "radial-gradient(#C9BE8F 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            maskImage: "linear-gradient(to bottom, black 0%, transparent 55%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, transparent 55%)",
          }}
        />
      </div>

      {/* Success Popup */}
      {success && (
        <div
          role="status"
          aria-live="polite"
          className="fixed right-5 top-5 z-50 w-[calc(100%-40px)] max-w-sm animate-[slideInRight_0.45s_cubic-bezier(0.22,1,0.36,1)_both]"
        >
          <div className="rounded-2xl border border-[#C9D3A3] bg-[#FDFBF3] p-4 shadow-2xl shadow-[#3F4A22]/15">
            <div className="flex items-start gap-3">
              <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EEF2DC] text-[#5A6B2F]">
                <span className="absolute inset-0 animate-ping rounded-full bg-[#5A6B2F]/20 [animation-iteration-count:2]" />
                <svg
                  className="relative h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    d="M5 13l4 4L19 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="animate-[drawCheck_0.5s_ease-out_0.15s_both]"
                    strokeDasharray="24"
                  />
                </svg>
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-[#2F3620]">Done!</h3>
                <p className="mt-1 text-sm leading-5 text-[#7A7F5C]">
                  {success}
                </p>
              </div>

              <button
                onClick={() => setSuccess("")}
                className="text-xl leading-none text-[#7A7F5C] transition-all duration-300 hover:rotate-90 hover:text-[#2F3620]"
                aria-label="Close message"
              >
                ×
              </button>
            </div>

            <div className="mt-3 h-1 overflow-hidden rounded-full bg-[#E4DBB8]">
              <div className="h-full w-full animate-[shrink_3.5s_linear_forwards] rounded-full bg-[#5A6B2F]" />
            </div>
          </div>
        </div>
      )}

      {/* Error Popup */}
      {error && (
        <div className="fixed right-5 top-5 z-50 w-[calc(100%-40px)] max-w-sm animate-[slideInRight_0.45s_cubic-bezier(0.22,1,0.36,1)_both]">
          <div className="rounded-2xl border border-red-200 bg-[#FDFBF3] p-4 shadow-2xl">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 animate-[wiggle_0.6s_ease-in-out_0.3s_both] items-center justify-center rounded-full bg-red-100 text-red-600">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 8v4" strokeLinecap="round" />
                  <path d="M12 16h.01" strokeLinecap="round" />
                  <circle cx="12" cy="12" r="9" />
                </svg>
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-[#2F3620]">
                  Something went wrong
                </h3>
                <p className="mt-1 text-sm leading-5 text-[#7A7F5C]">
                  {error}
                </p>
              </div>

              <button
                onClick={() => setError("")}
                className="text-xl leading-none text-[#7A7F5C] transition-all duration-300 hover:rotate-90 hover:text-[#2F3620]"
                aria-label="Close error"
              >
                ×
              </button>
            </div>

            <div className="mt-3 h-1 overflow-hidden rounded-full bg-[#E4DBB8]">
              <div className="h-full w-full animate-[shrink_5s_linear_forwards] rounded-full bg-red-500" />
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-3xl">
        {/* Hero */}
        <div className="text-center">
          <span className="inline-flex animate-[popIn_0.6s_cubic-bezier(0.22,1,0.36,1)_both] items-center gap-2 rounded-full border border-[#E4DBB8] bg-[#FDFBF3]/80 px-3.5 py-1.5 text-xs font-medium text-[#5A6B2F] shadow-sm backdrop-blur transition-transform duration-300 hover:scale-105">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5A6B2F] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#5A6B2F]" />
            </span>
            Free AI Paraphraser
          </span>

          <h1 className="mt-5 animate-[fadeUp_0.7s_ease-out_0.1s_both] text-4xl font-semibold tracking-tight text-[#2F3620] sm:text-5xl">
            Rewrite any text in a{" "}
            <span className="animate-[gradientShift_5s_ease-in-out_infinite] bg-gradient-to-r from-[#5A6B2F] via-[#B8923A] to-[#5A6B2F] bg-[length:200%_auto] bg-clip-text text-transparent">
              fresh voice
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl animate-[fadeUp_0.7s_ease-out_0.2s_both] text-sm leading-7 text-[#7A7F5C] sm:text-base">
            Paste text or upload a document and rephrase it with different
            words and structures, while keeping the original meaning.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {chips.map((chip, i) => (
              <span
                key={chip}
                style={{ animationDelay: `${0.3 + i * 0.1}s` }}
                className="flex animate-[popIn_0.5s_cubic-bezier(0.22,1,0.36,1)_both] items-center gap-1.5 rounded-full border border-[#E4DBB8] bg-[#FDFBF3]/70 px-3 py-1 text-xs text-[#5F6444] backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-[#5A6B2F]/50 hover:bg-[#FDFBF3] hover:shadow-md"
              >
                <svg
                  className="h-3.5 w-3.5 text-[#5A6B2F]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    d="M5 13l4 4L19 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {chip}
              </span>
            ))}
          </div>
        </div>

        {/* Tool switcher */}
        <div className="mt-9 flex animate-[fadeUp_0.7s_ease-out_0.5s_both] justify-center">
          <div className="flex max-w-full gap-1 overflow-x-auto rounded-2xl border border-[#E4DBB8] bg-[#F5EFD6]/80 p-1 shadow-sm backdrop-blur">
            {tabs.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                className={`group flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2 text-sm transition-all duration-300 ${
                  tab.href === "/ai-paraphrasing"
                    ? "bg-[#5A6B2F] font-medium text-[#FBF8ED] shadow-md shadow-[#5A6B2F]/25"
                    : "text-[#7A7F5C] hover:-translate-y-0.5 hover:bg-[#FDFBF3] hover:text-[#2F3620] hover:shadow-sm"
                }`}
              >
                <svg
                  className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-125"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                >
                  <path
                    d={tab.icon}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                {tab.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Input card */}
        <div className="relative mt-6 animate-[fadeUp_0.8s_ease-out_0.65s_both]">
          <div className="absolute -inset-1 animate-[glowPulse_5s_ease-in-out_infinite] rounded-[28px] bg-gradient-to-br from-[#E9D98F]/60 via-[#B9C77E]/40 to-[#EFE6C4]/60 blur-xl" />

          <div className="relative overflow-hidden rounded-3xl border border-[#E4DBB8] bg-[#FDFBF3] shadow-xl shadow-[#3F4A22]/10 transition-shadow duration-500 focus-within:shadow-2xl focus-within:shadow-[#5A6B2F]/15">
            {/* Loading bar */}
            <div
              className={`absolute inset-x-0 top-0 z-10 h-0.5 overflow-hidden transition-opacity duration-300 ${
                loading || fileLoading ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="h-full w-1/3 animate-[loadingBar_1.2s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-transparent via-[#5A6B2F] to-transparent" />
            </div>

            {/* Toolbar */}
            <div className="flex flex-col gap-3 border-b border-[#E4DBB8] bg-gradient-to-r from-[#FDFBF3] to-[#F5EFD6]/60 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-[#2F3620]">
                  Length
                </span>

                <input
                  type="range"
                  min="10"
                  max="90"
                  value={length}
                  onChange={(e) => setLength(Number(e.target.value))}
                  className="w-36 cursor-pointer accent-[#5A6B2F]"
                />

                <span
                  key={lengthLabel}
                  className="w-16 animate-[popIn_0.35s_cubic-bezier(0.22,1,0.36,1)_both] rounded-md bg-[#EFE6C4] px-2 py-0.5 text-center text-xs font-medium text-[#5A6B2F]"
                >
                  {lengthLabel}
                </span>
              </div>

              <span className="flex items-center gap-1.5 text-xs text-[#7A7F5C]">
                <span
                  className={`h-1.5 w-1.5 rounded-full transition-all duration-500 ${
                    wordCount > 0
                      ? "scale-125 animate-pulse bg-[#5A6B2F]"
                      : "bg-[#C9BE8F]"
                  }`}
                />
                {wordCount} words
              </span>
            </div>

            {/* Textarea */}
            <div className="relative">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter or paste your text here, then click Paraphrase."
                className="h-64 w-full resize-none bg-transparent p-5 text-[#2F3620] outline-none placeholder:text-[#7A7F5C]/70 sm:h-72"
              />

              {!text && (
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <span className="flex h-14 w-14 animate-[float_4s_ease-in-out_infinite] items-center justify-center rounded-2xl bg-[#EFE6C4] text-[#5A6B2F] shadow-inner">
                    <svg
                      className="h-7 w-7"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path
                        d="M4 7h13l-3-3m3 3l-3 3M20 17H7l3-3m-3 3l3 3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>

                  <button
                    onClick={pasteText}
                    className="pointer-events-auto flex items-center gap-2 rounded-xl border border-[#E4DBB8] bg-[#FBF8ED] px-4 py-2 text-sm text-[#5A6B2F] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#F5EFD6] hover:shadow-md active:scale-[0.97]"
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
            <div className="flex flex-col gap-3 border-t border-[#E4DBB8] bg-[#FBF8ED] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <label className="group flex cursor-pointer items-center gap-2.5 text-sm text-[#7A7F5C] transition-colors hover:text-[#2F3620]">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E4DBB8] bg-[#FDFBF3] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-[#5A6B2F] group-hover:bg-[#5A6B2F] group-hover:text-[#FBF8ED]">
                  <svg
                    className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                  >
                    <path
                      d="M12 16V4m0 0L7 9m5-5l5 5M5 20h14"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>

                {fileLoading
                  ? "Reading file..."
                  : "Upload PDF, DOC, DOCX or TXT"}

                <input
                  type="file"
                  accept=".txt,.docx,.pdf,.doc"
                  onChange={handleFileUpload}
                  disabled={fileLoading}
                  className="hidden"
                />
              </label>

              <div className="flex gap-2">
                {text && (
                  <button
                    onClick={() => {
                      setText("");
                      setResult("");
                    }}
                    className="animate-[popIn_0.35s_cubic-bezier(0.22,1,0.36,1)_both] rounded-xl border border-[#E4DBB8] px-5 py-2.5 text-sm font-medium text-[#5A6B2F] transition-all duration-300 hover:bg-[#F5EFD6] active:scale-[0.97]"
                  >
                    Clear
                  </button>
                )}

                <button
                  onClick={paraphrase}
                  disabled={loading || fileLoading || !text.trim()}
                  className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#5A6B2F] to-[#6F7F38] px-7 py-2.5 text-sm font-medium text-[#FBF8ED] shadow-md shadow-[#5A6B2F]/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#5A6B2F]/30 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 sm:w-auto"
                >
                  {text.trim() && !loading && (
                    <span className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 animate-[shimmer_3.5s_ease-in-out_infinite] bg-white/25" />
                  )}

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

                  <span className="relative">
                    {loading ? "Paraphrasing..." : "Paraphrase"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Result */}
        {result && (
          <div
            ref={resultRef}
            className="mt-6 animate-[resultIn_0.6s_cubic-bezier(0.22,1,0.36,1)_both] overflow-hidden rounded-3xl border border-[#E4DBB8] bg-[#FDFBF3] shadow-xl shadow-[#3F4A22]/10"
          >
            <div className="flex items-center justify-between border-b border-[#E4DBB8] bg-gradient-to-r from-[#EEF2DC] to-[#FDFBF3] px-5 py-3.5">
              <h2 className="flex items-center gap-2 text-sm font-semibold text-[#2F3620]">
                <span className="flex h-6 w-6 animate-[popIn_0.5s_cubic-bezier(0.22,1,0.36,1)_0.2s_both] items-center justify-center rounded-lg bg-[#5A6B2F] text-[#FBF8ED]">
                  <svg
                    className="h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                Paraphrased Text
              </h2>

              <button
                onClick={copyResult}
                className={`rounded-lg border px-4 py-1.5 text-sm transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.95] ${
                  copied
                    ? "border-[#5A6B2F] bg-[#5A6B2F] text-[#FBF8ED]"
                    : "border-[#E4DBB8] bg-[#FDFBF3] text-[#5A6B2F] hover:bg-[#F5EFD6]"
                }`}
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>

            <div className="animate-[fadeUp_0.7s_ease-out_0.25s_both] whitespace-pre-wrap p-6 leading-7 text-[#3F4A22]">
              {result}
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }

        @keyframes drawCheck {
          from { stroke-dashoffset: 24; }
          to { stroke-dashoffset: 0; }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.85) translateY(8px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }

        @keyframes resultIn {
          0% { opacity: 0; transform: translateY(24px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(60px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes wiggle {
          0%, 100% { transform: rotate(0); }
          25% { transform: rotate(-12deg); }
          75% { transform: rotate(12deg); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes floatA {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, 30px) scale(1.1); }
        }

        @keyframes floatB {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-40px, 40px) scale(1.08); }
        }

        @keyframes dotsDrift {
          from { background-position: 0 0; }
          to { background-position: 26px 26px; }
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes glowPulse {
          0%, 100% { opacity: 0.45; }
          50% { opacity: 0.85; }
        }

        @keyframes shimmer {
          0% { transform: translateX(0) skewX(-12deg); }
          60%, 100% { transform: translateX(450%) skewX(-12deg); }
        }

        @keyframes loadingBar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <div className="mt-16 sm:mt-24">
        <SeoContent />
      </div>
    </main>
  );
}