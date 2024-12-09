import { EwcBasicListenerEvents, EwcBasicPublisherEvents } from "./basic";

// Event
// export const productListViewerEwcEvent = {
//   productListViewer: {
//     ...EwcBasicListenerEvents,
//     ...EwcBasicPublisherEvents,
//     ON_VIEW_PRODUCT: 'on-view-product',
//     ON_ADDED_TO_CART: 'on-added-to-cart',
//     ON_SHARE: 'on-share',
//     ON_OPEN_CART: 'on-open-cart',
//     ON_ORDER_LINE_REMOVED: 'on-order-line-removed',
//     ON_CART_CHECKOUT_DONE: 'on-cart-checkout-done',
//   },
// }

export const productListViewerEwcEvent = {
  listener: {
    productListViewer: {
      ...EwcBasicListenerEvents,
    },
  },
  publisher: {
    productListViewer: {
      ...EwcBasicPublisherEvents,
      ON_VIEW_PRODUCT: 'on-view-product',
      ON_ADDED_TO_CART: 'on-added-to-cart',
      ON_SHARE: 'on-share',
      ON_OPEN_CART: 'on-open-cart',
      ON_ORDER_LINE_REMOVED: 'on-order-line-removed',
      ON_CART_CHECKOUT_DONE: 'on-cart-checkout-done',
    },
  }
}