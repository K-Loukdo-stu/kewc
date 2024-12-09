import { EwcBasicListenerEvents, EwcBasicPublisherEvents } from "./basic";

// Event
export const postListEwcEvent = {
  post: {
    ...EwcBasicListenerEvents,
    ...EwcBasicPublisherEvents,
    ON_COMMENT: 'on-comment',
    ON_VIEW_POST: 'on-view-post',
    ON_SHARE: 'on-share',
    ON_CREATE_POST: 'on-create-post',
    ON_POST_CREATED: 'on-post-created',
    ON_PRODUCT_SELECTED: 'on-product-selected',
  },
}