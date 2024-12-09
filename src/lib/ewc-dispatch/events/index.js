import { channelEwcEvent } from "./channel";
import { channelReviewEwcEvent } from "./channel-review-evt";
import { createProductEwcEvent } from "./create-product-evt";
import { editProductOptionsEwcEvent } from "./edit-product-options-evt";
import { editProductEwcEvent } from "./edit-products-evt";
import { orderCartEwcEvent } from "./order-cart-evt";
import { productListViewerEwcEvent } from "./product-list-viewer-evt";
import { productManagementEwcEvent } from "./product-management-evt";
import { viewProductEwcEvent } from "./view-product-evt";

export const EwcEvents = {
  /** Ewc Listeners */
  lis: {
    ...productManagementEwcEvent.listener,
    ...createProductEwcEvent.listener,
    ...editProductEwcEvent.listener,
    ...editProductOptionsEwcEvent.listener,
    ...viewProductEwcEvent.listener,
    ...channelEwcEvent.listener,
    ...productListViewerEwcEvent.listener,
    ...orderCartEwcEvent,
    ...channelReviewEwcEvent,
  },

  /** Ewc Publishers */
  pub: {
    ...productManagementEwcEvent.publisher,
    ...createProductEwcEvent.publisher,
    ...editProductEwcEvent.publisher,
    ...editProductOptionsEwcEvent.publisher,
    ...viewProductEwcEvent.publisher,
    ...channelEwcEvent.publisher,
    ...productListViewerEwcEvent.publisher,
    ...orderCartEwcEvent,
    ...channelReviewEwcEvent,
  }
}