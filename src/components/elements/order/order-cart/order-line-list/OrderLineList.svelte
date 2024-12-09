<script>
  import { createEventDispatcher, onMount } from "svelte";
  import OrderLineListItem from "./OrderLineListItem.svelte";
  const dispatch = createEventDispatcher();

  export let orderLines = [];
  export let qtyLoadings = {};
  export let acceptingCurrencyCode = "";
  export let usdExchangeRateInRiel = 1;
</script>

<div>
  {#each orderLines as orderLine}
    <OrderLineListItem
      {acceptingCurrencyCode}
      {usdExchangeRateInRiel}
      qtyLoading={qtyLoadings?.[orderLine?.id] == true}
      bind:orderLine
      on:remove={() => {
        dispatch("removeAnOrderLine", { orderLine });
      }}
      on:setQuantity={(evt) => {
        dispatch("setOrderLineQty", { orderLine, qty: evt.detail.qty });
      }}
    />
  {/each}
</div>
