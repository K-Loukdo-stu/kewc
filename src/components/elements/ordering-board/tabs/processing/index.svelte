<script>
  import { page } from "$app/stores";
  import EmptyBox from "$components/icons/empty-box/EmptyBox.svelte";
  import OrderingDetail from "../../ordering-cart/OrderingDetail.svelte";
  import OrderingList from "../../ordering-cart/OrderingListItem.svelte";
  import { loadOrderingSummary } from "$providers/actions/kchannel/order/order";
  import { onMount } from "svelte";
  import { EwcDispatch, EwcFrames } from "$lib/ewc-dispatch/ewc-dispatch";
  import { EwcBasicListenerEvents } from "$lib/ewc-dispatch/events/basic";
  import ListOrderingDetail from "../../ordering-cart/ListOrderingDetail.svelte";
  import SmfbLoading from "$components/materials/spinners/fbLoading/SMFBLoading.svelte";
  import { fade } from "svelte/transition";
  import { orderStatus } from "../../variables";
  import { orderingStore } from "$providers/stores/kchannel/order/ordering";

  let channelId = $page["params"]["cid"];

  const ewcDispatch = new EwcDispatch(EwcFrames.ORDERING_SUMMARY);
  const loadOrderingSummaryState = {
    loading: false,
    loaded: false,
    ordering: [],
    errMsg: "",
  };

  const onLoadOrderingSummary = async () => {
    try {
      loadOrderingSummaryState.loading = true;
      loadOrderingSummaryState.loaded = false;
      loadOrderingSummaryState.errMsg = "";
      const res = await loadOrderingSummary.load({
        channel: channelId,
        inProcessStatus: orderStatus.INPROCESSING,
      });
      loadOrderingSummaryState.loaded = true;
      loadOrderingSummaryState.ordering = res.data;
    } catch (error) {
      console.warn(error);
      loadOrderingSummaryState.errMsg = error.message;
    } finally {
      loadOrderingSummaryState.loading = false;
    }
  };

  const subscribeData = () => {
    orderingStore.subscribe((data) => {
      loadOrderingSummaryState.loading = true;
      loadOrderingSummaryState.loaded = false;
      setTimeout(() => {
        loadOrderingSummaryState.loading = false;
        loadOrderingSummaryState.loaded = true;
      }, 500);
      loadOrderingSummaryState.ordering = data;
    });
  };
  onMount(() => {
    ewcDispatch.setPageLoaded();
    ewcDispatch.listen({ key: EwcBasicListenerEvents.ORDERING_SUMMARY });
    onLoadOrderingSummary();
    subscribeData();
  });
</script>

<div class=" w-full h-full">
  <div class=" w-full h-full flex justify-center items-center">
    {#if loadOrderingSummaryState.ordering.length == 0}
      <!-- Order line list loading -->
      {#if loadOrderingSummaryState?.loading}
        <div in:fade class=" flex justify-center">
          <SmfbLoading color="gray" />
        </div>
      {:else if loadOrderingSummaryState?.errMsg}
        <div
          in:fade={{ duration: 200 }}
          class=" w-full text-center text-yellow-600 py-2 text-sm pb-3"
        >
          {loadOrderingSummaryState?.errMsg}
        </div>
      {:else if loadOrderingSummaryState?.errMsg}
        <div class=" flex flex-col justify-center items-center text-gray-400">
          <div><EmptyBox width={32} height={32} /></div>
          <div>No order</div>
        </div>
      {/if}
    {:else if loadOrderingSummaryState.ordering}
      <div class="flex-col items-start h-full">
        {#if loadOrderingSummaryState.loaded}
          <ListOrderingDetail
            orderingSummaries={loadOrderingSummaryState.ordering}
            status={orderStatus.INPROCESSING}
          />
        {/if}
      </div>
    {/if}
  </div>
</div>
