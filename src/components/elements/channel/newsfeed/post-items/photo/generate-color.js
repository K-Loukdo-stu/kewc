document.addEventListener("DOMContentLoaded", function () {
    const image = new Image();
    image.src = 'your-image.jpg';

    image.addEventListener('load', () => {
        const vibrant = new Vibrant(image);
        const swatches = vibrant.swatches();

        // Get the most prominent color from the image
        let mostProminentColor = swatches.Vibrant.getHex();

        // Set the background color of the webpage
        document.body.style.backgroundColor = mostProminentColor;
    });
});
