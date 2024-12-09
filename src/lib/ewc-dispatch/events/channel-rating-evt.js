import { EwcBasicListenerEvents, EwcBasicPublisherEvents } from "./basic";

// Event
export const channelRatingEwcEvent = {
  rating: {
    ...EwcBasicListenerEvents,
    ...EwcBasicPublisherEvents,
    // ON_COMMENT: 'on-comment',
    // ON_SHARE: 'on-share',
    ON_VIEW_CHANNEL_RATING: 'on-view-create-channel',
    ON_CREATE_CHANNEL_RATING: 'on-create-channel-rating',
    ON_CHANNEL_RATING_CREATED: 'on-create-channel-created'
  },
}