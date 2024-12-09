<script>
    import EmojiIcon from "$components/icons/Emoji/EmojiIcon.svelte";
    import Photo from "$components/icons/Photo/Photo.svelte";
    import StickerIcon from "$components/icons/Sticker/StickerIcon.svelte";
    import TopArrow from "$components/icons/TopArrow/TopArrow.svelte";
    import { me } from "$providers/actions/kauth";
    import { commentPost } from "$providers/actions/kchannel/post";
    import { createEventDispatcher, onMount } from "svelte";
    const dispatch = createEventDispatcher();

    export let post;
    export let channelOwerShip;
    let sendSms = false;
    let inputValue = "";
    let isOnlySpaces = false;
    let user = {};
    let onLoadState = {
        loading: false,
        loaded: false,
        errMsg: "",
    };

    const handleChange = (event) => {
        inputValue = event.target.value;
        if (inputValue.length > 0) {
            sendSms = true;
        } else {
            sendSms = false;
        }
    };

    const getMe = async () => {
        const res = await me.load();
        user = res.data;
    };
    // stickerTypes?.length ? stickerTypes[0] : null
    const onUpload = async (evt) => {
        evt.preventDefault();
        isOnlySpaces = inputValue.trim() === "";
        if (isOnlySpaces) {
            inputValue = "";
        } else {
            try {
                onLoadState.loading = true;
                let res = await commentPost.load({
                    post: post.id,
                    text: inputValue,
                    isAdmin: channelOwerShip != null ? true : false,
                });
                inputValue = "";
                sendSms = false;
                if (res.success) dispatch("create");
            } catch (err) {
                onLoadState.errMsg = err.message;
            } finally {
                onLoadState.loading = true;
                inputValue = "";
                sendSms = false;
            }
        }
    };
    onMount(() => {
        getMe();
    });
</script>

<!-- <div class="flex-grow-0 flex items-center justify-around p-2">
    <div class="cursor-pointer hover:text-gray-600 text-gray-500">
        <Photo w={20} />
    </div>
</div> -->
<form
    class="flex flex-col w-full flex-grow"
    on:submit|preventDefault={onUpload}
    method="post"
>
    <div class="w-full h-full relative flex flex-row space-x-2">
        <input
            class="h-full w-full rounded-lg flex items-start p-2 bg-white outline-none"
            type="text"
            placeholder="What's on your thought?"
            bind:value={inputValue}
            on:input={handleChange}
        />
        {#if !sendSms}
            <!-- <div
                class="absolute right-0 bottom-0 top-0 flex flex-row items-center space-x-2 pr-2"
            >
                <div
                    class="text-tertiary hover:text-blue-500 cursor-pointer p-[2px] bg-[#F4F4F4] rounded-full flex items-center justify-center"
                >
                    <StickerIcon />
                </div>
                <div
                    class="text-secondary hover:text-orange-500 cursor-pointer p-[2px] bg-[#F4F4F4] rounded-full flex items-center justify-center"
                >
                    <EmojiIcon />
                </div>
            </div> -->
        {:else}
            <div class=" flex items-center cursor-pointer">
                <button type="submit">
                    <div
                        class="bg-primary p-1 rounded-full justify-center text-white"
                    >
                        <TopArrow />
                    </div>
                </button>
            </div>
        {/if}
    </div>
</form>
