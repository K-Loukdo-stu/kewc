<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();
    export let post;
</script>

<button
    class="w-full text-start"
    on:click={() => {
        dispatch("select", { post });
    }}
>
    <div class="p-3 pl-6 pt-0 bg-white flex-wrap break-words overflow-hidden">
        {post.content?.text || ""}
    </div>
</button>
