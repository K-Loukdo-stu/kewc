<script>
    import CheckBox from "$components/elements/CheckBox/CheckBox.svelte";
    import CloseX from "$components/icons/Close/CloseX.svelte";
    import { clickOutside } from "$lib/utils/click-outside";
    import { productsByProductType } from "$providers/actions/kchannel/product";
    import { createEventDispatcher, onMount } from "svelte";
    const dispatch = createEventDispatcher();

    export let channelId;

    let productsArray = [];
    let loadProductState = {
        product: [],
        loading: false,
        errMsg: "",
        loaded: false,
        searchText: "",
        pageNum: 0,
    };

    const onLoadProducts = async () => {
        if (!channelId) return;
        if (loadProductState.loading == true) return;
        try {
            const LIMIT = 30;
            loadProductState.errMsg = "";
            loadProductState.loading = true;
            loadProductState.loaded = false;
            const res = await productsByProductType.load({
                channel: channelId,
                productType: "",
                pageNumber: loadProductState.pageNum,
                limit: LIMIT,
            });
            loadProductState.product = [
                ...loadProductState.product,
                ...res.data,
            ];
            loadProductState.loaded = true;
            if (res?.data.length > 0) {
                loadProductState.pageNum++;
            }
        } catch (err) {
            loadProductState.errMsg = err.message;
        } finally {
            loadProductState.loading = false;
        }
    };

    const addProduct = (product) => {
        product["productId"] = product.id;
        delete product.__typename;
        delete product.productType;
        if (!productsArray.includes(product)) {
            productsArray.push(product);
        }
        productsArray = productsArray;
    };

    const removeProduct = (product) => {
        if (productsArray.includes(product)) {
            productsArray.splice(productsArray.indexOf(product), 1);
        }
        productsArray = productsArray;
    };

    onMount(() => {
        onLoadProducts();
    });
</script>

<div
    class=" bg-gray-600/50 w-full max-w-[650px] h-full relative justify-center items-end flex rounded-2xl"
>
    <div
        use:clickOutside
        on:click_outside={() => {
            dispatch("close");
        }}
        class=" bg-white h-2/3 flex p-3 relative items-center w-full rounded-2xl border flex-col justify-center"
    >
        <div class="flex flex-row justify-between w-full items-center pb-1">
            <button
                class=" ml-1 text-gray-500 hover:bg-gray-100 hover:rounded-lg cursor-pointer"
                on:click={() => {
                    dispatch("close");
                }}
            >
                <CloseX />
            </button>
            <div class="text-[#888888] text-lg p-2">
                <b>Choose product(s)</b>
            </div>
            <button
                class=" py-2 px-6 bg-blue-600 text-white rounded-lg"
                on:click={() => {
                    dispatch("add", { products: productsArray });
                }}
            >
                Add
            </button>
        </div>
        <div class="relative overflow-auto w-full h-full">
            <div class="flex flex-wrap bg-white items-center">
                {#each loadProductState.product as product, index}
                    <div class="h-full flex justify-center w-1/2">
                        <button
                            on:click={() => {
                                const foundIndex = productsArray.findIndex(
                                    (cat) => cat.id == product.id,
                                );

                                if (foundIndex >= 0) {
                                    removeProduct(product);
                                } else {
                                    addProduct(product);
                                }
                            }}
                            class="flex flex-row p-[2px] w-full"
                        >
                            <div
                                class="w-full flex flex-col p-3 rounded-lg shadow-sm border-[#DFDFDF] border-2 h-[290px] relative"
                            >
                                <div
                                    class="w-full flex-grow flex justify-center relative"
                                >
                                    <div class=" absolute inset-0">
                                        {#if product.photo}
                                            <img
                                                src={product.photo.url}
                                                alt=""
                                                class=" w-full rounded-2xl h-full object-cover"
                                            />
                                        {:else}
                                            <img
                                                src="https://a.cdn-hotels.com/gdcs/production0/d1513/35c1c89e-408c-4449-9abe-f109068f40c0.jpg?impolicy=fcrop&w=800&h=533&q=medium"
                                                alt=""
                                                class="rounded-2xl h-full object-cover"
                                            />
                                        {/if}
                                    </div>
                                </div>
                                <div
                                    class="flex-grow-0 p-2 pl-0 pr-0 flex flex-col items-start relative"
                                >
                                    <div class="text-lg">
                                        {product.name}
                                    </div>
                                    {#if product.price !== null}
                                        <div
                                            class="text-sm line-through w-full flex items-end text-[#898989]"
                                        >
                                            {product.price.discountPrice}
                                        </div>
                                        <div
                                            class="flex space-x-1 h-full flex-row"
                                        >
                                            <div
                                                class="text-lg font-bold text-[#6A6A6A]"
                                            >
                                                {product.price.price}
                                            </div>
                                            <div
                                                class="text-lg font-bold text-[#6A6A6A]"
                                            >
                                                {product.price.currency}
                                            </div>
                                        </div>
                                    {/if}
                                    <div
                                        class="absolute w-full h-full flex items-end justify-end p-3"
                                    >
                                        <CheckBox
                                            checked={productsArray.find(
                                                (cat) => cat.id == product.id,
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                        </button>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>
