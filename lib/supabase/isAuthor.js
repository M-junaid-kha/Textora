import { createClient } from "@/lib/supabase/client";

export async function isAuthor() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return false;
  }

  const { data, error } = await supabase
    .from("blog_authors")
    .select("id")
    .eq("email", user.email)
    .maybeSingle();

  if (error) {
    console.error("Author check error:", error);
    return false;
  }

  return !!data;
}