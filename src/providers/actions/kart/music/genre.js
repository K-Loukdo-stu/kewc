import { APIs } from "$lib/statics/apis";
import { endpointFetch } from "$providers/actions/utils";
import { CREATE_GENRE_MUTATION, GET_SEARCH_GENRES_QUERY, UPDATE_GENRE_MUTATION } from "$providers/queries/kart/music/genre";


export const searchGenres = {
  load: async ({ pageNum, searchText }) => {
    const res = await endpointFetch({
      query: GET_SEARCH_GENRES_QUERY,
      variables: { currentPage: pageNum, searchText }
    }, APIs.KART);
    if (res?.success == true) {
      res['data'] = res['data']['searchGenres'];
      return res;
    }
    throw res;
  }
}

export const createGenre = {
  load: async ({ name }) => {
    const res = await endpointFetch({
      query: CREATE_GENRE_MUTATION,
      variables: { name }
    }, APIs.KART);
    return res;
  }
}


export const updateGenre = {
  load: async ({ id, name }) => {
    const res = await endpointFetch({
      query: UPDATE_GENRE_MUTATION,
      variables: { id, name }
    }, APIs.KART);
    return res;
  }
}


