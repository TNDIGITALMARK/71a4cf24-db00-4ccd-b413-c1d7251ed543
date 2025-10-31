'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LightbulbIcon, BarChart3Icon, ClipboardListIcon, MenuIcon, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  className?: string;
}

const navigation = [
  {
    name: 'Idea Hub',
    href: '/idea-hub',
    icon: LightbulbIcon,
  },
  {
    name: 'Reviewer Console',
    href: '/reviewer-console',
    icon: ClipboardListIcon,
  },
  {
    name: 'Executive Dashboard',
    href: '/dashboard',
    icon: BarChart3Icon,
  },
];

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-4 top-4 z-50 lg:hidden"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
      >
        {isMobileOpen ? (
          <XIcon className="h-6 w-6" />
        ) : (
          <MenuIcon className="h-6 w-6" />
        )}
      </Button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 h-screen w-60 border-r bg-[hsl(var(--sidebar-background))] transition-transform overflow-y-auto',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          className
        )}
        aria-label="Sidebar navigation"
      >
      {/* Decorative background pattern */}
      <div className="absolute bottom-0 left-0 w-full h-64 opacity-5 pointer-events-none">
        <img
          src="/generated/innovation-illustration.png"
          alt=""
          className="w-full h-full object-contain"
        />
      </div>

      <div className="flex h-full flex-col relative z-10">
        {/* Logo/Header */}
        <div className="flex h-16 items-center border-b border-[hsl(var(--sidebar-border))] px-6">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-[hsl(var(--sidebar-primary))] text-white font-bold text-sm">
              APS
            </div>
            <span className="text-white font-semibold text-base">AI Strategy</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4" aria-label="Main navigation">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center space-x-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-[hsl(var(--sidebar-accent))] text-white'
                    : 'text-white/80 hover:bg-[hsl(var(--sidebar-accent))] hover:text-white'
                )}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => setIsMobileOpen(false)}
              >
                <Icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-[hsl(var(--sidebar-border))] p-4">
          <div className="text-xs text-white/60">
            Powered by <span className="font-semibold">Humanik Zylo</span>
          </div>
          <div className="mt-1 text-xs text-white/40">
            AI-generated UI, built securely within APS&apos;s environment
          </div>
        </div>
      </div>
    </aside>
    </>
  );
}
