import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import _ from 'lodash'
import {
  ThemeClassNames,
} from '@docusaurus/theme-common';
import Prism from "prismjs";

import BackToTopButton from '@theme/BackToTopButton';
require("prismjs/components/prism-python");

import 'prismjs/themes/prism-okaidia.css'

import './styles/index.scss'

const spyScroll = (scrollParent) => {
  if (!scrollParent) return false;

  // create an Object with all children that has data-name attribute

  let lisubselector = '#bd-toc-nav > ul > li'
  const nodes = []
  let level = 4
  while (true) {
    const currentnodes = document.querySelectorAll(lisubselector + ' > a')
    let bestMatch = {};
    level --
    if (currentnodes.length === 0 || level <= 0) break
    currentnodes.forEach((domElm, index) => {
      const href = domElm.getAttribute('href')
      const node = document.querySelector(`.bd-content a.headerlink[href="${href}"]`)
      const delta = Math.abs(scrollParent.scrollTop - node.offsetTop); // check distance from top, takig scroll into account

      if (!bestMatch.node)
        bestMatch = { node: domElm, delta, index };
      // console.log(delta)
      // check which delet is closest to "0"
      if (delta < bestMatch.delta) {
        bestMatch = { node: domElm, delta, index };
      }
    })
    lisubselector += `:nth-child(${bestMatch.index + 1}) > ul > li`
    nodes.push(bestMatch.node)
  }

  // update state with best-fit section
  return nodes;
};

const lang = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i;

export default ({ __content }) => {
  const throttledOnScroll = _.throttle(
    e => {
      const navLinks = document.querySelectorAll("#bd-toc-nav a");

      navLinks.forEach((navLink) => {
        navLink.classList.remove("active");
        navLink.parentElement.classList.remove("active");
      });

      const nodes = spyScroll(document.documentElement)
      nodes.forEach((node) => {
        node.parentElement.classList.add("active");
        node.classList.add("active")
      })
    },
    300
  )
  useEffect(() => {
      const nodes = document.querySelectorAll('.autoapi-container pre')
      nodes.forEach((node) => {
        const flag = lang.exec(node.className)
        if (!flag) {
          node.classList.add('language-python')
        }
        Prism.highlightElement(node)
      })
      window.addEventListener('scroll', throttledOnScroll);
      // unbind
      return () => window.removeEventListener('scroll', throttledOnScroll)
  }, [])
  return (
    <Layout
      wrapperClassName={ThemeClassNames.wrapper.docsPages}
      pageClassName={ThemeClassNames.page.docsDocPage}>
      <div className='autoapi-container markdown'>
        <BackToTopButton />
        <div style={{ width: '100%', paddingLeft: 15, paddingRight: 15 }} dangerouslySetInnerHTML={{ __html: __content }}></div>
      </div>
    </Layout>
  );
};