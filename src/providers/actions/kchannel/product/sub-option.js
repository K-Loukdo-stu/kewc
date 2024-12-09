import { APIs } from "$lib/statics/apis";
import {
  CREATE_SUB_PRODUCT_MUTATION,
  DELETE_SUB_OPTION_MUTATION,
  GET_SUB_OPTIONS_BY_OPTION_QUERY,
  UPDATE_SUB_OPTION_MUTATION
} from "$providers/queries/kchannel/product";
import { endpointFetch } from "$providers/actions/utils";


export const getSubOptionsByOption = {
  load: async ({ option }) => {
    const res = await endpointFetch({
      query: GET_SUB_OPTIONS_BY_OPTION_QUERY,
      variables: { option }
    }, APIs.KCHANNEL);

    if (res?.success == true) {
      res['data'] = res['data']['subOptionsByOption'];
      return res;
    }

    throw res;
  }
}

export const createProductSubOption = {
  load: async ({ name, price, option, currency, product }) => {
    const res = await endpointFetch({
      query: CREATE_SUB_PRODUCT_MUTATION,
      variables: { name, price, option, currency, product }
    }, APIs.KCHANNEL);

    if (res?.success == true) {
      res['data'] = res['data']['createSubOption'];
      return res;
    }

    throw res;
  }
}

export const updateProductSubOption = {
  load: async ({ id, name, price, currency }) => {
    const res = await endpointFetch({
      query: UPDATE_SUB_OPTION_MUTATION,
      variables: { id, name, price, currency }
    }, APIs.KCHANNEL);

    if (res?.success == true) {
      res['data'] = res['data']['updateSubOption'];
      return res;
    }

    throw res;
  }
}

export const deleteProductSubOption = {
  load: async ({ id }) => {
    const res = await endpointFetch({
      query: DELETE_SUB_OPTION_MUTATION,
      variables: { id }
    }, APIs.KCHANNEL);

    if (res?.success == true) {
      res['data'] = res['data']['deleteSubOption'];
      return res;
    }

    throw res;
  }
}
