<script>
    import CloseX from "$components/icons/Close/CloseX.svelte";
    import EllipsisVertical from "$components/icons/Ellipsis/EllipsisVertical.svelte";
    import PointIcon from "$components/icons/Point/PointIcon.svelte";
    import Trash from "$components/icons/Trash.svelte";
    import WorldIcon from "$components/icons/World/WorldIcon.svelte";
    import SmfbLoading from "$components/materials/spinners/fbLoading/SMFBLoading.svelte";
    import DeleteButton from "$components/modals/product-screen/DeleteButton.svelte";
    import DeleteModal from "$components/modals/product-screen/DeleteModal.svelte";
    import { clickOutside } from "$lib/utils/click-outside";
    import { timeFormat } from "$lib/utils/date";
    import { deletePost } from "$providers/actions/kchannel/post";
    export let post;
    export let channelOwnerShip;
    export let showDelete = false;
    let onDelete = false;
    let isOnDeletePost = false;
    const onDeletePost = async (id) => {
        try {
            await deletePost.load({ id: post.id });
        } catch {}
    };

    let imgLoaded = false;
</script>

<div class="w-full">
    <div class="flex flex-row p-3 pb-0">
        <div class=" flex justify-center items-center p-2">
            <div class="h-12 w-12 rounded-[20px] bg-gray-200 border">
                <img
                    hidden={!imgLoaded}
                    src={post.channel?.profile?.url}
                    alt="Channel profile"
                    class=" w-full h-full object-cover"
                    on:load={() => (imgLoaded = true)}
                />
            </div>
        </div>

        <div class="relative w-full flex flex-row items-center justify-between">
            <div class="flex-grow flex items-start flex-col">
                <div class="font-bold text-base">{post.channel.name}</div>
                <div class="flex flex-row items-center">
                    <div class="text-gray-500 text-xs">
                        {timeFormat(post.createdAt)}
                    </div>
                    <!-- <div class="text-gray-500 flex items-center">
                        <PointIcon />
                    </div>
                    <div class="text-gray-500">
                        <WorldIcon size={16} />
                    </div> -->
                </div>
            </div>
            {#if channelOwnerShip}
                <div
                    class=" flex-grow-0 hover:text-gray-600 text-gray-500 p-2 flex items-start cursor-pointer"
                    on:click={() => {
                        showDelete = !showDelete;
                    }}
                >
                    <EllipsisVertical />
                </div>
            {/if}
            {#if showDelete}
                <div
                    class="absolute z-50 px-6 py-2 rounded-lg bg-white border-2 right-3 top-5 flex flex-row space-x-2 hover:bg-gray-100 text-gray-600 hover:text-black cursor-pointer"
                    use:clickOutside
                    on:click_outside={() => {
                        showDelete = false;
                    }}
                    on:click={() => {
                        onDelete = true;
                        showDelete = false;
                    }}
                >
                    <div><Trash></Trash></div>
                    <div>Delete</div>
                </div>
            {/if}
        </div>
    </div>
</div>

<DeleteModal shown={onDelete}>
    <div class="w-full h-full px-4 flex justify-center items-center">
        <div
            class="max-w-[550px] w-full max-h-full flex flex-col bg-white rounded-xl"
        >
            <div
                class="flex flex-row p-3 relative w-full justify-center items-center"
            >
                <div class="font-semibold">Move to your trash?</div>
                <button
                    class="cursor-pointer absolute flex justify-end items-end bg-gray-50 hover:bg-gray-100 border-1 right-3 rounded-full p-1"
                    on:click={() => {
                        onDelete = false;
                    }}
                >
                    <CloseX />
                </button>
            </div>
            <hr />
            <div class="p-2 text-center">Are you sure to delete this post?</div>
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
