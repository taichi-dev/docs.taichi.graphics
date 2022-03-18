const fs = require('fs-extra');
const Yaml = require('js-yaml');
const globby = require('globby');
const path = require('path');

const utils_validation = require('@docusaurus/utils-validation');

const { Joi } = utils_validation;

const categoryMetadataFileSchema = Joi.object({
  label: Joi.string(),
  position: Joi.number(),
  collapsed: Joi.boolean(),
  collapsible: Joi.boolean(),
  className: Joi.string(),
  isTab: Joi.boolean(),
});

async function readTabCategoryMetadata(contentPath) {
  const categoryFiles = await globby('**/_category_.{json,yml,yaml}', {
    cwd: contentPath,
  });
  const ret = [];
  for (const item of categoryFiles) {
    const source = path.join(contentPath, item);
    const content = await fs.readFile(source, 'utf-8');
    const metadata = utils_validation.Joi.attempt(
      Yaml.load(content),
      categoryMetadataFileSchema
    );

    if (metadata.isTab) {
      ret.push({
        source,
        metadata,
      });
    }
  }
  return ret;
}

async function writeToFile(content, source) {
  const str = JSON.stringify(content, null, 2)
  await fs.writeFile(source, str)
}

module.exports = {
  readTabCategoryMetadata,
  writeToFile
};
