import { getBase64ImageSize, handleXMLHttpRequest } from "./storage"


export const uploadCover = {
    load: async ({ name, base64, onComplete, onError, onProgress }) => {
        const calWidthHeight = await getBase64ImageSize(base64)
        handleXMLHttpRequest(
            'user/cover/upload', // uri
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

