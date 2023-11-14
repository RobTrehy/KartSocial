import React, { PropsWithChildren } from 'react';

interface Props {
  message?: string;
  className?: string;
}

export default function InputHelp({
  message,
  className,
  children,
}: PropsWithChildren<Props>) {
  if (!message && !children) {
    return null;
  }
  return (
    <div className={className}>
      <p className="text-xs text-gray-600 dark:text-gray-400">
        {message || children}
      </p>
    </div>
  );
}
