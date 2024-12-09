import { APIs } from "$lib/statics/apis";
import { CREATE_HOTEL_CATEGORY_MUTATION, CREATE_HOTEL_MUTATION, DELETE_HOTEL_CATEGORY_MUTATION, DELETE_HOTEL_MUTATION, GET_HOTEL_CATEGORIES_QUERY, GET_HOTEL_QUERY, GET_SEARCH_HOTELS_QUERY, GET_SEARCH_HOTEL_BOOKING_QUERY, GET_SEARCH_HOTEL_CATEGORIES_QUERY, UPDATE_HOTEL_CATEGORY_MUTATION, UPDATE_HOTEL_MUTATION, } from "$providers/queries/ktour/hotel";
import { endpointFetch } from "../utils";


/**
 * Hotel Category
 */



export const getHotelCategories = {
  load: async () => {
    const res = await endpointFetch({
      query: GET_HOTEL_CATEGORIES_QUERY,
    }, APIs.KTOUR);

    if (res?.success == true) {
      res['data'] = res['data']['hotelCategories'];
      return res;
    }

    throw res;
  }
}

export const searchHotelCategories = {
  load: async ({ pageNum, searchText }) => {
    const res = await endpointFetch({
      query: GET_SEARCH_HOTEL_CATEGORIES_QUERY,
      variables: { currentPage: pageNum, searchText }
    }, APIs.KTOUR);
    if (res?.success == true) {
      res['data'] = res['data']['searchHotelCategories'];
      return res;
    }
    throw res;
  }
}


export const createHotelCategory = {
  load: async ({ name, mediaUrl, description }) => {
    const res = await endpointFetch({
      query: CREATE_HOTEL_CATEGORY_MUTATION,
      variables: { name, mediaUrl, description }
    }, APIs.KTOUR);
    return res;
  }
}

export const updateHotelCategory = {
  load: async ({ id, name, mediaUrl, description }) => {
    const res = await endpointFetch({
      query: UPDATE_HOTEL_CATEGORY_MUTATION,
      variables: { id, name, mediaUrl, description }
    }, APIs.KTOUR);
    return res;
  }
}

export const deleteHotelCategory = {
  load: async ({ id }) => {
    const res = await endpointFetch({
      query: DELETE_HOTEL_CATEGORY_MUTATION,
      variables: { id }
    }, APIs.KTOUR);
    return res;
  }
}


/**
* Hotel
*/


export const searchHotels = {
  load: async ({ pageNum, searchText }) => {
    const res = await endpointFetch({
      query: GET_SEARCH_HOTELS_QUERY,
      variables: { currentPage: pageNum, searchText }
    }, APIs.KTOUR);
    if (res?.success == true) {
      res['data'] = res['data']['searchHotels'];
      return res;
    }
    throw res;
  }
}


export const hotel = {
  load: async ({ uid }) => {
    const res = await endpointFetch({
      query: GET_HOTEL_QUERY,
      variables: { id: uid }
    }, APIs.KTOUR);
    if (res?.success == true) {
      res['data'] = res['data']['hotel'];
      return res;
    }
    throw res;
  }
}


export const createHotel = {
  load: async ({
    name,
    mediaUrl,
    description,
    latitude,
    longtitude,
    category,
    province,
    phone,
    email,
    website,
    price,
    checkInTime,
    checkOutTime, channel }) => {
    const res = await endpointFetch({
      query: CREATE_HOTEL_MUTATION,
      variables: {
        name,
        mediaUrl,
        description,
        latitude,
        longtitude,
        category,
        province,
        phone,
        email,
        website,
        price,
        checkInTime,
        checkOutTime,
        channel
      }
    }, APIs.KTOUR);
    return res;
  }
}

export const updateHotel = {
  load: async ({
    id,
    name,
    mediaUrl,
    description,
    latitude,
    longtitude,
    category,
    province,
    phone,
    email,
    website,
    price,
    checkInTime,
    checkOutTime,
    channel,
    bio,
    type,
    profile }) => {
    const res = await endpointFetch({
      query: UPDATE_HOTEL_MUTATION,
      variables: {
        id,
        name,
        mediaUrl,
        description,
        latitude,
        longtitude,
        category,
        province,
        phone,
        email,
        website,
        price,
        checkInTime,
        checkOutTime,
        channel,
        bio,
        type,
        profile
      }
    }, APIs.KTOUR);
    return res;
  }
}

export const deleteHotel = {
  load: async ({ id }) => {
    const res = await endpointFetch({
      query: DELETE_HOTEL_MUTATION,
      variables: { id }
    }, APIs.KTOUR);
    return res;
  }
}





/**
 * Feature
 */



/**
 * Extra Feature
 */



/**
 * Booking
 */

export const searchHotelBooking = {
  load: async ({ pageNum, searchText, hotel }) => {
    const res = await endpointFetch({
      query: GET_SEARCH_HOTEL_BOOKING_QUERY,
      variables: { currentPage: pageNum, searchText, hotel }
    }, APIs.KTOUR);
    if (res?.success == true) {
      res['data'] = res['data']['searchHotelBooking'];
      return res;
    }
    throw res;
  }
}



