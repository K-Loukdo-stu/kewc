import { EwcBasicListenerEvents, EwcBasicPublisherEvents } from "./basic";

// Event
export const viewProductEwcEvent = {
  listener: {
    // event listener's object name
    viewProduct: {
      ...EwcBasicListenerEvents,
    },
  },
  publisher: {
    // event publisher's object name
    viewProduct: {
      ...EwcBasicPublisherEvents,
      ON_ADD_TO_CART: 'on-add-to-cart',
      ON_ADDED_ORDERLINE: 'on-added-orderline',
      ON_SHARE: 'on-share',
    },
  }
}