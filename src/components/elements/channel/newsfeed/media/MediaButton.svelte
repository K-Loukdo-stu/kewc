<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let title;
  export let active;
  export let disable = false;
</script>

<button
  disabled={disable}
  on:click={() => dispatch("click")}
  class=" flex-grow flex flex-col items-center py-4 border-0 rounded-none {active
    ? 'text-tertiary-3'
    : ''}"
>
  <div class={disable ? " text-gray-400" : ""}><slot /></div>
  <div class=" text-sm text-center pt-2 {disable ? ' text-gray-400' : ''}">
    {title}
  </div>
</button>
