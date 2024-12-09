<script>
  import SmfbLoading from "$components/materials/spinners/fbLoading/SMFBLoading.svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let loading = false;
  export let price = "1.70";
  export let currency = "$";
  export let quantity = "3";
  export let totalPrice = "5.1";
  export let errMsg;
</script>

<div class=" top-shadow bg-white shadow-lg border-t">
  {#if errMsg}
    <div class=" py-1 text-center text-sm text-orange-500">{errMsg}</div>
  {/if}
  <div class="flex px-4 py-2 items-center max-w-md m-auto w-full">
    <div class=" flex-grow">
      <div class=" text-sm text-gray-500">តម្លៃ</div>
      <div class=" text-xl font-bold text-gray-600 truncate">
        {price}{currency}
        {`(x${quantity})`}
      </div>
    </div>
    <div>
      <button
        on:click={() => dispatch("addToCart")}
        disabled={loading}
        class=" active:bg-tertiary-2 disabled:bg-gray-600 p-1 px-4 rounded-md bg-tertiary-3 text-white relative"
      >
        <div class:invisible={loading} class=" flex">
          <div class=" flex items-center justify-center text-lg font-semibold">
            {totalPrice}{currency}
          </div>
          <div class="w-4" />
          <div class="text-start">
            <div class=" truncate text-sm">Add to cart</div>
            <div class=" truncate text-xs text-gray-200">ដាក់កន្រ្តក</div>
          </div>
        </div>
        {#if loading}
          <div class=" inset-0 absolute flex justify-center items-center">
            <SmfbLoading />
          </div>
        {/if}
      </button>
    </div>
  </div>
</div>

<style>
  .top-shadow {
    box-shadow: 0px -1px 2px 0px rgba(0, 0, 0, 0.15);
  }
</style>
