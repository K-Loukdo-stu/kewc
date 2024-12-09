<script>
    import { createEventDispatcher } from "svelte";
    import MultiProductPostProductItem from "./MultiProductPostProductItem.svelte";
    const dispatch = createEventDispatcher();
    export let post;
</script>

{#if post.content.text}
    <button
        class="w-full text-start"
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
<div class="flex flex-row p-3 pl-5 pr-5 space-x-5 relative overflow-auto">
    {#each post.content?.product || [] as product, index}
        <button
            class=" w-full text-start"
            on:click={() => {
                dispatch("selectProduct", { product });
            }}
        >
            <MultiProductPostProductItem bind:product />
        </button>
    {/each}
</div>
