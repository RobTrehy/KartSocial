import React, { ReactElement, useState } from 'react';

interface Props {
  title: string;
  message: ReactElement;
}

export default function MessageReveal({ title, message }: Props) {
  const [revealed, setRevealed] = useState<boolean>(false);

  return (
    <div className="p-4 leading-relaxed bg-brand-200 dark:bg-brand-900 dark:text-gray-200 text-sm md:rounded-md">
      <h2 className="text-lg font-semibold">{title}</h2>
      {(typeof message === 'string' || message instanceof String) && (
        <p className={revealed ? '' : 'truncate'}>{message}</p>
      )}
      {typeof message !== 'string' && !(message instanceof String) && (
        <div className={revealed ? '' : 'h-8 overflow-hidden'}>{message}</div>
      )}
      {revealed ? (
        <a
          href="#"
          onClick={() => setRevealed(!revealed)}
          className="py-4 -mb-2 hover:text-brand-900 font-semibold"
        >
          See Less
        </a>
      ) : (
        <a
          href="#"
          onClick={() => setRevealed(!revealed)}
          className="py-4 hover:text-brand-900 font-semibold"
        >
          Read More
        </a>
      )}
    </div>
  );
}
