<script>
    import {
        Currency,
        moneyNumber,
    } from "$components/elements/product/variable";
    import {
        getProductTypesByChannel,
        getShowOnMenuBoardProducts,
    } from "$providers/actions/kchannel/product";
    import { createEventDispatcher, onMount } from "svelte";
    import { fade } from "svelte/transition";
    const dispatch = createEventDispatcher();

    export let channelId;

    let wrapperWidth = 0;

    const onBoardProductsState = {
        products: [],
        loading: false,
        errMsg: "",
        loaded: false,
    };

    const productTypesState = {
        productTypes: [],
        loading: false,
        errMsg: "",
        loaded: false,
    };

    const onLoadProductTypes = async () => {
        try {
            productTypesState.loading = true;
            const res = await getProductTypesByChannel.load({
                channel: channelId,
            });
            productTypesState.productTypes = res.data;
        } catch (err) {
            console.error(err);
            productTypesState.errMsg = err.message;
        } finally {
            productTypesState.loading = false;
        }
    };

    const onLoadOnBoardProducts = async () => {
        try {
            onBoardProductsState.loading = true;
            const res = await getShowOnMenuBoardProducts.load({
                channel: channelId,
                limit: 10,
            });
            onBoardProductsState.products = res.data;
        } catch (err) {
            console.error(err);
            onBoardProductsState.errMsg = err.message;
        } finally {
            onBoardProductsState.loading = false;
        }
    };

    onMount(() => {
        onLoadProductTypes();
        onLoadOnBoardProducts();
    });

    $: productCol = Math.floor(wrapperWidth / 130);
    $: productTypeCol = Math.floor(wrapperWidth / 112);
</script>

<div>
    <div
        class="w-full bg-[#b1b1b109] rounded-lg text-white py-2 pb-0 shadow-sm mb-4"
    >
        <div class="flex text-white pb-0 flex-wrap justify-center">
            {#each productTypesState.productTypes as type}
                <div
                    in:fade
                    style={`width: ${wrapperWidth / productTypeCol}px;`}
                    class=" p-1 pt-0 min-w-[112px]"
                >
                    <button
                        class=" w-full"
                        on:click={() => {
                            dispatch("onSelectType", type);
                        }}
                    >
                        <div
                            class="bg-gray-600 p-1 px-1 w-full text-center border border-gray-50/10 rounded-sm shadow-sm overflow-hidden"
                        >
                            <div class="w-full text-sm truncate">
                                {type["name"]}
                            </div>
                        </div>
                    </button>
                </div>
            {/each}
        </div>
    </div>

    <div
        class="w-full bg-[#b1b1b109] rounded-lg text-white shadow-sm mb-4 p-2 px-1 pb-0"
    >
        <div
            bind:clientWidth={wrapperWidth}
            class="flex text-white flex-wrap justify-start"
        >
            {#each onBoardProductsState.products as product}
                <div
                    in:fade
                    style={`width: ${wrapperWidth / productCol}px`}
                    class=" p-1 pt-0 pb-2 min-w-[130px]"
                >
                    <button
                        class=" w-full"
                        on:click={() => {
                            dispatch("onSelectProduct", product);
                        }}
                    >
                        <div
                            class="flex flex-col bg-gray-600 p-1 w-full h-56 border border-gray-50/10 rounded-lg shadow-sm overflow-hidden"
                        >
                            <div class=" relative flex-grow w-full">
                                <div
                                    class=" absolute inset-0 bg-gray-200 rounded-lg overflow-hidden"
                                >
                                    <img
                                        class=" w-full h-full mx-auto object-cover"
                                        src={product?.["photo"]?.[
                                            "thumbnail"
                                        ]?.["url"] ||
                                            "https://via.placeholder.com/150"}
                                        alt=""
                                    />
                                </div>
                            </div>

                            <div class="text-start">
                                <div
                                    class=" w-full flex-grow-0 truncate font-semibold"
                                >
                                    {product["name"]}
                                </div>
                                {#if product?.["price"]?.["hasDiscount"]}
                                    <div
                                        class="text-xs text-gray-200 line-through"
                                    >
                                        {moneyNumber(
                                            product["price"]["price"],
                                            product?.["price"]?.["currency"],
                                        )}{Currency[
                                            product?.["price"]?.["currency"]
                                        ]?.symbol}
                                    </div>
                                    <div class=" font-bold text-lg">
                                        {moneyNumber(
                                            product["price"]["discountPrice"],
                                            product?.["price"]?.["currency"],
                                        )}{Currency[
                                            product?.["price"]?.["currency"]
                                        ]?.symbol}
                                    </div>
                                {:else}
                                    <div class=" font-bold text-lg">
                                        {moneyNumber(
                                            product["price"]["price"],
                                            product?.["price"]?.["currency"],
                                        )}{Currency[
                                            product?.["price"]?.["currency"]
                                        ]?.symbol}
                                    </div>
                                {/if}
                            </div>
                        </div>
                    </button>
                </div>
            {/each}
        </div>
    </div>
</div>
