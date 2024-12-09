<script>
    import Image from "$components/materials/image/Image.svelte";
    import Play from "$components/icons/Play/PlayV3.svelte";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    export let post;
</script>

<button
    on:click={() => {
        dispatch("click", post);
    }}
    class="bg-white p-2 rounded-lg shadow-sm w-full text-start"
>
    {#if post?.["content"]?.["text"]}
        <div class=" line-clamp-3 overflow-hidden">
            {post?.["content"]?.["text"]}
        </div>
    {/if}
    <div class="h-1"></div>

    <div class="flex items-center py-1">
        <div class="  flex justify-center items-center">
            {#if post["content"]["thumbnail"]["url"]}
                <div
                    class=" relative w-14 h-14 bg-gray-300 rounded-sm overflow-hidden"
                >
                    <Image
                        src={post["content"]["thumbnail"]["url"]}
                        alt="post"
                    />
                    <div
                        class="absolute inset-0 flex justify-center items-center bg-gray-700/30"
                    >
                        <div
                            class="p-1 w-6 h-6 flex justify-center items-center rounded-full bg-white/80 text-gray-700"
                        >
                            <Play size={12} />
                        </div>
                    </div>
                </div>
            {/if}
        </div>
        <div class="w-2"></div>
        <div>
            <div class="text-base font-semibold text-gray-900">Video</div>
        </div>
    </div>
</button>
