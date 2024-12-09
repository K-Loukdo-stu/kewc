import { APIs } from '$lib/statics/apis';
import { endpointFetch } from '$providers/actions/utils';
import { CHECKOUT_A_CART_MUTATION, LOAD_ORDER_CART_QUERY, LOAD_ORDER_SUMMARY_QUERY, LOARD_ORDERING_SUMARRY_QUERY, UPDATE_STATUS_ORDER_MUTATION } from '$providers/queries/kchannel/order/order';
import { orderCartStore } from '$providers/stores/kchannel/order/order-cart';
import { orderingStore } from '$providers/stores/kchannel/order/ordering';

export const loadOrderCart = {
  load: async ({ channel }) => {
    const res = await endpointFetch(
      {
        query: LOAD_ORDER_CART_QUERY,
        variables: {
          channel,
        }
      },
      APIs.KCHANNEL
    );

    if (res?.success == true) {
      res['data'] = res['data']['loadOrderCart'];

      orderCartStore.update(res['data']);
      return res;
    }

    throw res;
  },
};

export const loadOrderSummary = {
  load: async ({ orderId }) => {
    const res = await endpointFetch(
      {
        query: LOAD_ORDER_SUMMARY_QUERY,
        variables: {
          orderId,
        }
      },
      APIs.KCHANNEL
    );

    if (res?.success == true) {
      res['data'] = res['data']['orderSummary'];
      return res;
    }

    throw res;
  },
};

export const checkoutACart = {
  load: async ({ orderId, subTotal, discount, delivery, total, acceptingCurrency, usdExchangeRateInRiel, hasCurrencyConversion }) => {
    const res = await endpointFetch(
      {
        mutation: CHECKOUT_A_CART_MUTATION,
        variables: {
          orderId,
          subTotal,
          discount,
          delivery,
          total,
          acceptingCurrency,
          usdExchangeRateInRiel,
          hasCurrencyConversion
        }
      },
      APIs.KCHANNEL
    );

    if (res?.success == true) {
      res['data'] = res['data']['checkoutCart'];
      return res;
    }

    throw res;
  },
};

export const loadOrderingSummary = {
  load: async ({ channel, inProcessStatus }) => {
    const res = await endpointFetch(
      {
        query: LOARD_ORDERING_SUMARRY_QUERY,
        variables: {
          channel,
          inProcessStatus
        }
      },
      APIs.KCHANNEL
    );

    if (res?.success == true) {
      res['data'] = res['data']['listOrderingSummary'];
      orderingStore.update(res['data']);
      return res;
    }

    throw res;
  },
};

export const updateOrderStatus = {
  load: async ({ id, status }) => {

    const res = await endpointFetch(
      {
        mutation: UPDATE_STATUS_ORDER_MUTATION,
        variables: {
          id,
          status
        }
      },
      APIs.KCHANNEL
    );

    if (res?.success == true) {
      res['data'] = res['data']['updateStatusOrder'];
      orderingStore.updateStatusOrdering({ id, status });
      return res;
    }

    throw res;
  },
};



