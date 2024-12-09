<script>
    import { onMount } from "svelte";
    import Vibrant from "vibrant";

    let backgroundColor = "";

    export let img = "";

    onMount(async () => {
        const image = new Image();
        image.src = img;

        image.addEventListener("load", async () => {

            const palette = await Vibrant.from(image).getPalette();
            backgroundColor = palette.Vibrant.getHex();
        });
    });
</script>

<div class="container">
    <img src={img} alt="" />
</div>

<style>
    .container {
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
