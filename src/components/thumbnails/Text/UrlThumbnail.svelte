<script>
  import { URLify } from "$lib/utils/url.js";
  import { onMount } from "svelte";

  export let message;

  let imgLoaded = true;
  let textContentHtml = "";

  $: thumbnail = message?.content?.thumbnail;

  const onOpenUrl = (url) => {
    window.api?.onOpenUrl(url);
  };

  onMount(() => {
    textContentHtml = URLify(message?.content?.text, (url) => {
      onOpenUrl(url);
    });
  });
</script>

<div
  on:click={onOpenUrl(thumbnail?.uri)}
  class="cursor-pointer shadow-sm  bg-white"
>
  <div class="rounded-sm w-full ">
    <div hidden={!thumbnail?.ogImage || !imgLoaded}>
      <img
        class="object-cover rounded-t-sm w-full h-48"
        src={thumbnail?.ogImage}
        alt=""
        on:error={() => (imgLoaded = false)}
      />
    </div>
    <div class=" p-1 pb-2 px-2 text-gray-800">
      <div class="truncate font-roboto-md ">
        {thumbnail?.title}
      </div>
      <div hidden={!thumbnail?.desc} class="truncate text-sm ">
        {thumbnail?.desc}
      </div>
      <div class=" text-xs text-gray-500">
        {thumbnail?.origin || ""}
      </div>
    </div>
  </div>
</div>
