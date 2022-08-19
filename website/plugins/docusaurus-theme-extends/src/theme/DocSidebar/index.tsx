import React, { useState } from 'react';
import clsx from 'clsx';

import type { Props } from '@theme/DocSidebar';
import type { PropSidebarItem } from '@docusaurus/plugin-content-docs';

import { isActiveSidebarItem } from '@docusaurus/theme-common';

import SearchBar from '@theme/SearchBar';

import DropdownIcon from './dropdown.svg';
import FolderIcon from './folder.svg';

import useMobileSidebar from '../../utils/useMobile';

function DocSidebarItem({
  item,
  className,
  activePath,
  level,
}: {
  item: PropSidebarItem;
  className?: string;
  activePath: string;
  level: number;
}) {
  const isActive = isActiveSidebarItem(item, activePath);
  // console.log(item.href, activePath)
  const [isHidden, setIsHidden] = useState(!isActive);

  return (
    <li
      className={clsx(
        className,
        isHidden ? '' : 'bg-grey-2',
        level > 0 &&
          (isActive ? 'border-l-2 border-brand-cyan' : 'border-l border-grey-3')
      )}
    >
      <div
        className={clsx(
          'flex justify-between items-center pr-2',
          isActive
            ? level > 0
              ? 'text-brand-cyan'
              : 'bg-brand-cyan text-white border-l-4 border-brand-cyan-dark rounded-l-sm'
            : ''
        )}
        onClick={() => setIsHidden(!isHidden)}
      >
        <a
          className={clsx(
            'flex-1 cursor-pointer',
            level > 0 ? 'px-2 py-1' : 'px-3 py-2',
            isActive && level === 0 ? 'hover:text-white' : ''
          )}
          href={item.href}
        >
          {item.label}
        </a>
        {item.type === 'category' && (
          <span className="hover:bg-brand-cyan hover:text-white rounded-sm cursor-pointer w-6 h-6 flex items-center justify-center">
            <span
              className={clsx(
                'transition-transform',
                isHidden ? '' : 'rotate-180'
              )}
            >
              <DropdownIcon />
            </span>
          </span>
        )}
      </div>
      {item.type === 'category' && (
        <ul
          className={clsx(
            'height-transition',
            isHidden
              ? 'hidden overflow-hidden h-0'
              : 'block overflow-visible h-auto'
          )}
        >
          {item.items.map((sub, index) => (
            <DocSidebarItem
              activePath={activePath}
              level={level + 1}
              className="ml-3 text-caption"
              key={index}
              item={sub}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

function DocSidebar(props: Props) {
  // console.log(props.path)
  const mobileSidebar = useMobileSidebar();
  return (
    <div className="pt-20 max-h-screen h-full sticky top-0 relative z-20 w-full bg-grey-1">
      <div className="py-6 h-full flex flex-col overflow-hidden">
        <div className="px-5 desktop:pr-7">
          <SearchBar />
        </div>
        <div className="pt-6 px-5 desktop:pr-7 flex-1 overflow-auto">
          <ul className="space-y-3 select-none overflow-hidden">
            {props.sidebar.map((item, index) => (
              <DocSidebarItem
                activePath={props.path}
                level={0}
                className="text-h5"
                key={index}
                item={item}
              />
            ))}
          </ul>
        </div>
      </div>
      {!mobileSidebar.shouldRender && (
        <div
          className={clsx(
            'absolute top-20 desktop:flex hidden',
            props.isHidden ? '-right-6' : 'right-0'
          )}
        >
          <div
            className={clsx(
              'bg-grey-3 mt-6 rounded-l-lg w-6 h-10 cursor-pointer flex items-center justify-center',
              props.isHidden && 'rotate-180'
            )}
          >
            <FolderIcon />
          </div>
        </div>
      )}
      {!mobileSidebar.shouldRender && (
        <div
          className={clsx(
            'absolute -right-6 w-12 h-full top-0 desktop:flex hidden',
            props.isHidden ? 'cursor-e-resize' : 'cursor-w-resize'
          )}
          onClick={() => props.onCollapse()}
        ></div>
      )}
    </div>
  );
}

export default DocSidebar;
