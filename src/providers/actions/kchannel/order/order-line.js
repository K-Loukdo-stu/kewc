import { APIs } from '$lib/statics/apis';
import {
  CREATE_ORDER_LINE_BY_CHANNEL_MUTATION,
  DELETE_ORDER_LINE_MUTATION,
  GET_ORDER_LINE_TOTAL_QUERY,
  UNAVAILABLE_ORDER_LINES_BY_ORDER_QUERY,
  UPDATE_ORDER_LINE_QUANTITY_MUTATION
} from '$providers/queries/kchannel/order/order-line';
import { endpointFetch } from '$providers/actions/utils';
import { orderCartStore } from '$providers/stores/kchannel/order/order-cart';

export const getOrderLineTotal = {
  load: async ({ channel }) => {
    const res = await endpointFetch(
      {
        query: GET_ORDER_LINE_TOTAL_QUERY,
        variables: { channel }
      },
      APIs.KCHANNEL
    );

    if (res?.success == true) {
      res['data'] = res['data']['orderLineTotal'];
      return res;
    }

    throw res;
  },
};

export const updateOrderLineQuantity = {
  load: async ({ orderLineId, quantity }) => {
    const res = await endpointFetch(
      {
        query: UPDATE_ORDER_LINE_QUANTITY_MUTATION,
        variables: { id: orderLineId, quantity }
      },
      APIs.KCHANNEL
    );

    if (res?.success == true) {
      res['data'] = res['data']['updateOrderLineQuantity'];

      // update to cart store
      orderCartStore.updateAnOrderLine({ orderLineId: res['data']['id'], data: res['data'] });
      return res;
    }

    throw res;
  },
};

export const createOrderLineByChannel = {
  load: async ({
    channel,
    product,
    qty,
    price,
    currency,
    clonedProduct,
    clonedBasePrice,
    clonedOptions = [],
  }) => {
    const res = await endpointFetch(
      {
        mutation: CREATE_ORDER_LINE_BY_CHANNEL_MUTATION,
        variables: {
          channel,
          product,
          qty,
          price,
          currency,
          clonedProduct,
          clonedBasePrice,
          clonedOptions: clonedOptions?.length > 0 ? clonedOptions : null,
        }
      },
      APIs.KCHANNEL
    );

    if (res?.success == true) {
      res['data'] = res['data']['createOrderLineByChannel'];

      // add to cart store
      orderCartStore.addAnOrderLine(res['data']);
      return res.data;
    }

    throw res;
  },
};


export const removeOrderLine = {
  load: async ({ orderLineId }) => {
    const res = await endpointFetch(
      {
        mutation: DELETE_ORDER_LINE_MUTATION,
        variables: { id: orderLineId }
      },
      APIs.KCHANNEL
    );

    if (res?.success == true) {
      res['data'] = res['data']['deleteOrderLine'];

      // update to cart store
      orderCartStore.removeAnOrderLine({ orderLineId: res['data']['id'] });
      return res;
    }

    throw res;
  },
};

export const getUnavailableOrderLines = {
  load: async ({ orderId }) => {
    const res = await endpointFetch(
      {
        query: UNAVAILABLE_ORDER_LINES_BY_ORDER_QUERY,
        variables: { orderId }
      },
      APIs.KCHANNEL
    );

    if (res?.success == true) {
      res['data'] = res['data']['unavailableOrderLineByOrder'];
      const unavailableOrderLines = res['data'] || [];
      orderCartStore.updateUavailableOrderLines({ orderLineIds: unavailableOrderLines.map(ol => ol.id) });
      return res;
    }

    throw res;
  },
};
