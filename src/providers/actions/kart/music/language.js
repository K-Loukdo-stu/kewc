import { APIs } from "$lib/statics/apis";
import { endpointFetch } from "$providers/actions/utils";
import { CREATE_LANGUAGE_MUTATION, GET_SEARCH_LANGUAGES_QUERY, UPDATE_LANGUAGE_MUTATION } from "$providers/queries/kart/music/language";


export const searchLanguages = {
  load: async ({ pageNum, searchText }) => {
    const res = await endpointFetch({
      query: GET_SEARCH_LANGUAGES_QUERY,
      variables: { currentPage: pageNum, searchText }
    }, APIs.KART);
    if (res?.success == true) {
      res['data'] = res['data']['searchLanguages'];
      return res;
    }
    throw res;
  }
}

export const createLanguage = {
  load: async ({ name }) => {
    const res = await endpointFetch({
      query: CREATE_LANGUAGE_MUTATION,
      variables: { name }
    }, APIs.KART);
    return res;
  }
}


export const updateLanguage = {
  load: async ({ id, name }) => {
    const res = await endpointFetch({
      query: UPDATE_LANGUAGE_MUTATION,
      variables: { id, name }
    }, APIs.KART);
    return res;
  }
}


// export const deleteIconCategory = {
//   load: async ({ id }) => {
//     const res = await endpointFetch({
//       query: DELETE_ICON_CATEGORY_MUTATION,
//       variables: { id }
//     }, APIs.KART);
//     return res;
//   }
// }

