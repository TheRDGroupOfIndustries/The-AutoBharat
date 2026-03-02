"use client";

import dynamic from "next/dynamic";
import React, { Suspense } from "react";

const GlobalOverlays = dynamic(() => import("./GlobalOverlays").then(mod => mod.GlobalOverlays), {
    ssr: false,
});

export function GlobalLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Suspense fallback={null}>
                <GlobalOverlays />
            </Suspense>
            {children}
        </>
    );
}
