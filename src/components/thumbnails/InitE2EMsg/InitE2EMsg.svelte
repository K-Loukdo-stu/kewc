<script>
  import Lock from "$components/icons/Lock/Lock.svelte";
  export let message;
</script>

<div class=" w-full py-1 pt-4 flex justify-center">
  <div
    class="max-w-sm px-3 py-2 rounded-full backdrop-blur-sm bg-white/30 text-gray-500 text-center break-words font-mono"
  >
    <div class=" py-1 flex justify-center">
      <Lock w={5} h={5} />
    </div>
    {`Your messages in this end-to-end encryption are not stored in the server. You can start your secret communication.`}
  </div>
</div>
