import { APIs } from "$lib/statics/apis";
import { CREATE_PROFILE_CHANNEL_MUTATION, DELETE_PROFILE_CHANNEL_MUTATION, GET_SEARCH_PROFILE_CHANNELS_QUERY, UPDATE_PROFILE_CHANNEL_MUTATION } from "$providers/queries/kart/profile-CHANNEL";
import { endpointFetch } from "../utils";


export const searchProfileChannels = {
  load: async ({ pageNum, searchText }) => {
    const res = await endpointFetch({
      query: GET_SEARCH_PROFILE_CHANNELS_QUERY,
      variables: { currentPage: pageNum, searchText }
    }, APIs.KART);
    if (res?.success == true) {
      res['data'] = res['data']['searchProfileChannels'];
      return res;
    }
    throw res;
  }
}

export const createProfileChannel = {
  load: async ({ name, file }) => {
    const res = await endpointFetch({
      query: CREATE_PROFILE_CHANNEL_MUTATION,
      variables: { name, file }
    }, APIs.KART);
    return res;
  }
}


export const updateProfileChannel = {
  load: async ({ id, name, file }) => {
    const res = await endpointFetch({
      query: UPDATE_PROFILE_CHANNEL_MUTATION,
      variables: { id, name, file }
    }, APIs.KART);
    return res;
  }
}


export const deleteProfileChannel = {
  load: async ({ id }) => {
    const res = await endpointFetch({
      query: DELETE_PROFILE_CHANNEL_MUTATION,
      variables: { id }
    }, APIs.KART);
    return res;
  }
}

