"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

function createSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const inputClass =
  "w-full rounded-xl border border-[#E4DBB8] bg-[#FBF8ED] px-4 py-3 text-sm text-[#2F3620] outline-none transition-all duration-200 placeholder:text-[#7A7F5C]/60 hover:border-[#C9BE8F] focus:border-[#5A6B2F] focus:bg-[#FDFBF3] focus:ring-4 focus:ring-[#5A6B2F]/10";

function Field({ label, hint, optional, children }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm font-medium text-[#2F3620]">{label}</label>
        {optional && (
          <span className="text-xs text-[#7A7F5C]">Optional</span>
        )}
      </div>
      {children}
      {hint && <p className="mt-2 text-xs text-[#7A7F5C]">{hint}</p>}
    </div>
  );
}

function SectionTitle({ number, title, desc }) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#EFE6C4] text-xs font-semibold text-[#5A6B2F]">
        {number}
      </span>
      <div>
        <h2 className="text-base font-semibold text-[#2F3620]">{title}</h2>
        <p className="mt-0.5 text-sm text-[#7A7F5C]">{desc}</p>
      </div>
    </div>
  );
}

export default function CreateBlog() {
  const router = useRouter();
  const supabase = createClient();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      // Check logged-in user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("You must be logged in to create a blog.");
      }

      // Check whether the user is an approved author
      const { data: author, error: authorError } = await supabase
        .from("blog_authors")
        .select("id")
        .eq("email", user.email)
        .maybeSingle();

      if (authorError) {
        throw authorError;
      }

      if (!author) {
        throw new Error(
          "You do not have permission to create blogs."
        );
      }

      const slug = createSlug(title);

      if (!slug) {
        throw new Error("Please enter a valid blog title.");
      }

      // Create blog
      const { data, error: blogError } = await supabase
        .from("blogs")
        .insert({
          user_id: user.id,
          title: title.trim(),
          slug,
          description: description.trim(),
          content: content.trim(),
          cover_image: coverImage.trim() || null,
          category: category.trim() || null,
        })
        .select()
        .single();

      if (blogError) {
        throw blogError;
      }

      router.push(`/blog/${data.slug}`);
    } catch (error) {
      console.error(error);
      setError(error.message || "Could not create your blog.");
    } finally {
      setLoading(false);
    }
  }

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <main className="min-h-screen bg-[#FBF8ED] px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-[#7A7F5C] transition-colors hover:text-[#5A6B2F]"
          >
            <svg
              className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Blog
          </Link>

          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-[#2F3620] sm:text-4xl">
            Write a Blog
          </h1>

          <p className="mt-2 text-[#7A7F5C]">
            Share something useful with the Textora community.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="overflow-hidden rounded-2xl border border-[#E4DBB8] bg-[#FDFBF3] shadow-lg shadow-[#3F4A22]/5">
            {/* Section 1: Basics */}
            <div className="space-y-6 p-5 sm:p-8">
              <SectionTitle
                number="1"
                title="Basic details"
                desc="Give your post a clear title and a short summary."
              />

              <Field label="Blog title">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter your blog title"
                  required
                  className={`${inputClass} text-base font-medium`}
                />
              </Field>

              <Field
                label="Short description"
                optional
                hint="Shown on the blog listing and in search results."
              >
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Briefly describe what your blog is about..."
                  rows={3}
                  className={`${inputClass} resize-none`}
                />
              </Field>
            </div>

            <div className="border-t border-[#E4DBB8]" />

            {/* Section 2: Details */}
            <div className="space-y-6 p-5 sm:p-8">
              <SectionTitle
                number="2"
                title="Category and cover"
                desc="Help readers find and recognise your post."
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Category" optional>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="AI, Writing, Education..."
                    className={inputClass}
                  />
                </Field>

                <Field label="Cover image URL" optional>
                  <input
                    type="url"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className={inputClass}
                  />
                </Field>
              </div>

              {coverImage.trim() && (
                <div className="overflow-hidden rounded-xl border border-[#E4DBB8] bg-[#F5EFD6]/50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={coverImage}
                    alt="Cover preview"
                    className="h-48 w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>

            <div className="border-t border-[#E4DBB8]" />

            {/* Section 3: Content */}
            <div className="space-y-6 p-5 sm:p-8">
              <SectionTitle
                number="3"
                title="Content"
                desc="Write the full body of your blog post."
              />

              <Field
                label="Blog content"
                hint="You can use plain text for now. We'll add a proper rich-text editor later."
              >
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your blog here..."
                  rows={18}
                  required
                  className={`${inputClass} resize-y leading-7`}
                />
              </Field>

              <div className="flex items-center gap-4 text-xs text-[#7A7F5C]">
                <span>{wordCount} words</span>
                <span className="h-1 w-1 rounded-full bg-[#C9BE8F]" />
                <span>{readTime} min read</span>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="px-5 pb-6 sm:px-8">
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
              </div>
            )}

            {/* Footer actions */}
            <div className="flex flex-col-reverse gap-3 border-t border-[#E4DBB8] bg-[#FBF8ED] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <p className="text-center text-xs text-[#7A7F5C] sm:text-left">
                Your post goes live as soon as you publish.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/blog"
                  className="rounded-xl border border-[#E4DBB8] px-5 py-2.5 text-center text-sm font-medium text-[#5A6B2F] transition-colors hover:bg-[#F5EFD6]"
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#5A6B2F] px-6 py-2.5 text-sm font-medium text-[#FBF8ED] shadow-sm transition-all duration-200 hover:bg-[#46541F] hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
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
                  {loading ? "Publishing..." : "Publish Blog"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}