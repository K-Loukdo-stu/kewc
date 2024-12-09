<script>
  import Lock from "$components/icons/Lock/Lock.svelte";

  export let content;
</script>

{#if content["encrypted"] == true}
  <div>Encrypted</div>
{:else}
  <div class=" w-full">
    <div class=" truncate">
      {content?.text}
    </div>
  </div>
{/if}
