<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();
    export let post;
</script>

<button
    class=" w-full text-start"
    on:click={() => {
        dispatch("select", { post });
    }}
>
    <div class="p-3 pt-0 bg-white flex-wrap break-words overflow-hidden">
        <div>
            {post.content?.text || ""}
        </div>
    </div>
    <div
        class="relative flex items-center justify-center cursor-pointer flex-col w-full"
    >
        {#if post.content.data}
            {#if post.content.data.ogImage}
                <img src={post.content.data.ogImage} alt="" />
            {/if}
            <div class="flex flex-col p-2 border rounded-b-md w-full">
                <div
                    class="text-gray-700/70 flex-wrap break-words overflow-hidden"
                >
                    {post.content?.data?.uri || "Unknown link"}
                </div>
                <div class="font-bold">
                    {post.content.data.title}
                </div>
            </div>
        {/if}
        <!-- <img src={post.content.data.ogImage} alt="" class="object-cover" />
        <div class="flex flex-col p-2 shadow-md border-2 rounded-md w-full">
            <div class="text-gray-700/70">{post.content.data.uri}</div>
            <div class="font-bold">{post.content.data.title}</div>
        </div> -->
    </div>
</button>
