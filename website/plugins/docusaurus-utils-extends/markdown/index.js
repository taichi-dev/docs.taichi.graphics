/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// import {linkify} from './linkify';
const linkify = require('./linkify')
// import type {LoaderContext} from 'webpack';

 function markdownLoader(
  source,
) {
  const fileString = source;
  const callback = this.async();
  const options = this.getOptions();

  return callback?.(null, linkify(fileString, this.resourcePath, options));
}

module.exports = markdownLoader
