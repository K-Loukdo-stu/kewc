import { getBase64ImageSize, handleXMLHttpRequest } from "./storage"

export const uploadProfile = {
    load: async ({ name, base64, onComplete, onError, onProgress }) => {
        const calWidthHeight = await getBase64ImageSize(base64)
        handleXMLHttpRequest(
            'user/profile/upload', // uri
            {
                name,
                width: calWidthHeight.width,
                height: calWidthHeight.height,
                size: calWidthHeight.width * calWidthHeight.height,
                base64,
            }, // params
            onComplete,
            onError,
            onProgress

        )
    }
}