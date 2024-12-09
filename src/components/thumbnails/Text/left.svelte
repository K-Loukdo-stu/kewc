<script>
  import UrlThumbnail from "./UrlThumbnail.svelte";
  import Text from "./Text.svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let message;
  export let hasThumbnail;
</script>

<div class=" max-w-sm flex flex-col">
  <div
    class="rounded-lg shadow-sm shadow- shadow-[#d0d8e7] bg-white text-gray-800"
  >
    <Text
      on:rightClick={(evt) => dispatch("rightClick", evt.detail)}
      {message}
    />
  </div>
  <div class="rounded-lg overflow-hidden">
    {#if hasThumbnail}
      <div class="h-[2px]" />
      <UrlThumbnail
        on:rightClick={(evt) => dispatch("rightClick", evt.detail)}
        {message}
      />
    {/if}
  </div>
</div>
