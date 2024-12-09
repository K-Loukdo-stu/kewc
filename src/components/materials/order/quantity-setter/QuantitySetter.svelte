<script>
  import Minus from "$components/icons/minus/Minus.svelte";
  import Plus from "$components/icons/plus/Plus.svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let qty = 0;
  export let hasDisabled = true;

  const onSetQty = (newQty) => {
    dispatch("set", { qty: newQty });
  };
</script>

<div class="flex bg-gray-200 rounded-full text-sm p-[4px]">
  <button
    disabled={qty <= 0 || hasDisabled == true}
    on:click={() => onSetQty(qty - 1)}
    class="flex-grow-0 flex justify-center items-center bg-gray-500 hover:bg-gray-700 disabled:bg-gray-400 text-white rounded-full w-5 h-5"
  >
    <Minus size={14} />
  </button>
  <div class=" flex-grow text-center px-2">{qty}</div>
  <button
    disabled={hasDisabled}
    on:click={() => onSetQty(qty + 1)}
    class="flex-grow-0 flex justify-center items-center bg-gray-500 hover:bg-gray-700 disabled:bg-gray-400 text-white rounded-full w-5 h-5"
  >
    <Plus size={14} />
  </button>
</div>
