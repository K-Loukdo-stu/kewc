import { EwcBasicListenerEvents, EwcBasicPublisherEvents } from "./basic";

export const createProductEwcEvent = {
  listener: {
    createProduct: {
      ...EwcBasicListenerEvents,
      ON_NEW_PRODUCT_CREATED: 'on-new-product-created',
      ON_PARSE_BASE64: 'on-parse-base64',
    },
  },
  publisher: {
    createProduct: {
      ...EwcBasicPublisherEvents,
      ON_CREATE_NEW_PRODUCT: 'on-create-new-product',
      ON_NEW_PRODUCT_CREATED: 'on-new-product-created',
      ON_BROWSE_FILE: 'on-browse-file',
    },
  }
}