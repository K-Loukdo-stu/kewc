<script>
  import Download from "$components/icons/Download/Download.svelte";
  import Ring from "$components/materials/progresses/Ring/Ring.svelte";
  import { fade } from "svelte/transition";
  import { downloadAFile } from "$providers/actions/storage/message.js";
  import { extractRoomFromChat } from "$lib/utils/index.js";
  import { user } from "$providers/stores/user.js";
  import Document from "$components/icons/Document/Document.svelte";
  import { createEventDispatcher, onMount } from "svelte";
  import CloudDownloadV2 from "$components/icons/CloudDownload/CloudDownloadV2.svelte";
  import { textWithMiddleDots } from "$lib/utils/text.js";
  const dispatch = createEventDispatcher();

  export let shown;
  export let message;
  export let type;

  let hasLocal;

  const onDownload = (opened) => {
    message.dlprogress = 0.01;
    const room = extractRoomFromChat($user, message);
    downloadAFile.load(
      {
        msgKind: room.kind,
        roomId: room?.roomId,
        msgId: message?.genId,
        id: message?.content?.id,
      },
      opened
    );
  };

  $: dlProgressPercent = message?.dlprogress > 0.01 ? message.dlprogress : 0.01;
  $: downloading = message?.downloading;
  $: sending = message?.sending;
  $: filename = message?.content?.id + message?.content?.name;
  $: resent = message?.resent;
  $: {
    if (message?.hasLocal) {
      hasLocal = message.hasLocal;
    }
  }

  const checkFileExistance = async () => {
    hasLocal = await window.api?.onFileExisted(filename);
  };

  const onCancelDownload = () => {
    if (!downloading) return;
    message?.xmlhttp?.abort();
  };

  const onClick = async () => {
    if (sending || resent) return;

    if (downloading) {
      onCancelDownload();
      return;
    }

    await checkFileExistance();

    if (hasLocal) {
      window.api.onOpenFile(filename);
    } else {
      onDownload(false);
    }
  };

  onMount(() => {
    checkFileExistance();
  });
</script>

{#if shown}
  <div>
    <button
      on:click={onClick}
      on:contextmenu|preventDefault={(evt) => {
        let pos = { x: evt.clientX, y: evt.clientY };
        dispatch("rightClick", { pos, message, type });
      }}
      on:mouseenter={() => {
        checkFileExistance();
      }}
      class={`h-full bg-gray-50 p-1 rounded-md  flex items-center justify-center max-w-[350px]`}
    >
      <div class="w-full flex flex-row">
        <div class=" flex-none justify-center">
          <div class=" relative rounded-full bg-gray-100 h-[50px] w-[50px]">
            {#if downloading}
              <div
                class="icon-wrapper rounded-full w-full h-full flex items-center justify-center"
              >
                <div
                  in:fade
                  class=" absolute left-0 top-0 bottom-0 right-0 flex items-center justify-center"
                >
                  <Ring
                    val={dlProgressPercent * 100}
                    size={45}
                    color={"#f66162"}
                    bgColor={"#ffffff"}
                    strokeWidth={10}
                  />
                </div>
                <div class=" absolute flex justify-center items-center">
                  <div class="text-gray-600"><CloudDownloadV2 size={20} /></div>
                </div>
              </div>
            {:else}
              <div
                class="icon-wrapper rounded-full w-full h-full flex items-center justify-center"
              >
                {#if sending || resent}
                  <div class="text-gray-400"><Document /></div>
                {:else if hasLocal}
                  <div class="text-gray-600"><Document /></div>
                {:else}
                  <div class="text-gray-600"><Download /></div>
                {/if}
              </div>
            {/if}
          </div>
        </div>
        <div class="w-2" />
        <div
          class="flex flex-col flex-grow w-full items-center justify-center overflow-hidden rounded-sm px-1"
        >
          <div
            class="w-full relative min-w-[80px] truncate text-sm text-center py-1"
          >
            {textWithMiddleDots(message?.content?.name ?? "Unknown", 35)}
          </div>
          <div class=" w-full text-xs text-gray-400 flex justify-start">
            {(message?.content?.size * 0.000001).toFixed(2) + " Mb"}
          </div>
        </div>
      </div>
    </button>
  </div>
{/if}

<style>
  .icon-wrapper {
    color: #f66162;
  }
</style>
