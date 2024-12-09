<script>
  import Trash from "$components/icons/Trash.svelte";
  import { clickOutside } from "$lib/utils/click-outside";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  export let showDelete = false;
  // export let tranparent = 0.2;
</script>

<!-- {#if showDelete}
  <div
    class="absolute z-50 px-6 py-2 rounded-lg bg-white border-2 right-5 top-10 flex flex-row space-x-2 hover:bg-gray-100 text-gray-600 hover:text-black cursor-pointer"
    on:click={() => {
      // onDelete = true;
      // showDelete = false;
      dispatch("showDelete");
    }}
  >
    <div><Trash></Trash></div>
    <div>Delete</div>
  </div>
{/if} -->

{#if showDelete}
  <div
    class="absolute px-6 py-2 rounded-lg bg-white border-2 bottom-5 left-24 flex flex-row space-x-2 hover:bg-gray-100 text-gray-600 hover:text-black cursor-pointer"
    use:clickOutside
    on:click_outside={() => {
      showDelete = false;
      console.log("showDelete", showDelete);
    }}
    on:click={() => {
      // onDelete = true;
      // showDelete = false;
      dispatch("onDelete");

    }}
  >
    <div><Trash></Trash></div>
    <div>Delete</div>
  </div>
{/if}
