import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function MetricCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  className,
}: MetricCardProps) {
  return (
    <div
      className={cn(
        'aps-card p-6 transition-shadow hover:shadow-md',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-[hsl(var(--muted-foreground))]">
            {title}
          </p>
          <p className="mt-2 text-3xl font-bold text-[hsl(var(--foreground))]">
            {value}
          </p>
          {subtitle && (
            <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">
              {subtitle}
            </p>
          )}
          {trend && (
            <div className="mt-2 flex items-center gap-1">
              <span
                className={cn(
                  'text-xs font-medium',
                  trend.isPositive
                    ? 'text-[hsl(var(--success))]'
                    : 'text-[hsl(var(--destructive))]'
                )}
              >
                {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
              </span>
              <span className="text-xs text-[hsl(var(--muted-foreground))]">
                vs last period
              </span>
            </div>
          )}
        </div>
        {icon && (
          <div className="rounded-lg bg-[hsl(var(--accent))] p-3 text-white">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
