import { cn } from '@/lib/utils';
import { IdeaStatus } from '@/lib/types';

interface StatusBadgeProps {
  status: IdeaStatus;
  className?: string;
}

const statusConfig = {
  submitted: {
    label: 'Submitted',
    className: 'bg-blue-100 text-blue-800 border-blue-200',
  },
  under_review: {
    label: 'Under Review',
    className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  },
  accepted: {
    label: 'Accepted',
    className: 'bg-green-100 text-green-800 border-green-200',
  },
  rejected: {
    label: 'Rejected',
    className: 'bg-red-100 text-red-800 border-red-200',
  },
  implemented: {
    label: 'Implemented',
    className: 'bg-purple-100 text-purple-800 border-purple-200',
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        config.className,
        className
      )}
      role="status"
      aria-label={`Status: ${config.label}`}
    >
      {config.label}
    </span>
  );
}
