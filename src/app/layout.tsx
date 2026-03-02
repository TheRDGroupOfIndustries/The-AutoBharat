import "./globals.css";
import { Providers } from "./providers";
import { GlobalLayout } from "@/components/GlobalLayout";

export const metadata = {
    title: "The AutoBharat",
    description: "The AutoBharat Frontend",
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
