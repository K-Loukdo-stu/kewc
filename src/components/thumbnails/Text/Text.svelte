<script>
  import Lock from "$components/icons/Lock/Lock.svelte";
  import { highlightMention } from "$lib/utils/mention.js";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let message;
  export let mentionedColor = "#FF4F4F";
</script>

{#if message["content"]["encrypted"] == true}
  <div class="p-1"><Lock w={5} h={5} /></div>
{:else}
  <div
    on:contextmenu|preventDefault={(evt) => {
      let pos = { x: evt.clientX, y: evt.clientY };
      dispatch("rightClick", { pos });
    }}
  >
    <div class=" select-text break-all p-1 px-4 whitespace-pre-wrap">
      {@html highlightMention(
        message?.content?.text,
        message?.content?.mentions,
        (userId) => {
          console.log("selected mention: ", userId);
        },
        mentionedColor
      ) || ""}
    </div>
  </div>
{/if}
