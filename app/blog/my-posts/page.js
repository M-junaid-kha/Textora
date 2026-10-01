"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function MyPosts() {
  const supabase = createClient();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadBlogs();
  }, []);

  async function loadBlogs() {
    setLoading(true);
    setError("");

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("You must be logged in to view your blogs.");
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
          "You do not have permission to manage blogs."
        );
      }

      const { data, error: blogError } = await supabase
        .from("blogs")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (blogError) {
        throw blogError;
      }

      setBlogs(data || []);
    } catch (error) {
      console.error(error);
      setError(error.message || "Could not load your blogs.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const { error } = await supabase
        .from("blogs")
        .delete()
        .eq("id", id);

      if (error) {
        throw error;
      }

      setBlogs((currentBlogs) =>
        currentBlogs.filter((blog) => blog.id !== id)
      );
    } catch (error) {
      console.error(error);
      setError(error.message || "Could not delete the blog.");
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FBF8ED] px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <p className="text-center text-[#7A7F5C]">
            Loading your blogs...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FBF8ED] px-4 py-12">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Link
              href="/blog"
              className="text-sm font-medium text-[#5A6B2F] hover:underline"
            >
              ← Back to Blog
            </Link>

            <h1 className="mt-5 text-3xl font-bold tracking-tight text-[#2F3620] sm:text-4xl">
              My Blogs
            </h1>

            <p className="mt-2 text-[#7A7F5C]">
              Manage the blogs you have published.
            </p>
          </div>

          <Link
            href="/blog/create"
            className="inline-flex w-fit rounded-xl bg-[#5A6B2F] px-5 py-3 text-sm font-medium text-[#FBF8ED] transition-colors hover:bg-[#46541F]"
          >
            + Write a Blog
          </Link>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-8 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Blogs */}
        {!error && blogs.length > 0 ? (
          <div className="mt-10 space-y-5">
            {blogs.map((blog) => {
              const formattedDate = new Date(
                blog.created_at
              ).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              });

              return (
                <div
                  key={blog.id}
                  className="rounded-2xl border border-[#E4DBB8] bg-[#FDFBF3] p-5 shadow-sm sm:p-6"
                >
                  <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        {blog.category && (
                          <span className="rounded-full bg-[#EFE6C4] px-3 py-1 text-xs font-medium text-[#5A6B2F]">
                            {blog.category}
                          </span>
                        )}

                        <span className="text-xs text-[#7A7F5C]">
                          {formattedDate}
                        </span>
                      </div>

                      <h2 className="mt-3 text-xl font-semibold text-[#2F3620]">
                        {blog.title}
                      </h2>

                      {blog.description && (
                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#7A7F5C]">
                          {blog.description}
                        </p>
                      )}
                    </div>

                    <div className="flex shrink-0 flex-wrap gap-3">
                      <Link
                        href={`/blog/${blog.slug}`}
                        className="rounded-lg border border-[#E4DBB8] px-4 py-2 text-sm font-medium text-[#5A6B2F] transition-colors hover:bg-[#F5EFD6]"
                      >
                        View
                      </Link>

                      <Link
                        href={`/blog/edit/${blog.id}`}
                        className="rounded-lg border border-[#E4DBB8] px-4 py-2 text-sm font-medium text-[#5A6B2F] transition-colors hover:bg-[#F5EFD6]"
                      >
                        Edit
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleDelete(blog.id)}
                        className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          !error && (
            <div className="mt-10 rounded-2xl border border-[#E4DBB8] bg-[#FDFBF3] px-6 py-16 text-center">
              <h2 className="text-2xl font-semibold text-[#2F3620]">
                You haven't published any blogs yet.
              </h2>

              <p className="mt-2 text-[#7A7F5C]">
                Start writing your first article.
              </p>

              <Link
                href="/blog/create"
                className="mt-6 inline-flex rounded-xl bg-[#5A6B2F] px-5 py-3 text-sm font-medium text-[#FBF8ED] hover:bg-[#46541F]"
              >
                Write Your First Blog
              </Link>
            </div>
          )
        )}
      </div>
    </main>
  );
}