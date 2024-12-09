<script>
  export let item;
  let imgLoaded;
</script>

<img
  class:invisible={!imgLoaded}
  class="w-full h-full object-cover rounded-sm"
  src={item?.thumbnail?.url}
  alt=""
  on:load={() => (imgLoaded = true)}
/>
