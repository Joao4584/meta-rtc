// import { SystemBanner } from "@/components/system-banner";
//import "@/styles/globals.css";
import { Providers } from "@/providers/providers";
import type { ReactElement } from "react";
import { GeistSans } from "geist/font/sans";

export default function Layout({
  children,
  params: { locale },
}: {
  children: ReactElement;
  params: { locale: string };
}) {
  return (
    <html lang={locale} suppressHydrationWarning  >
      <body className={GeistSans.className}>
        <Providers locale={locale}>{children}</Providers>
      </body>
    </html>
  );
}
