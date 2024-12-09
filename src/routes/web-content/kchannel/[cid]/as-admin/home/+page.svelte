<script>
  import { EwcDispatch } from "$lib/ewc-dispatch/ewc-dispatch";
  import { onMount } from "svelte";

  const ewcDispatch = new EwcDispatch();

  onMount(() => {
    ewcDispatch.setPageLoaded();
    ewcDispatch.listen("on-page-reload");
  });
</script>

<div>Home</div>
<button
  on:click={() => {
    window.parent.postMessage("messageqq", "*");
  }}>Back</button
>
<button
  on:click={() => {
    window.location.reload();
  }}>Reload</button
>
