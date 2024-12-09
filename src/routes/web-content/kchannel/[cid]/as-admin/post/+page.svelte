<script>
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import NewsfeedHeader from "$components/elements/channel/newsfeed/newsfeed-header/NewsfeedHeader.svelte";
    import NewsfeedList from "$components/elements/channel/newsfeed/newsfeed-list/NewsfeedList.svelte";
    import { postListEwcEvent } from "$lib/ewc-dispatch/events/post-list-evt";
    import { EwcDispatch } from "$lib/ewc-dispatch/ewc-dispatch";
    import { isEwcMode } from "$lib/statics";
    import { me } from "$providers/actions/kauth";
    import { getChannelOwnership } from "$providers/actions/kchannel/channel";
    import { getPostPagination } from "$providers/actions/kchannel/post";
    import { postsStore } from "$providers/stores/kchannel/post/posts";
    import { onDestroy, onMount } from "svelte";
    let channelId = $page.params.cid;
    let scrollEle;
    let postListHeight;
    let user;
    let loadPostState = {
        posts: [],
        loading: false,
        errMsg: "",
        loaded: false,
        pageNumber: 1,
        hasMore: true,
    };

    // Store listener
    const postStoreUnsub = postsStore.subscribe((posts) => {
        loadPostState.posts = posts;
    });

    const onLoadPosts = async (reset = false) => {
        if (loadPostState.loading == true) return;
        try {
            if (reset) {
                loadPostState.pageNumber = 1;
                loadPostState.hasMore = true;
            }

            const LIMIT = 10;
            loadPostState.errMsg = "";
            loadPostState.loading = true;
            loadPostState.loaded = false;
            const res = await getPostPagination.load({
                pageNum: loadPostState.pageNumber,
                channel: channelId,
                limit: 10,
            });
            loadPostState.loaded = true;
            if (res?.data.posts.length > 0) {
                loadPostState.pageNumber++;
            }
            if (res?.data.length < LIMIT) {
                loadPostState.hasMore = false;
            }
        } catch (err) {
            loadPostState.errMsg = err.message;
        } finally {
            loadPostState.loading = false;
        }
    };
    const getMe = async () => {
        const res = await me.load();
        user = res.data;
    };

    let channelOwnerShip;
    let showDelete = false;
    const onLoadChannelOwnership = async () => {
        const res = await getChannelOwnership.load({
            channel: channelId,
        });
        channelOwnerShip = res.data;
    };

    const ewcDispatch = new EwcDispatch();

    onMount(async () => {
        ewcDispatch.setPageLoaded();
        ewcDispatch.listen({ key: "on-page-reload" });
        ewcDispatch.listen({
            key: postListEwcEvent.post.ON_POST_CREATED,
            cb: (data) => {
                onLoadPosts(true);
            },
        });
        await getMe();
        await onLoadChannelOwnership();
        await onLoadPosts();
    });

    onDestroy(() => {
        postStoreUnsub();
    });

    let createPostEvent = () => {
        if (!isEwcMode()) {
            goto(
                `/web-content/kchannel/${channelId}` + `/as-admin/post/create`,
            );
        } else {
            ewcDispatch.publish({
                key: postListEwcEvent.post.ON_CREATE_POST,
                data: { channelId },
            });
        }
    };
</script>

<div class="relative w-full h-screen flex justify-center">
    <div
        class="absolute flex flex-col items-center w-full h-full max-w-[800px]"
    >
        {#if channelOwnerShip != null}
            <button
                class="flex-grow-0 flex flex-row w-full p-2 bg-white border-gray-50"
                on:click={() => {
                    createPostEvent();
                }}
            >
                <NewsfeedHeader />
            </button>
            <div class="w-full h-[1px] bg-gray-100"></div>
        {/if}

        <div
            bind:this={scrollEle}
            style="padding-top: {postListHeight}px"
            class="flex-grow bg-gray-50 relative w-full overflow-y-auto scrollbar"
        >
            <NewsfeedList
                {channelId}
                {channelOwnerShip}
                bind:user
                bind:scrollEle
                bind:posts={loadPostState.posts}
                bind:pageNumber={loadPostState.pageNumber}
                bind:loading={loadPostState.loading}
                bind:loaded={loadPostState.loaded}
                bind:hasMore={loadPostState.hasMore}
                on:loadMore={() => {
                    onLoadPosts();
                }}
            />
        </div>
    </div>
</div>
