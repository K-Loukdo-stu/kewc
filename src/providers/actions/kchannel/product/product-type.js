import { APIs } from "$lib/statics/apis";
import {
  CREATE_PRODUCT_TYPE_MUTATION,
  DELETE_PRODUCT_TYPE_MUTATION,
  GET_PRODUCT_TYPES_BY_CHANNEL_QUERY,
  GET_PRODUCT_TYPES_QUERY,
  GET_SEARCH_PRODUCT_TYPE_QUERY,
  UPDATE_PRODUCT_TYPE_MUTATION
} from "$providers/queries/kchannel/product";
import { endpointFetch } from "$providers/actions/utils";


export const getProductTypesByChannel = {
  load: async ({ channel }) => {
    const res = await endpointFetch({
      query: GET_PRODUCT_TYPES_BY_CHANNEL_QUERY,
      variables: { channel }
    }, APIs.KCHANNEL);

    if (res?.success == true) {
      res['data'] = res['data']['productTypesByChannel'];
      return res;
    }

    throw res;
  }
}

export const getProductTypes = {
  load: async () => {
    const res = await endpointFetch({
      query: GET_PRODUCT_TYPES_QUERY,
    }, APIs.KCHANNEL);

    if (res?.success == true) {
      res['data'] = res['data']['productTypes'];
      return res;
    }

    throw res;
  }
}

export const searchProductTypes = {
  load: async ({ pageNum, searchText }) => {
    const res = await endpointFetch({
      query: GET_SEARCH_PRODUCT_TYPE_QUERY,
      variables: { currentPage: pageNum, searchText }
    }, APIs.KCHANNEL);
    if (res?.success == true) {
      res['data'] = res['data']['searchProductTypes'];
      return res;
    }
    throw res;
  }
}


export const createProductType = {
  load: async ({ name, icon, channel }) => {
    const res = await endpointFetch({
      query: CREATE_PRODUCT_TYPE_MUTATION,
      variables: { name, icon, channel }
    }, APIs.KCHANNEL);

    if (res?.success == true) {
      res['data'] = res['data']['createProductType'];
      return res;
    }

    throw res;
  }
}

export const updateProductType = {
  load: async ({ id, name, icon }) => {
    const res = await endpointFetch({
      query: UPDATE_PRODUCT_TYPE_MUTATION,
      variables: { id, name, icon }
    }, APIs.KCHANNEL);
    if (res?.success == true) {
      res['data'] = res['data']['updateProductType'];
      return res;
    }

    throw res;
  }
}

export const deleteProductType = {
  load: async ({ id }) => {
    const res = await endpointFetch({
      query: DELETE_PRODUCT_TYPE_MUTATION,
      variables: { id }
    }, APIs.KCHANNEL);

    if (res?.success == true) {
      res['data'] = res['data']['deleteProductType'];
      return res;
    }
    
    throw res;
  }
}
