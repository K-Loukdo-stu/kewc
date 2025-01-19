import { APIs } from "$lib/statics/apis";
import { CREATE_KLOUKDO_PROMOTION_MUTATION, DELETE_KLOUKDO_PROMOTION_MUTATION, GET_ALL_KLOUKDO_PROMOTION_QUERY, GET_RANDOM_KLOUKDO_PROMOTION_QUERY, UPDATE_KLOUKDO_PROMOTION_MUTATION } from "$providers/queries/kloukdo/kloukdopromotion";
import { endpointFetch } from "../utils";

export const getAllKLoukdoPromotios = {
    load: async ({ page }) => {
        const res = await endpointFetch({
            query: GET_ALL_KLOUKDO_PROMOTION_QUERY,
            variables: {page}
        }, APIs.KLOUKDO);
        if (res?.success == true) {
            res['data'] = res['data']['getAllKLoukdoPromotions'];
            return res;
        }
        throw res;
    }
}

export const getRandomKLoukdoPromotions = {
    load: async () => {
        const res = await endpointFetch({
            query: GET_RANDOM_KLOUKDO_PROMOTION_QUERY,
        }, APIs.KLOUKDO);
        if (res?.success == true) {
            res['data'] = res['data']['getKLoukdoPromotionRandom'];
            return res;
        }
        throw res;
    }
}

export const deleteKLoukdoPromotion = {
    load: async ({ id }) => {
        const res = await endpointFetch({
            query: DELETE_KLOUKDO_PROMOTION_MUTATION,
            variables: { id }
        }, APIs.KLOUKDO);
        if (res?.success == true) {
            res['data'] = res['data']['deleteKLoukdoPromotion'];
            return res;
        }
        throw res;
    }
}

export const createKLoukdoPromotion = {
    load: async ({ product, endDate }) => {
        const res = await endpointFetch({
            query: CREATE_KLOUKDO_PROMOTION_MUTATION,
            variables: { product, endDate }
        }, APIs.KLOUKDO);
        if (res?.success == true) {
            res['data'] = res['data']['createKLoukdoPromotion'];
            return res;
        }
        throw res;
    }
}


export const updateKLoukdoPromotion = {
    load: async ({ id, endDate }) => {
        const res = await endpointFetch({
            query: UPDATE_KLOUKDO_PROMOTION_MUTATION,
            variables: { id, endDate }
        }, APIs.KLOUKDO);
        if (res?.success == true) {
            res['data'] = res['data']['updateKLoukdoPromotion'];
            return res;
        }
        throw res;
    }
}

