"use client";

import { LanguageProvider } from "./languageProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
      <LanguageProvider>{children}</LanguageProvider>
  );
}