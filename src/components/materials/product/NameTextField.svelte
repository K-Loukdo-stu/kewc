<script>
  import { createEventDispatcher, onMount } from "svelte";
  const dispatch = createEventDispatcher();
  export let placeholder = "";
  export let value = "";
  export let isWarning = false;
  let inputEle;

  onMount(() => {
    inputEle.focus();
  });
</script>

<input
  bind:this={inputEle}
  bind:value
  required
  on:input={(evt) => dispatch("input", evt)}
  {placeholder}
  class=" w-full p-3 bg-gray-100 rounded-xl text-gray-700 text-center {isWarning
    ? ' border-2  border-yellow-400'
    : ' border-2 border-white'}"
/>
