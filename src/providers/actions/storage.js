import { APIs } from '$lib/statics/apis'

export function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.onload = function () {
            const base64String = reader.result;
            // .replace("data:", "")
            // .replace(/^.+,/, "");
            resolve(base64String);
        };
        reader.onerror = function () {
            reject();
        };
        reader.readAsDataURL(file);
    });
}

export function getBase64ImageSize(base64) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            return resolve({
                width: img.width,
                height: img.height,
            })
        }
        img.src = base64;
    })
}

export function getBase64VideoSize(base64String) {
    try {
        // Remove data URL prefix if present
        const base64Data = base64String.split(',')[1] || base64String;

        // Convert base64 to binary
        const binaryString = atob(base64Data);

        // Calculate the size in bytes
        const fileSizeInBytes = binaryString.length;

        // Convert bytes to kilobytes
        const fileSizeInKb = fileSizeInBytes / 1024;

        return {
            bytes: fileSizeInBytes,
            kilobytes: fileSizeInKb
        };
    } catch (error) {
        console.error('Error decoding base64 string:', error);
        return null; // or throw an error based on your application's logic
    }
}

export function getBase64VideoDimensions(base64String) {
    try {
        // Remove data URL prefix if present
        const base64Data = base64String.split(',')[1] || base64String;

        // Convert base64 to binary
        const binaryString = atob(base64Data);

        const byteArray = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            byteArray[i] = binaryString.charCodeAt(i);
        }

        const blob = new Blob([byteArray], { type: 'video/mp4' });
        const video = document.createElement('video');

        return new Promise((resolve, reject) => {
            video.addEventListener('loadedmetadata', () => {
                resolve({
                    width: video.videoWidth,
                    height: video.videoHeight
                });
            });

            video.addEventListener('error', () => {
                reject('Error loading video metadata');
            });

            video.src = URL.createObjectURL(blob);
        });
    } catch (error) {
        console.error('Error decoding base64 string:', error);
        return Promise.reject(error); // or handle the error based on your application's logic
    }
}

export function getBase64VideoThumbnail(base64Video) {
    return new Promise((resolve, reject) => {
        try {
            // Remove data URL prefix if present
            const base64Data = base64Video.split(',')[1] || base64Video;

            // Convert base64 to binary
            const binaryString = atob(base64Data);

            const byteArray = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                byteArray[i] = binaryString.charCodeAt(i);
            }

            const blob = new Blob([byteArray], { type: 'video/mp4' });
            const blobUrl = URL.createObjectURL(blob);

            const video = document.createElement('video');
            video.crossOrigin = 'anonymous';

            video.addEventListener('loadeddata', () => {
                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                const context = canvas.getContext('2d');
                context.drawImage(video, 0, 0, canvas.width, canvas.height);

                // Convert canvas to base64
                const base64Image = canvas.toDataURL('image/png');

                resolve(base64Image);

                // Revoke the blob URL to release resources
                URL.revokeObjectURL(blobUrl);
            });

            video.addEventListener('error', (error) => {
                reject(`Error loading video: ${error.message}`);
            });

            video.src = blobUrl;
            video.preload = 'auto';
            video.load();
        } catch (error) {
            reject(`Error processing video: ${error.message}`);
        }
    });
}

export const uploadSticker = {
    load: async ({ name, base64, onComplete, onError, onProgress }) => {

        // const covertFile = new convertToBase64(file)
        const calWidthHeight = await getBase64ImageSize(base64)

        handleXMLHttpRequest(
            'sticker/single-upload', // uri
            {
                name,
                width: calWidthHeight.width,
                height: calWidthHeight.height,
                base64,
                animated: false
            }, // params
            onComplete,
            onError,
            onProgress
        )
    }
}


export const deleteStickerOnS3 = {
    load: async ({ id, onComplete, onError, onProgress }) => {

        handleXMLHttpRequest(
            'sticker/delete-sticker', // uri
            {
                id,
            }, // params
            onComplete,
            onError,
            onProgress
        )
    }
}




// XMLHttpRequest
export const handleXMLHttpRequest = (url, params, onComplete, onError, onUploadProgress, onDLProgress) => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", `${APIs.KSTORAGE.csr_uri}/${url}`);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.onreadystatechange = function (_) {
        // Error response
        if (xmlhttp?.status > 300) {
            onError(xmlhttp);
        }
    }
    xmlhttp.onload = function () {
        if (xmlhttp?.status >= 200 && xmlhttp?.status < 300)
            onComplete?.({ status: xmlhttp?.status, response: JSON.parse(xmlhttp?.response) })
    };

    // Download
    xmlhttp.onprogress = (evt) => {
        onDLProgress?.({ params, loaded: evt?.loaded, total: evt?.total })
    }

    // Upload
    xmlhttp.upload.onprogress = (evt) => {
        onUploadProgress?.({ params, loaded: evt?.loaded, total: evt?.total })
    }
    xmlhttp.onerror = (err) => {
        onError('Upload error: ', err);
    }
    xmlhttp.send(JSON.stringify(params));
}