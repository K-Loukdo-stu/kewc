<script>
  import Check from "$components/icons/check/Check.svelte";
  import { fade } from "svelte/transition";
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
    <div in:fade={{ duration: 200 }}>
      <div
        class=" w-5 h-5 rounded-md border-2 border-gray-300 text-white bg-primary flex justify-center items-center"
      >
        <Check size={14} />
      </div>
    </div>
  {:else}
    <div>
      <div class=" w-5 h-5 rounded-md border-2 border-gray-400" />
    </div>
  {/if}
  <div class=" w-3" />
  <div class=" flex-grow">{choice?.name ?? "--"}</div>
  <div>
    {choice?.price !== undefined ? `+${choice.price}${choice.currency}` : "--"}
  </div>
</div>
