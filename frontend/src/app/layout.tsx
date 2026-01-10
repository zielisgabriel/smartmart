import { Header } from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import "@/css/globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${poppins.className} antialiased`}
      >
        <Header />
        <Toaster position="bottom-right" />
        {children}
      </body>
    </html>
  );
}
