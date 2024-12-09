<script>
    import Link from "$components/icons/Media/Link/Link.svelte";
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

    <div class="flex py-1">
        <div class="flex justify-center items-center">
            <div
                class=" w-10 h-10 bg-gray-300 rounded-full flex justify-center items-center overflow-hidden text-gray-700"
            >
                <Link />
            </div>
        </div>
        <div class="w-2"></div>
        <div>
            <div class="text-base font-semibold text-gray-900">
                {#if post?.["content"]?.["title"]}
                    <div class=" truncate overflow-hidden">
                        {post?.["content"]?.["title"]}
                    </div>
                {/if}
            </div>
            <div class="text-sm text-gray-600">
                {#if post?.["content"]?.["text"]}
                    <div class=" truncate overflow-hidden">
                        {post?.["content"]?.["data"]?.["uri"]}
                    </div>
                {/if}
            </div>
        </div>
    </div>
</button>
