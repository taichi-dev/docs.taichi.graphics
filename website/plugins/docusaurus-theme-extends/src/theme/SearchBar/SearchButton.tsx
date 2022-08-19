import React, { useEffect, useState } from 'react';

// import { ControlKeyIcon } from './icons/ControlKeyIcon';
// import { SearchIcon } from './icons/SearchIcon';

import SearchIcon from './search.svg'

export type ButtonTranslations = Partial<{
  buttonText: string;
  buttonAriaLabel: string;
}>;

export type DocSearchButtonProps = React.ComponentProps<'button'> & {
  translations?: ButtonTranslations;
};

const ACTION_KEY_DEFAULT = 'Ctrl' as const;
const ACTION_KEY_APPLE = '⌘' as const;

function isAppleDevice() {
  return /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
}

export const DocSearchButton = React.forwardRef<
  HTMLButtonElement,
  DocSearchButtonProps
>(({ translations = {}, ...props }, ref) => {
  const { buttonText = 'Search', buttonAriaLabel = 'Search' } = translations;

  const [key, setKey] = useState<
    typeof ACTION_KEY_APPLE | typeof ACTION_KEY_DEFAULT | null
  >(null);

  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      isAppleDevice() ? setKey(ACTION_KEY_APPLE) : setKey(ACTION_KEY_DEFAULT);
    }
  }, []);

  return (
    <button
      type="button"
      className="bg-grey-0 border border-grey-3 rounded-sm px-4 h-10 items-center flex justify-between w-full"
      aria-label={buttonAriaLabel}
      {...props}
      ref={ref}
    >
        <span>{buttonText}</span>
        <SearchIcon />
    </button>
  );
});