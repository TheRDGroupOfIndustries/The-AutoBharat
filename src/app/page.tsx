"use client";

import { motion } from "framer-motion";
import { HeroSlider } from "@/components/HeroSlider";
import { BlogCard } from "@/components/BlogCard";
import { BlogCardSkeleton } from "@/components/BlogCardSkeleton";
import { InteractiveFooter } from "@/components/InteractiveFooter";
import { usePublishedPosts } from "@/hooks/usePosts";

const Index = () => {
  const { data: posts = [], isLoading, error } = usePublishedPosts();
  const featuredPosts = posts.slice(0, 3);
  const otherPosts = posts;

  return (
    <main>
      {featuredPosts.length > 0 ? (
        <HeroSlider posts={featuredPosts} />
      ) : (
        <section className="relative h-[80vh] w-full overflow-hidden bg-muted">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="space-y-4 w-full max-w-4xl px-6">
              <div className="h-12 bg-muted-foreground/10 rounded w-2/3" />
              <div className="h-6 bg-muted-foreground/10 rounded w-1/2" />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/20" />
        </section>
      )}

      <section className="max-w-6xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="accent-line mb-6" />
          <h2 className="text-display text-3xl sm:text-4xl tracking-wider">
            Latest Stories
          </h2>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[1, 2, 3, 4].map((i) => (
              <BlogCardSkeleton key={i} />
            ))}
          </div>
        ) : (error || posts.length === 0) ? (
          <div className="text-center py-20 border border-dashed border-border rounded-lg bg-card/50">
            <p className="text-display text-sm tracking-widest text-muted-foreground uppercase">no posts</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {otherPosts.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} />
            ))}
          </div>
        )}
      </section>

      <InteractiveFooter />
    </main>
  );
};

export default Index;
