
import { APIs } from "$lib/statics/apis";
import { endpointFetch } from "$providers/actions/utils";
import { CREAT_HOTEL_EXTRA_FEATURE_MUTATION, DELETE_HOTEL_EXTRA_FEATURE_MUTATION, GET_SEARCH_HOTEL_EXTRA_FEATURE_QUERY, UPDATE_HOTEL_EXTRA_FEATURE_MUTATION } from "$providers/queries/ktour/hotel/extra-feature";


export const searchHotelExtraFeature = {
  load: async ({ pageNum, searchText, hotel }) => {
    const res = await endpointFetch({
      query: GET_SEARCH_HOTEL_EXTRA_FEATURE_QUERY,
      variables: { currentPage: pageNum, searchText, hotel }
    }, APIs.KTOUR);
    if (res?.success == true) {
      res['data'] = res['data']['searchHotelExtraFeature'];
      return res;
    }
    throw res;
  }
}



export const createHotelExtraFeature = {
  load: async ({ additionalItem, price, mediaFile, hotel }) => {
    const res = await endpointFetch({
      query: CREAT_HOTEL_EXTRA_FEATURE_MUTATION,
      variables: { additionalItem, mediaFile, price, hotel }
    }, APIs.KTOUR);
    return res;
  }
}

export const updateHotelExtraFeature = {
  load: async ({ id, additionalItem, price, mediaFile, hotel }) => {
    const res = await endpointFetch({
      query: UPDATE_HOTEL_EXTRA_FEATURE_MUTATION,
      variables: { id, additionalItem, price, mediaFile, hotel }
    }, APIs.KTOUR);
    return res;
  }
}



export const deleteHotelExtraFeature = {
  load: async ({ id }) => {
    const res = await endpointFetch({
      query: DELETE_HOTEL_EXTRA_FEATURE_MUTATION,
      variables: { id }
    }, APIs.KTOUR);
    return res;
  }
}
