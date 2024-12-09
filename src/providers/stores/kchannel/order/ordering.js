/**
 *  Create store in svelte
 */

import { writable } from 'svelte/store';

const ordering = writable({});
const orderingStore = {
  subscribe: ordering.subscribe,
  reset: () => ordering.set(null),
  update: (data) => ordering.set(data),
  updateStatusOrdering: ({ id, status }) => ordering.update(pre => {
    const orderings = pre || [];
    const foundIndex = orderings.findIndex(or => or.id == id);
    if (foundIndex >= 0) {
      orderings.splice(foundIndex, 1);
      // orderings[foundIndex].inProcessStatus = status;
    }
    pre = orderings;
    return pre;
  }),
};

export { ordering, orderingStore };
