<script>
  import ChannelHeader from "$components/elements/channel/channel-header/ChannelHeader.svelte";
  import ChannelMenu from "$components/materials/channel/menu/ChannelMenu.svelte";
  let headerHeight;
</script>

<div
  style="padding-top: {headerHeight}px;"
  class=" relative w-screen h-screen bg-background"
>
  <div bind:clientHeight={headerHeight} class=" absolute inset-0 bottom-auto">
    <div class=" bg-white w-full border-b">
      <ChannelHeader />
      <ChannelMenu />
    </div>
  </div>
  <div class="w-full h-full">
    <slot />
  </div>
</div>
