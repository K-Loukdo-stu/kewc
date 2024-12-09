/**
 *  Create store in svelte
 */

import { writable } from 'svelte/store';

const orderCart = writable({});
const orderCartStore = {
  subscribe: orderCart.subscribe,
  reset: () => orderCart.set(null),
  update: (data) => orderCart.set(data),
  updateAnOrderLine: ({ orderLineId, data }) => orderCart.update(pre => {
    const orderLines = pre?.['orderLines'] || [];
    const foundIndex = orderLines.findIndex(ol => ol.id == orderLineId);
    if (foundIndex >= 0) {
      orderLines[foundIndex] = {
        ...orderLines[foundIndex],
        ...data
      };
      pre['orderLines'] = orderLines;
    }

    return pre;
  }),
  addAnOrderLine: ({ data }) => orderCart.update(pre => {
    const orderLines = pre?.['orderLines'] || [];
    orderLines.push(data);
    pre['orderLines'] = orderLines;
    return pre;
  }),
  removeAnOrderLine: ({ orderLineId }) => orderCart.update(pre => {
    let orderLines = pre?.['orderLines'] || [];
    orderLines = orderLines.filter((ol) => ol['id'] != orderLineId);
    pre['orderLines'] = orderLines;
    return pre;
  }),
  updateUavailableOrderLines: ({ orderLineIds = [] }) => orderCart.update(pre => {
    let orderLines = pre?.['orderLines'] || [];

    orderLines = orderLines.map(ol => {
      const unavailable = orderLineIds.includes(ol.id);
      return { ...ol, unavailable }
    });

    pre['orderLines'] = orderLines;
    return pre;
  }),
};

export { orderCart, orderCartStore };
