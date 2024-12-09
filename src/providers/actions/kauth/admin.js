/**
 * Create API requests
 */

import { APIs } from "$lib/statics/apis";
import { CREATE_ADMIN_MUTATION, GET_ADMINS_QUERY, GET_ADMIN_QUERY, GET_SEARCH_ADMINS_QUERY, UPDATE_ADMIN_MUTATION } from "$providers/queries/kauth";
import { adminsStore } from "$providers/stores/kauth";
import { endpointFetch } from "../utils";

export const getAdmins = {
  load: async () => {
    const res = await endpointFetch({
      query: GET_ADMINS_QUERY,
    }, APIs.KAUTH);

    if (res?.success == true) {
      res['data'] = res['data']['admins'];
      adminsStore.reset(res['data'])
      return res;
    }

    throw res;
  }
}

export const searchAdmins = {
  load: async ({ pageNum, searchText }) => {
    const res = await endpointFetch({
      query: GET_SEARCH_ADMINS_QUERY,
      variables: { currentPage: pageNum, searchText }
    }, APIs.KAUTH);
    if (res?.success == true) {
      res['data'] = res['data']['searchAdmins'];
      return res;
    }
    throw res;
  }
}


export const createAdmin = {
  load: async ({ username, email, firstName, lastName, activated, role, phone, password, sex, dateOfBirth }) => {
    const res = await endpointFetch({
      query: CREATE_ADMIN_MUTATION,
      variables: { username, email, firstName, lastName, activated, role, phone, password, sex, dateOfBirth }
    }, APIs.KAUTH);
    if (res?.success == true) {
      res['data'] = res['data']['createAdmin'];
      return res;
    }
    return res;
  }
}


export const updateAdmin = {
  load: async ({ id, username, firstName, lastName, activated, role, phone, sex, dateOfBirth, password, country }) => {
    const res = await endpointFetch({
      query: UPDATE_ADMIN_MUTATION,
      variables: { id, username, firstName, lastName, activated, role, phone, sex, dateOfBirth, password, country }
    }, APIs.KAUTH);
    if (res?.success == true) {
      res['data'] = res['data']['updateAdmin'];
      return res;
    }
    return res;
  }
}



export const getAdmin = {
  load: async ({ uid }) => {
    const res = await endpointFetch({
      query: GET_ADMIN_QUERY,
      variables: { uid: uid }
    }, APIs.KAUTH);
    if (res?.success == true) {
      res['data'] = res['data']['admin'];
      return res;
    }
    throw res;
  }
}