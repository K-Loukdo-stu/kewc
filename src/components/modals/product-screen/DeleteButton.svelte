<script>
  import Trash from "$components/icons/Trash.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  export let showDelete;
  // export let tranparent = 0.2;
</script>

<!-- {#if shown}
  <div
    class="fixed inset-0 z-50"
    style="background-color: rgba(156, 163, 175, {tranparent});"
  >
    <slot />
  </div>
{/if} -->
{#if showDelete}
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
{/if}
