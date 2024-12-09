<script>
  import Minus from "$components/icons/minus/Minus.svelte";
  import Plus from "$components/icons/plus/Plus.svelte";
  import { createEventDispatcher, onMount } from "svelte";
  const dispatch = createEventDispatcher();

  let quantity = 1;
  $: onSetQuantity(quantity);

  const onSetQuantity = (quantity) => {
    dispatch("setQuantity", { quantity });
  };

  onMount(() => {
    onSetQuantity(quantity);
  });
</script>

<div class="w-full">
  <div class="h-2" />
  <div class=" w-20 h-[2px] bg-gray-300 m-auto" />
  <div class="h-3" />
  <div class=" px-2 w-full bg-white max-w-md m-auto">
    <div class=" flex bg-white p-2">
      <div class=" flex flex-col text-gray-700">
        <div class=" font-semibold">Total</div>
        <div class=" text-sm">ចំនួន</div>
      </div>
      <div class=" flex-grow" />
      <div class=" flex items-center">
        <div class=" flex border px-1 py-[2px]">
          <button
            disabled={quantity <= 1}
            on:click={() => quantity--}
            class=" active:bg-gray-200 disabled:text-gray-300 w-8 h-8 flex justify-center items-center rounded-full bg-white"
          >
            <Minus size={16} />
          </button>
          <div class="w-3" />
          <div
            class=" font-bold text-lg text-tertiary-3 min-w-[50px] flex items-center justify-center"
          >
            {quantity}
          </div>
          <div class="w-3" />
          <button
            on:click={() => quantity++}
            class="active:bg-gray-200 cursor-pointer w-8 h-8 flex justify-center items-center rounded-full bg-white"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
