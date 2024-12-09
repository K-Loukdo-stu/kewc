<script>
  export let message;
  export let isMine;

  $: leavingUser = message.content.user;
</script>

<div class=" w-full py-1 pt-4 flex justify-center">
  <div
    class="max-w-sm px-3 py-1 rounded-full backdrop-blur-sm bg-white/30 text-gray-600 text-center break-words text-sm"
  >
    {#if isMine}
      <div>{`You left the group`}</div>
    {:else}
      <div>
        {`${leavingUser.firstName} ${leavingUser.lastName} left the group`}
      </div>
    {/if}
  </div>
</div>
