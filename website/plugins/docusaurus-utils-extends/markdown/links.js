
// import path from 'path';
const path = require('path')

const { BrokenMarkdownLink, getContentPathList, aliasedSitePath } = require('@docusaurus/utils')


function replaceMarkdownLinks({
  siteDir,
  fileString,
  filePath,
  contentPaths,
  sourceToPermalink,
}) {
  const brokenMarkdownLinks = [];

  // Replace internal markdown linking (except in fenced blocks).
  let fencedBlock = false;
  let lastCodeFence = '';
  const lines = fileString.split('\n').map((line) => {
    if (line.trim().startsWith('```')) {
      const codeFence = line.trim().match(/^`+/)[0];
      if (!fencedBlock) {
        fencedBlock = true;
        lastCodeFence = codeFence;
        // If we are in a ````-fenced block, all ``` would be plain text instead
        // of fences
      } else if (codeFence.length >= lastCodeFence.length) {
        fencedBlock = false;
      }
    }
    if (fencedBlock) {
      return line;
    }

    let modifiedLine = line;
    // Replace inline-style links or reference-style links e.g:
    // This is [Document 1](doc1.md)
    // [doc1]: doc1.md
    const mdRegex =
      /(?:\]\(|\]:\s*)(?!https?:\/\/|@site\/)(?<filename>[^'")\]\s>]+\.mdx?)/g;
    // let mdMatch = mdRegex.exec(modifiedLine);
    modifiedLine = modifiedLine.replace(mdRegex, (match, val) => {
      const mdLink = val;

      const sourcesToTry = [
        path.dirname(filePath),
        ...getContentPathList(contentPaths),
      ].map((p) => path.join(p, decodeURIComponent(mdLink)));

      const aliasedSourceMatch = sourcesToTry
        .map((source) => aliasedSitePath(source, siteDir))
        .find((source) => sourceToPermalink[source]);

      const permalink = aliasedSourceMatch
        ? sourceToPermalink[aliasedSourceMatch]
        : undefined;

      if (permalink) {
        // MDX won't be happy if the permalink contains a space, we need to
        // convert it to %20
        const encodedPermalink = permalink
          .split('/')
          .map((part) => part.replace(/\s/g, '%20'))
          .join('/');
          return match.replace(val, encodedPermalink)
        // modifiedLine = modifiedLine.replace(mdLink, encodedPermalink);
      } else {
        const brokenMarkdownLink = {
          contentPaths,
          filePath,
          link: mdLink,
        };

        brokenMarkdownLinks.push(brokenMarkdownLink);
      }
      return match
    })
    // while (mdMatch !== null) {
    //   // Replace it to correct html link.
    //   const mdLink = mdMatch.groups.filename;

    //   const sourcesToTry = [
    //     path.dirname(filePath),
    //     ...getContentPathList(contentPaths),
    //   ].map((p) => path.join(p, decodeURIComponent(mdLink)));

    //   const aliasedSourceMatch = sourcesToTry
    //     .map((source) => aliasedSitePath(source, siteDir))
    //     .find((source) => sourceToPermalink[source]);

    //   const permalink = aliasedSourceMatch
    //     ? sourceToPermalink[aliasedSourceMatch]
    //     : undefined;

    //   if (permalink) {
    //     // MDX won't be happy if the permalink contains a space, we need to
    //     // convert it to %20
    //     const encodedPermalink = permalink
    //       .split('/')
    //       .map((part) => part.replace(/\s/g, '%20'))
    //       .join('/');
    //     modifiedLine = modifiedLine.replace(mdLink, encodedPermalink);
    //   } else {
    //     const brokenMarkdownLink = {
    //       contentPaths,
    //       filePath,
    //       link: mdLink,
    //     };

    //     brokenMarkdownLinks.push(brokenMarkdownLink);
    //   }
    //   mdMatch = mdRegex.exec(modifiedLine);
    // }
    return modifiedLine;
  });

  const newContent = lines.join('\n');

  return {newContent, brokenMarkdownLinks};
}

module.exports = {
  replaceMarkdownLinks
}
