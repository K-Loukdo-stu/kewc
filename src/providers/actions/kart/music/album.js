import { APIs } from "$lib/statics/apis";
import { endpointFetch } from "$providers/actions/utils";
// import { GET_ICON_CATEGORIES_QUERY, CREATE_ICON_CATEGORY_MUTATION, DELETE_ICON_CATEGORY_MUTATION, GET_SEARCH_ICON_CATEGORY_QUERY, UPDATE_ICON_CATEGORY_MUTATION } from "$providers/queries/kart/icon-category";
import { CREATE_ALBUM_MUTATION, GET_SEARCH_ALBUMS_QUERY, UPDATE_ALBUM_MUTATION } from "$providers/queries/kart/music/album";
// import { endpointFetch } from "../utils";
// endpointFetch



// export const getIconCategories = {
//   load: async () => {
//     const res = await endpointFetch({
//       query: GET_ICON_CATEGORIES_QUERY,
//     }, APIs.KART);

//     if (res?.success == true) {
//       res['data'] = res['data']['iconCategories'];
//       return res;
//     }

//     throw res;
//   }
// }

export const searchAlbums = {
  load: async ({ pageNum, searchText }) => {
    const res = await endpointFetch({
      query: GET_SEARCH_ALBUMS_QUERY,
      variables: { currentPage: pageNum, searchText }
    }, APIs.KART);
    if (res?.success == true) {
      res['data'] = res['data']['searchAlbums'];
      return res;
    }
    throw res;
  }
}

export const createAlbum = {
  load: async ({ name, releasedDate, desc, imageUrl }) => {
    const res = await endpointFetch({
      query: CREATE_ALBUM_MUTATION,
      variables: { name, releasedDate, desc, imageUrl }
    }, APIs.KART);
    return res;
  }
}


export const updateAlbum = {
  load: async ({ id, name, releasedDate, desc, imageUrl }) => {
    const res = await endpointFetch({
      query: UPDATE_ALBUM_MUTATION,
      variables: { id, name, releasedDate, desc, imageUrl }
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

