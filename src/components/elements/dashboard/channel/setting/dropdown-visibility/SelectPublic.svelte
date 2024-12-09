<script>
    import { clickOutside } from "$lib/utils/click-outside";
    import { createEventDispatcher, onMount } from "svelte";
    const dispatch = createEventDispatcher();

    export let channelId;
    console.log("channelIdchannelId", channelId);
</script>

<div
    class=" bg-gray-600/50 w-full max-w-[650px] relative justify-center items-end flex"
>
    <div
        use:clickOutside
        on:click_outside={() => {
            dispatch("close");
        }}
        class=" bg-white flex p-3 relative items-center w-full rounded-t-lg border flex-col justify-center"
    >
        <div class="relative overflow-auto w-full">
            <div
                class="flex flex-col bg-white items-center justify-center space-y-1"
            >
                <div
                    class="hover:bg-[#006EB2] hover:text-white w-full flex items-center justify-center p-2 rounded-md cursor-pointer"
                    on:click={() => {
                        dispatch("public");
                    }}
                >
                    Public
                </div>
                <div
                    class="hover:bg-[#006EB2] hover:text-white w-full flex items-center justify-center p-2 rounded-md cursor-pointer"
                    on:click={() => {
                        dispatch("private");
                    }}
                >
                    Private
                </div>
            </div>
        </div>
    </div>
</div>
