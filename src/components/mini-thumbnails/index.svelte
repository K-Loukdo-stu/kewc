<script>
  import { MsgContentTypes } from "@htkradass/common";
  import Voice from "./Voice.svelte";
  import MultiPhoto from "./MultiPhoto.svelte";
  import Photo from "./Photo.svelte";
  import Text from "./Text.svelte";
  import File from "./File.svelte";
  import Video from "./Video.svelte";
  import Audio from "./Audio.svelte";
  import SharedAccount from "./SharedAccount.svelte";

  export let message;
  $: content = message?.content;
  $: type = message?.type;
  $: deleted = !!message?.deletedAt;
</script>

<div class=" w-full">
  {#if deleted}
    <div>Deleted</div>
  {:else if type === MsgContentTypes.Text}
    <Text {content} />
  {:else if type === MsgContentTypes.Photo}
    <Photo content={"🖼️"} />
  {:else if type === MsgContentTypes.MultiPhoto}
    <MultiPhoto content={"🖼️🖼️"} />
  {:else if type === MsgContentTypes.Audio}
    <Audio content={"▶️"} />
  {:else if type === MsgContentTypes.Voice}
    <Voice content={"▶️"} />
  {:else if type === MsgContentTypes.Video}
    <Video content={"🎞️"} />
  {:else if type === MsgContentTypes.File}
    <File content={"🔗"} />
  {:else if type === MsgContentTypes.SharedAccount}
    <SharedAccount content={"Account"} />
  {:else}
    <div>Unknown</div>
  {/if}
</div>
