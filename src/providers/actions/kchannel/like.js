import { APIs } from "$lib/statics/apis";
import { DELETE_LIKE_MUTATION } from "$providers/queries/kchannel/like";
import { endpointFetch } from "../utils";




export const deleteLike = {
  load: async ({ id }) => {
    const res = await endpointFetch({
      query: DELETE_LIKE_MUTATION,
      variables: { id }
    }, APIs.KCHANNEL);
    return res;
  }
}
