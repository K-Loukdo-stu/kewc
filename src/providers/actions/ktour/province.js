import { APIs } from "$lib/statics/apis";
import { CREATE_PROVINCE_MUTATION, DELETE_PROVINCE_MUTATION, GET_PROVINCES_QUERY, GET_SEARCH_PROVINCES_QUERY, UPDATE_PROVINCE_MUTATION } from "$providers/queries/ktour/province";
import { endpointFetch } from "../utils";


/**
 * Place Category
 */


 export const getProvinces = {
  load: async () => {
    const res = await endpointFetch({
      query: GET_PROVINCES_QUERY,
    }, APIs.KTOUR);

    if (res?.success == true) {
      res['data'] = res['data']['provinces'];
      return res;
    }

    throw res;
  }
}

export const searchProvinces = {
  load: async ({ pageNum, searchText }) => {
    const res = await endpointFetch({
      query: GET_SEARCH_PROVINCES_QUERY,
      variables: { currentPage: pageNum, searchText }
    }, APIs.KTOUR);
    if (res?.success == true) {
      res['data'] = res['data']['searchProvinces'];
      return res;
    }
    throw res;
  }
}


export const createProvince = {
  load: async ({ name }) => {
    const res = await endpointFetch({
      query: CREATE_PROVINCE_MUTATION,
      variables: { name }
    }, APIs.KTOUR);
    return res;
  }
}

export const updateProvince = {
  load: async ({ id, name }) => {
    const res = await endpointFetch({
      query: UPDATE_PROVINCE_MUTATION,
      variables: { id, name }
    }, APIs.KTOUR);
    return res;
  }
}

export const deleteProvince = {
  load: async ({ id }) => {
    const res = await endpointFetch({
      query: DELETE_PROVINCE_MUTATION,
      variables: { id }
    }, APIs.KTOUR);
    return res;
  }
}
