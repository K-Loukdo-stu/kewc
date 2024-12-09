import { getBase64ImageSize, handleXMLHttpRequest } from "../../storage"

export const uploadProduct = {
  load: async ({ name, size, base64, onComplete, onError, onProgress }) => {
    const calWidthHeight = await getBase64ImageSize(base64)
    handleXMLHttpRequest(
      'product/photo/upload', // uri
      {
        name,
        size,
        width: calWidthHeight.width,
        height: calWidthHeight.height,
        base64,
      }, // params
      onComplete,
      onError,
      onProgress
    )
  }
}