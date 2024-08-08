
const MAIN_URL = process.env.NEXT_PUBLIC_PROXY_SERVICE_HOST
const SEARCH_ROUTER = process.env.SEARCH_ROUTER

export const HTTP = Object.freeze({
  HOST : MAIN_URL,
  SEARCH : SEARCH_ROUTER,
})