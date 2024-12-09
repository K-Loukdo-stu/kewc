import { APIs } from "$lib/statics/apis";
import { endpointFetch } from "$providers/actions/utils";
import { CREATE_SINGER_MUTATION, GET_SEARCH_SINGERS_QUERY, UPDATE_SINGER_MUTATION } from "$providers/queries/kart/music/singer";


export const searchSingers = {
  load: async ({ pageNum, searchText }) => {
    const res = await endpointFetch({
      query: GET_SEARCH_SINGERS_QUERY,
      variables: { currentPage: pageNum, searchText }
    }, APIs.KART);
    if (res?.success == true) {
      res['data'] = res['data']['searchSingers'];
      return res;
    }
    throw res;
  }
}

export const createSinger = {
  load: async ({ firstName, lastName, gender, production }) => {
    console.log({ firstName, lastName, gender, production });
    const res = await endpointFetch({
      query: CREATE_SINGER_MUTATION,
      variables: { firstName, lastName, gender, production }
    }, APIs.KART);
    return res;
  }
}


export const updateSinger = {
  load: async ({ id, firstName, lastName, gender, production }) => {
    console.log({ id, firstName, lastName, gender, production });
    const res = await endpointFetch({
      query: UPDATE_SINGER_MUTATION,
      variables: { id, firstName, lastName, gender, production }
    }, APIs.KART);
    return res;
  }
}

