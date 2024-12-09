<script>
    import NewsfeedListItemHeader from "./NewsfeedListItemHeader.svelte";
    import NewsfeedListItemFooter from "./NewsfeedListItemFooter.svelte";
    import { goto } from "$app/navigation";
    import { postListEwcEvent } from "$lib/ewc-dispatch/events/post-list-evt";
    import { EwcDispatch } from "$lib/ewc-dispatch/ewc-dispatch";
    import { onMount } from "svelte";
    export let channelId;
    export let post;
    export let user;

    const ewcDispatch = new EwcDispatch();

    onMount(() => {
        ewcDispatch.setPageLoaded();
        ewcDispatch.listen("on-page-reload");
    });

    export let channelOwnerShip;
</script>

<div class="flex flex-col w-full pb-2">
    <div class="flex-grow-0 bg-white w-full">
        <NewsfeedListItemHeader {post} {channelOwnerShip} />
    </div>
    <!-- Content -->
    <slot />
    <!-- </button> -->
    <div class="w-full bg-white flex justify-center">
        <NewsfeedListItemFooter
            {channelId}
            bind:post
            {user}
            on:comment={(evt) => {
                const { channelId, post } = evt.detail;
                ewcDispatch.publish({
                    key: postListEwcEvent.post.ON_COMMENT,
                    data: { channelId, post },
                });
            }}
            on:share={(evt) => {
                const { post } = evt.detail;
                ewcDispatch.publish({
                    key: postListEwcEvent.post.ON_SHARE,
                    data: { channelId, post },
                });
            }}
        />
    </div>
</div>
