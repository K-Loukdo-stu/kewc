<script>
  import { createEventDispatcher, onMount } from "svelte";
  const dispatch = createEventDispatcher();
  onMount(() => {
    dispatch("setup");
  });
</script>

<div>Hello post page</div>
