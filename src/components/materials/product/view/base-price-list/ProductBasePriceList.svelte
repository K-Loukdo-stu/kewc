<script>
  import { createEventDispatcher, onMount } from "svelte";
  import ProductBasePriceListItem from "./ProductBasePriceListItem.svelte";
  const dispatch = createEventDispatcher();
  export let prices = [];
  export let selectedPrice = prices[0];

  const onSelect = (price) => {
    selectedPrice = price;
    dispatch("select", { price });
  };

  onMount(() => {
    onSelect(prices[0]);
  });
</script>

<div class=" w-full py-2">
  {#each prices as p}
    <ProductBasePriceListItem
      on:select={(evt) => onSelect(p)}
      active={selectedPrice?.id == p.id}
      price={p}
    />
  {/each}
</div>
