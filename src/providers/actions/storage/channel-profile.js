import { getBase64ImageSize, handleXMLHttpRequest } from "./storage"

export const uploadChannelProfile = {
    load: async ({ base64, name, onComplete, onError, onProgress }) => {
        const calWidthHeight = await getBase64ImageSize(base64)
        handleXMLHttpRequest(
            '/channel/profile/upload', // uri
            {
                width: calWidthHeight.width,
                height: calWidthHeight.height,
                size: calWidthHeight.width * calWidthHeight.height,
                base64,
                name
            }, // params
            onComplete,
            onError,
            onProgress
        )
    }
}

