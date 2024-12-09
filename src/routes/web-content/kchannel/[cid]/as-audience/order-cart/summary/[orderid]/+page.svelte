<script>
  import { page } from "$app/stores";
  import OrderLineList from "$components/elements/order/summary/order-line-list/OrderLineList.svelte";
  import ChatFill from "$components/icons/chat/ChatFill.svelte";
  import Check from "$components/icons/check/Check.svelte";
  import SmfbLoading from "$components/materials/spinners/fbLoading/SMFBLoading.svelte";
  import {  Currency, moneyNumber } from "$components/elements/product/variable";
  import { EwcEvents } from "$lib/ewc-dispatch/events";
  import { EwcBasicListenerEvents } from "$lib/ewc-dispatch/events/basic";
  import { EwcDispatch, EwcFrames } from "$lib/ewc-dispatch/ewc-dispatch";
  import { loadOrderSummary } from "$providers/actions/kchannel/order/order";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  const ewcDispatch = new EwcDispatch(EwcFrames.ORDER_CART);

  let orderId = $page["params"]["orderid"];

  const loadOrderSummaryState = {
    loading: false,
    loaded: false,
    order: null,
    errMsg: "",
  };

  const onLoadOrderSummary = async () => {
    try {
      loadOrderSummaryState.loading = true;
      loadOrderSummaryState.loaded = false;
      loadOrderSummaryState.errMsg = "";
      const res = await loadOrderSummary.load({ orderId });
      loadOrderSummaryState.loaded = true;
      loadOrderSummaryState.order = res.data;
    } catch (error) {
      console.warn(error);
      loadOrderSummaryState.errMsg = error.message;
    } finally {
      loadOrderSummaryState.loading = false;
    }
  };

  onMount(() => {
    ewcDispatch.setPageLoaded();
    ewcDispatch.listen({ key: EwcBasicListenerEvents.ON_PAGE_RELOAD });

    onLoadOrderSummary();
  });
</script>

<div class=" flex flex-col w-full h-full bg-white">
  <!-- Header -->
  <div class=" w-full flex justify-center">
    <div class="max-w-md w-full py-4">
      <div class="flex flex-col">
        <div class="flex justify-center">
          <div
            class=" w-20 h-20 flex justify-center items-center rounded-full bg-tertiary-4 border-2 text-white"
          >
            <Check size={56} />
          </div>
        </div>
        <div class=" text-2xl font-semibold text-center p-2 text-gray-600">
          Order summary
        </div>
      </div>
    </div>
  </div>
  <div class="relative flex-grow">
    {#if loadOrderSummaryState.loaded}
      <div
        class="flex justify-center absolute inset-0 w-full h-full overflow-y-auto px-2"
      >
        <div class="max-w-md w-full">
          <!-- Order line list -->
          <OrderLineList
            acceptingCurrencyCode={loadOrderSummaryState.order
              .acceptingCurrency}
            usdExchangeRateInRiel={loadOrderSummaryState.order
              .usdExchangeRateInRiel}
            bind:orderLines={loadOrderSummaryState.order.orderLines}
          />

          <div class="h-2"></div>
          <div class=" border rounded-md bg-gray-50">
            <div class=" p-3">
              <!-- Accepting rate -->
              {#if loadOrderSummaryState.order.hasCurrencyConversion}
                <div class=" flex flex-col flex-grow text-sm">
                  <div class="flex">
                    <div class="text-gray-600">Accepting currency</div>
                    <div class=" flex-grow"></div>
                    <div>
                      <div class="  text-gray-600 px-1 rounded-md">
                        {#if loadOrderSummaryState.order.acceptingCurrency == Currency.KHR.code}
                          {`Riel(៛)`}
                        {:else}
                          {`Dollar($)`}
                        {/if}
                      </div>
                    </div>
                  </div>
                  <div class="flex">
                    <div class="text-gray-600">Exchage rate</div>
                    <div class=" flex-grow"></div>
                    <div>
                      <div class="  text-gray-600 px-1 rounded-md">
                        {`1$ = ${loadOrderSummaryState?.order.usdExchangeRateInRiel}៛`}
                      </div>
                    </div>
                  </div>

                  <!-- Separator -->
                  <div class=" h-[1px] my-2 bg-gray-200"></div>
                </div>
              {/if}

              <!-- Total price -->
              <div class="flex">
                <div class="text-gray-700 font-semibold">Total/តម្លៃសរុប</div>
                <div class=" flex-grow"></div>
                <div class="text-gray-900 text-lg font-semibold">
                  {`${moneyNumber(
                    loadOrderSummaryState.order.total,
                    loadOrderSummaryState.order.acceptingCurrency,
                    { hasSymbol: true },
                  )}`}
                </div>
              </div>
            </div>
          </div>

          <!-- Order line list loading -->
          {#if loadOrderSummaryState.loading}
            <div in:fade class=" flex justify-center">
              <SmfbLoading color="gray" />
            </div>
          {:else if loadOrderSummaryState?.errMsg}
            <div
              in:fade={{ duration: 200 }}
              class=" w-full text-center text-yellow-600 py-2 text-sm pb-3"
            >
              {loadOrderSummaryState?.errMsg}
            </div>
          {/if}
        </div>
      </div>
    {/if}
  </div>
  {#if loadOrderSummaryState.loaded}
    <div class=" flex justify-center flex-grow-0 bg-white">
      <div class="max-w-md w-full">
        <div class="p-2 flex justify-center">
          <button
            on:click={() => {
              // Pub to ewc
              ewcDispatch.publish({
                key: EwcEvents.pub.orderCart.ON_GO_TO_CHAT,
                data: { order: loadOrderSummaryState.order },
              });
            }}
            class="  border flex items-center justify-center h-10 bg-gray-100 rounded-full p-2 px-4 text-white active:bg-tertiary-2"
          >
            <div class="flex text-tertiary-3">
              <div>
                <ChatFill />
              </div>
              <div class="w-2"></div>
              <div>Go to chat</div>
            </div>
          </button>
        </div>

        <div class="p-2">
          <button
            on:click={() => {
              // Pub to ewc
              ewcDispatch.publish({
                key: EwcEvents.pub.orderCart.ON_ORDER_SUMMARY_REVIEWED,
                data: { order: loadOrderSummaryState.order },
              });
            }}
            class="   flex items-center justify-center h-10 bg-tertiary-3 w-full rounded-md p-2 text-white active:bg-tertiary-2"
          >
            <div>OK</div>
          </button>
        </div>
      </div>
    </div>
  {/if}
</div>
