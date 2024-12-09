import { APIs } from "$lib/statics/apis";
import {
  CREATE_PRODUCT_MUTATION,
  DELETE_PRODUCT_MUTATION,
  GET_PRODUCTS_BY_CHANNEL_QUERY,
  GET_PRODUCTS_BY_PRODUCT_TYPE_QUERY,
  GET_PRODUCT_QUERY,
  GET_SEARCH_PRODUCTS_CHANNEL_QUERY,
  GET_SEARCH_PRODUCTS_QUERY,
  GET_SHOW_ON_MENU_PRODUCTS_QUERY,
  UPDATE_PRODUCT_MUTATION,
  UPDATE_PRODUCT_SHOW_ON_BOARD_MUTATION
} from "$providers/queries/kchannel/product";
import { endpointFetch } from "$providers/actions/utils";

export const getShowOnMenuBoardProducts = {
  load: async ({ channel, limit }) => {
    const res = await endpointFetch({
      query: GET_SHOW_ON_MENU_PRODUCTS_QUERY,
      variables: { channel, limit }
    }, APIs.KCHANNEL);

    if (res?.success == true) {
      res['data'] = res['data']['showOnMenuBoardProducts'];
      return res;
    }

    throw res;
  }
}

export const updateProductShowOnMenuBoard = {
  load: async ({ productId, showOnMenuBoard }) => {
    const res = await endpointFetch({
      query: UPDATE_PRODUCT_SHOW_ON_BOARD_MUTATION,
      variables: { product: productId, showOnMenuBoard }
    }, APIs.KCHANNEL);

    if (res?.success == true) {
      res['data'] = res['data']['updateProductShowOnMenuBoard'];
      return res;
    }

    throw res;
  }
}


export const getProduct = {
  load: async ({ productId }) => {
    const res = await endpointFetch({
      query: GET_PRODUCT_QUERY,
      variables: { id: productId }
    }, APIs.KCHANNEL);
    if (res?.success == true) {
      res['data'] = res['data']['product'];
      return res;
    }
    throw res;
  }
}

export const productsByProductType = {
  load: async ({ channel, productType, limit = 15, pageNumber = 1 }) => {
    const res = await endpointFetch({
      query: GET_PRODUCTS_BY_PRODUCT_TYPE_QUERY,
      variables: { channel, productType, limit, pageNumber }
    }, APIs.KCHANNEL);

    if (res?.success == true) {
      res['data'] = res['data']['productsByChannelAndProductType'];
      return res;
    }

    throw res;
  }
}

export const allProductsByChannel = {
  load: async ({ channel }) => {
    const res = await endpointFetch({
      query: GET_PRODUCTS_BY_CHANNEL_QUERY,
      variables: { channel }
    }, APIs.KCHANNEL);
    if (res?.success == true) {
      res['data'] = res['data']['allProductsByChannel'];
      return res;
    }
    throw res;
  }
}


export const searchProducts = {
  load: async ({ pageNum, searchText }) => {
    const res = await endpointFetch({
      query: GET_SEARCH_PRODUCTS_QUERY,
      variables: { currentPage: pageNum, searchText }
    }, APIs.KCHANNEL);

    if (res?.success == true) {
      res['data'] = res['data']['searchProducts'];
      return res;
    }

    throw res;
  }
}



export const searchChannelProducts = {
  load: async ({ pageNum, searchText, channel }) => {
    const res = await endpointFetch({
      query: GET_SEARCH_PRODUCTS_CHANNEL_QUERY,
      variables: { currentPage: pageNum, searchText, channel }
    }, APIs.KCHANNEL);
    if (res?.success == true) {
      res['data'] = res['data']['searchChannelProducts'];
      return res;
    }
    throw res;
  }
}


export const createProduct = {
  load: async ({ name, price, channel, productType, photo, discountPrice, currency, hasDiscount }) => {
    const res = await endpointFetch({
      mutation: CREATE_PRODUCT_MUTATION,
      variables: {
        name, price, channel, productType, photo,
        discountPrice,
        currency,
        hasDiscount
      }
    }, APIs.KCHANNEL);

    if (res?.success == true) {
      res['data'] = res['data']['createProduct'];
      return res;
    }
    throw res;
  }
}

export const updateProduct = {
  load: async ({ id, name, productType, photo }) => {
    const res = await endpointFetch({
      query: UPDATE_PRODUCT_MUTATION,
      variables: { id, name, productType, photo }
    }, APIs.KCHANNEL);

    if (res?.success == true) {
      res['data'] = res['data']['updateProduct'];
      return res;
    }

    throw res;
  }
}

export const deleteProduct = {
  load: async ({ id }) => {
    const res = await endpointFetch({
      query: DELETE_PRODUCT_MUTATION,
      variables: { id }
    }, APIs.KCHANNEL);

    if (res?.success == true) {
      res['data'] = res['data']['deleteProduct'];
      return res;
    }

    throw res;
  }
}
