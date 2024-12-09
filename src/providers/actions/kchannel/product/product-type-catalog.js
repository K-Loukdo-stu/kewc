import { APIs } from "$lib/statics/apis";
import {
  CREATE_PRODUCT_TYPE_CATELOG_MUTATION,
  DELETE_PRODUCT_TYPE_CATELOG_MUTATION,
  GET_PRODUCT_TYPE_CATALOGS_QUERY,
  GET_SEARCH_PRODUCT_TYPE_CATALOG_QUERY,
  UPDATE_PRODUCT_TYPE_CATELOG_MUTATION
} from "$providers/queries/kchannel/product";
import { endpointFetch } from "$providers/actions/utils";



export const getProductTypeCatalogs = {
  load: async () => {
    const res = await endpointFetch({
      query: GET_PRODUCT_TYPE_CATALOGS_QUERY,
    }, APIs.KCHANNEL);

    if (res?.success == true) {
      res['data'] = res['data']['productTypeCatalogs'];
      return res;
    }

    throw res;
  }
}

export const searchProductTypeCatalogs = {
  load: async ({ pageNum, searchText }) => {
    const res = await endpointFetch({
      query: GET_SEARCH_PRODUCT_TYPE_CATALOG_QUERY,
      variables: { currentPage: pageNum, searchText }
    }, APIs.KCHANNEL);
    if (res?.success == true) {
      res['data'] = res['data']['searchProductTypeCatalogs'];
      return res;
    }
    throw res;
  }
}

export const createProductTypeCatalog = {
  load: async ({ name, icon }) => {
    const res = await endpointFetch({
      query: CREATE_PRODUCT_TYPE_CATELOG_MUTATION,
      variables: { name, icon }
    }, APIs.KCHANNEL);
    return res;
  }
}

export const updateProductTypeCatalog = {
  load: async ({ id, name, icon }) => {
    const res = await endpointFetch({
      query: UPDATE_PRODUCT_TYPE_CATELOG_MUTATION,
      variables: { id, name, icon }
    }, APIs.KCHANNEL);
    return res;
  }
}

export const deleteProductTypeCatalog = {
  load: async ({ id }) => {
    const res = await endpointFetch({
      query: DELETE_PRODUCT_TYPE_CATELOG_MUTATION,
      variables: { id }
    }, APIs.KCHANNEL);
    return res;
  }
}
