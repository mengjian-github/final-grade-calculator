'use client';

import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';

type TrackedLinkProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
  eventName: string;
  eventProps?: Record<string, string | number | boolean | undefined>;
};

export default function TrackedLink({
  href,
  className,
  children,
  eventName,
  eventProps,
}: TrackedLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => {
        trackEvent(eventName, {
          destination: href,
          ...eventProps,
        });
      }}
    >
      {children}
    </Link>
  );
}
