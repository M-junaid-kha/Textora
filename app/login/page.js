"use client";

import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

const inputClass =
  "w-full rounded-xl border border-[#E4DBB8] bg-[#FBF8ED] px-4 py-3 text-sm text-[#2F3620] outline-none transition-all duration-200 placeholder:text-[#7A7F5C]/60 hover:border-[#C9BE8F] focus:border-[#5A6B2F] focus:bg-[#FDFBF3] focus:ring-4 focus:ring-[#5A6B2F]/10";

export default function Login() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(event) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      window.location.href = "/";
    } catch (error) {
      console.error(error);
      setError(error.message || "Could not log in.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FBF8ED] px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center">
          <Link
            href="/"
            className="text-2xl font-semibold tracking-tight text-[#2F3620] transition-colors hover:text-[#5A6B2F]"
          >
            Textora
          </Link>

          <h1 className="mt-8 text-3xl font-semibold tracking-tight text-[#2F3620]">
            Welcome back
          </h1>

          <p className="mt-2 text-sm text-[#7A7F5C]">
            Log in to manage and publish your blogs.
          </p>
        </div>

        {/* Card */}
        <div className="mt-8 rounded-2xl border border-[#E4DBB8] bg-[#FDFBF3] p-6 shadow-xl shadow-[#3F4A22]/5 sm:p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
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

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-[#2F3620]"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                  required
                  className={`${inputClass} pr-12`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-[#7A7F5C] transition-colors hover:text-[#5A6B2F]"
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                  >
                    {showPassword ? (
                      <path
                        d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8M9.9 5.1A9.8 9.8 0 0112 5c5 0 8.5 4.5 9.5 7a11.7 11.7 0 01-2.7 3.9M6.6 6.6A11.7 11.7 0 002.5 12c1 2.5 4.5 7 9.5 7a9.7 9.7 0 004.1-.9"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    ) : (
                      <path
                        d="M2.5 12C3.5 9.5 7 5 12 5s8.5 4.5 9.5 7c-1 2.5-4.5 7-9.5 7s-8.5-4.5-9.5-7zM12 15a3 3 0 100-6 3 3 0 000 6z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            {/* Error */}
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

            {/* Login button */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#5A6B2F] px-5 py-3 text-sm font-medium text-[#FBF8ED] shadow-sm transition-all duration-200 hover:bg-[#46541F] hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
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
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>

          {/* Signup */}
          <div className="mt-6 border-t border-[#E4DBB8] pt-6">
            <p className="text-center text-sm text-[#7A7F5C]">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-medium text-[#5A6B2F] underline-offset-4 transition-colors hover:text-[#46541F] hover:underline"
              >
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}