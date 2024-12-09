import { EwcBasicListenerEvents, EwcBasicPublisherEvents } from "./basic";

export const editProductOptionsEwcEvent = {
  listener: {
    editProductOptions: {
      ...EwcBasicListenerEvents,
      ON_DONE_PRODUCT_EDITING: 'on-done-product-editing'
    },
  },
  publisher: {
    editProductOptions: {
      ...EwcBasicPublisherEvents,
      ON_DONE_PRODUCT_EDITING: 'on-done-product-editing'
    },
  }
}