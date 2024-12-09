<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let price;
  export let active = false;
</script>

<div
  on:click={() => dispatch("select", { price })}
  class=" flex text-gray-600 py-3 px-4 rounded-md cursor-pointer border-2 {active
    ? 'shadow-sm  border-gray-200 text-tertiary-3'
    : ' border-transparent'}"
>
  <div class=" flex-grow {active ? 'font-semibold' : 'text-gray-700'}">
    {price?.name || "--"}
  </div>
  <div class=" flex-grow-0">
    {#if price.hasDiscount}
      <div class=" flex">
        <div class="pt-[2px]">
          <span class="  text-sm line-through text-gray-500"
            >{price?.price != undefined
              ? `${price.price}${price.currency}`
              : "--"}</span
          >
        </div>
        <div class="w-2" />
        <div>
          <span class=" font-semibold text-lg"
            >{price?.discountPrice != undefined
              ? `${price.discountPrice}${price.currency}`
              : "--"}</span
          >
        </div>
      </div>
    {:else}
      <span class=" font-semibold text-lg"
        >{price?.price != undefined
          ? `${price.price}${price.currency}`
          : "--"}</span
      >
    {/if}
  </div>
</div>
