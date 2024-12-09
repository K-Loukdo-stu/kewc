<script>
  import RingProgress from "$components/materials/progresses/Ring/Ring.svelte";
  import MessageMediaViewer from "$components/modals/wide/MessageMediaViewer/MessageMediaViewer.svelte";
  import Modal from "$components/modals/wide/Modal.svelte";
  import PhotoViewer from "$components/modals/wide/PhotoViewer/PhotoViewer.svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let message;
  export let type;
  let imageLoaded;
  let photoViewerShown = false;

  $: dlProgressPercent = message?.dlprogress > 0.01 ? message.dlprogress : 0.01;
  $: downloading = message?.downloading;
  $: sending = message?.sending;
</script>

<div
  on:contextmenu|preventDefault={(evt) => {
    let pos = { x: evt.clientX, y: evt.clientY };
    dispatch("rightClick", { pos, message, type });
  }}
  class="relative"
>
  <div
    on:click={() => (photoViewerShown = true)}
    class="max-w-[300px] bg-gray-100/30 rounded-lg overflow-hidden cursor-pointer shadow-sm p-[2px] border-t-[1px] border-gray-200"
  >
    <img
      class:invisible={!imageLoaded}
      class="rounded-lg"
      width={message?.content?.thumbnail?.width}
      height={message?.content?.thumbnail?.height}
      src={message?.content?.thumbnail?.url}
      alt=""
      on:load={() => (imageLoaded = true)}
    />
  </div>

  {#if downloading}
    <div class=" absolute right-2 bottom-2 p-1 rounded-full">
      <RingProgress size={20} val={dlProgressPercent * 100} />
    </div>
  {/if}

  {#if message}
    <Modal shown={photoViewerShown}>
      <MessageMediaViewer
        mediaMsg={message}
        on:close={() => (photoViewerShown = false)}
      />
    </Modal>
  {/if}
</div>
