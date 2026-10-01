import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default async function BlogPost({ params }) {
  const { slug } = await params;

  const supabase = createClient();

  const { data: blog, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("Blog loading error:", error);
    notFound();
  }

  if (!blog) {
    notFound();
  }

  const formattedDate = new Date(blog.created_at).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <main className="min-h-screen bg-[#FBF8ED] px-4 py-12">
      <article className="mx-auto max-w-4xl">
        {/* Back */}
        <Link
          href="/blog"
          className="text-sm font-medium text-[#5A6B2F] hover:underline"
        >
          ← Back to Blog
        </Link>

        {/* Header */}
        <div className="mt-8">
          {blog.category && (
            <span className="inline-block rounded-full bg-[#EFE6C4] px-3 py-1 text-xs font-medium text-[#5A6B2F]">
              {blog.category}
            </span>
          )}

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#2F3620] sm:text-5xl">
            {blog.title}
          </h1>

          {blog.description && (
            <p className="mt-5 text-lg leading-8 text-[#7A7F5C]">
              {blog.description}
            </p>
          )}

          <p className="mt-5 text-sm text-[#7A7F5C]">
            Published on {formattedDate}
          </p>
        </div>

        {/* Cover image */}
        {blog.cover_image && (
          <div className="mt-10 overflow-hidden rounded-2xl border border-[#E4DBB8]">
            <img
              src={blog.cover_image}
              alt={blog.title}
              className="h-auto w-full object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="mt-10 rounded-2xl border border-[#E4DBB8] bg-[#FDFBF3] p-6 shadow-sm sm:p-10">
          <div className="whitespace-pre-wrap text-base leading-8 text-[#3F4A22]">
            {blog.content}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-[#E4DBB8] pt-6">
          <Link
            href="/blog"
            className="inline-flex rounded-xl bg-[#5A6B2F] px-5 py-3 text-sm font-medium text-[#FBF8ED] transition-colors hover:bg-[#46541F]"
          >
            ← View all blogs
          </Link>
        </div>
      </article>
    </main>
  );
}