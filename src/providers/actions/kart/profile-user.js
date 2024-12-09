import { APIs } from "$lib/statics/apis";
import { CREATE_PROFILE_USER_MUTATION, DELETE_PROFILE_USER_MUTATION, GET_SEARCH_PROFILE_USERS_QUERY, UPDATE_PROFILE_USER_MUTATION } from "$providers/queries/kart/profile-user";
import { endpointFetch } from "../utils";


export const searchProfileUsers = {
  load: async ({ pageNum, searchText }) => {
    const res = await endpointFetch({
      query: GET_SEARCH_PROFILE_USERS_QUERY,
      variables: { currentPage: pageNum, searchText }
    }, APIs.KART);
    if (res?.success == true) {
      res['data'] = res['data']['searchProfileUsers'];
      return res;
    }
    throw res;
  }
}

export const createProfileUser = {
  load: async ({ name, file }) => {
    const res = await endpointFetch({
      query: CREATE_PROFILE_USER_MUTATION,
      variables: { name, file }
    }, APIs.KART);
    return res;
  }
}


export const updateProfileUser = {
  load: async ({ id, name, file }) => {
    const res = await endpointFetch({
      query: UPDATE_PROFILE_USER_MUTATION,
      variables: { id, name, file }
    }, APIs.KART);
    return res;
  }
}


export const deleteProfileUser = {
  load: async ({ id }) => {
    const res = await endpointFetch({
      query: DELETE_PROFILE_USER_MUTATION,
      variables: { id }
    }, APIs.KART);
    return res;
  }
}

