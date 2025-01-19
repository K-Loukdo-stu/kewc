import { APIs } from "$lib/statics/apis";
import { CREATE_KLOUKDO_ADS_IMAGE_MUTATION, DELETE_KLOUKDO_ADS_IMGAE_MUTATION, GET_ALL_KLOUKDO_ADS_IMAGE_QUERY, UPDATE_KLOUKDO_ADS_IMAGE_MUTATION } from "$providers/queries/kloukdo/kloukdoadsimage";
import { endpointFetch } from "../utils";

export const getKLoukdoAdsImage = {
    load: async ({ page }) => {
        const res = await endpointFetch({
            query: GET_ALL_KLOUKDO_ADS_IMAGE_QUERY,
            variables: { page }
        }, APIs.KLOUKDO);
        if (res?.success == true) {
            res['data'] = res['data']['getAllKLoukdoAdvertisementImage'];
            return res;
        }
        throw res;
    }
}

export const updateKLoukdoAdsImage = {
    load: async ({ id, name, endDate }) => {
        const res = await endpointFetch({
            query: UPDATE_KLOUKDO_ADS_IMAGE_MUTATION,
            variables: { id, name, endDate }
        }, APIs.KLOUKDO);
        if (res?.success == true) {
            res['data'] = res['data']['updateKLoukdoAdvertisementImage'];
            return res;
        }
        throw res;
    }
}

export const deleteKLoukdoAds = {
    load: async ({ id }) => {
        const res = await endpointFetch({
            query: DELETE_KLOUKDO_ADS_IMGAE_MUTATION,
            variables: { id }
        }, APIs.KLOUKDO);
        return res;
    }
}

export const createKLoukdoAds = {
    load: async ({ name, image, endDate }) => {
        const res = await endpointFetch({
            query: CREATE_KLOUKDO_ADS_IMAGE_MUTATION,
            variables: { name, image, endDate }
        }, APIs.KLOUKDO);
        return res;
    }
}