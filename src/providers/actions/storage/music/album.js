import { getBase64ImageSize, handleXMLHttpRequest } from "../storage"

export const uploadAlbum = {
    load: async ({ base64, onComplete, onError, onProgress }) => {
        const calWidthHeight = await getBase64ImageSize(base64)
        handleXMLHttpRequest(
            'music/album-upload', // uri
            {
                width: calWidthHeight.width,
                height: calWidthHeight.height,
                size: calWidthHeight.width * calWidthHeight.height,
                base64
            }, // params
            onComplete,
            onError,
            onProgress
        )
    }
}

