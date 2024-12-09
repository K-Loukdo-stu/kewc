<script>
  import AddCircle from "$components/icons/add_tmp/AddCircle.svelte";
  import { createEventDispatcher } from "svelte";
  import SmfbLoading from "../spinners/fbLoading/SMFBLoading.svelte";
  const dispatch = createEventDispatcher();

  export let name = "Add item";
  export let loading = false;
</script>

<button
  disabled={loading}
  on:click={() => dispatch("add")}
  class=" flex w-full p-3 text-tertiary-3 bg-gray-100 rounded-xl hover:bg-gray-200 cursor-pointer"
>
  {#if !loading}
    <div>
      <AddCircle />
    </div>
    <div class="w-2" />
    <div>
      {name}
    </div>
  {:else}
    <div class=" flex justify-center w-full"><SmfbLoading color="gray" /></div>
  {/if}
</button>
