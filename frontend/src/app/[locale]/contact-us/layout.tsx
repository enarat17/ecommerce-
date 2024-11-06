import type { Metadata } from "next";
import Footer from '@/components/shared/Footer';
export const metadata: Metadata = {
    title: 'contact-us | United for F&A Consultants',
    description: 'Contact us at United for F&A Teams.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <>
    <main className="flex flex-col items-center">
      {children}
      <Footer />
    </main> 
  </>
  );
}
