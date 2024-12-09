<script>
  import ProductViewer from "$components/elements/product/view/ProductViewer.svelte";
  import ShareBox from "$components/icons/share_tmp/ShareBox.svelte";
  import { EwcDispatch, EwcFrames } from "$lib/ewc-dispatch/ewc-dispatch";
  import { EwcEvents } from "$lib/ewc-dispatch/events";
  import { EwcBasicListenerEvents } from "$lib/ewc-dispatch/events/basic";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import ChevronLeft from "$components/icons/chevron_tmp/ChevronLeft.svelte";
  import { isEwcMode } from "$lib/statics";

  export let productName = "Title";
  let productId = $page.params.pid;
  let product = null;
  let ready = false;
  const ewcDispatch = new EwcDispatch(EwcFrames.VIEW_PRODUCT);

  const addedOrderLine = (evt) => {
    const orderLine = evt.detail.orderLine;
    const channel = evt.detail.channel;
    // Publish an event to iframe
    ewcDispatch.publish({
      key: EwcEvents.pub.viewProduct.ON_ADDED_ORDERLINE,
      data: { channel, orderLine },
    });
  };

  const onShare = (product) => {
    ewcDispatch.publish({
      key: EwcEvents.pub.viewProduct.ON_SHARE,
      data: product,
    });
  };

  onMount(() => {
    ready = true;
    ewcDispatch.setPageLoaded();
    ewcDispatch.listen({ key: EwcBasicListenerEvents.ON_PAGE_RELOAD });
  });
</script>

<div class="w-full h-full bg-white relative">
  <ProductViewer
    on:productLoaded={(evt) => {
      product = evt.detail.product;
    }}
    on:addedOrderLine={addedOrderLine}
    bind:productId
  />

  <!-- Header -->
  <div
    class=" absolute h-20 inset-0 bottom-auto flex items-center p-1 from-gray-700/70 via-gray-700/50 to-gray-400/5 bg-gradient-to-b"
  >
    {#if ready && !isEwcMode()}
      <div class=" text-white">
        <button
          on:click={() => {
            ewcDispatch.publish({
              key: EwcEvents.pub.viewProduct.ON_CLOSE,
            });
          }}
          class=" px-1 text-white cursor-pointer"
        >
          <ChevronLeft strokeWidth={3} />
        </button>
      </div>
    {/if}
    <div class=" flex-grow" />
    {#if !!product}
      <div class="flex h-full items-center">
        <button
          on:click={() => onShare(product)}
          class="p-2 cursor-pointer text-white hover:text-white"
        >
          <ShareBox size={24} />
        </button>
      </div>
    {/if}
  </div>
</div>
