<script>
    import { page } from "$app/stores";
    import { onDestroy, onMount, tick } from "svelte";
    import SmfbLoading from "$components/materials/spinners/fbLoading/SMFBLoading.svelte";
    import { getPostDetail } from "$providers/actions/kchannel/post";
    import NewsfeedDetailItem from "$components/elements/channel/newsfeed/newsfeed-detail/NewsfeedDetailItem.svelte";
    import TextPostItem from "$components/elements/channel/newsfeed/post-items/text/TextPostItem.svelte";
    import PhotoPostItem from "$components/elements/channel/newsfeed/post-items/photo/PhotoPostItem.svelte";
    import VideoPostItem from "$components/elements/channel/newsfeed/post-items/video/VideoPostItem.svelte";
    import SingleProductPostItem from "$components/elements/channel/newsfeed/post-items/single-product/SingleProductPostItem.svelte";
    import MultiProductPostItem from "$components/elements/channel/newsfeed/post-items/multi-product/MultiProductPostItem.svelte";
    import MultiPhotoPostItem from "$components/elements/channel/newsfeed/post-items/multi-photo/MultiPhotoPostItem.svelte";
    import LinkPostItem from "$components/elements/channel/newsfeed/post-items/link/LinkPostItem.svelte";
    import { postStore } from "$providers/stores/kchannel/post/posts";
    import { getCommentsbyPost } from "$providers/actions/kchannel/comment";
    import { commentsStore } from "$providers/stores/kchannel/post/comments";
    import { me } from "$providers/actions/kauth";
    import { getChannelOwnership } from "$providers/actions/kchannel/channel";
    import { EwcDispatch } from "$lib/ewc-dispatch/ewc-dispatch";
    import { postListEwcEvent } from "$lib/ewc-dispatch/events/post-list-evt";
    let postId = $page.params.pid;
    let userId = $page.params.uid;
    let channelId = $page.params.cid;

    let scrollEle;
    let element;
    let commentListHeight;
    let loadCommentState = {
        comments: [],
        loadingComment: false,
        errMsgComment: "",
        loadedComment: false,
        pageNumberComment: 1,
        hasMore: true,
    };

    let loadPostState = {
        post: {},
        loading: false,
        errMsg: "",
        loaded: false,
    };

    let user;

    const getMe = async () => {
        const res = await me.load();
        user = res.data;
    };

    let scrollBox;
    let autoPlay = true;
    let channelOwerShip;

    // Store listener
    const postStoreUnsub = postStore.subscribe((post) => {
        loadPostState.post = post;
    });

    const commentsStoreUnsub = commentsStore.subscribe((comments) => {
        loadCommentState.comments = comments;
    });

    const onLoadComments = async () => {
        if (loadCommentState.loadingComment == true) return;
        try {
            const LIMIT = 7;
            loadCommentState.errMsgComment = "";
            loadCommentState.loadingComment = true;
            loadCommentState.loadedComment = false;
            const res = await getCommentsbyPost.load({
                post: postId,
                currentPage: loadCommentState.pageNumberComment,
            });
            loadCommentState.loadedComment = true;
            if (res?.data.length > 0) {
                loadCommentState.pageNumberComment++;
            }
            if (res?.data.length < LIMIT) {
                loadCommentState.hasMore = false;
            }
        } catch (err) {
            loadCommentState.errMsgComment = err.message;
        } finally {
            loadCommentState.loadingComment = false;
        }
    };

    const onLoadChannelOwnership = async () => {
        const res = await getChannelOwnership.load({
            channel: channelId,
        });
        channelOwerShip = res.data;
    };
    const onLoadPost = async () => {
        if (loadPostState.loading == true) return;
        try {
            loadPostState.errMsg = "";
            loadPostState.loading = true;
            loadPostState.loaded = false;
            const res = await getPostDetail.load({
                post: postId,
            });
            loadPostState.post = res.data;
            loadPostState.loaded = true;
        } catch (err) {
            loadPostState.errMsg = err.message;
        } finally {
            loadPostState.loading = false;
        }
    };

    const ewcDispatch = new EwcDispatch();
    onMount(async () => {
        ewcDispatch.setPageLoaded();
        await onLoadComments();
        await getMe();
        // await onLoadChannelOwnership();
        await onLoadPost();
    });

    onDestroy(() => {
        postStoreUnsub();
        commentsStoreUnsub();
    });
    async function scrollToTheEnd() {
        await tick();
        if (scrollBox)
            scrollBox.scrollTo({
                top: scrollBox.scrollHeight,
                left: 0,
                behavior: "smooth",
            });
    }
</script>

<div class="relative w-full h-full flex justify-center bg-white">
    <div
        class="absolute flex flex-col items-center w-full h-full max-w-[800px]"
    >
        {#if loadPostState.loading}
            <div
                class="flex-grow-0 w-full bg-gray-200 flex items-center justify-center p-2"
            >
                <SmfbLoading color={"#B3B3B3"} />
            </div>
        {/if}
        {#if loadPostState.loaded}
            <!-- <div class="flex-grow-0 flex flex-row w-full bg-white">
                <NewsfeedDetailHeader {channelId} post={loadPostState.post} {channelOwerShip}/>
            </div> -->
            <div
                bind:this={scrollBox}
                style="padding-top: {commentListHeight}px"
                class="flex-grow bg-white relative w-full overflow-auto flex flex-col"
            >
                <div class="absolute w-full flex flex-col h-full">
                    <NewsfeedDetailItem
                        comments={loadCommentState.comments}
                        {user}
                        {channelOwerShip}
                        {channelId}
                        bind:element
                        bind:scrollEle
                        bind:post={loadPostState.post}
                        bind:pageNumber={loadCommentState.pageNumberComment}
                        bind:loading={loadCommentState.loadingComment}
                        bind:hasMore={loadCommentState.hasMore}
                        on:loadMore={() => {
                            onLoadComments();
                        }}
                        on:moreComment={() => {
                            onLoadComments();
                        }}
                        on:createComment={() => {
                            scrollToTheEnd();
                        }}
                    >
                        {#if loadPostState.post.type == "text"}
                            <TextPostItem post={loadPostState.post} />
                        {:else if loadPostState.post.type == "photo"}
                            <PhotoPostItem post={loadPostState.post} />
                        {:else if loadPostState.post.type == "video"}
                            <VideoPostItem
                                post={loadPostState.post}
                                {autoPlay}
                            />
                            <!-- <MultiProductPostItem post={loadPostState.post} /> -->
                        {:else if loadPostState.post.type == "muti-photo"}
                            <MultiPhotoPostItem
                                post={loadPostState.post}
                                isDetail={true}
                            />
                        {:else if loadPostState.post.type == "link"}
                            <LinkPostItem post={loadPostState.post} />
                        {:else if loadPostState.post.type == "product"}
                            <SingleProductPostItem
                                post={loadPostState.post}
                                on:selectProduct={(evt) => {
                                    const channel = loadPostState.post.channel;
                                    const product = evt.detail.product;
                                    ewcDispatch.publish({
                                        key: postListEwcEvent.post
                                            .ON_PRODUCT_SELECTED,
                                        data: { product, channel },
                                    });
                                }}
                            />
                        {:else if loadPostState.post.type == "muti-product"}
                            <MultiProductPostItem
                                post={loadPostState.post}
                                on:selectProduct={(evt) => {
                                    const channel = loadPostState.post.channel;
                                    const product = evt.detail.product;
                                    ewcDispatch.publish({
                                        key: postListEwcEvent.post
                                            .ON_PRODUCT_SELECTED,
                                        data: { product, channel },
                                    });
                                }}
                            />
                        {/if}
                    </NewsfeedDetailItem>
                </div>
            </div>
        {/if}
    </div>
</div>
