<script>
  import Trash from "$components/icons/Trash.svelte";
  import SmfbLoading from "$components/materials/spinners/fbLoading/SMFBLoading.svelte";
  import { scrollToEle } from "$lib/utils/scroll";
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  const dispatch = createEventDispatcher();

  export let loading = false;
  export let errMsg = "";
  export let deleted = false;
  let isConfirming = false;
</script>

<div>
  <div class="flex w-full pt-8">
    <div class=" flex-grow" />
    <div class=" flex-grow-0 w-24 h-[1px] bg-gray-300" />
    <div class="flex-grow" />
  </div>
  {#if !isConfirming}
    <div
      in:fade={{ duration: 200 }}
      on:click={() => {
        isConfirming = true;
        scrollToEle({ id: "product-delete-confirmation-card" });
      }}
      class=" py-8 flex justify-center"
    >
      <div
        class=" cursor-pointer flex justify-center items-center px-4 py-1 text-primary bg-gray-100 rounded-full"
      >
        <div><Trash size={32} /></div>
        <div class="w-1" />
        <div>Delete product</div>
      </div>
    </div>
  {:else if deleted}
    <div class=" w-full py-4">
      <div class=" font-semibold text-gray-400 text-center">
        Product is deleted
      </div>
    </div>
  {:else}
    <div
      id="product-delete-confirmation-card"
      in:fade={{ duration: 200 }}
      class=" py-2"
    >
      <div class="p-4 bg-red-50 rounded-lg border shadow-sm">
        <div class=" w-full text-center">
          <span class="text-base text-gray-600 font-semibold"
            >Are you sure to delete this product?</span
          >
        </div>
        {#if !loading && errMsg}
          <div class="w-full py-2">
            <div class=" text-sm text-warning text-center">
              {errMsg || "Sorry, unable to delete this product"}
            </div>
          </div>
        {/if}
        <div class="flex p-5 pb-0">
          <button
            disabled={loading}
            on:click={() => (isConfirming = false)}
            class=" disabled:bg-gray-400 disabled:text-gray-300 p-2 px-6 bg-gray-200/50 hover:bg-white rounded-md text-gray-700 cursor-pointer border"
          >
            No
          </button>
          <div class="flex-grow" />

          {#if !loading}
            <button
              on:click={() => dispatch("delete")}
              class=" p-2 bg-white shadow-sm text-red-500 hover:text-red-600 rounded-md cursor-pointer"
              >Delete now</button
            >
          {:else}
            <div class="px-4 p-2 flex items-center rounded-md">
              <SmfbLoading color="gray" />
            </div>
          {/if}
        </div>
      </div>
    </div>
  {/if}
</div>
