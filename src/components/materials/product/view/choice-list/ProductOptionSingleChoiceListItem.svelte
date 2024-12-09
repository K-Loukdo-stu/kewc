<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let choice;
  export let active = false;
</script>

<div
  on:click={() => dispatch("select", { choice })}
  class=" flex py-1 items-center cursor-pointer text-gray-600"
>
  {#if active}
    <div>
      <div
        class=" w-5 h-5 rounded-full border-4 border-gray-300 bg-primary"
      />
    </div>
  {:else}
    <div>
      <div class=" w-5 h-5 rounded-full border-2 border-gray-400" />
    </div>
  {/if}
  <div class=" w-3" />
  <div class=" flex-grow">{choice?.name ?? "--"}</div>
  <div>
    {choice?.price !== undefined ? `+${choice.price}${choice.currency}` : "--"}
  </div>
</div>
