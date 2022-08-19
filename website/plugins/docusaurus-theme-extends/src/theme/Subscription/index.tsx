import React from 'react';

import { translate } from '@docusaurus/Translate';

function SubscriptionInput() {
  return (
    <div className='flex'>
      <input
        className="flex-1 w-0 border bg-grey-0 outline-0 rounded-l-sm py-2 px-4 text-grey-4"
        placeholder={translate({
          id: 'theme.subscription.email',
          message: 'Email address',
        })}
      />
      <button className="bg-brand-cyan py-2 px-3 rounded-r-sm font-bold text-white">
        {translate({
          id: 'theme.subscription.subscribe',
          message: 'Subscribe',
        })}
      </button>
    </div>
  );
}

export default SubscriptionInput;
