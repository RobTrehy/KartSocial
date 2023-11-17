import { Link } from '@inertiajs/react';
import classNames from 'classnames';
import React from 'react';

interface Props {
  classes?: string;
  secondaryClasses?: string;
};

export default function TextLogo({ classes, secondaryClasses }: Props) {
  return (
    <Link href="/">
      <h1 className={classNames("brand-font", classes)}>Kart <span className={secondaryClasses}>Social</span></h1>
    </Link>
  );
}
