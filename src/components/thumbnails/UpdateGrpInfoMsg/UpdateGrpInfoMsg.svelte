<script>
  export let message;
</script>

<div class=" w-full py-1 pt-2 flex justify-center">
  <div
    class="max-w-sm px-3 py-1 rounded-full backdrop-blur-sm bg-white/30 text-gray-600 text-center break-words text-sm"
  >
    {`${message?.content?.message || "---"}`}
  </div>
</div>
