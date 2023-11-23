import classNames from 'classnames';
import React, { forwardRef } from 'react';

const TextareaInput = forwardRef<
  HTMLInputElement,
  React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >
>((props, ref) => (
  <textarea
    {...props}
    ref={ref}
    className={classNames(
      'border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-brand-500 dark:focus:border-brand-600 focus:ring-brand-500 dark:focus:ring-brand-600 rounded-md shadow-sm',
      props.className,
    )}
  >
    {props.children}
  </textarea>
));

export default TextareaInput;
