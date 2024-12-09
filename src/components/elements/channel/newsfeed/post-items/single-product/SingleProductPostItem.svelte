<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();
    export let post;

    let imgLoaded = false;
</script>

<div class=" w-full h-full">
    {#if post.content.text}
        <button
            class=" w-full text-start"
            on:click={() => {
                dispatch("select", { post });
            }}
        >
            <div
                class="p-3 pl-6 pt-0 bg-white flex-wrap break-words overflow-hidden"
            >
                {post.content?.text || ""}
            </div>
        </button>
    {/if}
    <div class="flex flex-row">
        <button
            on:click={() => {
                dispatch("selectProduct", { product: post.content });
            }}
            class="p-3 pl-10 pr-10 bg-white w-full"
        >
            <div
                class="flex flex-col p-3 bg-white rounded-lg shadow-md border-[#DFDFDF] border-2 h-[270px] max-w-[260px]"
            >
                <div
                    class="w-full relative flex-grow flex justify-center bg-gray-200 overflow-hidden rounded-md"
                >
                    <div class=" absolute inset-0">
                        <img
                            hidden={!imgLoaded}
                            src={post.content?.photo?.url}
                            alt=""
                            class=" w-full h-full object-cover"
                            on:load={() => (imgLoaded = true)}
                        />
                    </div>
                </div>
                <div
                    class="flex-grow-0 p-2 pl-0 pr-0 flex flex-row items-end justify-between"
                >
                    <div class="text-lg">{post.content.name}</div>
                    <div class="flex justify-end space-x-2">
                        {#if post.content.price !== null}
                            <div
                                class="line-through w-full flex items-end text-[#898989]"
                            >
                                {post.content.price?.discountPrice || ""}
                            </div>
                            <div class="flex space-x-2">
                                <div class="text-2xl font-bold text-[#6A6A6A]">
                                    {post.content.price?.price || ""}
                                </div>
                                <div class="text-2xl font-bold text-[#6A6A6A]">
                                    {post.content.price?.currency || ""}
                                </div>
                            </div>
                        {/if}
                    </div>
                </div>
            </div>
        </button>
    </div>
</div>
