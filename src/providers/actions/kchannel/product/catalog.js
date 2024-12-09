import { APIs } from "$lib/statics/apis";
import {
  CREATE_CHANNEL_CATALOG_MUTATION,
  GET_SEARCH_CHANNEL_CATALOG_QUERY
} from "$providers/queries/kchannel/product";
import { endpointFetch } from "$providers/actions/utils";

export const searchChannelCatalogs = {
  load: async ({ pageNum, searchText }) => {
    const res = await endpointFetch({
      query: GET_SEARCH_CHANNEL_CATALOG_QUERY,
      variables: { currentPage: pageNum, searchText }
    }, APIs.KCHANNEL);
    if (res?.success == true) {
      res['data'] = res['data']['searchChannelCatalogs'];
      return res;
    }
    throw res;
  }
}

export const createChannelCatalog = {
  load: async ({ name }) => {
    const res = await endpointFetch({
      query: CREATE_CHANNEL_CATALOG_MUTATION,
      variables: { name }
    }, APIs.KCHANNEL);
    return res;
  }
}