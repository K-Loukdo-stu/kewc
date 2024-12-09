import { EwcBasicListenerEvents, EwcBasicPublisherEvents } from "./basic";

// Event

export const channelEwcEvent = {
    listener: {
        channelHome: {
            ...EwcBasicListenerEvents,
        },
    },
    publisher: {
        channelHome: {
            ...EwcBasicPublisherEvents,
            ON_SET_CONTENT_HEIGHT: 'on-set-content-height',
            ON_OPEN_MAP: 'on-open-map',
            ON_SELECTED_PRODUCT_TYPE: 'on-selected-product-type',
            ON_PRODUCT_TYPE_SELECTED: 'on-product-type-selected',
            ON_PRODUCT_SELECTED: 'on-product-selected',
            ON_POST_SELECTED: 'on-post-selected',
        },
    }
}