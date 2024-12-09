import { APIs } from "$lib/statics/apis";
import { endpointFetch } from "$providers/actions/utils";
import { CREATE_PRODUCT_PRICE_MUTATION, DELETE_PRODUCT_PRICE_MUTATION, GET_PRODUCT_PRICES_BY_PRODUCT_QUERY, UPDATE_PRODUCT_PRICE_MUTATION } from "$providers/queries/kchannel/product";

export const createProductPrice = {
  load: async ({ name, price, discountPrice, hasDiscount, currency, product, isMain = false }) => {
    const res = await endpointFetch({
      mutation: CREATE_PRODUCT_PRICE_MUTATION,
      variables: {
        name,
        price,
        discountPrice,
        hasDiscount,
        currency,
        product,
        isMain
      }
    }, APIs.KCHANNEL);

    if (res?.success == true) {
      res['data'] = res['data']['createProductPrice'];
      return res;
    }

    throw res;
  }
}

export const updateProductPrice = {
  load: async ({ id, name, price, discountPrice, hasDiscount, currency }) => {
    const res = await endpointFetch({
      mutation: UPDATE_PRODUCT_PRICE_MUTATION,
      variables: {
        id,
        name,
        price,
        discountPrice,
        hasDiscount,
        currency
      }
    }, APIs.KCHANNEL);

    if (res?.success == true) {
      res['data'] = res['data']['updateProductPrice'];
      return res;
    }

    throw res;
  }
}

export const deleteProductPrice = {
  load: async ({ priceId }) => {
    const res = await endpointFetch({
      mutation: DELETE_PRODUCT_PRICE_MUTATION,
      variables: { id: priceId }
    }, APIs.KCHANNEL);

    if (res?.success == true) {
      res['data'] = res['data']['deleteProductPrice'];
      return res;
    }

    throw res;
  }
}


export const getProductPrices = {
  load: async ({ productId }) => {
    const res = await endpointFetch({
      query: GET_PRODUCT_PRICES_BY_PRODUCT_QUERY,
      variables: { product: productId }
    }, APIs.KCHANNEL);

    if (res?.success == true) {
      res['data'] = res['data']['productPricesByProduct'];
      return res;
    }

    throw res;
  }
}