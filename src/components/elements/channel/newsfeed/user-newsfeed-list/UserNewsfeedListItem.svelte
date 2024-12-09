<script>
    import { goto } from "$app/navigation";
    import { postListEwcEvent } from "$lib/ewc-dispatch/events/post-list-evt";
    import { EwcDispatch } from "$lib/ewc-dispatch/ewc-dispatch";
    import { isEwcMode } from "$lib/statics";
    import NewsfeedListUserItemFooter from "./UserNewsfeedListItemFooter.svelte";
    import NewsfeedListUserItemHeader from "./UserNewsfeedListItemHeader.svelte";
    import { onMount } from "svelte";

    export let channelId;
    export let userId;
    export let post;
    export let user;
    export let channelOwnerShip;

    const ewcDispatch = new EwcDispatch();
    onMount(() => {
        ewcDispatch.setPageLoaded();
        ewcDispatch.listen("on-page-reload");
    });
</script>

<div class="flex flex-col w-full pb-2">
    <div class="flex-grow-0 bg-white w-full">
        <NewsfeedListUserItemHeader {post} {channelOwnerShip} />
    </div>
    <!-- Content -->
    <slot />
    <div class="w-full bg-white flex justify-center">
        <NewsfeedListUserItemFooter
            bind:channelId
            {userId}
            bind:post
            {user}
            on:comment={(evt) => {
                const { post } = evt.detail;
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
