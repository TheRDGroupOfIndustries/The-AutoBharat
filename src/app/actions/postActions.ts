"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getPublishedPosts() {
    const posts = await prisma.post.findMany({
        where: { status: "published" },
        orderBy: { published_at: "desc" },
        include: { category: true },
    });

    return posts.map(p => ({
        ...p,
        category_name: p.category?.name || "Uncategorized",
    }));
}

export async function getPostBySlug(slug: string) {
    const post = await prisma.post.findUnique({
        where: { slug },
        include: { category: true },
    });

    if (!post) return null;
    return {
        ...post,
        category_name: post.category?.name || "Uncategorized",
    };
}

export async function getAllPosts() {
    const posts = await prisma.post.findMany({
        orderBy: { created_at: "desc" },
        include: { category: true },
    });
    return posts;
}

export async function getPostById(id: string) {
    return prisma.post.findUnique({ where: { id } });
}

export async function savePost(data: any, id?: string) {
    if (id) {
        await prisma.post.update({
            where: { id },
            data,
        });
    } else {
        await prisma.post.create({
            data: {
                ...data,
                category_id: data.category_id || null,
            },
        });
    }
    revalidatePath("/admin");
    revalidatePath("/admin/posts");
    revalidatePath("/"); // revalidate public pages if needed
    return { success: true };
}

export async function deletePost(id: string) {
    await prisma.post.delete({ where: { id } });
    revalidatePath("/admin");
    return { success: true };
}

export async function getAllCategories() {
    return prisma.category.findMany({
        orderBy: { name: "asc" },
    });
}

export async function addCategory(name: string, slug: string) {
    await prisma.category.create({
        data: { name, slug },
    });
    revalidatePath("/admin/categories");
    return { success: true };
}

export async function deleteCategory(id: string) {
    await prisma.category.delete({ where: { id } });
    revalidatePath("/admin/categories");
    return { success: true };
}
