<script>
  import { user } from "$providers/stores/user.js";

  export let message;
  export let isMine;

  $: member = message.content.member;
  $: remover = message.content.remover;
  $: imMember = member.id == $user.id;
</script>

<div class=" w-full py-1 pt-4 flex justify-center">
  <div
    class="max-w-sm px-3 py-1 rounded-full backdrop-blur-sm bg-white/30 text-gray-600 text-center break-words text-sm"
  >
    {#if isMine}
      <div>
        {`You kicked ${member?.firstName || ""} ${member?.lastName || ""} out of the group`}
      </div>
    {:else if imMember}
      <div>
        {`${remover?.firstName || ""} ${
          remover?.lastName || ""
        } kicked you out of the group`}
      </div>
    {:else}
      <div>
        {`${remover?.firstName || ""} ${remover?.lastName || ""} kicked 
        ${member?.firstName || ""} ${member?.lastName || ""} out of the group`}
      </div>
    {/if}
  </div>
</div>
