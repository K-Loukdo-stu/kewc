import { APIs } from "$lib/statics/apis";
import { GET_SEARCH_CHANNEL_QUERY, GET_CHANNEL_QUERY } from "$providers/queries/ktour/channel";
import { endpointFetch } from "../utils";


export const searchChannels = {
  load: async ({ pageNum, searchText }) => {
    const res = await endpointFetch({
      query: GET_SEARCH_CHANNEL_QUERY,
      variables: { currentPage: pageNum, searchText }
    }, APIs.KCHANNEL);
    if (res?.success == true) {
      res['data'] = res['data']['searchChannels'];
      return res;
    }
    throw res;
  }
}


export const getChannel = {
  load: async ({ id }) => {
    const res = await endpointFetch({
      query: GET_CHANNEL_QUERY,
      variables: { id }
    }, APIs.KCHANNEL);
    if (res?.success == true) {
      res['data'] = res['data']['channel'];
      return res;
    }
    throw res;
  }
}