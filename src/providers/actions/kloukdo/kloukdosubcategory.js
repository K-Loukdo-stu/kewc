import { APIs } from "$lib/statics/apis";
import { CREATE_KLOUKDO_SUB_CATEGORY_MUTATION, DELETE_KLOUKDO_SUB_CATEGORY_MUTATION, GET_KLOUKDO_SUB_CATEGORY_BY_CATEGORY_QUERY, GET_KLOUKDO_SUB_CATEGORY_BY_PAGE_QUERY, GET_KLOUKDO_SUB_CATEGORY_QUERY, UPDATE_KLOUKDO_SUB_CATEGORY_MUTATION } from "$providers/queries/kloukdo/kloukdosubcategory";
import { endpointFetch } from "../utils";

export const getKLoukdoSubCategoriesByPage = {
    load: async ({ page }) => {
        const res = await endpointFetch({
            query: GET_KLOUKDO_SUB_CATEGORY_BY_PAGE_QUERY,
            variables: { page } 
        }, APIs.KLOUKDO);
        if (res?.success == true) {
            res['data'] = res['data']['getKLoukdoSubCategoriesByPage'];
            return res;
        }
        throw res;
    }
}

export const getKLoukdoSubCategories = {
    load: async () => {
        const res = await endpointFetch({
            query: GET_KLOUKDO_SUB_CATEGORY_QUERY,
        }, APIs.KLOUKDO);
        if (res?.success == true) {
            res['data'] = res['data']['getKLoukdoSubCategories'];
            return res;
        }
        throw res;
    }
}

export const getKLoukdoSubCategoriesByCategory = {
    load: async ({ category }) => {
        const res = await endpointFetch({
            query: GET_KLOUKDO_SUB_CATEGORY_BY_CATEGORY_QUERY,
            variables: { category }
        }, APIs.KLOUKDO);
        if (res?.success == true) {
            res['data'] = res['data']['getKLoukdoSubCategoriesByCategory'];
            return res;
        }
        throw res;
    }
}

export const createKLoukdoSubCategory = {
    load: async ({ name, category, icon }) => {
        const res = await endpointFetch({
            query: CREATE_KLOUKDO_SUB_CATEGORY_MUTATION,
            variables: { name, category, icon }
        }, APIs.KLOUKDO);
        return res;
    }
}

export const updateKLoukdoSubCategory = {
    load: async ({ id, name, category, icon}) => {
        const res = await endpointFetch({
            query: UPDATE_KLOUKDO_SUB_CATEGORY_MUTATION,
            variables: { id, name, category, icon }
        }, APIs.KLOUKDO);
        return res;
    }
}

export const deleteKLoukdoSubCategory = {
    load: async ({ id }) => {
        const res = await endpointFetch({
            query: DELETE_KLOUKDO_SUB_CATEGORY_MUTATION,
            variables: { id }
        }, APIs.KLOUKDO);
        return res;
    }
}