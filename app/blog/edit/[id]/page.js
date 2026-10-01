"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

function createSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function EditBlog() {
  const params = useParams();
  const router = useRouter();
  const supabase = createClient();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadBlog();
  }, [params.id]);

  async function loadBlog() {
    setLoading(true);
    setError("");

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("You must be logged in to edit blogs.");
      }

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
          "You do not have permission to edit blogs."
        );
      }

      const { data: blog, error: blogError } = await supabase
        .from("blogs")
        .select("*")
        .eq("id", params.id)
        .eq("user_id", user.id)
        .maybeSingle();

      if (blogError) {
        throw blogError;
      }

      if (!blog) {
        throw new Error(
          "Blog not found or you do not have permission to edit it."
        );
      }

      setTitle(blog.title || "");
      setDescription(blog.description || "");
      setCategory(blog.category || "");
      setCoverImage(blog.cover_image || "");
      setContent(blog.content || "");
    } catch (error) {
      console.error(error);
      setError(error.message || "Could not load the blog.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setSaving(true);
    setError("");

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("You must be logged in.");
      }

      const slug = createSlug(title);

      if (!slug) {
        throw new Error("Please enter a valid blog title.");
      }

      const { data, error: updateError } = await supabase
        .from("blogs")
        .update({
          title: title.trim(),
          slug,
          description: description.trim(),
          category: category.trim() || null,
          cover_image: coverImage.trim() || null,
          content: content.trim(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", params.id)
        .eq("user_id", user.id)
        .select()
        .single();

      if (updateError) {
        throw updateError;
      }

      router.push(`/blog/${data.slug}`);
    } catch (error) {
      console.error(error);
      setError(error.message || "Could not update the blog.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FBF8ED] px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <p className="text-center text-[#7A7F5C]">
            Loading blog...
          </p>
        </div>
      </main>
    );
  }

  if (error && !title) {
    return (
      <main className="min-h-screen bg-[#FBF8ED] px-4 py-12">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
            <h1 className="text-xl font-semibold text-red-800">
              Could not load blog
            </h1>

            <p className="mt-2 text-sm text-red-700">
              {error}
            </p>

            <Link
              href="/blog/my-posts"
              className="mt-5 inline-flex rounded-lg bg-[#5A6B2F] px-4 py-2 text-sm font-medium text-[#FBF8ED]"
            >
              ← Back to My Blogs
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FBF8ED] px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <Link
            href="/blog/my-posts"
            className="text-sm font-medium text-[#5A6B2F] hover:underline"
          >
            ← Back to My Blogs
          </Link>

          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-[#2F3620] sm:text-4xl">
            Edit Blog
          </h1>

          <p className="mt-2 text-[#7A7F5C]">
            Update your article and save your changes.
          </p>
        </div>

        <div className="rounded-2xl border border-[#E4DBB8] bg-[#FDFBF3] p-5 shadow-lg shadow-[#3F4A22]/5 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#2F3620]">
                Blog title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full rounded-xl border border-[#E4DBB8] bg-[#FBF8ED] px-4 py-3 text-[#2F3620] outline-none focus:border-[#5A6B2F]"
              />
            </div>

            {/* Description */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#2F3620]">
                Short description
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full resize-none rounded-xl border border-[#E4DBB8] bg-[#FBF8ED] px-4 py-3 text-[#2F3620] outline-none focus:border-[#5A6B2F]"
              />
            </div>

            {/* Category + image */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-[#2F3620]">
                  Category
                </label>

                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="AI, Writing, Education..."
                  className="w-full rounded-xl border border-[#E4DBB8] bg-[#FBF8ED] px-4 py-3 text-[#2F3620] outline-none focus:border-[#5A6B2F]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#2F3620]">
                  Cover image URL
                </label>

                <input
                  type="url"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full rounded-xl border border-[#E4DBB8] bg-[#FBF8ED] px-4 py-3 text-[#2F3620] outline-none focus:border-[#5A6B2F]"
                />
              </div>
            </div>

            {/* Content */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#2F3620]">
                Blog content
              </label>

              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={20}
                required
                className="w-full resize-y rounded-xl border border-[#E4DBB8] bg-[#FBF8ED] px-4 py-3 leading-7 text-[#2F3620] outline-none focus:border-[#5A6B2F]"
              />
            </div>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Buttons */}
            <div className="flex flex-col gap-3 border-t border-[#E4DBB8] pt-6 sm:flex-row sm:justify-end">
              <Link
                href="/blog/my-posts"
                className="rounded-xl border border-[#E4DBB8] px-5 py-3 text-center text-sm font-medium text-[#5A6B2F] transition-colors hover:bg-[#F5EFD6]"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={saving}
                className="rounded-xl bg-[#5A6B2F] px-6 py-3 text-sm font-medium text-[#FBF8ED] transition-colors hover:bg-[#46541F] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}