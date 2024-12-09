import { APIs } from "$lib/statics/apis";
import { GET_CHANNEL_CATALOGS_QUERY } from "$providers/queries/kchannel/catalog";
import { endpointFetch } from "../utils";


export const channelCatalogs = {
  load: async () => {
    const res = await endpointFetch({
      query: GET_CHANNEL_CATALOGS_QUERY,
    }, APIs.KCHANNEL);

    if (res?.success == true) {
      res['data'] = res['data']['channelCatalogs'];
      return res;
    }

    throw res;
  }
}