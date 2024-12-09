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
    class="rounded-tr-lg rounded-bl-lg rounded-tl-lg rounded-br-[2px] shadow-sm bg-[#2E74BA] text-white"
  >
    <Text
      on:rightClick={(evt) => dispatch("rightClick", evt.detail)}
      {message}
      mentionedColor="#FFB2B2"
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
