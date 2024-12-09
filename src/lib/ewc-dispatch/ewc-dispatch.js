import { EwcBasicListenerEvents, EwcBasicPublisherEvents } from "./events/basic";

export const EwcFrames = {
  PRODUCT_MANAGEMENT: 'PRODUCT_MANAGEMENT',
  CREATE_PRODUCT: 'CREATE_PRODUCT',
  EDIT_PRODUCT: 'EDIT_PRODUCT',
  EDIT_PRODUCT_OPTIONS: 'EDIT_PRODUCT_OPTIONS',
  VIEW_PRODUCT: 'VIEW_PRODUCT',
  ORDER_CART: 'ORDER_CART',
  ORDERING_SUMMARY: 'ORDERING_SUMMARY'
}

export class EwcDispatch {
  iframeName;
  constructor(iframeName) {
    this.iframeName = iframeName;
    this.setPageLoading();
  }

  listen({ key, cb = null }) {
    window.addEventListener("message", (evt) => {
      if (evt.data?.key == EwcBasicListenerEvents.ON_PAGE_RELOAD) {
        this.reload();
      }
      if (key == evt.data?.key) {
        return cb?.(evt?.data);
      }
    });
  }

  publish({ key, data = null }) {
    // Flutter
    window?.FLUTTER_EWC?.postMessage(JSON.stringify({ key, data, iframeName: this.iframeName }));

    // Web
    window.parent.postMessage({ key, data, iframeName: this.iframeName }, "*");
    console.log("Publish Key: " + key + " data:" + data);
  }

  isFlutterEwc() {
    return window?.FLUTTER_EWC != null;
  }

  // reload a page
  reload() {
    window.location.reload();
  }

  // page load
  setPageLoaded() {
    this.publish({ key: EwcBasicPublisherEvents.ON_PAGE_LOADED })
  }

  setPageLoading() {
    this.publish({ key: EwcBasicPublisherEvents.ON_PAGE_LOADING })
  }
}