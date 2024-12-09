<script>
  import { createEventDispatcher, onMount } from "svelte";
  import OrderingDetail from "./OrderingDetail.svelte";
  const dispatch = createEventDispatcher();

  export let orderingSummaries = [];
  export let status = "";
</script>

<div class="px-1">
  {#each orderingSummaries as orderingSummary, index}
    <OrderingDetail {orderingSummary} {status} indexOrder={index + 1} />
  {/each}
</div>
