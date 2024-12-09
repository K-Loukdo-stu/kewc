<script>
  import { createEventDispatcher, onMount } from "svelte";
  import ProductListItem from "./ProductListItem.svelte";
  import SmfbLoading from "$components/materials/spinners/fbLoading/SMFBLoading.svelte";
  import { fade } from "svelte/transition";
  import InfiniteScroll from "$components/utils/InfiniteScroll.svelte";
  import { flip } from "svelte/animate";
  import { updateProductShowOnMenuBoard } from "$providers/actions/kchannel/product";
  const dispatch = createEventDispatcher();

  export let products = [];
  export let loading = false;
  export let loaded = false;
  export let scrollEle;
  export let editMode = false;

  const updateProductShowOnMenuBoardState = {
    updating: false,
    errMsg: "",
  };

  const onEdit = (evt) => {
    const product = evt.detail["product"];
    dispatch("edit", { product });
  };

  const onShowOnBoard = async (evt) => {
    const product = evt.detail["product"];
    const isShown = evt.detail["isShown"];
    try {
      updateProductShowOnMenuBoardState.updating = true;
      const res = await updateProductShowOnMenuBoard.load({
        productId: product.id,
        showOnMenuBoard: isShown,
      });

      // find the matching product and update it
      const updatedProduct = res.data;
      const index = products.findIndex((p) => p.id === updatedProduct.id);
      if (index < 0) return;
      products[index]["showOnMenuBoard"] = updatedProduct["showOnMenuBoard"];
    } catch (error) {
      updateProductShowOnMenuBoardState.errMsg = error.message;
    } finally {
      updateProductShowOnMenuBoardState.updating = false;
    }
  };

  let wrapperWidth = 0;
  $: pCol = Math.floor(wrapperWidth / 160);
  $: productCol = pCol > 3 ? 3 : pCol;
  $: productWidth = Math.floor(wrapperWidth / productCol);
</script>

<div class=" w-full max-w-lg m-auto">
  <div
    bind:clientWidth={wrapperWidth}
    class="flex text-white flex-wrap justify-center w-full"
  >
    {#each products as product (product.id)}
      <div
        animate:flip={{ duration: 200 }}
        style={`width: ${productWidth}px`}
        class="p-1 pt-0 pb-2 min-w-[160px] max-w-[180px] h-64"
      >
        <ProductListItem
          {product}
          on:edit={onEdit}
          on:onShowOnBoard={onShowOnBoard}
        />
      </div>
    {/each}
  </div>
  <div
    class:visible={loading}
    class:invisible={!loading}
    class="  flex justify-center py-1"
  >
    <SmfbLoading color="gray" />
  </div>
  {#if loaded && products?.length == 0}
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

