<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    export let post;
    let imgLoaded = false;
</script>

<button
    class=" w-full text-start"
    on:click={() => {
        dispatch("select", { post });
    }}
>
    {#if post.content.text}
        <div
            class="p-3 pl-6 pt-0 bg-white flex-wrap break-words overflow-hidden"
        >
            {post.content?.text || ""}
        </div>
    {/if}
    <div class="flex items-center justify-center flex-row bg-gray-50">
        <div
            class=" w-full max-h-96 bg-gray-50 overflow-hidden"
            style="height: {post?.content?.height}px; "
        >
            <img
                class=" w-full h-full object-contain"
                hidden={!imgLoaded}
                src={post?.content?.url}
                alt=""
                on:load={() => (imgLoaded = true)}
            />
        </div>
    </div>
</button>
