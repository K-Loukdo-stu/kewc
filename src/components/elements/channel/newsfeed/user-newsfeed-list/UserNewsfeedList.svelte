<script>
    import SmfbLoading from "$components/materials/spinners/fbLoading/SMFBLoading.svelte";
    import InfiniteScroll from "$components/utils/InfiniteScroll.svelte";
    import { fade } from "svelte/transition";
    import LinkPostItem from "../post-items/link/LinkPostItem.svelte";
    import MultiPhotoPostItem from "../post-items/multi-photo/MultiPhotoPostItem.svelte";
    import MultiProductPostItem from "../post-items/multi-product/MultiProductPostItem.svelte";
    import PhotoPostItem from "../post-items/photo/PhotoPostItem.svelte";
    import SingleProductPostItem from "../post-items/single-product/SingleProductPostItem.svelte";
    import TextPostItem from "../post-items/text/TextPostItem.svelte";
    import VideoPostItem from "../post-items/video/VideoPostItem.svelte";
    import { createEventDispatcher, onMount } from "svelte";
    import Empty from "$components/icons/Empty/Empty.svelte";
    import NewsfeedListUserItem from "./UserNewsfeedListItem.svelte";
    import { EwcDispatch } from "$lib/ewc-dispatch/ewc-dispatch";
    import { postListEwcEvent } from "$lib/ewc-dispatch/events/post-list-evt";
    const dispatch = createEventDispatcher();
    export let userId;
    export let scrollEle;
    export let loading = false;
    export let loaded = false;
    export let hasMore;
    export let pageNumber;
    export let channelOwnerShip;
    export let posts = [];
    export let user = {};

    const ewcDispatch = new EwcDispatch();
    onMount(() => {
        ewcDispatch.setPageLoaded();
        ewcDispatch.listen("on-page-reload");
    });

    let openPostDetial = (evt) => {
        const post = evt.detail.post;
        ewcDispatch.publish({
            key: postListEwcEvent.post.ON_VIEW_POST,
            data: { post },
        });
    };
</script>

<div class="absolute w-full flex flex-col h-full">
    {#if posts.length > 0}
        {#each posts as post}
            <NewsfeedListUserItem {userId} {post} {user} {channelOwnerShip}>
                {#if post.type == "text"}
                    <TextPostItem {post} on:select={openPostDetial} />
                {:else if post.type == "photo"}
                    <PhotoPostItem {post} on:select={openPostDetial} />
                {:else if post.type == "video"}
                    <VideoPostItem {post} on:select={openPostDetial} />
                {:else if post.type == "muti-photo"}
                    <MultiPhotoPostItem {post} on:select={openPostDetial} />
                {:else if post.type == "link"}
                    <LinkPostItem {post} on:select={openPostDetial} />
                {:else if post.type == "product"}
                    <SingleProductPostItem
                        {post}
                        on:select={openPostDetial}
                        on:selectProduct={(evt) => {
                            const channel = post.channel;
                            const product = evt.detail.product;
                            ewcDispatch.publish({
                                key: postListEwcEvent.post.ON_PRODUCT_SELECTED,
                                data: { product, channel },
                            });
                        }}
                    />
                {:else if post.type == "muti-product"}
                    <MultiProductPostItem
                        {post}
                        on:select={openPostDetial}
                        on:selectProduct={(evt) => {
                            const product = evt.detail.product;
                            const channel = post.channel;
                            ewcDispatch.publish({
                                key: postListEwcEvent.post.ON_PRODUCT_SELECTED,
                                data: { product, channel },
                            });
                        }}
                    />
                {/if}
            </NewsfeedListUserItem>
        {/each}
        <InfiniteScroll
            elementScroll={scrollEle}
            {hasMore}
            threshold={100}
            on:loadMore={() => {
                dispatch("loadMore");
            }}
        />
    {/if}
    {#if loading}
        <div
            class="flex-grow-0 w-full bg-gray-200 flex items-center justify-center p-2"
        >
            <SmfbLoading color={"#B3B3B3"} />
        </div>
    {:else if loaded && posts.length == 0}
        <div
            in:fade={{ duration: 200 }}
            class="flex-grow-0 w-full bg-gray-200/60 flex items-center justify-center p-2 h-full flex-col space-y-2 text-[#7E7E7E]"
        >
            <div>
                <Empty size={40} />
            </div>
            <div>No posts yet</div>
        </div>
    {/if}
</div>
