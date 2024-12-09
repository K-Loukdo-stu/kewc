<script>
    import { createEventDispatcher } from "svelte";
    import LinkPostItem from "../post-items/link/LinkPostItem.svelte";
    import MultiPhotoPostItem from "../post-items/multi-photo/MultiPhotoPostItem.svelte";
    import MultiProductPostItem from "../post-items/multi-product/MultiProductPostItem.svelte";
    import PhotoPostItem from "../post-items/photo/PhotoPostItem.svelte";
    import SingleProductPostItem from "../post-items/single-product/SingleProductPostItem.svelte";
    import TextPostItem from "../post-items/text/TextPostItem.svelte";
    import VideoPostItem from "../post-items/video/VideoPostItem.svelte";
    import NewsfeedDetailItem from "./NewsfeedDetailItem.svelte";
    const dispatch = createEventDispatcher();
    export let channelId;
    export let post = {};
    export let comments = [];
</script>

<div class="absolute w-full flex flex-col h-full">
    <NewsfeedDetailItem
        {channelId}
        {post}
        {comments}
        on:create={() => {
            dispatch("create");
        }}
    >
        {#if post.type == "text"}
            <TextPostItem {post} />
        {:else if post.type == "photo"}
            <PhotoPostItem {post} />
        {:else if post.type == "video"}
            <VideoPostItem />
        {:else if post.type == "muti-photo"}
            <MultiPhotoPostItem {post} />
        {:else if post.type == "link"}
            <LinkPostItem />
        {:else if post.type == "single-product"}
            <SingleProductPostItem />
        {:else if post.type == "multi-product"}
            <MultiProductPostItem />
        {/if}
    </NewsfeedDetailItem>
</div>
