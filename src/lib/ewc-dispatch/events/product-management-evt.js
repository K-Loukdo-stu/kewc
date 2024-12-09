import { EwcBasicListenerEvents, EwcBasicPublisherEvents } from "./basic";

export const productManagementEwcEvent = {
  listener: {
    productManagement: {
      ...EwcBasicListenerEvents,
      ON_RELOAD_PRODUCT_LIST: 'on-reload-product-list'
    },
  },
  publisher: {
    productManagement: {
      ...EwcBasicPublisherEvents,
      ON_CREATE_PRODUCT: 'on-create-product',
      ON_EDIT_PRODUCT: 'on-edit-product',
      ON_CREATE_PRODUCT_TYPE: 'on-create-product-type',
      ON_PRODUCT_TYPE_CREATED: 'on-product-type-created',
      ON_PRODUCT_TYPE_SELECTED: 'on-product-type-selected',
    },
  }
}