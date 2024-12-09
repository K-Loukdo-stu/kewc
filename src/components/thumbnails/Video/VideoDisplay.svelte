<script>
  import Modal from "$components/modals/wide/Modal.svelte";
  import PlayV3 from "$components/icons/Play/PlayV3.svelte";
  import { createEventDispatcher, onMount } from "svelte";
  import { extractRoomFromChat } from "$lib/utils/index.js";
  import { user } from "$providers/stores/user.js";
  import { downloadAVideo } from "$providers/actions/index.js";
  import RingDownload from "$components/materials/progresses/RingDownload/RingDownload.svelte";
  import { fade } from "svelte/transition";
  import CloudDownload from "$components/icons/CloudDownload/CloudDownload.svelte";
  import MessageMediaViewer from "$components/modals/wide/MessageMediaViewer/MessageMediaViewer.svelte";
  const dispatch = createEventDispatcher();

  export let message;
  export let type;

  let videoViewerShown = false;
  let hasLocal;
  let imgLoaded;

  const onDownload = (opened) => {
    const room = extractRoomFromChat($user, message);
    downloadAVideo.load(
      {
        msgKind: room.kind,
        roomId: room.roomId,
        msgId: message.genId,
        id: message?.content?.id,
      },
      opened
    );
  };

  const onCancelDownload = () => {
    if (!downloading) return;
    message?.xmlhttp?.abort();
  };

  const checkFileExistance = async () => {
    hasLocal = await window.api?.onFileExisted(message?.content?.name);
  };

  onMount(() => {
    checkFileExistance();
  });

  $: dlProgressPercent = message?.dlprogress;
  $: downloading = message?.downloading;
  $: sending = message?.sending;
  $: {
    if (message?.hasLocal) {
      hasLocal = message?.hasLocal;
    }
  }
</script>

<div
  on:mousemove={() => {
    checkFileExistance();
  }}
  on:contextmenu|preventDefault={(evt) => {
    let pos = { x: evt.clientX, y: evt.clientY };
    dispatch("rightClick", { pos, message, type });
  }}
>
  <div
    on:click={async () => {
      if (downloading) {
        onCancelDownload();
      } else if (hasLocal) {
        window.api
          ?.onReadBase64({
            filename: message?.content?.name,
          })
          .then((videoSrc) => {
            videoSrc = `data:${message?.content?.contentType};base64,${videoSrc}`;
            videoViewerShown = true;
          });
      } else {
        onDownload(false);
      }
    }}
    class="max-w-[300px] rounded-lg overflow-hidden relative text-gray-200 hover:text-white cursor-pointer shadow-sm p-[2px] border-t-[1px] border-gray-200"
  >
    <div class=" rounded-sm cursor-pointer">
      <img
        class:invisible={!imgLoaded}
        class=" rounded-lg"
        width={message?.content?.thumbnail?.width}
        height={message?.content?.thumbnail?.height}
        src={message?.content?.thumbnail?.url}
        alt=""
        on:load={() => (imgLoaded = true)}
      />
    </div>
    <div class=" absolute inset-0">
      <div class=" relative w-full h-full flex justify-center items-center">
        {#if !sending}
          {#if !downloading}
            <div
              in:fade={{ duration: 200 }}
              class=" p-3 bg-gray-600/60 rounded-full"
            >
              <PlayV3 />
            </div>
          {:else}
            <div
              in:fade={{ duration: 200 }}
              class=" p-1 bg-gray-600/60 rounded-lg"
            >
              <RingDownload
                val={dlProgressPercent * 100}
                size={60}
                color={"#ffffff"}
                bgColor={"rgba(0,0,0,0.1)"}
                strokeWidth={5}
                bytes={message?.content?.size}
              />
            </div>
          {/if}
          {#if !hasLocal}
            <div class=" absolute left-2 top-2">
              <div
                class=" flex space-x-1 p-1 bg-gray-500/70 text-white rounded-md"
              >
                <div><CloudDownload w={4} h={4} /></div>
                <div class=" text-xs">
                  {(message?.content?.size * 0.000001).toFixed(2) + " Mb"}
                </div>
              </div>
            </div>
          {/if}
        {/if}
      </div>
    </div>
  </div>

  {#if message}
    <Modal shown={videoViewerShown}>
      <MessageMediaViewer
        mediaMsg={message}
        on:close={() => (videoViewerShown = null)}
      />
    </Modal>
  {/if}
</div>
