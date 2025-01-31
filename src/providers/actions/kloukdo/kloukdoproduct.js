import { APIs } from "$lib/statics/apis";
import { CREATE_KLOUKDO_PRODUCT_MUTATION, DELETE_KLOUKDO_PRODUCT_MUTATION, GET_KLOUKDO_PRODUCT_BY_CATEGORY_QUERY, GET_KLOUKDO_PRODUCT_BY_ID_QUERY, GET_KLOUKDO_PRODUCT_BY_SUB_CATEGORY_QUERY, GET_KLOUKDO_PRODUCT_QUERY } from "$providers/queries/kloukdo/kloukdoproduct";
import { endpointFetch } from "../utils";

export const getAllKLoukdoProducts = {
    load: async ({ page, limit }) => {
        const res = await endpointFetch({
            query: GET_KLOUKDO_PRODUCT_QUERY,
            variables: {page, limit}
        }, APIs.KLOUKDO);
        if (res?.success == true) {
            res['data'] = res['data']['getAllKLoukdoProducts'];
            return res;
        }
        throw res;
    }
}

export const getKLoukdoProductsByCategory = {
    load: async ({ category, limit }) => {
        const res = await endpointFetch({
            query: GET_KLOUKDO_PRODUCT_BY_CATEGORY_QUERY,
            variables: {category, limit}
        }, APIs.KLOUKDO);
        if (res?.success == true) {
            res['data'] = res['data']['findKLoukdoProductByCategory'];
            return res;
        }
        throw res;
    }
}

export const getKLoukdoProductsBySubCategory = {
    load: async ({ subCategory, limit }) => {
        const res = await endpointFetch({
            query: GET_KLOUKDO_PRODUCT_BY_SUB_CATEGORY_QUERY,
            variables: {subCategory, limit}
        }, APIs.KLOUKDO);
        if (res?.success == true) {
            res['data'] = res['data']['findKLoukdoProductBySubCategory'];
            return res;
        }
        throw res;
    }
}

export const getKLoukdoProductById = {
    load: async ({ id }) => {
        const res = await endpointFetch({
            query: GET_KLOUKDO_PRODUCT_BY_ID_QUERY,
            variables: { id }
        }, APIs.KLOUKDO);
        if (res?.success == true) {
            res['data'] = res['data']['getKLoukdoProduct'];
            return res;
        }
        throw res;
    }
}

export const createKLoukdoProduct = {
    load: async ({ name, category, subCategory, price, discountPrice, currency, hasDiscount,  photos }) => {
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