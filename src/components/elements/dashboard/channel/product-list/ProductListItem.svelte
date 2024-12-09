<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let product;
  export let active = false;
</script>

<div
  on:click={() => dispatch("select")}
  class="p-2 border rounded-2xl cursor-pointer"
>
  <div class="flex">
    <div class=" flex-grow">
      <div class="flex">
        <div
          class="bg-gray-200 px-2 py-[2px] rounded-full text-gray-700 select-text"
        >
          {product.id}
        </div>
      </div>
      <div class="p-1 truncate">{product.name} <span class=" text-gray-300 text-sm">|</span> <span class=" text-gray-500 text-sm">{product?.productType?.name || "---"}</span></div>
    </div>
    <div class=" flex items-center">
      {#if active}
        <div class=" w-6 h-6 p-[2px] border-2 border-gray-300 rounded-full">
          <div class="  w-full h-full rounded-full bg-tertiary-3" />
        </div>
      {:else}
        <div class=" w-6 h-6 p-[2px] border-2 border-gray-300 rounded-full" />
      {/if}
    </div>
  </div>
</div>
