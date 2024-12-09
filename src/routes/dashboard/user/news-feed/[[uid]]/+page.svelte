<script>
  import { page } from "$app/stores";
  // import ChannelProductViewer from "$components/elements/dashboard/channel/ChannelProductViewer.svelte";
  import SelectedUserViewer from "$components/elements/dashboard/user/SelectedUserViewer.svelte";
  import LinkButton from "$components/materials/side-menu/LinkButton.svelte";

  $: userId = $page.params.uid;
  let selectedProduct;
</script>

<div class=" w-full">
  <div class="w-full">
    <SelectedUserViewer bind:userId>
      <!-- <LinkButton
        name="home"
        url={`/web-content/user/${userId}/home`}
      /> -->
      <LinkButton
        name="News feed"
        url={`/web-content/user/${userId}/post`}
      />
      <!-- <LinkButton
        name="News feed"
        url={`/web-content/kchannel/${userId}/as-admin/post`}
      />
      <LinkButton
        name="Product management"
        url={`/web-content/kchannel/${userId}/as-admin/product`}
      />
      <LinkButton
        name="New product"
        url={`/web-content/kchannel/${userId}/as-admin/product/create`}
      /> -->
    </SelectedUserViewer>
  </div>

  <!-- <div class="w-full">
    <ChannelProductViewer bind:selectedProduct bind:userId>
      {#if selectedProduct}
        <LinkButton
          name="Edit"
          url={`/web-content/kchannel/${userId}/as-admin/product/edit/${selectedProduct.id}`}
        />
        <LinkButton
          name="Edit options"
          url={`/web-content/kchannel/${userId}/as-admin/product/add-options/${selectedProduct.id}`}
        />
      {/if}
    </ChannelProductViewer>
  </div> -->
</div>
