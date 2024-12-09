<script>
  import { user } from "$providers/stores/user.js";

  export let message;
  export let isMine;

  $: member = message.content.member;
  $: role = message.content.role;
  $: imMember = member.id == $user.id;
  $: assigner = message.content.assigner;
</script>

<div class=" w-full py-1 pt-4 flex justify-center">
  <div
    class="max-w-sm px-3 py-1 rounded-full backdrop-blur-sm bg-white/30 text-gray-600 text-center break-words text-sm"
  >
    {#if isMine}
      <div>
        {`You granted ${member.firstName} ${member.lastName} as ${role}`}
      </div>
    {:else if imMember}
      <div>
        {`${assigner.firstName} ${assigner.lastName} granted you as ${role}`}
      </div>
    {:else}
      <div>
        {`${assigner.firstName} ${assigner.lastName} granted ${member.firstName} ${member.lastName} as ${role}`}
      </div>
    {/if}
  </div>
</div>
