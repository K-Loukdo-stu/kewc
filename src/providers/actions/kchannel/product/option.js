import { APIs } from "$lib/statics/apis";
import {
  CREATE_PRODUCT_OPTION_MUTATION,
  DELETE_PRODUCT_OPTION_MUTATION,
  GET_PRODUCT_OPTION_BY_PRODUCT_QUERY,
  UPDATE_PRODUCT_OPTION_MUTATION
} from "$providers/queries/kchannel/product";
import { endpointFetch } from "$providers/actions/utils";


export const getOptionsByProduct = {
  load: async ({ product }) => {
    const res = await endpointFetch({
      query: GET_PRODUCT_OPTION_BY_PRODUCT_QUERY,
      variables: { product }
    }, APIs.KCHANNEL);
    if (res?.success == true) {
      res['data'] = res['data']['productOptionsByProduct'];
      return res;
    }
    throw res;
  }
}

export const createProductOption = {
  load: async ({ name, product, type }) => {
    const res = await endpointFetch({
      query: CREATE_PRODUCT_OPTION_MUTATION,
      variables: { name, product, type }
    }, APIs.KCHANNEL);

    if (res?.success == true) {
      res['data'] = res['data']['createProductOption'];
      return res;
    }

    throw res;
  }
}

export const updateProductOption = {
  load: async ({ id, name, type }) => {
    const res = await endpointFetch({
      query: UPDATE_PRODUCT_OPTION_MUTATION,
      variables: { id, name, type }
    }, APIs.KCHANNEL);

    if (res?.success == true) {
      res['data'] = res['data']['updateProductOption'];
      return res;
    }

    throw res;
  }
}

export const deleteProductOption = {
  load: async ({ id }) => {
    const res = await endpointFetch({
      query: DELETE_PRODUCT_OPTION_MUTATION,
      variables: { id }
    }, APIs.KCHANNEL);

    if (res?.success == true) {
      res['data'] = res['data']['deleteProductOption'];
      return res;
    }
    
    throw res;
  }
}
