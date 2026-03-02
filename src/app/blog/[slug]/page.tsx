import { Metadata } from 'next';
import prisma from '@/lib/prisma';
import BlogClient from './BlogClient';

type Props = {
    params: { slug: string }
};

export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {
    // fetch data
    const post = await prisma.post.findUnique({
        where: { slug: params.slug },
    });

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    return {
        title: post.meta_title || post.title,
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
