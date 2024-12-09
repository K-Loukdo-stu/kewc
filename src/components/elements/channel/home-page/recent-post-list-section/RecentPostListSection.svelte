<script>
    import { getRecentPostsByChannel } from "$providers/actions/kchannel/post";
    import { createEventDispatcher, onMount } from "svelte";
    import RecentPostText from "./RecentPostText.svelte";
    import RecentPostPhoto from "./RecentPostPhoto.svelte";
    import RecentPostProduct from "./RecentPostProduct.svelte";
    import RecentPostVideo from "./RecentPostVideo.svelte";
    import RecentPostLink from "./RecentPostLink.svelte";
    import { fade } from "svelte/transition";
    const dispatch = createEventDispatcher();

    export let channelId;

    const recentPostsState = {
        posts: [],
        loading: false,
        errMsg: "",
        loaded: false,
    };

    const onLoadRecentPosts = async () => {
        try {
            recentPostsState.loading = true;
            const res = await getRecentPostsByChannel.load({
                channel: channelId,
                limit: 3,
                pastDays: 7,
            });
            recentPostsState.posts = res.data;
        } catch (err) {
            console.error(err);
            recentPostsState.errMsg = err.message;
        } finally {
            recentPostsState.loading = false;
        }
    };

    onMount(() => {
        onLoadRecentPosts();
    });
</script>

{#if recentPostsState?.posts?.length > 0}
    <div
        in:fade
        class="w-full bg-[#b1b1b115] rounded-lg text-white p-2 shadow-sm mb-4"
    >
        <div class="font-bold flex items-center">
            <!-- <div class="p-1 text-orange-400">
            <Info /> Icon
        </div> -->
            <div>ថ្មីៗ</div>
        </div>
        <div class="h-2"></div>
        <div class="w-full text-gray-800">
            {#each recentPostsState.posts as post}
                <div class="h-2"></div>
                <button
                    class="w-full"
                    on:click={() => {
                        dispatch("onSelectedPost", post);
                    }}
                >
                    {#if post.type == "text"}
                        <RecentPostText {post} />
                    {:else if ["photo", "multi-photo", "muti-photo"].includes(post.type)}
                        <RecentPostPhoto {post} />
                    {:else if ["product", "multi-product", "muti-product"].includes(post.type)}
                        <RecentPostProduct {post} />
                    {:else if post.type == "link"}
                        <RecentPostLink {post} />
                    {:else if post.type == "video"}
                        <RecentPostVideo {post} />
                    {/if}
                </button>
            {/each}
        </div>
    </div>
{/if}
