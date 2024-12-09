<script>
    import { createEventDispatcher, onMount } from "svelte";
    import NewsfeedDetailFooter from "./NewsfeedDetailFooter.svelte";
    import NewsfeedCommentInput from "./newsfeed-comment-input/NewsfeedCommentInput.svelte";
    import InfiniteScroll from "$components/utils/InfiniteScroll.svelte";
    import SmfbLoading from "$components/materials/spinners/fbLoading/SMFBLoading.svelte";
    import NewsfeedDetailHeader from "./NewsfeedDetailHeader.svelte";
    import NewsfeedCommentList from "./comment-list/NewsfeedCommentList.svelte";
    const dispatch = createEventDispatcher();
    export let channelId;
    export let post;
    export let channelOwerShip;
    export let loading;
    export let comments;
    export let pageNumber;
    export let hasMore;
    export let scrollEle;
    export let element;
    export let user;
    const scrollToBottom = async (node) => {
        node.scroll({ top: node.scrollHeight, behavior: "smooth" });
    };
</script>

<div class=" flex flex-col w-full h-full relative">
    <div class="flex-grow-0 bg-white w-full">
        <NewsfeedDetailHeader {channelId} {post} {channelOwerShip} />
    </div>
    <div class="w-full">
        <!-- Content -->
        <slot />
    </div>
    <div class="w-full bg-white flex justify-center flex-grow">
        <NewsfeedDetailFooter
            {channelId}
            {comments}
            bind:scrollEle
            bind:post
            bind:loading
            bind:pageNumber
            bind:hasMore
            on:loadMore={() => {
                dispatch("loadMore");
            }}
        />
    </div>
    <div class="w-full flex flex-col pb-[53px]" bind:this={element}>
        {#if comments.length != 0}
            <div id="myScrollableElement" class="bg-white flex flex-col w-full">
                <div class="flex-grow flex flex-col w-full">
                    {#if hasMore}
                        <button
                            class=" py-1 pt-3 text-gray-800 font-semibold pl-4 w-full flex-grow-0 flex items-center cursor-pointer hover:underline"
                            on:click={() => {
                                dispatch("moreComment");
                            }}
                        >
                            See more...
                        </button>
                    {/if}
                    {#if loading}
                        <div
                            class="w-full flex-grow-0 flex items-center justify-center cursor-pointer absolute"
                        >
                            <div
                                class=" w-1/6 p-1 rounded-2xl flex flex-row items-center justify-center"
                            >
                                <SmfbLoading color={"#B3B3B3"} />
                            </div>
                        </div>
                    {/if}
                    <NewsfeedCommentList
                        bind:comments
                        bind:post
                        bind:user
                        bind:channelOwnership={channelOwerShip}
                    />
                </div>
                <InfiniteScroll
                    elementScroll={scrollEle}
                    {hasMore}
                    threshold={100}
                    on:loadMore={() => {
                        dispatch("loadMore");
                    }}
                />
            </div>
        {/if}
    </div>
    <div class="w-full flex flex-col flex-grow-0 fixed bottom-0">
        <div class="flex flex-row p-2 bg-gray-200 max-w-[800px]">
            <NewsfeedCommentInput
                bind:element
                {post}
                {channelOwerShip}
                on:create={async () => {
                    dispatch("createComment");
                    scrollToBottom(element);
                }}
            />
        </div>
    </div>
</div>
