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
        url={`/web-content/kchannel/${channelId}/as-admin/home`}
      />
      <LinkButton
        name="News feed"
        url={`/web-content/kchannel/${channelId}/as-admin/post`}
      />
      <LinkButton
        name="Product management"
        url={`/web-content/kchannel/${channelId}/as-admin/product`}
      />
      <LinkButton
        name="New product"
        url={`/web-content/kchannel/${channelId}/as-admin/product/create`}
      />
      <LinkButton
        name="Ordering"
        url={`/web-content/kchannel/${channelId}/as-admin/ordering`}
      />
      <LinkButton
        name="Setting"
        url={`/web-content/kchannel/${channelId}/as-admin/setting`}
      />
    </SelectedChannelViewer>
  </div>

  <div class="w-full">
    <ChannelProductViewer bind:selectedProduct bind:channelId>
      {#if selectedProduct}
        <LinkButton
          name="Edit"
          url={`/web-content/kchannel/${channelId}/as-admin/product/edit/${selectedProduct.id}`}
        />
        <LinkButton
          name="Edit options"
          url={`/web-content/kchannel/${channelId}/as-admin/product/add-options/${selectedProduct.id}`}
        />
      {/if}
    </ChannelProductViewer>
  </div>
</div>
