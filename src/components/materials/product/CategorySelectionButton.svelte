<script>
  import ChevronDown from "$components/icons/chevron_tmp/ChevronDown.svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let name = "";
  export let required = true;
  let inputEle;
</script>

<button
  type="button"
  on:click={() => {
    dispatch("click");
  }}
  class=" relative flex w-full"
>
  <div class="flex-grow">
    {#if name}
      <div class=" p-3 bg-gray-100 rounded-xl text-gray-700 cursor-pointer">
        {name}
      </div>
    {:else}
      <div class=" relative rounded-xl text-gray-700">
        <input
          bind:this={inputEle}
          type="text"
          placeholder="Choose type"
          required
          class=" cursor-pointer w-full p-3 bg-gray-100 rounded-xl text-center"
          on:keydown={() => {
            inputEle?.blur();
          }}
        />
        <div class=" absolute inset-0" />
      </div>
    {/if}
  </div>
  <div class="absolute right-0 bottom-0 top-0 flex items-center px-2">
    <ChevronDown />
  </div>
</button>
