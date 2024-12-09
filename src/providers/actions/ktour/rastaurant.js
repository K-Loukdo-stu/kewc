import { APIs } from "$lib/statics/apis";
import { CREATE_RESTAURANT_CATEGORY_MUTATION, CREATE_RESTAURANT_MUTATION, DELETE_RESTAURANT_CATEGORY_MUTATION, DELETE_RESTAURANT_MUTATION, GET_RESTAURANT_CATEGORIES_QUERY, GET_RESTAURANT_QUERY, GET_SEARCH_RESTAURANTS_QUERY, GET_SEARCH_RESTAURANT_CATEGORIES_QUERY, UPDATE_RESTAURANT_CATEGORY_MUTATION, UPDATE_RESTAURANT_MUTATION } from "$providers/queries/ktour/restaurant";
import { endpointFetch } from "../utils";


/**
 * Hotel Category
 */



export const getRestaurantCategories = {
  load: async () => {
    const res = await endpointFetch({
      query: GET_RESTAURANT_CATEGORIES_QUERY,
    }, APIs.KTOUR);

    if (res?.success == true) {
      res['data'] = res['data']['restaurantCategories'];
      return res;
    }

    throw res;
  }
}

export const searchRestaurantCategories = {
  load: async ({ pageNum, searchText }) => {
    const res = await endpointFetch({
      query: GET_SEARCH_RESTAURANT_CATEGORIES_QUERY,
      variables: { currentPage: pageNum, searchText }
    }, APIs.KTOUR);
    if (res?.success == true) {
      res['data'] = res['data']['searchRestaurantCategories'];
      return res;
    }
    throw res;
  }
}


export const createRestaurantCategory = {
  load: async ({ name, mediaUrl, description }) => {
    const res = await endpointFetch({
      query: CREATE_RESTAURANT_CATEGORY_MUTATION,
      variables: { name, mediaUrl, description }
    }, APIs.KTOUR);
    return res;
  }
}

export const updateRestaurantCategory = {
  load: async ({ id, name, mediaUrl, description }) => {
    const res = await endpointFetch({
      query: UPDATE_RESTAURANT_CATEGORY_MUTATION,
      variables: { id, name, mediaUrl, description }
    }, APIs.KTOUR);
    return res;
  }
}

export const deleteRestaurantCategory = {
  load: async ({ id }) => {
    const res = await endpointFetch({
      query: DELETE_RESTAURANT_CATEGORY_MUTATION,
      variables: { id }
    }, APIs.KTOUR);
    return res;
  }
}


/**
* Restaurant
*/


export const searchRestaurants = {
  load: async ({ pageNum, searchText }) => {
    const res = await endpointFetch({
      query: GET_SEARCH_RESTAURANTS_QUERY,
      variables: { currentPage: pageNum, searchText }
    }, APIs.KTOUR);
    if (res?.success == true) {
      res['data'] = res['data']['searchRestaurants'];
      return res;
    }
    throw res;
  }
}


export const restaurant = {
  load: async ({ uid }) => {
    const res = await endpointFetch({
      query: GET_RESTAURANT_QUERY,
      variables: { id: uid }
    }, APIs.KTOUR);
    if (res?.success == true) {
      res['data'] = res['data']['restaurant'];
      return res;
    }
    throw res;
  }
}


export const createRestaurant = {
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
    channel }) => {
    const res = await endpointFetch({
      query: CREATE_RESTAURANT_MUTATION,
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
        channel
      }
    }, APIs.KTOUR);
    return res;
  }
}

export const updateRestaurant = {
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
    channel }) => {
    const res = await endpointFetch({
      query: UPDATE_RESTAURANT_MUTATION,
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
        channel
      }
    }, APIs.KTOUR);
    return res;
  }
}

export const deleteRestaurant = {
  load: async ({ id }) => {
    const res = await endpointFetch({
      query: DELETE_RESTAURANT_MUTATION,
      variables: { id }
    }, APIs.KTOUR);
    return res;
  }
}



