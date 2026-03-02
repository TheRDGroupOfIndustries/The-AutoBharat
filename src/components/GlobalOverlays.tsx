"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AppSidebar } from "./AppSidebar";
import { SearchButton } from "./SearchOverlay";
import logoOpen from "../assets/logo2.png";

export function GlobalOverlays() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isAdmin = pathname?.startsWith("/admin");

    if (!mounted || isAdmin) return null;

    return (
        <>
            {isSidebarOpen && (
                <Link
                    href="/"
                    onClick={() => setIsSidebarOpen(false)}
                    className="fixed top-4 left-1/2 -translate-x-1/2 z-[60] transition-opacity duration-300"
                >
                    <img
                        src={logoOpen.src}
                        alt="The AutoBharat"
                        className="h-10 md:h-12 object-contain rounded"
                    />
                </Link>
            )}
            <AppSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
            <SearchButton isSidebarOpen={isSidebarOpen} />
        </>
    );
}
