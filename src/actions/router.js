import * as reactRouterActions from 'connected-react-router'

export const push = (path, state) => reactRouterActions.push(path, state)

export const replace = (path, state) => reactRouterActions.replace(path, state)
