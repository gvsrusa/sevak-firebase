import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';
import { Toaster } from "@/components/ui/toaster";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { SevakLogo } from '@/components/icons';
import ClientNavigation from '@/components/layout/client-navigation';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Sevak - Autonomous Tractor Control',
  description: 'Manage and control your autonomous tractor with Sevak.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        <SidebarProvider>
          <Sidebar collapsible="icon" defaultOpen={true}>
            <SidebarHeader className="p-0">
              <Link href="/" className="flex items-center gap-2 px-3 py-4 h-[60px] border-b border-sidebar-border">
                <SevakLogo className="h-8 w-8 text-primary" />
                <h1 className="font-semibold text-xl text-sidebar-foreground group-data-[collapsible=icon]:hidden">
                  Sevak
                </h1>
              </Link>
            </SidebarHeader>
            <SidebarContent>
              <ClientNavigation />
            </SidebarContent>
          </Sidebar>
          <SidebarInset>
            <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:h-[60px] md:px-6">
              <div className="md:hidden">
                <SidebarTrigger />
              </div>
              <div className="flex-1">
                {/* Future: Breadcrumbs or dynamic page title */}
              </div>
              <div>
                {/* Future: User profile, settings */}
              </div>
            </header>
            <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
              {children}
            </main>
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
