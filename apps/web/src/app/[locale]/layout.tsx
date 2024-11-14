import type { Metadata } from "next";
import type { ReactElement } from "react";
import { GeistSans } from "geist/font/sans";

import { Providers } from "@/modules/shared/providers/providers";
import "@/assets/globals.css";

export const metadata: Metadata = {
  title: "Meta - WebRTC",
  description: "..",
};


export default function Layout({
  children,
  params: { locale },
}: {
  children: ReactElement;
  params: { locale: string };
}) {
  return (
    <html lang={locale} suppressHydrationWarning  >
      <head>
        <link rel="icon" href="/logo-icon.png" />
      </head>
      <body className={GeistSans.className}>
        <Providers locale={locale}>{children}</Providers>
      </body>
    </html>
  );
}
