import { APIs } from "$lib/statics/apis";
import { GET_ICON_CATEGORIES_QUERY, CREATE_ICON_CATEGORY_MUTATION, DELETE_ICON_CATEGORY_MUTATION, GET_SEARCH_ICON_CATEGORY_QUERY, UPDATE_ICON_CATEGORY_MUTATION } from "$providers/queries/kart/icon-category";
import { endpointFetch } from "../utils";



export const getIconCategories = {
  load: async () => {
    const res = await endpointFetch({
      query: GET_ICON_CATEGORIES_QUERY,
    }, APIs.KART);

    if (res?.success == true) {
      res['data'] = res['data']['iconCategories'];
      return res;
    }

    throw res;
  }
}

export const searchIconCategories = {
  load: async ({ pageNum, searchText }) => {
    const res = await endpointFetch({
      query: GET_SEARCH_ICON_CATEGORY_QUERY,
      variables: { currentPage: pageNum, searchText }
    }, APIs.KART);
    if (res?.success == true) {
      res['data'] = res['data']['searchIconCategories'];
      return res;
    }
    throw res;
  }
}

export const createIconCategory = {
  load: async ({ name, width, height, file }) => {
    const res = await endpointFetch({
      query: CREATE_ICON_CATEGORY_MUTATION,
      variables: { name, width, height, file }
    }, APIs.KART);
    return res;
  }
}


export const updateIconCategory = {
  load: async ({ id, name, width, height, file }) => {
    const res = await endpointFetch({
      query: UPDATE_ICON_CATEGORY_MUTATION,
      variables: { id, name, width, height, file }
    }, APIs.KART);
    return res;
  }
}


export const deleteIconCategory = {
  load: async ({ id }) => {
    const res = await endpointFetch({
      query: DELETE_ICON_CATEGORY_MUTATION,
      variables: { id }
    }, APIs.KART);
    return res;
  }
}

