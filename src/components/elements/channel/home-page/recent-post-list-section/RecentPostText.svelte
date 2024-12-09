<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();
    export let post;
</script>

<button
    on:click={() => {
        dispatch("click", post);
    }}
    class=" w-full text-start m-0"
>
    <div class="bg-white p-2 rounded-lg shadow-sm line-clamp-3 overflow-hidden m-0">
        {post["content"]["text"]}
    </div>
</button>
