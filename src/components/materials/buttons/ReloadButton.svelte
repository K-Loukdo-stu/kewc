<script>
  import RotateRight from "$components/icons/rotate/RotateRight.svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
</script>

<div
  on:click={() => dispatch("click")}
  class=" flex items-center justify-center text-gray-600 px-2 py-1 bg-white rounded-full cursor-pointer"
>
  <div><RotateRight size={16} /></div>
  <div class=" w-2" />
  <div>Refresh</div>
</div>
