<script>
  import VoicePlayer from "$components/elements/VoicePlayer/VoicePlayer.svelte";
  import { extractRoomFromChat } from "$lib/utils/index.js";
  import { downloadAVoice } from "$providers/actions/index.js";
  import { user } from "$providers/stores/user.js";
  import { beforeUpdate, createEventDispatcher, onMount } from "svelte";
  const dispatch = createEventDispatcher();

  export let message;
  export let type;

  let hasLocal;
  let base64Audio;

  $: downloading = message?.downloading;
  $: sending = message?.sending;
  $: resent = message?.resent;

  $: {
    if (message.hasLocal) {
      hasLocal = message.hasLocal;
    }
  }

  beforeUpdate(() => {
    if (message?.hasLocal) {
      hasLocal = message?.hasLocal;
    }
    if (message?.content?.url) {
      base64Audio = base64Audio || message?.content?.url;
    }
  });

  const onDownload = () => {
    const room = extractRoomFromChat($user, message);
    const voiceId = message?.content?.id;
    downloadAVoice.load({
      msgKind: room.kind,
      roomId: room.roomId,
      msgId: message.genId,
      id: voiceId,
      onDone: (voice) => {
        base64Audio = voice.base64;
      },
    });
  };

  const checkFileExistance = async () => {
    hasLocal = await window.api?.onHasDLBase64Cache({
      key: message?.content?.id,
    });
  };

  const onLoadVoice = async () => {
    if (sending) return;
    await checkFileExistance();
    if (hasLocal) {
      base64Audio = await window.api?.onReadDLBase64Cache({
        key: message?.content?.id,
      });
    } else {
      onDownload();
    }
  };

  onMount(() => {
    onLoadVoice();
  });
</script>

<div>
  <div
    on:contextmenu|preventDefault={(evt) => {
      let pos = { x: evt.clientX, y: evt.clientY };
      dispatch("rightClick", { pos, type, message });
    }}
    class={`w-full h-full`}
  >
    <VoicePlayer
      isDisabled={sending || resent}
      msgId={message?.id}
      src={base64Audio}
      thumbnail={message?.content?.thumbnail}
      type={message?.content?.contentType}
      isLoading={downloading}
      durationLength={message?.content?.duration}
    />
  </div>
</div>

<style>
  .icon-wrapper {
    color: #f66162;
  }
</style>
