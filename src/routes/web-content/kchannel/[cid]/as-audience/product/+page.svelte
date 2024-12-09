<script>
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { EwcDispatch, EwcFrames } from "$lib/ewc-dispatch/ewc-dispatch";
  import ProductList from "$components/elements/channel/product-list/ProductList.svelte";
  import ProductTypeList from "$components/elements/product/ProductTypeList.svelte";
  import { EwcBasicListenerEvents } from "$lib/ewc-dispatch/events/basic";
  import { EwcEvents } from "$lib/ewc-dispatch/events";
  import { productsByProductType } from "$providers/actions/kchannel/product";
  import CartButton from "$components/materials/cart-button/CartButton.svelte";
  import { getOrderLineTotal } from "$providers/actions/kchannel/order/order-line";
  import { isEwcMode } from "$lib/statics";

  let channelId = $page["params"]["cid"];
  const ewcDispatch = new EwcDispatch(EwcFrames.PRODUCT_LIST_VIEWER);

  $: defaultProductTypeId = $page.url.searchParams.get("type");

  let scrollEle;
  let productTypeListHeight;
  let selectedProductType;

  let loadProductStates = {
    products: [],
    loading: false,
    errMsg: "",
    loaded: false,
    pageNumber: 0,
  };

  let loadOrderLineTotalState = {
    loading: false,
    orderLineTotal: 0,
  };

  const onViewProduct = (evt) => {
    const product = evt.detail["product"];
    ewcDispatch.publish({
      key: EwcEvents.pub.productListViewer.ON_VIEW_PRODUCT,
      data: { product },
    });
  };

  const onSendProduct = (evt) => {
    const product = evt.detail["product"];
    ewcDispatch.publish({
      key: EwcEvents.pub.viewProduct.ON_SHARE,
      data: { product },
    });
  };

  const onLoadProducts = async (type) => {
    if (loadProductStates.loading == true) return;
    try {
      const LIMIT = 8;
      loadProductStates.loading = true;
      loadProductStates.loaded = false;
      const res = await productsByProductType.load({
        channel: channelId,
        productType: type?.id ?? "",
        pageNumber: loadProductStates.pageNumber,
        limit: LIMIT,
      });
      loadProductStates.products = [...loadProductStates.products, ...res.data];

      loadProductStates.loaded = true;
      if (res?.data.length > 0) {
        loadProductStates.pageNumber++;
      }
    } catch (err) {
      loadProductStates.errMsg = err.message;
    } finally {
      loadProductStates.loading = false;
    }
  };

  const onLoadOrderLineTotal = async () => {
    loadOrderLineTotalState.loading = true;
    try {
      const res = await getOrderLineTotal.load({ channel: channelId });
      loadOrderLineTotalState.orderLineTotal = res.data;
    } catch (err) {
      console.warn(err);
    } finally {
      loadOrderLineTotalState.loading = false;
    }
  };

  onMount(() => {
    onLoadOrderLineTotal();
    ewcDispatch.setPageLoaded();
    ewcDispatch.listen({ key: EwcBasicListenerEvents.ON_PAGE_RELOAD });

    ewcDispatch.listen({
      keys: [
        EwcEvents.pub.productListViewer.ON_CART_CHECKOUT_DONE,
        EwcEvents.pub.productListViewer.ON_ORDER_LINE_REMOVED,
        EwcEvents.pub.productListViewer.ON_ADDED_TO_CART,
      ],
      cb: (_) => onLoadOrderLineTotal(),
    });
  });
</script>

<div class="flex flex-col relative w-screen h-screen bg-gray-100">
  <div style="height: {50}px;" class=" w-full" />
  <div class=" relative w-full h-full">
    <div
      bind:this={scrollEle}
      class=" absolute inset-0 scrollbar flex-grow overflow-y-auto py-10 pt-2"
    >
      <div class=" max-w-xl m-auto px-2 flex-grow">
        <!-- Content -->
        <ProductList
          bind:scrollEle
          bind:products={loadProductStates.products}
          bind:pageNumber={loadProductStates.pageNumber}
          bind:loading={loadProductStates.loading}
          bind:loaded={loadProductStates.loaded}
          on:view={onViewProduct}
          on:send={onSendProduct}
          on:loadMore={() => {
            onLoadProducts(selectedProductType);
          }}
        />
      </div>
    </div>
  </div>
  <!-- Header -->
  <div class="absolute top-0 left-0 right-0">
    <ProductTypeList
      bind:selectedProductType
      bind:height={productTypeListHeight}
      bind:defaultProductTypeId
      editMode={false}
      on:select={(evt) => {
        selectedProductType = evt.detail["type"];
        loadProductStates.pageNumber = 0;
        loadProductStates.products = [];
        onLoadProducts(selectedProductType);

        // Pub to ewc
        ewcDispatch.publish({
          key: EwcEvents.pub.productManagement.ON_PRODUCT_TYPE_SELECTED,
          data: { productType: selectedProductType },
        });
      }}
      {channelId}
    />
  </div>
  <!-- Cart -->
  {#if !isEwcMode()}
    <div class=" absolute right-1 bottom-1 p-2">
      <CartButton
        bind:badgeNum={loadOrderLineTotalState.orderLineTotal}
        on:click={() => {
          ewcDispatch.publish({
            key: EwcEvents.pub.productListViewer.ON_OPEN_CART,
            data: { channelId },
          });
        }}
      />
    </div>
  {/if}
</div>

<style>
  .scrollbar {
    overflow: overlay;
  }

  .scrollbar::-webkit-scrollbar {
    display: block;
    /* width: var(--visible, 0px); */
    width: 4px;
    border-radius: 99%;
  }

  .scrollbar::-webkit-scrollbar-button {
    display: none;
  }

  .scrollbar::-webkit-scrollbar-track {
    background-color: #00000000;
  }

  .scrollbar::-webkit-scrollbar-track-piece {
    background-color: #00000000;
  }

  .scrollbar::-webkit-scrollbar-thumb {
    background-color: #00000010;
    border-radius: 24px;
  }
</style>
