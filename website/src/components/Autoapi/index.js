import React, { useEffect, useRef, version } from 'react';
import Layout from '@theme/Layout';
import {useDocsPreferredVersion} from '@docusaurus/theme-common';
import LayoutProviders from '@theme/LayoutProviders';
import _ from 'lodash'
import {
  ThemeClassNames,
  useColorMode,
} from '@docusaurus/theme-common';

import CodeBlock from '@theme/CodeBlock'

import ReactDOM from 'react-dom'

import BackToTopButton from '@theme/BackToTopButton';

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

const CodeContainer = ({ code, className }) => {
  const { setDarkTheme, setLightTheme } = useColorMode()
  useEffect(() => {
    const html = document.getElementsByTagName('html')[0]
    const callback = function(mutationsList) {
      for(let mutation of mutationsList) {
        if (mutation.type === 'attributes') {
          if (mutation.attributeName === 'data-theme') {
            const v = html.getAttribute(mutation.attributeName)
            if (v === 'light') {
              setLightTheme()
            }
            if (v === 'dark') {
              setDarkTheme()
            }
          }
        }
      }
    };
    const observer = new MutationObserver(callback);
    observer.observe(document.getElementsByTagName('html')[0], { attributes: true });
    return () => {
      observer.disconnect()
    }
  }, [])
  return <CodeBlock className={className} children={code} />
}

const AutoApiContainer = ({ content, version }) => {
  const value = useRef()
  const {savePreferredVersionName} =
    useDocsPreferredVersion('default');
  useEffect(() => {
    if (version) {
      savePreferredVersionName(version)
    }
  }, [version])
  const { isDarkTheme } = useColorMode()
  useEffect(() => {
    value.current = isDarkTheme
  }, [isDarkTheme])
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
        const p = node.parentElement
        node.remove()
        ReactDOM.render(<LayoutProviders><CodeContainer className={node.className} code={node.textContent} /></LayoutProviders>, p)
      })
      window.addEventListener('scroll', throttledOnScroll);
      // unbind
      return () => window.removeEventListener('scroll', throttledOnScroll)
  }, [])
  return <div style={{ width: '100%', paddingLeft: 15, paddingRight: 15 }} dangerouslySetInnerHTML={{ __html: content }}></div>
}

export default ({ __content, __title, __version }) => {
  return (
    <Layout
      wrapperClassName={ThemeClassNames.wrapper.docsPages}
      pageClassName={ThemeClassNames.page.docsDocPage}
      title={__title}
      searchMetadata={{
        version: __version,
        tag: `docs-default-${__version}`,
      }}>
      <div className='autoapi-container markdown'>
        <BackToTopButton />
        <AutoApiContainer content={__content} version={__version} />
      </div>
    </Layout>
  );
};