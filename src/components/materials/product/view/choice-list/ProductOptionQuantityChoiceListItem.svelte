<script>
  import Minus from "$components/icons/minus/Minus.svelte";
  import Plus from "$components/icons/plus/Plus.svelte";
  import { createEventDispatcher, onMount } from "svelte";
  const dispatch = createEventDispatcher();

  export let choice;
  export let active = false;

  $: onSetQuanity(quantiy);

  let quantiy = 0;

  const onSetQuanity = (qty) => {
    quantiy = qty;
    dispatch("setQty", { quantiy });
  };

  onMount(() => {
    onSetQuanity(quantiy);
  });
</script>

<div class=" flex py-1 items-center text-gray-600">
  <div class=" flex-grow">{choice?.name ?? "--"}</div>
  <div>
    {choice?.price !== undefined ? `+${choice.price}${choice.currency}` : "--"}
  </div>
  <div class=" w-6" />
  <div class=" flex bg-gray-100 px-1 py-[2px] rounded-full">
    <button
      disabled={quantiy <= 0}
      on:click={() => quantiy--}
      class=" active:bg-gray-200 disabled:text-gray-300 w-6 h-6 flex justify-center items-center rounded-full bg-white"
    >
      <Minus size={16} />
    </button>
    <div class="w-3" />
    <div class=" font-semibold w-3 text-center">{quantiy}</div>
    <div class="w-3" />
    <button
      disabled={quantiy >= 30}
      on:click={() => quantiy++}
      class="active:bg-gray-200 cursor-pointer w-6 h-6 flex justify-center items-center rounded-full bg-white"
    >
      <Plus size={16} />
    </button>
  </div>
</div>
