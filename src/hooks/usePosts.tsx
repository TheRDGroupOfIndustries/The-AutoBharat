import { useQuery } from "@tanstack/react-query";
import { getPublishedPosts, getPostBySlug as getPostBySlugAction } from "@/app/actions/postActions";

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  featured_image: string | null;
  category_id: string | null;
  category_name?: string;
  status: string;
  published_at: Date | null;
  created_at: Date;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  ad_html: string | null;
  og_image: string | null;
  hinglish_content: string | null;
}

export function usePublishedPosts() {
  return useQuery({
    queryKey: ["published-posts"],
    queryFn: async () => {
      const data = await getPublishedPosts();
      return (data || []) as unknown as Post[];
    },
  });
}

export function usePostBySlug(slug: string | undefined) {
  return useQuery({
    queryKey: ["post", slug],
    queryFn: async () => {
      if (!slug) return null;
      const data = await getPostBySlugAction(slug);
      if (!data) return null;
      return data as unknown as Post;
    },
    enabled: !!slug,
  });
}
