import { Link } from '@inertiajs/react';
import classNames from 'classnames';
import React from 'react';

interface Props {
  classes?: string;
  secondaryClasses?: string;
};

export default function IntialsLogo({ classes, secondaryClasses }: Props) {
  return (
    <Link href="/">
      <h1 className={classNames("brand-font", classes)}>K<span className={secondaryClasses}>S</span></h1>
    </Link>
  );
}
