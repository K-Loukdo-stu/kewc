<script>
  import Modal from "$components/modals/wide/Modal.svelte";
  import PhotoViewer from "$components/modals/wide/PhotoViewer/PhotoViewer.svelte";
  import RingProgress from "$components/materials/progresses/Ring/Ring.svelte";
  import { createEventDispatcher } from "svelte";
  import PhotoItem from "./PhotoItem.svelte";
  import MessageMediaViewer from "$components/modals/wide/MessageMediaViewer/MessageMediaViewer.svelte";
  const dispatch = createEventDispatcher();

  export let message;
  export let type;

  let photoViewerShown = false;
  let selectedPhoto;
  let photoHovered;
  let mediaMessage;

  $: dlProgressPercent = message?.dlprogress;
  $: downloading = message?.downloading;
  $: photoNum = message?.content?.photos?.length || 0;
  $: photos = message?.content?.photos || [];

  const onView = async (photo) => {
    selectedPhoto = photo;
    photoViewerShown = true;
    mediaMessage = {
      ...message,
      content: photo,
    };
  };

  const onRightClick = (evt, selectedItem) => {
    let pos = { x: evt.clientX, y: evt.clientY };
    dispatch("rightClick", { pos, message, type, selected: selectedItem });
  };
</script>

<div class="relative">
  <div
    on:contextmenu|preventDefault={(evt) =>
      !photoHovered && onRightClick(evt, null)}
    class=" bg-blur w-[300px] mx-auto bg-white/10 rounded-lg shadow-sm p-[2px]"
  >
    {#if photoNum}
      <div
        class={`grid gap-[2px] ${
          photoNum <= 2 ? "grid-cols-2" : "grid-cols-3"
        }   overflow-hidden rounded-lg`}
      >
        {#each photos as item}
          <div
            on:contextmenu|preventDefault={(evt) => onRightClick(evt, item)}
            on:click={() => onView(item)}
            on:mouseenter={() => (photoHovered = true)}
            on:mouseleave={() => (photoHovered = false)}
            class="relative rounded-md cursor-pointer w-full h-0 pb-[100%]"
          >
            <div
              class=" absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center"
            >
              <PhotoItem {item} />
            </div>
          </div>
        {/each}
      </div>
    {/if}
    {#if downloading}
      <div class=" absolute right-2 bottom-2 p-1 rounded-full">
        <RingProgress size={20} val={dlProgressPercent * 100} />
      </div>
    {/if}
  </div>
  <Modal shown={photoViewerShown}>
    {#if mediaMessage}
      <MessageMediaViewer
        mediaMsg={mediaMessage}
        on:close={() => (photoViewerShown = false)}
      />
    {/if}
  </Modal>
</div>

<style>
  .bg-blur {
    backdrop-filter: blur(2px);
  }
</style>
