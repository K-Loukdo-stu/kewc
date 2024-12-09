<script>
  import { clickOutside } from "$lib/utils/click-outside";
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  const dispatch = createEventDispatcher();
  export let categories = [];
  export let selected = null;

  const onSelectCate = (cate) => {
    dispatch("select", cate);
  };
</script>

<div
  in:fade={{ duration: 100 }}
  out:fade={{ duration: 100 }}
  class=" absolute inset-0 py-10 px-10 flex justify-center items-center bg-gray-400/20"
>
  <div
    use:clickOutside
    on:click_outside={() => {
      dispatch("close");
    }}
    class=" bg-white shadow-md border rounded-xl h-full max-w-xs w-full overflow-y-auto overflow-hidden flex justify-center items-center"
  >
    <div class=" w-full">
      {#each categories as cate}
        <button
          on:click={() => {
            onSelectCate(cate);
          }}
          class={`w-full p-3 cursor-pointer hover:bg-gray-100 text-center px-1 truncate ${
            selected?.id == cate?.id ? "bg-gray-200" : ""
          }`}
        >
          {cate?.name}
        </button>
      {/each}
    </div>
  </div>
</div>
