<script>
    import SmfbLoading from "$components/materials/spinners/fbLoading/SMFBLoading.svelte";
    import { clickOutside } from "$lib/utils/click-outside";
    import { channelCatalogs } from "$providers/actions/kchannel/catalog";
    import { createEventDispatcher, onMount } from "svelte";
    const dispatch = createEventDispatcher();
    export let catalog = {};
    let loadChannelCatalogsState = {
        catalogs: [],
        loading: false,
        errMsg: "",
        loaded: false,
    };
    const onLoadChannelCatalogs = async () => {
        if (loadChannelCatalogsState.loading == true) return;
        try {
            loadChannelCatalogsState.errMsg = "";
            loadChannelCatalogsState.loading = true;
            loadChannelCatalogsState.loaded = false;
            const res = await channelCatalogs.load();
            loadChannelCatalogsState.catalogs = res.data;
            loadChannelCatalogsState.loaded = true;
        } catch (err) {
            loadChannelCatalogsState.errMsg = err.message;
        } finally {
            loadChannelCatalogsState.loading = false;
        }
    };
    onMount(async () => {
        await onLoadChannelCatalogs();
    });
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
        <div class="relative overflow-auto w-full h-[300px]">
            {#if loadChannelCatalogsState.loading}
                <div class="relative w-full flex items-center justify-center">
                    <SmfbLoading color={"#006EB2"}></SmfbLoading>
                </div>
            {:else if loadChannelCatalogsState.loaded}
                <div
                    class="relative flex flex-col bg-white items-center justify-center space-y-1"
                >
                    {#each loadChannelCatalogsState.catalogs as cat, index}
                        {#if cat.id === catalog?.id}
                            <div
                                class="bg-[#006EB2] text-white w-full flex items-center justify-center p-2 rounded-md cursor-pointer"
                                on:click={() => {
                                    dispatch("selected", cat);
                                }}
                            >
                                {cat.name}
                            </div>
                        {:else}
                            <div
                                class="hover:bg-[#006EB2] hover:text-white w-full flex items-center justify-center p-2 rounded-md cursor-pointer"
                                on:click={() => {
                                    dispatch("selected", cat);
                                }}
                            >
                                {cat.name}
                            </div>
                        {/if}
                    {/each}
                </div>
            {/if}
        </div>
    </div>
</div>
