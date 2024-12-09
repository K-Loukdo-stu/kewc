<script>
  import { createEventDispatcher } from "svelte";

  export let title = "No Title";
  export let active;
  const dispatch = createEventDispatcher();
</script>

<div on:click={() => dispatch("click")} class=" text-gray-700 flex flex-col p-1  cursor-pointer border-b-4 border-transparent {active && "border-gray-500 text-gray-900"}">
  <div class=" flex flex-col justify-center items-center space-y-[2px]">
    <div class=" w-6 h-6">
      <slot />
    </div>
    <div class=" text-center text-xs">{title}</div>
  </div>
</div>
