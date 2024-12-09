import { APIs } from "$lib/statics/apis";
import { GET_CHANNEL_EXTENSIONS_QUERY } from "$providers/queries/kchannel/extension";
import { endpointFetch } from "../utils";


export const getChannelExtensions = {
  load: async ({ channel }) => {
    const res = await endpointFetch({
      query: GET_CHANNEL_EXTENSIONS_QUERY,
      variables: { channel }
    }, APIs.KCHANNEL);
    if (res?.success == true) {
      res['data'] = res['data']['channelExtensions'];
      return res;
    }

    throw res;
  }
}

