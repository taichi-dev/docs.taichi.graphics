const matter = require('gray-matter');
const fs = require('fs-extra');
const globby = require('globby');
const path = require('path');

const utils_validation = require('@docusaurus/utils-validation');

const {
  parseMarkdownString,
} = require('@docusaurus/utils');

const {
  DefaultNumberPrefixParser,
} = require('../../node_modules/@docusaurus/plugin-content-docs/lib/numberPrefix');


const DocFrontMatterSchema = utils_validation.JoiFrontMatter.object({
  id: utils_validation.JoiFrontMatter.string(),
  title: utils_validation.JoiFrontMatter.string().allow(''),
  slug: utils_validation.JoiFrontMatter.string(),
  sidebar_label: utils_validation.JoiFrontMatter.string(),
  sidebar_position: utils_validation.JoiFrontMatter.number(),
  parse_number_prefixes: utils_validation.JoiFrontMatter.boolean(),
}).unknown();

async function getDocMetadata(contentPath) {
  const pagesFiles = await globby('**/*.{md,mdx}', {
    cwd: contentPath,
  });

  async function toMetadata(relativeSource) {
    const source = path.join(contentPath, relativeSource);

    const content = await fs.readFile(source, 'utf-8');

    const { frontMatter: unsafeFrontMatter, contentTitle, content: body } =
      parseMarkdownString(content);

    const frontMatter = utils_validation.validateFrontMatter(
      unsafeFrontMatter,
      DocFrontMatterSchema
    );

    let {
      id,
      parse_number_prefixes: parseNumberPrefixes = true,
      sidebar_position: sidebarPos,
      slug,
    } = frontMatter;

    const sourceFileNameWithoutExtension = path.basename(
      source,
      path.extname(relativeSource)
    );

    const { filename: unprefixedFileName } = parseNumberPrefixes
      ? DefaultNumberPrefixParser(sourceFileNameWithoutExtension)
      : { filename: sourceFileNameWithoutExtension, numberPrefix: undefined };

    const baseID = id ?? unprefixedFileName;
    const title = frontMatter.title ?? contentTitle ?? baseID;

    return {
      id: baseID,
      title,
      body,
      slug,
      sidebarPos,
      source,
      frontMatter: unsafeFrontMatter,
    };
  }

  const docs = [];
  for (const item of pagesFiles) {
    const meta = await toMetadata(item);
    docs.push(meta);
  }

  return docs
}

function flatUrl(metadata, baseurl) {
  let slug = metadata.slug
  if (!slug || slug.length === 0) {
    slug = `${baseurl}/${metadata.id}`
    metadata.slug = slug
  }
  return metadata
}

async function writeDoc(metadata, frombase, tobase) {
  const frontMatter = metadata.frontMatter
  frontMatter.slug = metadata.slug

  const relative = path.relative(frombase, metadata.source)
  const npath = path.resolve(tobase, relative)

  const data = matter.stringify(metadata.body, frontMatter)

  await fs.outputFile(npath, data)
}

module.exports = {
  getDocMetadata,
  flatUrl,
  writeDoc
}