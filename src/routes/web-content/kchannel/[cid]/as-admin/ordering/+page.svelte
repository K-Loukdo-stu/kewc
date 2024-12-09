<script>
  import OrderingBoard from "$components/elements/ordering-board/OrderingBoard.svelte";
  import { EwcDispatch } from "$lib/ewc-dispatch/ewc-dispatch";
  import { onMount } from "svelte";

  const ewcDispatch = new EwcDispatch();

  onMount(() => {
    ewcDispatch.setPageLoaded();
    ewcDispatch.listen("on-page-reload");
  });
</script>

<div class=" w-full h-full">
  <OrderingBoard />
</div>
