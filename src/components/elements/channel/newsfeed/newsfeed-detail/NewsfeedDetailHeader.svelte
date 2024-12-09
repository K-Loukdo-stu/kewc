<script>
    import { goto } from "$app/navigation";
    import BackArrow from "$components/icons/BackArrow/BackArrow.svelte";
    import CloseX from "$components/icons/Close/CloseX.svelte";
    import EllipsisVertical from "$components/icons/Ellipsis/EllipsisVertical.svelte";
    import Trash from "$components/icons/Trash.svelte";
    import DeleteModal from "$components/modals/product-screen/DeleteModal.svelte";
    import { isEwcMode } from "$lib/statics";
    import { timeFormat } from "$lib/utils/date.js";
    import { deletePost } from "$providers/actions/kchannel/post";
    export let channelId;
    export let post;
    export let channelOwerShip;
    export let showDelete = false;
    let onDelete = false;
    let isOnDeletePost = false;
    const onDeletePost = async (id) => {
        try {
            await deletePost.load({ id: post.id });
        } catch {}
    };
    let backEvent = () => {
        // goto(`/web-content/kchannel/${channelId}/as-admin/post`);
    };

    let imgLoaded = false;
</script>

<div class="w-full">
    <div class="flex flex-row p-1 pt-3">
        <button
            on:click={backEvent}
            class=" {isEwcMode()
                ? ' invisible pointer-events-none'
                : ''} flex items-center justify-center cursor-pointer hover:text-gray-700 text-gray-600"
        >
            <BackArrow size={40} />
        </button>
        <div class=" flex justify-center items-center p-2">
            <div class="h-14 w-14 rounded-[20px] bg-gray-200 border">
                <img
                    hidden={!imgLoaded}
                    src={post.channel?.profile?.url}
                    alt="channel profile"
                    class=" w-full h-full rounded-[20px]"
                    on:load={() => (imgLoaded = true)}
                />
            </div>
        </div>

        <div class="w-full flex flex-row items-center justify-between relative">
            <div class="flex-grow flex items-start flex-col">
                <div class="font-bold text-base">{post.channel.name}</div>
                <div class="flex flex-row items-center">
                    <div class="text-gray-500 text-xs">
                        {timeFormat(post.createdAt)}
                    </div>
                </div>
            </div>
            {#if channelOwerShip}
                <button
                    class="flex-grow-0 hover:text-gray-600 text-gray-500 p-2 flex items-start cursor-pointer"
                    on:click={() => {
                        showDelete = !showDelete;
                    }}
                >
                    <EllipsisVertical />
                </button>
            {/if}

            {#if showDelete}
                <button
                    class="absolute z-50 px-6 py-2 rounded-lg bg-white border-2 right-5 top-10 flex flex-row space-x-2 hover:bg-gray-100 text-gray-600 hover:text-black cursor-pointer"
                    use:clickOutside
                    on:click_outside={() => {
                        showDelete = false;
                        console.log("showDelete", showDelete);
                    }}
                    on:click={() => {
                        onDelete = true;
                        showDelete = false;
                    }}
                >
                    <div><Trash></Trash></div>
                    <div>Delete</div>
                </button>
            {/if}
        </div>
    </div>
</div>

<DeleteModal shown={onDelete}>
    <div class="w-full h-full flex justify-center items-center">
        <div class="w-[550px] flex flex-col bg-white rounded-xl">
            <div
                class="flex flex-row p-3 relative w-full justify-center items-center"
            >
                <div>Move to your trash?</div>
                <div
                    class="cursor-pointer absolute flex justify-end items-end bg-gray-50 hover:bg-gray-100 border-1 right-3 rounded-full p-1"
                    on:click={() => {
                        onDelete = false;
                    }}
                >
                    <CloseX></CloseX>
                </div>
            </div>
            <hr />
            <div class="p-2">Are you sure to delete this post?</div>
            {#if isOnDeletePost}
                <div
                    class="flex flex-row w-full justify-end items-center p-3 space-x-5"
                >
                    <div
                        class="px-6 py-1 bg-blue-500 hover:bg-blue-700 text-white rounded-md flex items-center cursor-pointer"
                    >
                        <SmfbLoading></SmfbLoading>
                    </div>
                </div>{/if}
            {#if !isOnDeletePost}
                <div
                    class="flex flex-row w-full justify-end items-center p-3 space-x-5"
                >
                    <div
                        class="text-blue-500 hover:text-blue-800 flex items-center cursor-pointer"
                        on:click={() => {
                            onDelete = false;
                        }}
                    >
                        Cancel
                    </div>
                    <div
                        class="px-6 py-1 bg-blue-500 hover:bg-blue-700 text-white rounded-md flex items-center cursor-pointer"
                        on:click={async () => {
                            isOnDeletePost = true;
                            await onDeletePost();
                            goto(
                                `/web-content/kchannel/${channelId}/as-admin/post`,
                            );
                            onDelete = false;
                        }}
                    >
                        Delete
                    </div>
                </div>
            {/if}
        </div>
    </div>
</DeleteModal>
