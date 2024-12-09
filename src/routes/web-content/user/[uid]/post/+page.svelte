<script>
    import { page } from "$app/stores";
    import NewsfeedListUser from "$components/elements/channel/newsfeed/user-newsfeed-list/UserNewsfeedList.svelte";
    import { EwcDispatch } from "$lib/ewc-dispatch/ewc-dispatch";
    import { me } from "$providers/actions/kauth";
    import { getPostPaginationByUser } from "$providers/actions/kchannel/post";
    import { postsStore } from "$providers/stores/kchannel/post/posts";
    import { onDestroy, onMount } from "svelte";
    let userId = $page.params.uid;
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

    const onLoadPosts = async () => {
        if (loadPostState.loading == true) return;
        try {
            const LIMIT = 5;
            loadPostState.errMsg = "";
            loadPostState.loading = true;
            loadPostState.loaded = false;
            const res = await getPostPaginationByUser.load({
                pageNum: loadPostState.pageNumber,
                userId: userId,
                limit: LIMIT,
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

    let channel;

    const ewcDispatch = new EwcDispatch();
    onMount(async () => {
        ewcDispatch.setPageLoaded();
        ewcDispatch.listen({ key: "on-page-reload" });

        await getMe();
        await onLoadPosts();
    });

    onDestroy(() => {
        postStoreUnsub();
    });
</script>

<div class="relative w-full h-screen flex justify-center">
    <div
        class="absolute flex flex-col items-center w-full h-full max-w-[800px]"
    >
        <div
            bind:this={scrollEle}
            style="padding-top: {postListHeight}px"
            class="flex-grow bg-gray-50 relative w-full overflow-y-auto scrollbar"
        >
            <NewsfeedListUser
                bind:userId
                channelOwnerShip={channel}
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
