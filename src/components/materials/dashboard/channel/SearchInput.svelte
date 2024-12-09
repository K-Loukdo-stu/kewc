<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let placeholder = "Search products";
  let value;
  let T;
</script>

<div class=" w-full">
  <input
    bind:value
    class="block p-2 px-4 w-full text-gray-900 rounded-full border-2 border-gray-300 dark:bg-white dark:placeholder-gray-400 dark:text-gray-700 peer outline-none focus:outline-none focus:ring-0"
    {placeholder}
    type="search"
    on:input={() => {
      if (T) clearTimeout(T);
      T = setTimeout(() => {
        dispatch("change", { value });
      }, 300);
    }}
  />
</div>
