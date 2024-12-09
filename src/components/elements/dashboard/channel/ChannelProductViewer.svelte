<script>
  import SearchInput from "$components/materials/dashboard/channel/SearchInput.svelte";
  import LinkButton from "$components/materials/side-menu/LinkButton.svelte";
  import { onMount } from "svelte";
  import ProductList from "./product-list/ProductList.svelte";
  import { IN_DEV } from "$lib/statics";
  import { searchChannelProducts } from "$providers/actions/kchannel/product";
  import SmfbLoading from "$components/materials/spinners/fbLoading/SMFBLoading.svelte";
  import { fade } from "svelte/transition";
  export let channelId;

  export let selectedProduct;
  let searchProductsState = {
    searchText: "",
    products: [],
    pageNum: 0,
    productTotal: 0,
    pageTotal: 0,
    limit: 10,
    loading: false,
    loaded: false,
    errMsg: "",
  };

  $: onSearchChannelProducts(channelId);

  const onSearchChannelProducts = async (channelId) => {
    if (!channelId) return;
    try {
      searchProductsState.loading = true;
      searchProductsState.loaded = false;
      const res = await searchChannelProducts.load({
        searchText: searchProductsState.searchText,
        pageNum: searchProductsState.pageNum,
        channel: channelId,
      });
      searchProductsState.products = res.data.products;
      searchProductsState.productTotal = res.data.productTotal;
      searchProductsState.pageTotal = res.data.pageTotal;
      searchProductsState.loaded = true;
    } catch (err) {
      searchProductsState.errMsg =
        err?.message || "Unable to load channel products";
      if (IN_DEV) console.log(err);
    } finally {
      searchProductsState.loading = false;
    }
  };

  onMount(() => {
    onSearchChannelProducts(channelId);
  });
</script>

<div in:fade={{ duration: 200 }} class="  p-4 h-[400px]">
  <div class="flex h-full border-2 rounded-2xl p-2">
    <div class=" flex flex-col flex-grow">
      <div class=" flex-grow-0">
        <SearchInput
          on:change={(evt) => {
            searchProductsState.searchText = evt.detail.value;
            onSearchChannelProducts(channelId);
          }}
        />
      </div>
      <div class="h-2" />
      <div class=" relative flex-grow">
        {#if searchProductsState.loading}
          <div in:fade={{ duration: 200 }} class=" flex py-2 justify-center">
            <SmfbLoading color="gray" />
          </div>
        {:else if searchProductsState.loaded}
          <div class=" absolute inset-0 overflow-y-auto">
            <ProductList
              bind:products={searchProductsState.products}
              on:select={(evt) => {
                selectedProduct = evt.detail.product;
              }}
            />
          </div>
        {/if}
      </div>
    </div>
    {#if selectedProduct}
      <div class="w-4" />
      <div class=" w-[1px] bg-gray-300" />
      <div class="w-4" />
      <div class=" p-2 flex flex-col gap-y-2">
        <slot />
      </div>
    {/if}
  </div>
</div>
