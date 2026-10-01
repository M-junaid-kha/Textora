import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default async function BlogPage() {
  const supabase = createClient();

  const { data: blogs, error } = await supabase
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Blog loading error:", error);
  }

  return (
    <main className="min-h-screen bg-[#FBF8ED] px-4 py-12">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-[#5A6B2F]">
            Textora Blog
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#2F3620] sm:text-5xl">
            Ideas, Tips & Insights
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#7A7F5C]">
            Explore articles about AI, writing, productivity, education,
            technology, and more.
          </p>
        </div>

        {/* Blog list */}
        {blogs && blogs.length > 0 ? (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => {
              const formattedDate = new Date(
                blog.created_at
              ).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              });

              return (
                <Link
                  key={blog.id}
                  href={`/blog/${blog.slug}`}
                  className="group overflow-hidden rounded-2xl border border-[#E4DBB8] bg-[#FDFBF3] shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* Cover image */}
                  {blog.cover_image ? (
                    <div className="h-48 overflow-hidden bg-[#F5EFD6]">
                      <img
                        src={blog.cover_image}
                        alt={blog.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="flex h-48 items-center justify-center bg-[#F5EFD6]">
                      <span className="text-4xl font-bold text-[#C8C09D]">
                        Textora
                      </span>
                    </div>
                  )}

                  {/* Card content */}
                  <div className="p-6">
                    {blog.category && (
                      <span className="inline-block rounded-full bg-[#EFE6C4] px-3 py-1 text-xs font-medium text-[#5A6B2F]">
                        {blog.category}
                      </span>
                    )}

                    <h2 className="mt-4 line-clamp-2 text-xl font-semibold leading-7 text-[#2F3620] transition-colors group-hover:text-[#5A6B2F]">
                      {blog.title}
                    </h2>

                    {blog.description && (
                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#7A7F5C]">
                        {blog.description}
                      </p>
                    )}

                    <div className="mt-5 flex items-center justify-between border-t border-[#E4DBB8] pt-4">
                      <span className="text-xs text-[#7A7F5C]">
                        {formattedDate}
                      </span>

                      <span className="text-sm font-medium text-[#5A6B2F]">
                        Read →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="mt-12 rounded-2xl border border-[#E4DBB8] bg-[#FDFBF3] px-6 py-16 text-center">
            <h2 className="text-2xl font-semibold text-[#2F3620]">
              No blogs yet
            </h2>

            <p className="mt-2 text-[#7A7F5C]">
              Check back soon for new articles.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}