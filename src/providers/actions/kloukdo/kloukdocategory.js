import { APIs } from "$lib/statics/apis";
import { CREATE_KLOUKDO_CATEGORY_MUTATION, DELETE_KLOUKDO_CATEGORY_MUTATION, GET_KLOUKDO_CATEGORY_QUERY, UPDATE_KLOUKDO_CATEGORY_MUTATION } from "$providers/queries/kloukdo/kloukdocategory";
import { endpointFetch } from "../utils";

export const getKLoukdoCategories = {
    load: async () => {
        const res = await endpointFetch({
            query: GET_KLOUKDO_CATEGORY_QUERY,
        }, APIs.KLOUKDO);
        if (res?.success == true) {
            res['data'] = res['data']['getKLoukdoCategories'];
            return res;
        }
        throw res;
    }
}

export const createKLoukdoCategory = {
    load: async ({ name, icon }) => {
        const res = await endpointFetch({
            query: CREATE_KLOUKDO_CATEGORY_MUTATION,
            variables: { name, icon }
        }, APIs.KLOUKDO);
        return res;
    }
}

export const updateKLoukdoCategory = {
    load: async ({ id, name, icon}) => {
        const res = await endpointFetch({
            query: UPDATE_KLOUKDO_CATEGORY_MUTATION,
            variables: { id, name, icon }
        }, APIs.KLOUKDO);
        return res;
    }
}

export const deleteKLoukdoCategory = {
    load: async ({ id }) => {
        const res = await endpointFetch({
            query: DELETE_KLOUKDO_CATEGORY_MUTATION,
            variables: { id }
        }, APIs.KLOUKDO);
        return res;
    }
}