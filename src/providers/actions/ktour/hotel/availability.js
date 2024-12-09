
import { APIs } from "$lib/statics/apis";
import { endpointFetch } from "$providers/actions/utils";
import { CREAT_HOTEL_AVAILABILITY_MUTATION, GET_SEARCH_HOTEL_AVAILABILITY_QUERY, UPDATE_HOTEL_AVAILABILITY_MUTATION, DELETE_HOTEL_AVAILABILITY_MUTATION } from "$providers/queries/ktour/hotel/availability";


export const searchHotelAvailibity = {
  load: async ({ pageNum, searchText, hotel }) => {
    const res = await endpointFetch({
      query: GET_SEARCH_HOTEL_AVAILABILITY_QUERY,
      variables: { currentPage: pageNum, searchText, hotel }
    }, APIs.KTOUR);
    if (res?.success == true) {
      res['data'] = res['data']['searchHotelAvailibity'];
      return res;
    }
    throw res;
  }
}



export const createHotelAvailability = {
  load: async ({ name, iconFile, hotel }) => {
    const res = await endpointFetch({
      query: CREAT_HOTEL_AVAILABILITY_MUTATION,
      variables: { name, iconFile, hotel }
    }, APIs.KTOUR);
    return res;
  }
}

export const updateHotelAvailability = {
  load: async ({ id, name, iconFile, hotel }) => {
    const res = await endpointFetch({
      query: UPDATE_HOTEL_AVAILABILITY_MUTATION,
      variables: { id, name, iconFile, hotel }
    }, APIs.KTOUR);
    return res;
  }
}



export const deleteHotelAvailability = {
  load: async ({ id }) => {
    const res = await endpointFetch({
      query: DELETE_HOTEL_AVAILABILITY_MUTATION,
      variables: { id }
    }, APIs.KTOUR);
    return res;
  }
}
