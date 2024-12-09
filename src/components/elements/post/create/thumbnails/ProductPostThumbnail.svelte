<script>
    import CloseX from "$components/icons/Close/CloseX.svelte";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let products = [];
</script>

<div class="flex flex-wrap bg-white items-center">
    {#if products.length > 0}
        {#each products as product, index (product.id)}
            <li class="p-[2px] w-1/2">
                <div class="flex justify-center w-full">
                    <div class="flex flex-row relative w-full">
                        <div class="w-full">
                            <div
                                class="flex flex-col p-1 bg-white rounded-lg shadow-sm border-[#DFDFDF] border-2 h-[290px]"
                            >
                                <div
                                    class=" relative flex-grow w-full flex items-center justify-center"
                                >
                                    <div class=" absolute inset-0">
                                        {#if product.photo}
                                            <img
                                                src={product.photo.url}
                                                alt=""
                                                class="rounded-2xl w-full h-full object-cover"
                                            />
                                        {:else}
                                            <img
                                                src="https://a.cdn-hotels.com/gdcs/production0/d1513/35c1c89e-408c-4449-9abe-f109068f40c0.jpg?impolicy=fcrop&w=800&h=533&q=medium"
                                                alt=""
                                                class="rounded-2xl object-cover"
                                            />
                                        {/if}
                                    </div>
                                </div>

                                <div
                                    class="flex-grow-0 p-2 pl-0 pr-0 flex flex-col items-start"
                                >
                                    <div class="text-2xl">{product.name}</div>
                                    {#if product.price !== null}
                                        <div
                                            class="text-sm line-through w-full flex items-end text-[#898989]"
                                        >
                                            {product.price.discountPrice}
                                        </div>
                                        <div
                                            class="flex space-x-4 h-full flex-row"
                                        >
                                            <div
                                                class="text-2xl font-bold text-[#6A6A6A]"
                                            >
                                                {product.price.price}
                                            </div>
                                            <div
                                                class="text-2xl font-bold text-[#6A6A6A]"
                                            >
                                                {product.price.currency}
                                            </div>
                                        </div>
                                    {/if}
                                </div>
                            </div>
                        </div>

                        <button
                            type="button"
                            class="absolute border top-2 right-2 px-2 rounded-full text-gray-500 p-2 bg-white shadow hover:bg-slate-50 hover:text-gray-800 group"
                            on:click={() => {
                                dispatch("remove", { index });
                            }}
                        >
                            <CloseX />
                            <div
                                class="absolute duration-100 inset-0 w-full h-full transition-all scale-0 group-focus:scale-100 group-focus:bg-black/10 rounded-full"
                            />
                        </button>
                    </div>
                </div>
            </li>
        {/each}
    {/if}
</div>
