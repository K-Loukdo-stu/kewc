import { EwcBasicListenerEvents, EwcBasicPublisherEvents } from "./basic";

// Event
export const channelReviewEwcEvent = {
  channelReview: {
    ...EwcBasicListenerEvents,
    ...EwcBasicPublisherEvents,
    ON_CREATE_REVIEW: 'on-create-reivew',
    ON_CREATED_REVIEW: 'on-created-review',
    ON_RELOAD_REVIEWS: 'on-reload-reviews',
  },
}