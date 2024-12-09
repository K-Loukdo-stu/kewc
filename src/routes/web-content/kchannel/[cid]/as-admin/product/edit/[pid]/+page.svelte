<script>
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { EwcDispatch, EwcFrames } from "$lib/ewc-dispatch/ewc-dispatch";
  import EditProduct from "$components/elements/product/edit/EditProduct.svelte";
  import { goto } from "$app/navigation";
  import { EwcEvents } from "$lib/ewc-dispatch/events";
  import { EwcBasicListenerEvents } from "$lib/ewc-dispatch/events/basic";

  let channelId = $page["params"]["cid"];
  let productId = $page["params"]["pid"];
  const ewcDispatch = new EwcDispatch(EwcFrames.EDIT_PRODUCT);

  onMount(() => {
    ewcDispatch.setPageLoaded();
    ewcDispatch.listen({ key: EwcBasicListenerEvents.ON_PAGE_RELOAD });
  });
</script>

<EditProduct
  {channelId}
  {productId}
  on:deleted={(evt) => {
    const product = evt.detail["product"];
    ewcDispatch.publish({
      key: EwcEvents.pub.editProduct.ON_PRODUCT_DELETED,
      data: product,
    });

    // reload the page
    ewcDispatch.reload();
  }}
  on:saved={(evt) => {
    const product = evt.detail["product"];
    ewcDispatch.publish({
      key: EwcEvents.pub.editProduct.ON_PRODUCT_SAVED,
      data: product,
    });
  }}
/>
