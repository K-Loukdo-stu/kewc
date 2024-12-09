<script>
  import { page } from "$app/stores";
  import ChannelProductViewer from "$components/elements/dashboard/channel/ChannelProductViewer.svelte";
  import SelectedChannelViewer from "$components/elements/dashboard/channel/SelectedChannelViewer.svelte";
  import LinkButton from "$components/materials/side-menu/LinkButton.svelte";

  $: channelId = $page.params.cid;
  let selectedProduct;
</script>

<div class=" w-full">
  <div class="w-full">
    <SelectedChannelViewer bind:channelId>
      <LinkButton
        name="Home"
        url={`/web-content/kchannel/${channelId}/as-audience/home`}
      />
      <LinkButton
        name="News feed"
        url={`/web-content/kchannel/${channelId}/as-audience/post`}
      />
      <LinkButton
        name="Product"
        url={`/web-content/kchannel/${channelId}/as-audience/product`}
      />
      <LinkButton
        name="About"
        url={`/web-content/kchannel/${channelId}/as-audience/product`}
      />
      <LinkButton
        name="Appt form"
        url={`/web-content/kchannel/${channelId}/as-audience/appointment-form`}
      />
      <LinkButton
        name="Reviews"
        url={`/web-content/kchannel/${channelId}/as-audience/reviews`}
      />
    </SelectedChannelViewer>
  </div>
  <div class="w-full">
    <ChannelProductViewer bind:selectedProduct bind:channelId>
      {#if selectedProduct}
        <LinkButton
          name="View"
          url={`/web-content/kchannel/${channelId}/as-audience/product/${selectedProduct.id}`}
        />
      {/if}
    </ChannelProductViewer>
  </div>
</div>
