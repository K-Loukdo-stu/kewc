/**
 * Create API requests
 */

import { APIs } from "$lib/statics/apis";
import { GET_SEARCH_USERS_QUERY, GET_USERS_QUERY, GET_USER_QUERY } from "$providers/queries/kauth/user";
import { usersStore } from "$providers/stores/kauth";
import { endpointFetch } from "../utils";

export const getUser = {
  load: async ({ uid }) => {
    const res = await endpointFetch({
      query: GET_USER_QUERY,
      variables: { id: uid }
    }, APIs.KAUTH);

    if (res?.success == true) {
      res['data'] = res['data']['user'];
      return res;
    }

    throw res;
  }
}


export const getUsers = {
  load: async () => {
    const res = await endpointFetch({
      query: GET_USERS_QUERY,
    }, APIs.KAUTH);

    if (res?.success == true) {
      res['data'] = res['data']['users'];
      usersStore.reset(res['data'])
      return res;
    }

    throw res;
  }
}

export const searchUsers = {
  load: async ({ pageNum, searchText }) => {
    const res = await endpointFetch({
      query: GET_SEARCH_USERS_QUERY,
      variables: { currentPage: pageNum, searchText }
    }, APIs.KAUTH);
    if (res?.success == true) {
      res['data'] = res['data']['searchUsers'];
      return res;
    }
    throw res;
  }
}