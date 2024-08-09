
const MAIN_URL = process.env.NEXT_PUBLIC_PROXY_SERVICE_HOST
const SEARCH_ROUTER = process.env.SEARCH_ROUTER
const PAYMENT_ROUTER = process.env.PAYMENT_ROUTER

export const HTTP = Object.freeze({
  HOST : MAIN_URL,
  SEARCH : SEARCH_ROUTER,
  PAYMENT : PAYMENT_ROUTER,
})