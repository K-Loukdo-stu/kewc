
import { APIs } from "$lib/statics/apis";
import { endpointFetch } from "$providers/actions/utils";
import { CREAT_HOTEL_FEATURE_MUTATION, DELETE_HOTEL_FEATURE_MUTATION, GET_SEARCH_HOTEL_FEATURE_QUERY, UPDATE_HOTEL_FEATURE_MUTATION } from "$providers/queries/ktour/hotel/feature";


export const searchHotelFeature = {
  load: async ({ pageNum, searchText, hotel }) => {
    const res = await endpointFetch({
      query: GET_SEARCH_HOTEL_FEATURE_QUERY,
      variables: { currentPage: pageNum, searchText, hotel }
    }, APIs.KTOUR);
    if (res?.success == true) {
      res['data'] = res['data']['searchHotelFeature'];
      return res;
    }
    throw res;
  }
}


export const createHotelFeature = {
  load: async ({ typeName, price, mediaFile, hotel }) => {
    const res = await endpointFetch({
      query: CREAT_HOTEL_FEATURE_MUTATION,
      variables: { typeName, mediaFile, price, hotel }
    }, APIs.KTOUR);
    return res;
  }
}

export const updateHotelFeature = {
  load: async ({ id, typeName, price, mediaFile, hotel }) => {
    const res = await endpointFetch({
      query: UPDATE_HOTEL_FEATURE_MUTATION,
      variables: { id, typeName, price, mediaFile, hotel }
    }, APIs.KTOUR);
    return res;
  }
}



export const deleteHotelFeature = {
  load: async ({ id }) => {
    const res = await endpointFetch({
      query: DELETE_HOTEL_FEATURE_MUTATION,
      variables: { id }
    }, APIs.KTOUR);
    return res;
  }
}
