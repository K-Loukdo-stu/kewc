<script>
  import AudioPlayer from "$components/elements/AudioPlayer/AudioPlayer.svelte";
  import { extractRoomFromChat } from "$lib/utils/index.js";
  import { downloadAnAudio } from "$providers/actions/index.js";
  import { user } from "$providers/stores/user.js";
  import { createEventDispatcher, onMount } from "svelte";
  const dispatch = createEventDispatcher();

  export let message;
  export let type;

  let base64Audio;
  let hasLocal;

  $: dlProgressPercent = message?.dlprogress;
  $: downloading = message?.downloading;
  $: sending = message?.sending;
  $: filename = message?.content?.id;
  $: resent = message?.resent;

  $: {
    if (message?.hasLocal) {
      hasLocal = message.hasLocal;
    }
  }

  const onCancelDownload = () => {
    if (!downloading) return;
    message?.xmlhttp?.abort();
  };

  const onDownload = () => {
    const room = extractRoomFromChat($user, message);
    downloadAnAudio.load({
      msgKind: room.kind,
      roomId: room.roomId,
      msgId: message.genId,
      id: message?.content?.id,
      onDone: (file) => {
        base64Audio = file.base64;
      },
    });
  };

  const onPlay = async (playCb) => {
    hasLocal = await window.api?.onHasDLBase64Cache({
      key: filename,
    });

    base64Audio = message?.content?.url;
    if (hasLocal) {
      const src = await onLoadAudio();
      playCb?.(src);
      return;
    }

    onDownload();
  };

  const onLoadAudio = async () => {
    base64Audio = await window.api?.onReadDLBase64Cache({ key: filename });
    return base64Audio;
  };
</script>

<div>
  <div
    class={`relative w-full h-full `}
    on:contextmenu|preventDefault={(evt) => {
      let pos = { x: evt.clientX, y: evt.clientY };
      dispatch("rightClick", { pos, message, type });
    }}
  >
    <AudioPlayer
      isDisabled={sending || resent}
      msgId={message?.id}
      src={base64Audio}
      type={message?.content?.contentType}
      fileName={message?.content?.name}
      {downloading}
      loadingPercentage={dlProgressPercent}
      on:cancel={() => {
        onCancelDownload();
      }}
      on:play={(evt) => {
        const { playCb } = evt.detail;
        onPlay(playCb);
      }}
    />
  </div>
</div>
