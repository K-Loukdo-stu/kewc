import { restEndpointFetch } from "../utils";

export const uploadImage = {
    load: async ({ height, name, size, width, base64 }) => {
        const res = await restEndpointFetch({
            method: 'POST',
            url: "http://api.kradass.com/kstorage/common/image/upload",
            body: { height: height, name: name, size: size,  width: width, base64: base64 }
        });
        // console.log("level 2:" + res.key)
        return res;
    }
    
}