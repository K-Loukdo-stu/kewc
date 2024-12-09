<script>
  import { createEventDispatcher } from "svelte";
  import SmfbLoading from "../spinners/fbLoading/SMFBLoading.svelte";
  export let isDisabled = true;
  export let loading = false;
  const dispatch = createEventDispatcher();
</script>

<button
  disabled={isDisabled || loading}
  on:click={() => dispatch("click")}
  class=" text-tertiary-3 hover:text-tertiary-2 px-1 py-1 cursor-pointer disabled:text-gray-300"
>
  {#if !loading}
    <div class="flex">
      <div>+</div>
      <div class="w-2" />
      <div>New choice</div>
    </div>
  {:else}
    <div class=" flex justify-center"><SmfbLoading color="gray" /></div>
  {/if}
</button>
