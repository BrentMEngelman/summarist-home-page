import { Providers as Provided } from "../store/providers";
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
        <Provided>
          {children}
          <AuthModal />
        </Provided>
      </body>
    </html>
  );
}
