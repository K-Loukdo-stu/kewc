<script>
  export let orderLines = [];
  export let qtyLoadings = {};
  import OrderingListItem from "./OrderingListItem.svelte";
</script>

<div>
  {#each orderLines as orderLine}
    <OrderingListItem {orderLine}></OrderingListItem>
  {/each}
</div>
