<script>
  import OrderLineListItem from "./OrderLineListItem.svelte";

  export let orderLines = [];
  export let acceptingCurrencyCode = "";
  export let usdExchangeRateInRiel = 1;
</script>

<div>
  {#each orderLines as orderLine}
    <OrderLineListItem
      {acceptingCurrencyCode}
      {usdExchangeRateInRiel}
      bind:orderLine
    />
  {/each}
</div>
