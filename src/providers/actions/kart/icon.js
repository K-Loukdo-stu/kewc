import { APIs } from "$lib/statics/apis";
import { CREATE_ICON_MUTATION, DELETE_ICON_MUTATION, GET_SEARCH_ICONS_QUERY, UPDATE_ICON_MUTATION } from "$providers/queries/kart/icon";
import { endpointFetch } from "../utils";


export const searchIcons = {
  load: async ({ pageNum, searchText }) => {
    const res = await endpointFetch({
      query: GET_SEARCH_ICONS_QUERY,
      variables: { currentPage: pageNum, searchText }
    }, APIs.KART);
    if (res?.success == true) {
      res['data'] = res['data']['searchIcons'];
      return res;
    }
    throw res;
  }
}

export const createIcon = {
  load: async ({ name, width, height, file, category }) => {
    const res = await endpointFetch({
      query: CREATE_ICON_MUTATION,
      variables: { name, width, height, file, category }
    }, APIs.KART);
    return res;
  }
}


export const updateIcon = {
  load: async ({ id, name, width, height, file, category }) => {
    const res = await endpointFetch({
      query: UPDATE_ICON_MUTATION,
      variables: { id, name, width, height, file, category }
    }, APIs.KART);
    return res;
  }
}


export const deleteIcon = {
  load: async ({ id }) => {
    const res = await endpointFetch({
      query: DELETE_ICON_MUTATION,
      variables: { id }
    }, APIs.KART);
    return res;
  }
}

