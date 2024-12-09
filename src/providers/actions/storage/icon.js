import { getBase64ImageSize, handleXMLHttpRequest } from "./storage"

export const uploadIcon = {
    load: async ({ base64, onComplete, onError, onProgress }) => {
        const calWidthHeight = await getBase64ImageSize(base64)
        handleXMLHttpRequest(
            'icon/single-upload-icon', // uri
            {
                width: calWidthHeight.width,
                height: calWidthHeight.height,
                base64
            }, // params
            onComplete,
            onError,
            onProgress
        )
    }
}

