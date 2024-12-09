<script>
    import CommentIcon from "$components/icons/Comment/CommentIcon.svelte";
    import AfterLikeIcon from "$components/icons/Like/AfterLikeIcon.svelte";
    import LikeIcon from "$components/icons/Like/LikeIcon.svelte";
    import { goto } from "$app/navigation";
    import { createEventDispatcher } from "svelte";
    import { likePost } from "$providers/actions/kchannel/post";
    import ShareIcon from "$components/icons/share_tmp/ShareIcon.svelte";
    export let channelId;
    export let comments;
    export let post;
    export let user;
    export let scrollEle;
    export let hasMore;
    export let loading;
    let onLoadState = {
        loading: false,
        loaded: false,
        errMsg: "",
    };
    const onCreateLike = async (isLike) => {
        try {
            onLoadState.loading = true;
            await likePost.load({
                post: post.id,
                isLike,
            });
        } catch (err) {
            onLoadState.errMsg = err.message;
        } finally {
            onLoadState.loading = true;
        }
    };

</script>

<div class="w-full h-full flex flex-col">
    <div class="flex-grow flex flex-col pl-5 pr-5">
        {#if (post.likeNum != 0) | (post.commentNum != 0)}
            <div
                class="flex flex-row justify-between h-[50px] pt-3 pb-3 border-b-2"
            >
                <div class="flex flex-row items-center">
                    {#if post.likeNum != 0}
                        <div class="text-white">
                            <AfterLikeIcon size={18} />
                        </div>
                        <div class="text-sm text-gray-500">{post.likeNum}</div>
                    {/if}
                </div>
                <div
                    class="space-x-2 flex flex-row text-sm text-gray-500 hover:underline cursor-pointer"
                >
                    {#if post.commentNum == 1}
                        <div>{post.commentNum} Comment</div>
                    {:else if post.commentNum != 0}
                        <div>{post.commentNum} Comments</div>
                    {/if}
                    <!-- <div>3 Shares</div> -->
                </div>
            </div>
        {/if}

        <div
            class="flex flex-row items-center justify-between pt-1 pb-1 bg-white border-b-2"
        >
            <div
                class="flex flex-row space-x-2 cursor-pointer w-1/3 p-2 items-center justify-center hover:bg-gray-100 hover:rounded-md"
            >
                <button
                    class="flex flex-row space-x-2 cursor-pointer w-1/3 p-2 items-center justify-center hover:bg-gray-100 hover:rounded-md"
                    on:click={() => {
                        onCreateLike(!post?.myLike);
                    }}
                >
                    {#if post?.myLike}
                        <div>
                            <LikeIcon currentColor={"#1D77B8"} size={18} />
                        </div>
                    {:else}
                        <div>
                            <LikeIcon size={18} />
                        </div>
                    {/if}
                </button>
            </div>
            <div
                class="
                bg-gray-100 rounded-sm
                flex flex-row space-x-2 cursor-pointer w-1/3 p-2 items-center justify-center hover:bg-gray-100 hover:rounded-md"
            >
                <div>
                    <CommentIcon size={18} />
                </div>
                <div>Comment</div>
            </div>
            <div
                class="flex flex-row space-x-2 cursor-pointer w-1/3 p-2 items-center justify-center hover:bg-gray-100 hover:rounded-md"
            >
                <div>
                    <ShareIcon size={18} />
                </div>
                <div>Share</div>
            </div>
        </div>
    </div>
</div>
