<script>
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { EwcDispatch, EwcFrames } from "$lib/ewc-dispatch/ewc-dispatch";
  import CreateProduct from "$components/elements/product/create/CreateProduct.svelte";
  import { goto } from "$app/navigation";
  import { EwcEvents } from "$lib/ewc-dispatch/events";

  $: channelId = $page["params"]["cid"];
  $: productTypeId = $page["url"]["searchParams"].get("ptype");

  const ewcDispatch = new EwcDispatch(EwcFrames.CREATE_PRODUCT);

  onMount(() => {
    ewcDispatch.setPageLoaded();
    ewcDispatch.listen({ key: "on-page-reload" });
  });
</script>

<CreateProduct
  {channelId}
  {productTypeId}
  on:created={(evt) => {
    // Go to optional options if successfully created
    const createdProduct = evt.detail["product"];
    if (!ewcDispatch.isFlutterEwc()) {
      goto(
        `/web-content/kchannel/${channelId}/as-admin/product/add-options/${createdProduct["id"]}`,
      );
    }

    // Publish an event to iframe
    ewcDispatch.publish({
      key: EwcEvents.pub.createProduct.ON_NEW_PRODUCT_CREATED,
      data: createdProduct,
    });
  }}
/>
