import { APIs } from "$lib/statics/apis";
import { CREATE_COVER_MUTATION, DELETE_COVER_MUTATION, GET_COVERS_BY_PAGE_QUERY } from "$providers/queries/kart";
import { endpointFetch } from "../utils";

export const listCovers = {
    load: async ({ pageNum }) => {
        const res = await endpointFetch({
            query: GET_COVERS_BY_PAGE_QUERY,
            variables: { currentPage: pageNum }
        }, APIs.KART);

        if (res?.success == true) {
            res['data'] = res['data']['coversByPage'];
            return res;
        }
        throw res;
    }
}


export const createCover = {
    load: async ({ name, width, height, file }) => {
        const res = await endpointFetch({
            query: CREATE_COVER_MUTATION,
            variables: { name, width, height, file }
        }, APIs.KART);
        return res;
    }
}

export const deleteCover = {
    load: async ({ id }) => {
        const res = await endpointFetch({
            query: DELETE_COVER_MUTATION,
            variables: { id }
        }, APIs.KART);
        return res;
    }
}