import { Providers } from "@/store/providers";
import AuthModal from "@/components/AuthModal";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
          <AuthModal />
        </Providers>
      </body>
    </html>
  );
}