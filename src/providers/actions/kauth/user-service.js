/**
 * Create API requests
 */

import { APIs } from "$lib/statics/apis";
import { endpointFetch } from "../utils";
import { CREATE_MANY_USER_SERVICE_MUTATION, CREATE_USER_SERVICE_MUTATION, DELETE_USER_SERVICE_BY_SERVICE_MUTATION, DELETE_USER_SERVICE_MUTATION, GET_USER_SERVICE_BY_ADMIN_QUERY } from "$providers/queries/kauth/user-service";

/**
 * 
 */
export const createManyUserService = {
  load: async ({ admin, services }) => {
    const res = await endpointFetch({
      query: CREATE_MANY_USER_SERVICE_MUTATION,
      variables: { admin, services }
    }, APIs.KAUTH);
    if (res?.success == true) {
      res['data'] = res['data']['createManyUserService'];
      return res;
    }
    return res;
  }
}

export const createUserService = {
  load: async ({ admin, service }) => {
    const res = await endpointFetch({
      query: CREATE_USER_SERVICE_MUTATION,
      variables: { admin, service }
    }, APIs.KAUTH);
    if (res?.success == true) {
      res['data'] = res['data']['createUserService'];
      return res;
    }
    return res;
  }
}


export const deleteUserServiceByService = {
  load: async ({ admin, service }) => {
    const res = await endpointFetch({
      query: DELETE_USER_SERVICE_BY_SERVICE_MUTATION,
      variables: { admin, service }
    }, APIs.KAUTH);
    if (res?.success == true) {
      res['data'] = res['data']['deleteUserServiceByService'];
      return res;
    }
    return res;
  }
}



export const deleteUserService = {
  load: async ({ id }) => {
    const res = await endpointFetch({
      query: DELETE_USER_SERVICE_MUTATION,
      variables: { id }
    }, APIs.KAUTH);
    return res;
  }
}


export const userServiceByAdmin = {
  load: async ({ admin }) => {
    const res = await endpointFetch({
      query: GET_USER_SERVICE_BY_ADMIN_QUERY,
      variables: { admin }
    }, APIs.KAUTH);
    if (res?.success == true) {
      res['data'] = res['data']['findByAdmin'];
      return res;
    }
    return res;
  }
}