import { EwcBasicListenerEvents, EwcBasicPublisherEvents } from "./basic";

export const orderCartEwcEvent = {
  orderCart: {
    ...EwcBasicListenerEvents,
    ...EwcBasicPublisherEvents,
    ON_ORDER_SUMMARY_REVIEWED: 'on-order-summary-reviewed',
    ON_GO_TO_CHAT: 'on-go-to-chat',
    ON_CART_CHECKOUT_DONE: 'on-cart-checkout-done',
    ON_ORDER_LINE_REMOVED: 'on-order-line-removed',
  },
}