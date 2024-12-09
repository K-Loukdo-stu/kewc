<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import OrderLineList from "$components/elements/order/order-cart/order-line-list/OrderLineList.svelte";
  import RemoveOrderLineModalContent from "$components/elements/order/order-cart/remove-order-line/RemoveOrderLineModalContent.svelte";
  import { Currency, moneyNumber } from "$components/elements/product/variable";
  import Info from "$components/icons/info/Info.svelte";
  import SmfbLoading from "$components/materials/spinners/fbLoading/SMFBLoading.svelte";
  import Modal from "$components/modals/in-screen/Modal.svelte";
  import { EwcEvents } from "$lib/ewc-dispatch/events";
  import { EwcBasicListenerEvents } from "$lib/ewc-dispatch/events/basic";
  import { EwcDispatch, EwcFrames } from "$lib/ewc-dispatch/ewc-dispatch";
  import { isEwcMode } from "$lib/statics";
  import {
    checkoutACart,
    loadOrderCart,
  } from "$providers/actions/kchannel/order/order";
  import {
    getUnavailableOrderLines,
    removeOrderLine,
    updateOrderLineQuantity,
  } from "$providers/actions/kchannel/order/order-line";
  import { orderCartStore } from "$providers/stores/kchannel/order/order-cart";
  import { onDestroy, onMount } from "svelte";
  import { fade } from "svelte/transition";

  const ewcDispatch = new EwcDispatch(EwcFrames.ORDER_CART);

  let channelId = $page["params"]["cid"];

  let totalPrice = 0;
  let hasExchangeRateAlert = false;
  let removingOrderline = null;
  let isCartEmpty = true;

  const loadCartState = {
    loading: false,
    loaded: false,
    orderCart: null,
    orderLines: [],
    errMsg: "",
  };

  const updateOrderLineQtyState = {
    loadings: {},
  };

  const removeOrderLineState = {
    loading: false,
    errMsg: "",
  };

  const loadUnavailableOrderLinesState = {
    loading: false,
    loaded: false,
    orderLines: [],
    errMsg: "",
  };

  const checkoutACartState = {
    loading: false,
    loaded: false,
    errMsg: "",
  };

  const orderCartStoreUnSub = orderCartStore.subscribe((orderCart) => {
    loadCartState.orderCart = orderCart;
    loadCartState.orderLines = orderCart?.["orderLines"] || [];
    isCartEmpty = loadCartState.orderLines?.length <= 0;

    const acceptingCurrencyCode = orderCart.acceptingCurrency;
    const usdExchangeRateInRiel = parseFloat(orderCart.usdExchangeRateInRiel);

    totalPrice = 0;
    if (loadCartState?.orderLines?.length) {
      for (let i = 0; i < loadCartState.orderLines.length; i++) {
        const orderLine = loadCartState.orderLines[i];
        orderLine["currency"] = orderLine["clonedBasePrice"]["currency"];
        if (orderLine["currency"] !== acceptingCurrencyCode) {
          if (orderLine["currency"] == Currency.KHR.code) {
            // KHR -> USD
            totalPrice +=
              orderLine["qty"] * (orderLine["price"] / usdExchangeRateInRiel);
          } else {
            // USD -> KHR
            totalPrice +=
              orderLine["qty"] * (orderLine["price"] * usdExchangeRateInRiel);
          }
        } else {
          totalPrice += orderLine["qty"] * orderLine["price"];
        }

        // Checking if there's any product which is not matched to accepting currency
        if (
          hasExchangeRateAlert == false &&
          orderLine["currency"] !== acceptingCurrencyCode
        ) {
          hasExchangeRateAlert = true;
        }
      }
    }
  });

  const onLoadCart = async () => {
    try {
      loadCartState.loading = true;
      loadCartState.loaded = false;
      loadOrderCart.errMsg = "";
      await loadOrderCart.load({ channel: channelId });
      loadCartState.loaded = true;

      // Check if there's any unavailble order line
      onLoadUnavailbleOrderLines();
    } catch (error) {
      console.warn(error);
      loadCartState.errMsg = error.message;
    } finally {
      loadCartState.loading = false;
    }
  };

  const onUpdateOrderLineQty = async (orderLineId, qty) => {
    try {
      updateOrderLineQtyState.loadings[orderLineId] = true;
      await updateOrderLineQuantity.load({ orderLineId, quantity: qty });
    } catch (error) {
      console.warn(error);
    } finally {
      updateOrderLineQtyState.loadings[orderLineId] = false;
    }
  };

  const onRemoveOrderLine = async (orderLineId) => {
    try {
      removeOrderLineState.loading = true;
      removeOrderLineState.errMsg = "";
      const res = await removeOrderLine.load({ orderLineId });
      removingOrderline = null;

      // Ewc: order line removed
      ewcDispatch.publish({
        key: EwcEvents.orderCart.ON_ORDER_LINE_REMOVED,
        data: { orderLine: res.data },
      });
    } catch (error) {
      console.warn(error);
      removeOrderLineState.errMsg = error.message;
    } finally {
      removeOrderLineState.loading = false;
    }
  };

  const onLoadUnavailbleOrderLines = async () => {
    try {
      loadUnavailableOrderLinesState.loading = true;
      loadUnavailableOrderLinesState.loaded = false;
      loadUnavailableOrderLinesState.errMsg = "";
      const res = await getUnavailableOrderLines.load({
        orderId: loadCartState.orderCart["id"],
      });
      loadUnavailableOrderLinesState.orderLines = res?.["data"] || [];
      loadUnavailableOrderLinesState.loaded = true;
    } catch (error) {
      loadUnavailableOrderLinesState.errMsg = error.message;
    } finally {
      loadUnavailableOrderLinesState.loading = false;
    }
  };

  const onCheckOutACart = async () => {
    if (isCartEmpty) return;

    // check orderline availabilities
    onLoadUnavailbleOrderLines();

    try {
      checkoutACartState.loading = true;
      checkoutACartState.loaded = false;
      checkoutACartState.errMsg = "";

      const orderId = loadCartState.orderCart["id"];
      const acceptingCurrency = loadCartState.orderCart.acceptingCurrency;
      const usdExchangeRateInRiel =
        loadCartState.orderCart.usdExchangeRateInRiel;
      const res = await checkoutACart.load({
        orderId,
        total: totalPrice,
        subTotal: totalPrice,
        discount: 0,
        delivery: 0,
        acceptingCurrency,
        usdExchangeRateInRiel,
        hasCurrencyConversion: hasExchangeRateAlert,
      });
      checkoutACartState.loaded = true;

      // Pub to ewc
      ewcDispatch.publish({
        key: EwcEvents.pub.orderCart.ON_CART_CHECKOUT_DONE,
        data: { order: res.data },
      });

      // Reload the page after a checkout is sucessfully made
      if (!isEwcMode()) {
        goto(
          `/web-content/kchannel/${channelId}/as-audience/order-cart/summary/${orderId}`,
        );
      }
    } catch (error) {
      checkoutACartState.errMsg = error.message;
    } finally {
      checkoutACartState.loading = false;
    }
  };

  onMount(() => {
    ewcDispatch.setPageLoaded();
    ewcDispatch.listen({ key: EwcBasicListenerEvents.ON_PAGE_RELOAD });

    onLoadCart();
  });

  onDestroy(() => {
    orderCartStoreUnSub();
  });
</script>

<div class=" flex flex-col w-full h-full bg-background">
  <!-- Header -->
  <div class=" w-full flex justify-center">
    <div class="max-w-md w-full">
      <div class=" text-lg font-semibold text-center p-2 text-gray-700">
        Checkout item(s)
      </div>
    </div>
  </div>
  <div class="relative flex-grow">
    <div
      class="flex justify-center absolute inset-0 w-full h-full overflow-y-auto"
    >
      <div class="max-w-md w-full">
        <!-- Order line list -->
        <OrderLineList
          acceptingCurrencyCode={loadCartState.orderCart.acceptingCurrency}
          usdExchangeRateInRiel={loadCartState.orderCart.usdExchangeRateInRiel}
          bind:qtyLoadings={updateOrderLineQtyState.loadings}
          bind:orderLines={loadCartState.orderLines}
          on:removeAnOrderLine={(evt) => {
            const orderLine = evt.detail.orderLine;
            removingOrderline = orderLine;
          }}
          on:setOrderLineQty={(evt) => {
            const orderLine = evt.detail.orderLine;
            const qty = evt.detail.qty;
            if (qty > 0) {
              onUpdateOrderLineQty(orderLine.id, qty);
            } else if (qty <= 0) {
              removingOrderline = orderLine;
            }
          }}
        />
        <!-- Order line list loading -->
        {#if loadCartState.loading}
          <div in:fade class=" flex justify-center">
            <SmfbLoading color="gray" />
          </div>
        {:else if loadCartState?.errMsg}
          <div
            in:fade={{ duration: 200 }}
            class=" w-full text-center text-yellow-600 py-2 text-sm pb-3"
          >
            {loadCartState?.errMsg}
          </div>
        {:else if isCartEmpty}
          <div
            class=" h-full py-4 font-bold text-gray-400 flex items-center justify-center"
          >
            Empty cart
          </div>
        {/if}
      </div>
    </div>
  </div>
  {#if loadCartState.loaded}
    <div class=" flex justify-center flex-grow-0 bg-white border-t">
      <div class="max-w-md w-full">
        <!-- Total price -->
        <div class="flex p-3 pb-0">
          <div class="text-gray-700">Total</div>
          <div class=" flex-grow"></div>
          <div class="text-gray-900 text-lg font-semibold">
            {#if loadCartState.orderCart.acceptingCurrency == Currency.KHR.code}
              {`${moneyNumber(totalPrice, 0)}៛`}
            {:else}
              {`${moneyNumber(totalPrice, 2)}$`}
            {/if}
          </div>
        </div>

        <!-- Accepting rate -->
        {#if hasExchangeRateAlert}
          <div class="p-3 pb-0 pt-2">
            <div
              class=" text-sm border w-full flex items-center p-1 rounded-md bg-green-50"
            >
              <div class="pr-2 text-gray-600"><Info size={18} /></div>
              <div class=" flex flex-col flex-grow">
                <div class="flex">
                  <div class="text-gray-600">Accepting currency</div>
                  <div class=" flex-grow"></div>
                  <div>
                    <div class="  text-gray-600 px-1 font-bold rounded-md">
                      {#if loadCartState.orderCart.acceptingCurrency == Currency.KHR.code}
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
                    <div class="  text-gray-600 px-1 font-bold rounded-md">
                      {`1$ = ${loadCartState?.orderCart.usdExchangeRateInRiel}៛`}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        {/if}

        <!-- Error/warning alerts -->
        {#if checkoutACartState.errMsg}
          <div
            in:fade={{ duration: 100 }}
            class=" w-full text-center text-sm pt-3 py-2 text-red-600"
          >
            <div>
              <p>
                {checkoutACartState.errMsg}
              </p>
            </div>
          </div>
        {/if}

        <div class="p-2">
          <button
            disabled={isCartEmpty || checkoutACartState.loading}
            on:click={() => onCheckOutACart()}
            class="  disabled:bg-gray-400 flex items-center justify-center h-10 bg-tertiary-3 w-full rounded-md p-2 text-white active:bg-tertiary-2"
          >
            {#if checkoutACartState.loading}
              <SmfbLoading color="gray" />
            {:else}
              <div>Order now</div>
            {/if}
          </button>
        </div>
      </div>
    </div>
  {/if}
</div>
<!-- Removing order line confirmation modal -->
<Modal shown={!!removingOrderline} isBlur={false}>
  {#if removingOrderline}
    <RemoveOrderLineModalContent
      on:close={() => (removingOrderline = null)}
      on:remove={(evt) => {
        const orderLine = evt.detail.orderLine;
        onRemoveOrderLine(orderLine["id"]);
      }}
      bind:orderLine={removingOrderline}
      bind:errMsg={removeOrderLineState.errMsg}
      bind:loading={removeOrderLineState.loading}
      acceptingCurrencyCode={loadCartState.orderCart.acceptingCurrency}
      usdExchangeRateInRiel={loadCartState.orderCart.usdExchangeRateInRiel}
    />
  {/if}
</Modal>
