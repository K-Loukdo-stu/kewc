<script>
  import { page } from "$app/stores";
  import AdditionalOptions from "$components/elements/product/add-options/AdditionalOptions.svelte";
  import { EwcEvents } from "$lib/ewc-dispatch/events";
  import { EwcBasicListenerEvents } from "$lib/ewc-dispatch/events/basic";
  import { EwcDispatch, EwcFrames } from "$lib/ewc-dispatch/ewc-dispatch";
  import { onMount } from "svelte";

  let productId = $page["params"]["pid"];
  const ewcDispatch = new EwcDispatch(EwcFrames.EDIT_PRODUCT_OPTIONS);
  onMount(() => {
    ewcDispatch.setPageLoaded();
    ewcDispatch.listen({ key: EwcBasicListenerEvents.ON_PAGE_RELOAD });
  });
</script>

<AdditionalOptions
  {productId}
  on:done={(evt) => {
    ewcDispatch.publish({
      key: EwcEvents.pub.editProductOptions.ON_DONE_PRODUCT_EDITING,
      data: evt.detail.product
    });
  }}
/>
