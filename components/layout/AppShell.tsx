"use client";

import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CommandPalette } from "@/components/layout/CommandPalette";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <CommandPalette />
      <div className="flex flex-1 relative">
        <main className="flex-1 flex flex-col w-full min-w-0">
          <div className="flex-1">{children}</div>
          <Footer />
        </main>
      </div>
    </>
  );
}
