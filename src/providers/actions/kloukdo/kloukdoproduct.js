import { APIs } from "$lib/statics";
import { CREATE_KLOUKDO_PRODUCT_MUTATION, DELETE_KLOUKDO_PRODUCT_MUTATION, GET_KLOUKDO_PRODUCT_QUERY } from "$providers/queries/kloukdo/kloukdoproduct";
import { endpointFetch } from "../utils";

export const getAllKLoukdoProducts = {
    load: async ({ page }) => {
        const res = await endpointFetch({
            query: GET_KLOUKDO_PRODUCT_QUERY,
            variables: {page}
        }, APIs.KLOUKDO);
        if (res?.success == true) {
            res['data'] = res['data']['getAllKLoukdoProducts'];
            return res;
        }
        throw res;
    }
}

export const createKLoukdoProduct = {
    load: async ({ name, category, subCategory, price, discountPrice, currency, hasDiscount,  photos }) => {
        console.log(typeof(hasDiscount));
        const res = await endpointFetch({
            query: CREATE_KLOUKDO_PRODUCT_MUTATION,
            variables: {name, category, subCategory, price, discountPrice, currency, hasDiscount, photos}
        }, APIs.KLOUKDO);
        if (res?.success == true) {
            res['data'] = res['data']['createKLoukdoProduct'];
            return res;
        }
        throw res;
    }
}

export const deleteKLoukdoProduct = {
    load: async ({ id }) => {
        const res = await endpointFetch({
            query: DELETE_KLOUKDO_PRODUCT_MUTATION,
            variables: { id }
        }, APIs.KLOUKDO);
        return res;
    }
}