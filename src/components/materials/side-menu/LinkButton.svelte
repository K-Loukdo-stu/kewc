<script>
  import ShareRightIcon from "$components/icons/share_tmp/ShareRight.svelte";
  export let name;
  export let url;
</script>

<a
  href={url}
  target="_blank"
  rel="noreferrer"
  class="text-gray-500 font-semibold"
>
  <div class=" flex justify-end">
    <div
      class=" flex h-10 px-3 bg-gray-100 rounded-lg border-2 w-max items-center"
    >
      <div class=" pr-2">{name}</div>
      <div
        class=" flex items-center w-5 h-5 text-gray-600 font-bold text-sm font-mono snap-mandatory overflow-hidden"
      >
        <ShareRightIcon />
      </div>
    </div>
  </div>
</a>
