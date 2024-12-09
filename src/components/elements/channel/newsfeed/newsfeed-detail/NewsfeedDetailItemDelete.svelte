<script>
    import { createEventDispatcher, onMount } from "svelte";
    import SmfbLoading from "$components/materials/spinners/fbLoading/SMFBLoading.svelte";
    import EllipsisVertical from "$components/icons/Ellipsis/EllipsisVertical.svelte";
    import CloseX from "$components/icons/Close/CloseX.svelte";
    import DeleteCommentModal from "$components/modals/product-screen/DeleteCommentModal.svelte";
    import { deletePostComment } from "$providers/actions/kchannel/post";
    import DeleteButton from "$components/modals/post-screen/DeleteButton.svelte";
    export let comment;
    export let post;
    export let showDelete = false;
    let onDelete = false;
    let isOnDeleteComment = false;
    const onDeleteComment = async (id) => {
        try {
            await deletePostComment.load({ id: comment.id, post: post.id });
        } catch {}
    };
</script>

<div
    class="absolute right-0 top-2 pr-2 hover:text-gray-600 text-gray-500 flex items-start cursor-pointer"
    on:click={() => {
        showDelete = !showDelete;
        console.log("showDeleteshowDelete", showDelete);
    }}
>
    <EllipsisVertical size={15} />
</div>
{#if showDelete}
    <!-- <div
        class="absolute px-6 py-2 rounded-lg bg-white border-2 bottom-5 left-24 flex flex-row space-x-2 hover:bg-gray-100 text-gray-600 hover:text-black cursor-pointer"
        use:clickOutside
        on:click_outside={() => {
            // dispatch("close");
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
    </div> -->
    <DeleteButton
        bind:showDelete
        on:onDelete={() => {
            // onDelete = true;
            onDelete = true;
            // showDelete = false;
        }}
    ></DeleteButton>
{/if}

<DeleteCommentModal shown={onDelete}>
    <div class="w-full h-full px-4 flex justify-center items-center">
        <div
            class="max-w-[550px] w-full max-h-full flex flex-col bg-white rounded-xl"
        >
            <div
                class="flex flex-row p-3 relative w-full justify-center items-center"
            >
                <div class="font-semibold">Move to your trash?</div>
                <div
                    class="cursor-pointer absolute flex justify-end items-end bg-gray-50 hover:bg-gray-100 border-1 right-3 rounded-full p-1"
                    on:click={() => {
                        onDelete = false;
                    }}
                >
                    <CloseX />
                </div>
            </div>
            <hr />
            <div class="p-2 text-center">
                Are you sure to delete this comment?
            </div>
            {#if isOnDeleteComment}
                <div
                    class="flex flex-row w-full justify-end items-center p-3 space-x-5"
                >
                    <div
                        class="px-6 py-1 bg-blue-500 hover:bg-blue-700 text-white rounded-md flex items-center cursor-pointer"
                    >
                        <SmfbLoading></SmfbLoading>
                    </div>
                </div>{/if}
            {#if !isOnDeleteComment}
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
                            isOnDeleteComment = true;
                            await onDeleteComment();
                            onDelete = false;
                            isOnDeleteComment = false;
                        }}
                    >
                        Delete
                    </div>
                </div>
            {/if}
        </div>
    </div>
</DeleteCommentModal>
