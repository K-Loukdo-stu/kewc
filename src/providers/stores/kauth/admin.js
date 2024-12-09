/**
 * Create stores in svelte
 */

 import { writable } from 'svelte/store';

//  const user = writable({});
//  const userStore = {
//    subscribe: user.subscribe,
//    reset: (userData) => user.set(userData)
//  };
 
 const admins = writable([]);
 const adminsStore = {
   subscribe: admins.subscribe,
   reset: (adminsData) => admins.set(adminsData)
 };
 
 export { adminsStore, admins };
 