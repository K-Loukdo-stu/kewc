import { getBase64ImageSize, getBase64VideoDimensions, getBase64VideoSize, getBase64VideoThumbnail, handleXMLHttpRequest } from "$providers/actions/storage"

export const uploadPostPhoto = {
  load: async ({ name, base64, onComplete, onError, onProgress }) => {
    const calWidthHeight = await getBase64ImageSize(base64)
    handleXMLHttpRequest(
      'post/photo/upload', // uri
      {
        name,
        width: calWidthHeight.width,
        height: calWidthHeight.height,
        base64,
        size: calWidthHeight.width * calWidthHeight.height,
      }, // params
      onComplete,
      onError,
      onProgress
    )
  }
}

export const uploadPostMultiPhoto = {
  load: async ({ photos, onComplete, onError, onProgress }) => {
    let photoArray = []
    for (let i = 0; i < photos.length; i++) {
      let calWidthHeight = await getBase64ImageSize(photos[i].data)
      let photo = {
        // id: photos[i].id,
        name: photos[i].name,
        width: calWidthHeight.width,
        height: calWidthHeight.height,
        base64: photos[i].data,
        size: calWidthHeight.width * calWidthHeight.height,
      } // params
      photoArray.push(photo);
    }
    handleXMLHttpRequest(
      'post/photo/multi-upload', // uri
      { photos: photoArray }, // params
      onComplete,
      onError,
      onProgress
    )
  }
}

export const uploadPostVideo = {
  load: async ({ name, base64, onComplete, onError, onProgress }) => {
    const calSize = await getBase64VideoSize(base64)
    const calWidthHeight = await getBase64VideoDimensions(base64)
    const getVideoThumbnail = await getBase64VideoThumbnail(base64)
    handleXMLHttpRequest(
      'post/video/upload', // uri
      {
        name,
        width: calWidthHeight.width,
        height: calWidthHeight.height,
        base64,
        size: calSize.kilobytes,
        contentType: "video/mp4",
        thumbnail: {
          width: calWidthHeight.width,
          height: calWidthHeight.height,
          base64: getVideoThumbnail
        }
      }, // params
      onComplete,
      onError,
      onProgress
    )
  }
}

