import { APIs } from "$lib/statics/apis";
import { endpointFetch } from "$providers/actions/utils";
import { CREATE_PRODUCTION_MUTATION, GET_PRODUCTIONS_QUERY, GET_SEARCH_PRODUCTIONS_QUERY, UPDATE_PRODUCTION_MUTATION } from "$providers/queries/kart/music/production";


export const getProductions = {
  load: async () => {
    const res = await endpointFetch({
      query: GET_PRODUCTIONS_QUERY,
    }, APIs.KART);

    if (res?.success == true) {
      res['data'] = res['data']['production'];
      return res;
    }
    throw res;
  }
}

export const searchProductions = {
  load: async ({ pageNum, searchText }) => {
    const res = await endpointFetch({
      query: GET_SEARCH_PRODUCTIONS_QUERY,
      variables: { currentPage: pageNum, searchText }
    }, APIs.KART);
    if (res?.success == true) {
      res['data'] = res['data']['searchProductions'];
      return res;
    }
    throw res;
  }
}

export const createProducion = {
  load: async ({ name, location, imageUrl }) => {
    const res = await endpointFetch({
      query: CREATE_PRODUCTION_MUTATION,
      variables: { name, location, imageUrl }
    }, APIs.KART);
    return res;
  }
}


export const updateProduction = {
  load: async ({ id, name, location, imageUrl }) => {
    const res = await endpointFetch({
      query: UPDATE_PRODUCTION_MUTATION,
      variables: { id, name, location, imageUrl }
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

