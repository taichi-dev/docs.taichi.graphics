import {useLocation} from '@docusaurus/router';
import {
  usePluginData,
} from '@docusaurus/useGlobalData';

import type {
  GlobalPluginData,
  ActiveDocContext,
} from '@docusaurus/plugin-content-docs/client';

import { getActiveDocContext } from './docsClientUtils'

export const useApiData = (pluginId: string | undefined): GlobalPluginData =>
  usePluginData('autoapi-plugin', pluginId) as GlobalPluginData;

  export function useApiDocContext(
    pluginId: string | undefined,
  ): ActiveDocContext {
    const data = useApiData(pluginId);

    const {pathname} = useLocation();
    return getActiveDocContext(data, pathname);
  }


  export function useActiveApiContext(
    pluginId: string | undefined,
  ): ActiveDocContext {
    const data = useApiData(pluginId);
    const {pathname} = useLocation();
    return getActiveDocContext(data, pathname);
  }