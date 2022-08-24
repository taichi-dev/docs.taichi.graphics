import {useLocation} from '@docusaurus/router';
import {matchPath} from '@docusaurus/router';
import {
  usePluginData,
} from '@docusaurus/useGlobalData';

import { useMemo } from 'react'

import {
  useActiveVersion,
  useActiveDocContext
} from '@docusaurus/plugin-content-docs/client';

import type {
  GlobalPluginData,
  ActiveDocContext,
} from '@docusaurus/plugin-content-docs/client';

import { getActiveDocContext, getActiveVersion } from './docsClientUtils'

export const useApiData = (pluginId?: string): GlobalPluginData =>
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

  export function useApiActiveVersion(pluginId: string | undefined) {
    const data = useApiData(pluginId);
    const {pathname} = useLocation();
    return getActiveVersion(data, pathname)
  }

  export function useGlobalActiveVersion(pluginId?: string) {
    const isApi = useIsApi()
    const docActiveVersion = useActiveVersion(pluginId)
    const apiActiveVersion = useApiActiveVersion(pluginId)
    const activeVersion = isApi ? apiActiveVersion : docActiveVersion
    return activeVersion
  }

  export function useGlobalActiveContext(pluginId?: string) {
    const isApi = useIsApi()
    const docActiveContext = useActiveDocContext(pluginId);
    const apiActiveContext = useActiveApiContext(pluginId);
    const activeContext = isApi ? apiActiveContext : docActiveContext
    return activeContext
  }

  export function useIsApi() {
    const {pathname} = useLocation();
    const isApi = useMemo(() => {
      return !!matchPath(pathname, {
        path: '/api',
        exact: false,
        strict: false,
      })
    }, [pathname])
    return isApi
  }
