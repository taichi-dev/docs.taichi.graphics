import BrowserOnly from '@docusaurus/BrowserOnly';
import React, { useEffect, useState } from 'react';

import StarIcon from './star.svg';

let globalstars = ''

export const GithubStars = () => {
  const [star, setStar] = useState(globalstars);
  useEffect(() => {
    if (!globalstars) {
      fetch('https://api.github.com/repos/taichi-dev/taichi')
      .then((response) => response.json())
      .then((data) => {
        let stars;
        if (data.stargazers_count) {
          stars = (data.stargazers_count / 1000).toFixed(1) + ' k';
        } else {
          stars = '20.0k';
        }
        globalstars = stars
        setStar(stars);
      });
    }
  }, []);

  return (
    <a
      href="https://github.com/taichi-dev/taichi"
      target="_blank"
      className="hover:no-underline"
    >
      <div className="flex border border-grey-3 bg-grey-0 text-grey-4 rounded-sm text-caption">
        <div className="px-1 bg-grey-2 flex items-center">
          <StarIcon />
          <span className="scale-75">Star</span>
        </div>
        <div className="scale-75">{star}</div>
      </div>
    </a>
  );
};
