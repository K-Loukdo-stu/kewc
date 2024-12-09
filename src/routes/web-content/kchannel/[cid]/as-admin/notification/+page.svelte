<script>
  import Home from "$components/icons/home/Home.svelte";
  import { EwcDispatch } from "$lib/ewc-dispatch/ewc-dispatch";
  import { onMount } from "svelte";

  const ewcDispatch = new EwcDispatch();

  onMount(() => {
    ewcDispatch.setPageLoaded();
    ewcDispatch.listen("on-page-reload");
  });
</script>

<div class=" bg-white p-2 flex items-center">
  <div class=" text-gray-600 text-2xl font-bold">Notification</div>
  <div class="flex-grow" />
  <!-- <div>
    <button
      class="flex items-center border border-gray-300 rounded-lg px-2 py-[1px] text-gray-700"
    >
      <div><Home w={18} h={18} /></div>
      <div class="w-2" />
      <div class=" font-medium">Post</div>
    </button>
  </div> -->
</div>
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
