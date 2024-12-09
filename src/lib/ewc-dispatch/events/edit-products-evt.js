import { EwcBasicListenerEvents, EwcBasicPublisherEvents } from "./basic";

export const editProductEwcEvent = {
  listener: {
    editProduct: {
      ...EwcBasicListenerEvents,
      ON_PRODUCT_SAVED: 'on-product-saved',
      ON_PRODUCT_DELETED: 'on-product-deleted',
      ON_PARSE_BASE64: 'on-parse-base64'
    },
  },
  publisher: {
    editProduct: {
      ...EwcBasicPublisherEvents,
      ON_PRODUCT_SAVED: 'on-product-saved',
      ON_PRODUCT_DELETED: 'on-product-deleted',
      ON_BROWSE_FILE: 'on-browse-file',
    },
  }
}