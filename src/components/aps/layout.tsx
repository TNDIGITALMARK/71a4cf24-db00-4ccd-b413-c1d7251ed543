'use client';

import { ReactNode } from 'react';
import { Sidebar } from './sidebar';
import { Header } from './header';

interface APSLayoutProps {
  children: ReactNode;
  title?: string;
}

export function APSLayout({ children, title }: APSLayoutProps) {
  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      <Sidebar />

      <div className="lg:pl-60">
        <Header title={title} />

        <main className="p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
