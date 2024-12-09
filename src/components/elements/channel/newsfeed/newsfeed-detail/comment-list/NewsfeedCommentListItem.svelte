<script>
    import { timeFormat } from "$lib/utils/date";
    import NewsfeedDetailItemDelete from "../NewsfeedDetailItemDelete.svelte";
    export let comment;
    export let post;
    export let user;
    export let channelOwnership;

    let profileImageLoaded = false;
</script>

<div class="p-3 pl-2 flex space-x-2">
    {#if comment.isAdmin}
        <div class="flex-grow-0 w-7 h-7 flex items-start relative">
            <div class="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
                <img
                    hidden={!profileImageLoaded}
                    class=" bg-gray-100 w-full h-full object-cover"
                    src={post.channel?.profile?.thumbnail?.url}
                    alt=""
                    on:load={() => (profileImageLoaded = true)}
                />
            </div>
        </div>
    {:else}
        <div class="flex-grow-0 w-8 flex items-start">
            <div class="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
                <img
                    hidden={!profileImageLoaded}
                    class=" bg-gray-100 object-cover w-full h-full"
                    src={user?.photo?.thumbnail?.url}
                    alt=""
                    on:load={() => (profileImageLoaded = true)}
                />
            </div>
        </div>
    {/if}
    <div class="w-full flex flex-col flex-grow">
        <div class="flex-grow flex items-start flex-row">
            <div
                class="flex-grow-0 bg-[#ECEFF1] rounded-lg p-2 pt-1 pr-7 relative"
            >
                {#if user.id === comment.user.id || (comment.isAdmin && channelOwnership != null)}
                    <NewsfeedDetailItemDelete {comment} {post} />
                {/if}
                {#if comment?.isAdmin}
                    <div class="font-bold text-base">
                        {post.channel?.name || "Unkown"}
                    </div>
                {:else}
                    <div class="font-bold text-base">
                        {comment?.user?.username || "Unknown"}
                    </div>
                {/if}
                <div class="flex flex-row items-center">
                    <div class="text-gray-900">
                        {comment?.text || ""}
                    </div>
                </div>
                <!-- <div class="absolute w-full flex justify-end p-1">
                                        Delete
                                    </div> -->
            </div>
            <div class=" flex-grow flex items-end h-full pl-2">
                <div class=" text-gray-600 text-sm">
                    {timeFormat(comment.createdAt)}
                </div>
            </div>
        </div>
    </div>
</div>
