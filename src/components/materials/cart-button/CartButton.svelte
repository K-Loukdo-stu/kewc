<script>
  import CartV2 from "$components/icons/Shop/CartV2.svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let badgeNum = 0;
</script>

<div class=" relative">
  <button
    on:click={() => dispatch("click")}
    class=" bg-white shadow-md p-2 rounded-full border-gray-300 border-2 text-gray-700 hover:text-white hover:bg-tertiary-3 transition-colors"
  >
    <CartV2 />
  </button>
  {#if badgeNum > 0}
    <div
      class=" px-1 pointer-events-none absolute inline-flex items-center justify-center min-w-[24px] h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-1 dark:border-gray-300"
    >
      {badgeNum}
    </div>
  {/if}
</div>
