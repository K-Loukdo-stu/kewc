<script>
  import { createEventDispatcher, onMount, tick } from "svelte";
  import Footer from "$components/materials/product/Footer.svelte";
  import { createProductSteps } from "../variable";
  import { getProduct } from "$providers/actions/kchannel/product";
  import SmfbLoading from "$components/materials/spinners/fbLoading/SMFBLoading.svelte";
  import AdditionalOptionEditor from "./AdditionalOptionEditor.svelte";
  const dispatch = createEventDispatcher();

  export let productId;
  let productWrapperEle;
  let scrollEle;
  let imgLoaded = false;
  let headerBottomBorder = false;
  let product;
  let loadProductState = {
    loading: false,
    errMsg: "",
    loaded: false,
  };

  const onLoadProduct = async () => {
    try {
      loadProductState.errMsg = "";
      loadProductState.loading = true;
      loadProductState.loaded = false;
      const res = await getProduct.load({ productId });
      product = res.data;
      loadProductState.loaded = true;
    } catch (err) {
      loadProductState.errMsg = err.message;
      // to do
    } finally {
      loadProductState.loading = false;
    }
  };

  onMount(() => {
    onLoadProduct();
  });
</script>

<div class=" relative w-screen h-screen bg-white flex flex-col">
  <div
    class=" {headerBottomBorder
      ? ' border-b'
      : ''} flex-grow-0 text-center h-11 flex justify-center bg-gray-50 items-center relative"
  >
    <div class=" font-semibold text-gray-500 bgred">Additional options</div>
    {#if loadProductState.loaded}
      <div class=" absolute top-0 right-0 bottom-0 p-1 flex items-center">
        <button
          class="bg-tertiary-3 text-white rounded-md py-1 px-2 hover:bg-tertiary-2"
          on:click={() => dispatch("done", { product })}>Finish</button
        >
      </div>
    {/if}
  </div>
  <div class=" relative w-full flex-grow">
    <div
      bind:this={scrollEle}
      on:scroll={() => {
        var ele = productWrapperEle.getBoundingClientRect();
        headerBottomBorder = scrollEle.scrollTop >= ele.height;
      }}
      class=" absolute inset-0 overflow-y-scroll"
    >
      <div class=" flex-grow">
        <div
          bind:this={productWrapperEle}
          class=" w-full flex border-b px-8 bg-gray-50"
        >
          {#if loadProductState.loaded}
            <div class=" max-w-md w-full m-auto flex items-center py-2">
              <div class=" bg-gray-200 w-24 h-24 rounded-md">
                <img
                  class:hidden={!imgLoaded}
                  on:load={() => (imgLoaded = true)}
                  class=" w-full h-full rounded-md object-cover"
                  src={product.photo?.url}
                  alt=""
                />
              </div>
              <div class=" flex flex-col flex-grow p-1 pl-3 text-gray-500">
                <div>
                  <div class=" font-semibold">{product.name}</div>
                  <div class=" text-xs">{product?.productType?.name ?? ""}</div>
                </div>
                <div class=" flex-grow min-h-[10px]" />
                {#if product?.price}
                  {#if product.price?.hasDiscount}
                    <div class=" w-full">
                      <div class=" text-sm line-through">
                        {`${product.price.price}${product.price.currency}`}
                      </div>
                      <div class="  font-bold text-lg">
                        {`${product.price.discountPrice}${product.price.currency}`}
                      </div>
                    </div>
                  {:else}
                    <div>
                      <div class="  font-bold text-lg">
                        {`${product.price.price}${product.price.currency}`}
                      </div>
                    </div>
                  {/if}
                {/if}
              </div>
            </div>
          {:else if loadProductState.loading}
            <div class="flex justify-center w-full">
              <SmfbLoading color="gray" />
            </div>
          {/if}
        </div>
        {#if loadProductState.loaded}
          <AdditionalOptionEditor
            on:basePriceUpdated={(evt) => {
              const price = evt.detail.price;
              product['price'] = price;
            }}
            {productId}
            bind:product
          />
        {/if}

        {#if !loadProductState.loading && loadProductState.errMsg}
          <div class=" text-center text-gray-400 p-5 font-semibold">
            {loadProductState.errMsg}
          </div>
        {/if}
      </div>
    </div>
  </div>

  <div class=" flex flex-grow-0">
    <Footer step={createProductSteps.ADDITIONAL_OPTIONS} />
  </div>
</div>
