import { EwcBasicListenerEvents, EwcBasicPublisherEvents } from "./basic";

// Event
export const createPostEwcEvent = {
  post: {
    ...EwcBasicListenerEvents,
    ...EwcBasicPublisherEvents,
    ON_UPLOAD_FILE: 'on-upload-file',
    ON_POSTED: 'on-posted',
    ON_PARSE_BASE64: 'on-parse-base64',
  },
}