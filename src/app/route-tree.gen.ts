/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as RootRouteImport } from './routes/_root/route'
import { Route as RootIndexImport } from './routes/_root/index'
import { Route as RootTasksImport } from './routes/_root/tasks'

// Create/Update Routes

const RootRouteRoute = RootRouteImport.update({
  id: '/_root',
  getParentRoute: () => rootRoute,
} as any)

const RootIndexRoute = RootIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => RootRouteRoute,
} as any)

const RootTasksRoute = RootTasksImport.update({
  id: '/tasks',
  path: '/tasks',
  getParentRoute: () => RootRouteRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_root': {
      id: '/_root'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof RootRouteImport
      parentRoute: typeof rootRoute
    }
    '/_root/tasks': {
      id: '/_root/tasks'
      path: '/tasks'
      fullPath: '/tasks'
      preLoaderRoute: typeof RootTasksImport
      parentRoute: typeof RootRouteImport
    }
    '/_root/': {
      id: '/_root/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof RootIndexImport
      parentRoute: typeof RootRouteImport
    }
  }
}

// Create and export the route tree

interface RootRouteRouteChildren {
  RootTasksRoute: typeof RootTasksRoute
  RootIndexRoute: typeof RootIndexRoute
}

const RootRouteRouteChildren: RootRouteRouteChildren = {
  RootTasksRoute: RootTasksRoute,
  RootIndexRoute: RootIndexRoute,
}

const RootRouteRouteWithChildren = RootRouteRoute._addFileChildren(
  RootRouteRouteChildren,
)

export interface FileRoutesByFullPath {
  '': typeof RootRouteRouteWithChildren
  '/tasks': typeof RootTasksRoute
  '/': typeof RootIndexRoute
}

export interface FileRoutesByTo {
  '/tasks': typeof RootTasksRoute
  '/': typeof RootIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_root': typeof RootRouteRouteWithChildren
  '/_root/tasks': typeof RootTasksRoute
  '/_root/': typeof RootIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '' | '/tasks' | '/'
  fileRoutesByTo: FileRoutesByTo
  to: '/tasks' | '/'
  id: '__root__' | '/_root' | '/_root/tasks' | '/_root/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  RootRouteRoute: typeof RootRouteRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  RootRouteRoute: RootRouteRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_root"
      ]
    },
    "/_root": {
      "filePath": "_root/route.tsx",
      "children": [
        "/_root/tasks",
        "/_root/"
      ]
    },
    "/_root/tasks": {
      "filePath": "_root/tasks.tsx",
      "parent": "/_root"
    },
    "/_root/": {
      "filePath": "_root/index.tsx",
      "parent": "/_root"
    }
  }
}
ROUTE_MANIFEST_END */
