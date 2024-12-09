import { EwcBasicListenerEvents, EwcBasicPublisherEvents } from "./basic";

// Event
export const productEwcEvent = {
  product: {
    ...EwcBasicListenerEvents,
    ...EwcBasicPublisherEvents,
    ON_ORDER: 'on-order',
    ON_SHARE: 'on-share',
    ON_ADDED_TO_CART: 'on-added-to-cart',
  },
}