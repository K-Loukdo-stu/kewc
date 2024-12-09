<script>
    import Image from "$components/materials/image/Image.svelte";
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
    {#if ["multi-photo", "muti-photo"].includes(post.type)}
        <div class="relative flex flex-wrap w-full">
            <!-- <div class="absolute inset-0 flex overflow-x-auto"> -->
            {#each post["content"]["photos"] as photo}
                <div class="p-1">
                    <div
                        class="w-14 h-14 bg-gray-300 rounded-sm overflow-hidden"
                    >
                        <Image src={photo?.["thumbnail"]?.["url"]} alt="post" />
                    </div>
                </div>
            {/each}
            <!-- </div> -->
        </div>
    {:else if post.type == "photo"}
        <div class="w-14 h-14 bg-gray-300 rounded-sm overflow-hidden">
            <Image src={post?.["photo"]?.["thumbnail"]?.["url"]} alt="post" />
        </div>
    {/if}
</button>
