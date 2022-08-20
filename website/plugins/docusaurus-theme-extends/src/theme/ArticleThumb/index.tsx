import React, { useState } from 'react';
import clsx from 'clsx';
import ThumbDown from './thumbs-down.svg';
import ThumbUp from './thumbs-up.svg';

import { translate } from '@docusaurus/Translate';

const ArticleThumb = () => {
  const [activeKey, setActiveKey] = useState<string>();
  const handleThumbClick = (val: string) => {
    if (!activeKey) {
      setActiveKey(val)
      if (window && (window as any).hj) {
        (window as any).hj('event_thumbclick', val)
      }
    }
  }
  return (
    <div className="border rounded-sm p-3 space-y-1">
      <div>
        {translate({
          id: 'theme.articlethumb.ishelpful',
          message: 'Was this helpful?',
        })}
      </div>
      <div className="flex space-x-1">
      <div
          className={clsx(
            'rounded-full cursor-pointer w-10 h-10 flex items-center justify-center',
            {
              'bg-brand-cyan text-white': activeKey === 'up',
              'border-grey-2 text-grey-3 border':
                !!activeKey && activeKey !== 'up',
              'hover:bg-grey-4 hover:text-grey-0': !activeKey,
            }
          )}
          onClick={() => handleThumbClick('up')}
        >
          <ThumbUp />
        </div>
        <div
          className={clsx(
            'rounded-full cursor-pointer h-10 w-10 flex items-center justify-center',
            {
              'bg-brand-cyan text-white': activeKey === 'down',
              'border-grey-2 text-grey-3 border':
                !!activeKey && activeKey !== 'down',
              'hover:bg-grey-4 hover:text-grey-0': !activeKey,
            }
          )}
          onClick={() => handleThumbClick('down')}
        >
          <ThumbDown />
        </div>
      </div>
    </div>
  );
};

export default ArticleThumb;
