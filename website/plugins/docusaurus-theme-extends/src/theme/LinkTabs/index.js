
import React from 'react';
import clsx from 'clsx';

import Link from '@docusaurus/Link';

export default function LinkTabs({selectedValue, values, className}) {
  return (
    <div className="tabs-container">
      <ul
        role="tablist"
        aria-orientation="horizontal"
        className={clsx(
          'tabs', 'tabs--block',
          className,
        )}>
        {values.map(({value, label, href, attributes}) => (
          <Link to={href} key={value}>
            <li
              role="tab"
              tabIndex={selectedValue === value ? 0 : -1}
              aria-selected={selectedValue === value}
              {...attributes}
              className={clsx(
                'tabs__item',
                attributes?.className,
                {
                  'tabs__item--active': selectedValue === value,
                },
              )}>
              {label ?? value}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
