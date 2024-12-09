<script>
    import Image from "$components/materials/image/Image.svelte";
    import { createEventDispatcher, onMount } from "svelte";
    const dispatch = createEventDispatcher();
    export let post;
</script>

<button
    on:click={() => {
        dispatch("click", post);
    }}
    class="bg-white p-2 rounded-lg shadow-sm w-full text-start m-0"
>
    {#if post?.["content"]?.["text"]}
        <div class=" line-clamp-3 overflow-hidden">
            {post?.["content"]?.["text"]}
        </div>
    {/if}
    <div class="h-1"></div>
    {#if post["type"] == "product"}
        <div class="flex py-1">
            <div class="w-14 h-14 bg-gray-300 rounded-sm overflow-hidden">
                <Image src="https://via.placeholder.com/150" alt="product" />
            </div>
            <div class="w-2"></div>
            <div>
                <div class="text-base font-semibold text-gray-900">
                    {post?.['content']?.["name"] || ""}
                </div>
                <div class="text-sm text-gray-600">
                    {#if post?.['content']?.["price"]}
                        {#if post?.['content']?.["price"]?.["hasDiscount"]}
                            <div class="text-sm text-gray-600">
                                {post?.['content']?.["price"]?.["discountPrice"] || ""}
                                {post?.['content']?.["price"]?.["currency"] || ""}
                            </div>
                        {:else if post?.['content']?.["price"]?.["price"] && post?.['content']?.["price"]?.["currency"]}
                            <div class="text-sm text-gray-600">
                                {post?.['content']?.["price"]?.["price"] || ""}
                                {post?.['content']?.["price"]?.["currency"] || ""}
                            </div>
                        {/if}
                    {/if}
                </div>
            </div>
        </div>
    {:else if ["multi-product", "muti-product"].includes(post["type"])}
        {#each post["content"]["product"] as product}
            <div class="flex py-1">
                <div class="w-14 h-14 bg-gray-300 rounded-sm overflow-hidden">
                    <Image
                        src={product?.["photo"]?.["thumbnail"]?.["url"]}
                        alt="product"
                    />
                </div>
                <div class="w-2"></div>
                <div>
                    <div class="text-base font-semibold text-gray-900">
                        {product?.["name"]}
                    </div>
                    {#if product?.["price"]}
                        {#if product?.["price"]?.["hasDiscount"]}
                            <div class="text-sm text-gray-600">
                                {product?.["price"]?.["discountPrice"] || ""}
                                {product?.["price"]?.["currency"] || ""}
                            </div>
                        {:else if product?.["price"]?.["price"] && product?.["price"]?.["currency"]}
                            <div class="text-sm text-gray-600">
                                {product?.["price"]?.["price"] || ""}
                                {product?.["price"]?.["currency"] || ""}
                            </div>
                        {/if}
                    {/if}
                </div>
            </div>
        {/each}
    {/if}
</button>
