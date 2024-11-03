import localFont from 'next/font/local';
import './globals.css';
import UpperNavBar from '@/src/components/UpperNavBar';
import { AppSidebar } from '@/src/components/AppSideBar/AppSideBar';
import { SidebarProvider } from '@/src/components/ui/sidebar';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--backgroundMain)]`}
      >
        <UpperNavBar />

        <main className="p-9 flex">
          <SidebarProvider>
            <AppSidebar />
          </SidebarProvider>
          {children}
        </main>
      </body>
    </html>
  );
}
