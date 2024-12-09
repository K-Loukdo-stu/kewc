<script>
    import CloseX from "$components/icons/Close/CloseX.svelte";
    import Image from "$components/icons/Image/Image.svelte";
    import ImagePlus from "$components/icons/Image/ImagePlus.svelte";
    import { createEventDispatcher } from "svelte";
    import { flip } from "svelte/animate";
    const dispatch = createEventDispatcher();
    export let photos = [];
</script>

<div class=" relative w-full h-full pb-2">
    <div class=" absolute inset-0 overflow-y-auto">
        {#each photos as photo, index (photo.id)}
            <div animate:flip={{duration: 400}} class=" relative pb-4">
                <img
                    src={photo.data}
                    alt={`Image ${index}`}
                    class="w-full h-full object-cover rounded-lg shadow"
                />

                <div class=" absolute top-2 right-3">
                    <button
                        type="button"
                        class="absolute top-2 right-2 px-2 rounded-full text-gray-500 p-2 bg-white shadow hover:bg-slate-50 hover:text-gray-800 group"
                        on:click={() => {
                            dispatch("deletePhoto", { index });
                        }}
                    >
                        <CloseX />
                        <div
                            class="absolute duration-100 inset-0 w-full h-full transition-all scale-0 group-focus:scale-100 group-focus:bg-black/10 rounded-full"
                        />
                    </button>
                </div>
            </div>
        {/each}
    </div>
    <div class=" absolute inset-0 top-auto flex justify-center pb-2">
        <button
            on:click={() => {
                dispatch("upload");
            }}
            type="button"
            class="  bg-white shadow-sm px-4 py-2 rounded-xl border-2 border-gray-300 text-gray-500 hover:text-gray-700 hover-button"
            data-name="Photo/video"
        >
            <ImagePlus />
        </button>
    </div>
</div>
