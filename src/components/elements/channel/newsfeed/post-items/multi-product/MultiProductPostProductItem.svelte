<script>
    export let product;
    let imgLoaded = false;
</script>

<div class="h-full flex justify-center">
    <div class="flex flex-row">
        <div class="w-[180px]">
            <div
                class="flex flex-col p-1 bg-white rounded-lg shadow-sm border-[#DFDFDF] border-2 h-[270px]"
            >
                <div
                    class="relative w-full flex-grow flex justify-center bg-gray-50"
                >
                    <div class=" absolute inset-0">
                        <img
                            hidden={!imgLoaded}
                            src={product?.photo?.url}
                            alt=""
                            class=" h-full rounded-lg object-cover w-full"
                            on:load={() => (imgLoaded = true)}
                        />
                    </div>
                </div>
                <div
                    class="flex-grow-0 p-2 pl-1 pr-0 flex flex-col items-start"
                >
                    <div class="text-lg">{product?.name || ""}</div>
                    {#if product.price !== null}
                        <div
                            class="text-sm line-through w-full flex items-end text-[#898989]"
                        >
                            {product.price?.discountPrice || ""}{product.price
                                ?.currency || ""}
                        </div>
                        <div class="flex h-full flex-row">
                            <div class="text-xl font-bold text-[#6A6A6A]">
                                {product.price?.price || ""}
                                {product.price?.currency || ""}
                            </div>
                        </div>
                    {/if}
                </div>
            </div>
        </div>
    </div>
</div>
