<script>
    import LinkPostItem from "../post-items/link/LinkPostItem.svelte";
    import MultiPhotoPostItem from "../post-items/multi-photo/MultiPhotoPostItem.svelte";
    import MultiProductPostItem from "../post-items/multi-product/MultiProductPostItem.svelte";
    import PhotoPostItem from "../post-items/photo/PhotoPostItem.svelte";
    import SingleProductPostItem from "../post-items/single-product/SingleProductPostItem.svelte";
    import TextPostItem from "../post-items/text/TextPostItem.svelte";
    import VideoPostItem from "../post-items/video/VideoPostItem.svelte";
    import NewsfeedListItem from "./NewsfeedListItem.svelte";
    export let channelId;
    export let posts = [
        { kind: "TEXT" },
        { kind: "PHOTO" },
        { kind: "MULTI" },
        { kind: "VIDEO" },
        { kind: "LINK" },
        { kind: "SINGLE PRODUCT" },
        { kind: "MULTI PRODUCT" },
    ];
</script>

<div class="absolute w-full flex flex-col">
    {#each posts as post}
        <NewsfeedListItem {channelId}>
            {#if post.kind == "TEXT"}
                <TextPostItem />
            {:else if post.kind == "PHOTO"}
                <PhotoPostItem />
            {:else if post.kind == "VIDEO"}
                <VideoPostItem />
            {:else if post.kind == "MULTI"}
                <MultiPhotoPostItem />
            {:else if post.kind == "LINK"}
                <LinkPostItem />
            {:else if post.kind == "SINGLE PRODUCT"}
                <SingleProductPostItem />
            {:else if post.kind == "MULTI PRODUCT"}
                <MultiProductPostItem />
            {/if}
        </NewsfeedListItem>
    {/each}
</div>
