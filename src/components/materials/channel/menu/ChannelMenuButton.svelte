<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let title = "Button";
  export let type = "ff";
  export let selectedType = "ff";

  $: active = !!type && !!selectedType && type == selectedType;
</script>

<button
  on:click={() => {
    dispatch("select");
  }}
  class=" py-2 basis-1/4 hover:bg-gray-100 border-b-2 {active
    ? '  border-gray-400 bg-gray-100  '
    : ' border-transparent'}">{title}</button
>
