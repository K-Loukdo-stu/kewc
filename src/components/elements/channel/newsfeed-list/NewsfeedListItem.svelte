<script>
    import PostFooter from "../post-items/post-footer/PostFooter.svelte";
    import PostHeader from "../post-items/post-header/PostHeader.svelte";
    export let channelId
</script>

<div class=" flex flex-col w-full pb-2">
    <div class="flex-grow-0 bg-white w-full">
        <PostHeader />
    </div>
    <div class="overflow-x-auto w-full">
        <!-- Content -->
        <slot />
    </div>
    <div class="w-full bg-white flex justify-center">
        <PostFooter {channelId}/>
    </div>
</div>
