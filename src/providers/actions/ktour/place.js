import { APIs } from "$lib/statics/apis";
import { CREATE_PLACE_CATEGORY_MUTATION, CREATE_PLACE_MUTATION, DELETE_PLACE_CATEGORY_MUTATION, DELETE_PLACE_MUTATION, GET_PLACE_CATEGORIES_QUERY, GET_PLACE_QUERY, GET_SEARCH_PLACES_QUERY, GET_SEARCH_PLACE_CATEGORIES_QUERY, UPDATE_PLACE_CATEGORY_MUTATION, UPDATE_PLACE_MUTATION } from "$providers/queries/ktour";
import { endpointFetch } from "../utils";


/**
 * Place Category
 */



export const getPlaceCategories = {
  load: async () => {
    const res = await endpointFetch({
      query: GET_PLACE_CATEGORIES_QUERY,
    }, APIs.KTOUR);

    if (res?.success == true) {
      res['data'] = res['data']['placeCategories'];
      return res;
    }

    throw res;
  }
}

export const searchPlaceCategories = {
  load: async ({ pageNum, searchText }) => {
    const res = await endpointFetch({
      query: GET_SEARCH_PLACE_CATEGORIES_QUERY,
      variables: { currentPage: pageNum, searchText }
    }, APIs.KTOUR);
    if (res?.success == true) {
      res['data'] = res['data']['SearchCategories'];
      return res;
    }
    throw res;
  }
}


export const createPlaceCategory = {
  load: async ({ name, mediaFile, description }) => {
    const res = await endpointFetch({
      query: CREATE_PLACE_CATEGORY_MUTATION,
      variables: { name, mediaFile, description }
    }, APIs.KTOUR);
    return res;
  }
}

export const updatePlaceCategory = {
  load: async ({ id, name, mediaFile, description }) => {
    const res = await endpointFetch({
      query: UPDATE_PLACE_CATEGORY_MUTATION,
      variables: { id, name, mediaFile, description }
    }, APIs.KTOUR);
    return res;
  }
}

export const deletePlaceCategory = {
  load: async ({ id }) => {
    const res = await endpointFetch({
      query: DELETE_PLACE_CATEGORY_MUTATION,
      variables: { id }
    }, APIs.KTOUR);
    return res;
  }
}


/**
* Place
*/


export const searchPlaces = {
  load: async ({ pageNum, searchText }) => {
    const res = await endpointFetch({
      query: GET_SEARCH_PLACES_QUERY,
      variables: { currentPage: pageNum, searchText }
    }, APIs.KTOUR);
    if (res?.success == true) {
      res['data'] = res['data']['searchPlaces'];
      return res;
    }
    throw res;
  }
}


export const place = {
  load: async ({ uid }) => {
    const res = await endpointFetch({
      query: GET_PLACE_QUERY,
      variables: { id: uid }
    }, APIs.KTOUR);
    if (res?.success == true) {
      res['data'] = res['data']['place'];
      return res;
    }
    throw res;
  }
}


export const createPlace = {
  load: async ({
    name,
    mediaFile,
    description,
    latitude,
    longtitude,
    category,
    province,
    iconUrl,
    iconX,
    iconY,
    pointX,
    pointY,
    hiddenAtMinScale,
    showIcon,
    phone,
    email,
    website,
    price }) => {
    const res = await endpointFetch({
      query: CREATE_PLACE_MUTATION,
      variables: {
        name,
        mediaFile,
        description,
        latitude,
        longtitude,
        category,
        province,
        iconUrl,
        iconX,
        iconY,
        pointX,
        pointY,
        hiddenAtMinScale,
        showIcon,
        phone,
        email,
        website,
        price
      }
    }, APIs.KTOUR);
    return res;
  }
}

export const updatePlace = {
  load: async ({
    id,
    name,
    mediaFile,
    description,
    latitude,
    longtitude,
    category,
    province,
    iconUrl,
    iconX,
    iconY,
    pointX,
    pointY,
    hiddenAtMinScale,
    showIcon,
    phone,
    email,
    website,
    price }) => {
    const res = await endpointFetch({
      query: UPDATE_PLACE_MUTATION,
      variables: {
        id,
        name,
        mediaFile,
        description,
        latitude,
        longtitude,
        category,
        province,
        iconUrl,
        iconX,
        iconY,
        pointX,
        pointY,
        hiddenAtMinScale,
        showIcon,
        phone,
        email,
        website,
        price
      }
    }, APIs.KTOUR);
    return res;
  }
}

export const deletePlace = {
  load: async ({ id }) => {
    const res = await endpointFetch({
      query: DELETE_PLACE_MUTATION,
      variables: { id }
    }, APIs.KTOUR);
    return res;
  }
}