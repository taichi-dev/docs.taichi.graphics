import {usePluginData} from '@docusaurus/useGlobalData';

export const useBlogTags = (pluginId?: string) =>
  usePluginData('docusaurus-plugin-content-blog', pluginId)