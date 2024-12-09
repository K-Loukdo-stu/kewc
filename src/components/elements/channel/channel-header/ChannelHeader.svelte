<script>
  import ChevronLeft from "$components/icons/chevron_tmp/ChevronLeft.svelte";
  import ShareBox from "$components/icons/share_tmp/ShareBox.svelte";
  import ChannelMenu from "$components/materials/channel/menu/ChannelMenu.svelte";
</script>

<div class=" h-16 flex w-full items-center p-1">
  <div class=" px-1 text-gray-300">
    <ChevronLeft />
  </div>
  <div class="">
    <div class=" bg-gray-200 w-12 h-12 rounded-full p-[2px]">
      <img
        class=" w-full h-full object-cover rounded-full"
        src="https://simg.nicepng.com/png/small/119-1197254_restaurant-logo-design-vector-png-restaurant-logo-design.png"
        alt=""
      />
    </div>
  </div>
  <div class=" h-full relative flex-grow bg-white">
    <div class=" absolute inset-0 pl-2">
      <div class=" font-semibold text-lg truncate">Sea food</div>
      <div class=" text-sm truncate text-gray-600">
        My bio is to inspire you to eat healthy foods
      </div>
    </div>
  </div>
  <div class=" px-2 flex items-center text-gray-600">
    <button on:click={() => {}}>
      <ShareBox size={20} />
    </button>
  </div>
</div>
