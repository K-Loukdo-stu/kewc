import { APIs } from "$lib/statics/apis";
import { CREATE_WIDE_SCREEN_STICKER_MUTATION, DELETE_WIDE_SCREEN_STICKER_MUTATION, GET_WIDE_SCREEN_STICKER_BY_PAGE_QUERY, UPDATE_WIDE_SCREEN_STICKER_MUTATION } from "$providers/queries/kart/wide-screen-sticker";
import { endpointFetch } from "../utils";

export const wideScreenStickerPage = {
  load: async ({ pageNum }) => {
    const res = await endpointFetch({
      query: GET_WIDE_SCREEN_STICKER_BY_PAGE_QUERY,
      variables: { currentPage: pageNum }
    }, APIs.KART);

    if (res?.success == true) {
      res['data'] = res['data']['wideScreenStickerByPage'];
      return res;
    }

    throw res;
  }
}


export const createWideScreenSticker = {
  load: async ({ name, width, height, file, animated }) => {
    const res = await endpointFetch({
      query: CREATE_WIDE_SCREEN_STICKER_MUTATION,
      variables: { name, width, height, file, animated }
    }, APIs.KART);
    return res;
  }
}


export const updateWideScreenSticker = {
  load: async ({ id, name, width, height, file, animated }) => {
    const res = await endpointFetch({
      query: UPDATE_WIDE_SCREEN_STICKER_MUTATION,
      variables: { id, name, width, height, file, animated }
    }, APIs.KART);
    return res;
  }
}


export const deleteWideScreenSticker = {
  load: async ({ id }) => {
    const res = await endpointFetch({
      query: DELETE_WIDE_SCREEN_STICKER_MUTATION,
      variables: { id }
    }, APIs.KART);
    return res;
  }
}
