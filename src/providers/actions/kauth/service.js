/**
 * Create API requests
 */

import { APIs } from "$lib/statics/apis";
import { endpointFetch } from "../utils";
import { CREATE_SERVICE_MUTATION, DELETE_SERVICE_MUTATION, GET_CHECKED_SERVICE_QUERY, GET_SEARCH_SERVICE_QUERY, GET_SERVICES_QUERY, UPDATE_SERVICE_MUTATION } from "$providers/queries/kauth/service";
import { adminsStore } from "$providers/stores/kauth";

export const getServices = {
  load: async () => {
    const res = await endpointFetch({
      query: GET_SERVICES_QUERY,
    }, APIs.KAUTH);

    if (res?.success == true) {
      res['data'] = res['data']['services'];
      adminsStore.reset(res['data'])
      return res;
    }

    throw res;
  }
}

export const searchServices = {
  load: async ({ pageNum, searchText }) => {
    const res = await endpointFetch({
      query: GET_SEARCH_SERVICE_QUERY,
      variables: { currentPage: pageNum, searchText }
    }, APIs.KAUTH);
    if (res?.success == true) {
      res['data'] = res['data']['searchServices'];
      return res;
    }
    throw res;
  }
}



export const checkedService = {
  load: async ({ admin }) => {
    const res = await endpointFetch({
      query: GET_CHECKED_SERVICE_QUERY,
      variables: { admin }
    }, APIs.KAUTH);
    if (res?.success == true) {
      res['data'] = res['data']['checkedServices'];
      return res;
    }
    return res;
  }
}

export const createService = {
  load: async ({ name, url, role }) => {
    const res = await endpointFetch({
      query: CREATE_SERVICE_MUTATION,
      variables: { name, url, role }
    }, APIs.KAUTH);
    return res;
  }
}

export const updateService = {
  load: async ({ id, name, url, role }) => {
    const res = await endpointFetch({
      query: UPDATE_SERVICE_MUTATION,
      variables: { id, name, role, url }
    }, APIs.KAUTH);
    return res;
  }
}

export const deleteService = {
  load: async ({ id }) => {
    const res = await endpointFetch({
      query: DELETE_SERVICE_MUTATION,
      variables: { id }
    }, APIs.KAUTH);
    return res;
  }
}