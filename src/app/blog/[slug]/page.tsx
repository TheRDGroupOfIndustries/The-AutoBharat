import { Metadata } from 'next';
import prisma from '@/lib/prisma';
import BlogClient from './BlogClient';

type Props = {
    params: Promise<{ slug: string }>
};

export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {
    const resolvedParams = await params;
    // fetch data
    const post = await prisma.post.findUnique({
        where: { slug: resolvedParams.slug },
    });

    if (!post) {
        return {
            title: 'The AutoBharat',
        };
    }

    return {
        title: "The AutoBharat",
        description: post.meta_description || post.excerpt,
        keywords: post.meta_keywords || undefined,
        openGraph: {
            title: post.meta_title || post.title,
            description: post.meta_description || post.excerpt || undefined,
            images: post.featured_image ? [post.featured_image] : undefined,
        }
    };
}

export default function Page() {
    return <BlogClient />;
}
