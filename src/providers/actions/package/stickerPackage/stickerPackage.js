// /**
//  * Create API requests
//  */


// export const stickerCategories = {
//   load: async (fetch) => {
//     const res = await fetch(`/dashboard/package/stickerPackage/package`, {
//       method: 'POST',
//       headers: {
//         accept: 'application/json'
//       },
//     });
//     let body = await res.json()

//     if (body.success) {
//       body['data'] = body.data['stickerCategories'];
//     }

//     return body;
//   }
// }


// export const stickerPackages = {
//   load: async (fetch, { currentPage }) => {
//     const res = await fetch('/dashboard/package/stickerPackage/pageNumber', {
//       method: 'POST',
//       headers: {
//         accept: 'application/json'
//       },
//       body: JSON.stringify({ currentPage })
//     });
//     let body = await res.json();

//     if (body.success) {
//       body['data'] = body.data['stickerPackages'];
//     }
//     return body;
//   }
// }


// // export const viewPackage = {

// //   load: async (fetch, { pid }) => {
// //     const res = await fetch(`/dashboard/sticker/detail/${pid}`, {
// //       method: 'POST',
// //       headers: {
// //         accept: 'application/json'
// //       },

// //       body: JSON.stringify({ pid })

// //     });
// //     let body = await res.json()

// //     if (body.success) {
// //       body['data'] = body.data['stickerCategory'];
// //     }

// //     return body;
// //   }
// // }

// export const createStickerPackage = {
//   load: async (fetch, { name, amount, price, currency }) => {
//     const res = await fetch('/dashboard/package/stickerPackage/createPackage', {
      
//       method: 'POST',
//       headers: {
//         accept: 'application/json'
//       },

//       body: JSON.stringify({ name, amount, price, currency })

//     });
//     let body = await res.json()
//     return res;
//   }
// }


// export const updateStickerPackage = {
//   load: async (fetch, { id, name, amount, price, currency }) => {
//     const res = await fetch('/dashboard/package/stickerPackage/updatePackage', {
//       method: 'POST',
//       headers: {
//         accept: 'application/json'
//       },
//       body: JSON.stringify({ id, name, amount, price, currency })
//     });
//     let body = await res.json()
//     return res;
//   }
// }



// // export const deleteStickerCategory = {
// //   load: async ({ id }) => {


// //     const res = await fetch('/dashboard/sticker/deletePackage', {
// //       method: 'POST',
// //       headers: {
// //         accept: 'application/json'
// //       },

// //       body: JSON.stringify({ id })

// //     });
// //     let body = await res.json()

// //     return res;
// //   }
// // }