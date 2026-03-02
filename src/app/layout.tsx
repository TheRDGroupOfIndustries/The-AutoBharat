import "./globals.css";
import { Providers } from "./providers";
import { GlobalLayout } from "@/components/GlobalLayout";

export const metadata = {
    title: {
        template: '%s | The AutoBharat',
        default: 'The AutoBharat',
    },
    description: "The AutoBharat is your premier destination for the latest automotive news, reviews, and insights in India.",
    keywords: ["automotive news", "car reviews", "India cars", "AutoBharat", "bikes", "auto industry"],
    openGraph: {
        title: "The AutoBharat",
        description: "The AutoBharat is your premier destination for the latest automotive news, reviews, and insights in India.",
        url: "https://the-auto-bharat.vercel.app",
        siteName: "The AutoBharat",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "The AutoBharat",
        description: "The AutoBharat is your premier destination for the latest automotive news, reviews, and insights in India.",
    },
};

export const dynamic = 'force-dynamic';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="font-sans antialiased text-foreground bg-background">
                <Providers>
                    <GlobalLayout>
                        {children}
                    </GlobalLayout>
                </Providers>
            </body>
        </html>
    );
}
