<script>
  import { createEventDispatcher } from "svelte";
  import ProductListItem from "./ProductListItem.svelte";
  import SmfbLoading from "$components/materials/spinners/fbLoading/SMFBLoading.svelte";
  import { fade } from "svelte/transition";
  import InfiniteScroll from "$components/utils/InfiniteScroll.svelte";
  import { flip } from "svelte/animate";
  const dispatch = createEventDispatcher();

  export let products = [];
  export let loading = false;
  export let loaded = false;
  export let errMsg = "";
  export let scrollEle;
  export let pageNumber;
  let selectedProduct;

  const onShare = (evt) => {
    const product = evt.detail["product"];
    dispatch("send", { product });
  };

  const onAddToCart = (evt) => {
    const product = evt.detail["product"];
    dispatch("addToCart", { product });
  };

  const onSelectProduct = (evt) => {
    const product = evt.detail["product"];
    selectedProduct = product;
    dispatch("view", { product });
  };

  let wrapperWidth = 0;
  $: pCol = Math.floor(wrapperWidth / 160);
  $: productCol = pCol > 3 ? 3 : pCol;
  $: productWidth = Math.floor(wrapperWidth / productCol);
</script>

<div bind:clientWidth={wrapperWidth} class=" w-full max-w-3xl m-auto">
  <div class="flex text-white flex-wrap justify-center">
    {#each products as product (product.id)}
      <div
        animate:flip={{ duration: 200 }}
        style={`width: ${productWidth}px`}
        class="p-1 pt-0 pb-2 min-w-[160px] max-w-[180px] h-64"
      >
        <ProductListItem
          {product}
          on:share={onShare}
          on:addToCart={onAddToCart}
          on:select={onSelectProduct}
        />
      </div>
    {/each}
  </div>
  {#if loading}
    <div class=" flex justify-center py-1">
      <SmfbLoading color="gray" />
    </div>
  {:else if loaded && products?.length == 0}
    <div in:fade={{ duration: 200 }} class=" flex justify-center py-1 pt-5">
      <div class=" text-xl font-semibold text-gray-400">Empty</div>
    </div>
  {/if}

  <InfiniteScroll
    elementScroll={scrollEle}
    hasMore={products.length}
    threshold={100}
    on:loadMore={() => {
      dispatch("loadMore");
    }}
  />
</div>
