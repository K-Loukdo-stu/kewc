/**
 * Create API requests
 */



// export const getStickers = {
//   load: async (fetch) => {
//     const res = await fetch(`/dashboard/sticker/stickers`, {
//       method: 'POST',
//       headers: {
//         accept: 'application/json'
//       },
//     });
//     let body = await res.json()


//     if (body.success) {
//       body['data'] = body.data['stickers'];
//     }

//     return body;
//   }
// }







// export const deleteSticker = {
//   load: async (fetch, { deleteid }) => {
//     const res = await fetch(`/dashboard/sticker/detail/delete/${deleteid}`, {
//       method: 'POST',
//       headers: {
//         accept: 'application/json'
//       },
      
//     });
    
//     return res;
//   }
// }


export const findStickerByPackage = {
  load: async (fetch, { packages }) => {
    const res = await fetch(`/dashboard/package/stickerPackage/sticker/${packages}`, {
      method: 'POST',
      headers: {
        accept: 'application/json'
      },
      body: JSON.stringify({ packages })
    });
    let body = await res.json()
    if (body.success) {
      body['data'] = body.data['findStickerPackage'];
    }
    return body;
  }
}



// export const getUser = {
//   load: async (fetch, { uid }) => {
//     const res = await fetch(`/dashboard/user/detail/${uid}`, {
//       method: 'POST',
//       headers: {
//         accept: 'application/json'
//       },
//     });
//     let body = await res.json()

//     if (body && body.success) {
//       body['data'] = body.data['user'];
//       await userStore.reset(body['data'])
//     }

//     return body;
//   }
// }
