import { Link } from '@/types';
import React from 'react';
import PaginationLink from './PaginationLink';


interface Props {
  currentPage: number;
  links: Array<Link>;
}

export default function PaginationLinks({ currentPage, links }: Props) {
  if (links.length < 8) {
    return links.map((link: any, i: number) =>
      i === 0 || i == links.length - 1 ? null : (
        <PaginationLink link={link} key={i} />
      ),
    );
  }

  if (
    [
      1,
      2,
      3,
      +links[links.length - 4].label,
      +links[links.length - 3].label,
      +links[links.length - 2].label,
    ].includes(currentPage)
  ) {
    return (
      <>
        <PaginationLink link={links[1]} />
        <PaginationLink link={links[2]} />
        <PaginationLink link={links[3]} />
        <span className="relative inline-flex items-center px-3 py-1 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
          ...
        </span>
        <PaginationLink link={links[links.length - 4]} />
        <PaginationLink link={links[links.length - 3]} />
        <PaginationLink link={links[links.length - 2]} />
      </>
    );
  }

  return (
    <>
      <PaginationLink link={links[1]} />
      <span className="relative inline-flex items-center px-3 py-1 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
        ...
      </span>
      <PaginationLink link={links[currentPage - 1]} />
      <PaginationLink link={links[currentPage]} />
      <PaginationLink link={links[currentPage + 1]} />
      <span className="relative inline-flex items-center px-3 py-1 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
        ...
      </span>
      <PaginationLink link={links[links.length - 2]} />
    </>
  );
}
