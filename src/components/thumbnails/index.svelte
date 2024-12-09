<script>
  import { MsgContentTypes } from "@htkradass/common";
  import Wrapper from "./wrapper.svelte";
  import Text from "./Text/index.svelte";
  import Deleted from "./Deleted/index.svelte";
  import Photo from "./Photo/Photo.svelte";
  import MultiPhoto from "./MultiPhoto/MultiPhoto.svelte";
  import Video from "./Video/Video.svelte";
  import File from "./File/File.svelte";
  import Voice from "./Voice/Voice.svelte";
  import Audio from "./Audio/Audio.svelte";
  import { createEventDispatcher } from "svelte";
  import InitE2EMsg from "./InitE2EMsg/InitE2EMsg.svelte";
  import UpdateGrpInfoMsg from "./UpdateGrpInfoMsg/UpdateGrpInfoMsg.svelte";
  import InitGrpMsg from "./group/InitGrpMsg/InitGrpMsg.svelte";
  import InvitingGrpMsg from "./group/InvitingGrpMsg/InvitingGrpMsg.svelte";
  import GrantingRoleGrpMsg from "./group/GrantingRoleGrpMsg/GrantingRoleGrpMsg.svelte";
  import LeaveGrpMsg from "./group/LeaveGrpMsg/LeaveGrpMsg.svelte";
  import RemoveMemberGrpMsg from "./group/RemoveMemberGrpMsg/RemoveMemberGrpMsg.svelte";
  import SharedAccount from "./shared-account/SharedAccount.svelte";

  const dispatch = createEventDispatcher();

  export let message;
  export let isMine;
  $: type = message?.type;
  $: deleted = !!message?.deletedAt;
</script>

<Wrapper {message}>
  <div>
    {#if deleted}
      <Deleted {isMine} />
    {:else if type === MsgContentTypes.Text}
      <Text
        on:rightClick={(evt) => dispatch("rightClick", evt.detail)}
        {message}
        {type}
        {isMine}
      />
    {:else if type === MsgContentTypes.Photo}
      <Photo
        on:rightClick={(evt) => dispatch("rightClick", evt.detail)}
        {message}
        {type}
      />
    {:else if type === MsgContentTypes.MultiPhoto}
      <MultiPhoto
        on:rightClick={(evt) => dispatch("rightClick", evt.detail)}
        {message}
        {type}
      />
    {:else if type === MsgContentTypes.Video}
      <Video
        on:rightClick={(evt) => dispatch("rightClick", evt.detail)}
        {message}
        {type}
      />
    {:else if type === MsgContentTypes.File}
      <File
        on:rightClick={(evt) => dispatch("rightClick", evt.detail)}
        shown={type === MsgContentTypes.File}
        {message}
        {type}
      />
    {:else if type === MsgContentTypes.Voice}
      <Voice
        on:rightClick={(evt) => dispatch("rightClick", evt.detail)}
        {message}
        {type}
      />
    {:else if type === MsgContentTypes.Audio}
      <Audio
        on:rightClick={(evt) => dispatch("rightClick", evt.detail)}
        {message}
        {type}
      />

      <!-- Personal messages -->
    {:else if type === MsgContentTypes.SharedAccount}
      <SharedAccount
        on:rightClick={(evt) => dispatch("rightClick", evt.detail)}
        {message}
        {type}
      />

      <!-- Group messages -->
    {:else if type === MsgContentTypes.InitGrpMsg}
      <InitGrpMsg {message} />
    {:else if type === MsgContentTypes.InvitingGrpMsg}
      <InvitingGrpMsg {message} />
    {:else if type === MsgContentTypes.InitE2EMsg}
      <InitE2EMsg {message} />
    {:else if type === MsgContentTypes.UpdateGroupInfoMsg}
      <UpdateGrpInfoMsg {message} />
    {:else if type === MsgContentTypes.GrantingRoleGroupMsg}
      <GrantingRoleGrpMsg {message} {isMine} />
    {:else if type === MsgContentTypes.LeaveGroupMsg}
      <LeaveGrpMsg {message} {isMine} />
    {:else if type === MsgContentTypes.RemoveMemberFromGroupMsg}
      <RemoveMemberGrpMsg {message} {isMine} />
    {/if}
  </div>
</Wrapper>
