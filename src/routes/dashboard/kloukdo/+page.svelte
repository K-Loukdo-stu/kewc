<script>
    import LinkButton from "$components/materials/side-menu/LinkButton.svelte";
</script>
  
<div class=" w-full">
    <div class="w-full gap-2 flex flex-col">
        <LinkButton
            name="Home"
            url={`/web-content/kloukdo/home`}
        />
        <LinkButton
            name="Category"
            url={`/web-content/kloukdo/category`}
        />
        <LinkButton
            name="Sub Category"
            url={`/web-content/kloukdo/sub-category`}
        />
        <LinkButton
            name="Product"
            url={`/web-content/kloukdo/product/[pid]`}
        />
        <!-- <LinkButton
            name="d"
            url={`/web-content/kloukdo/home`}
        />
        <LinkButton
            name="d"
            url={`/web-content/kloukdo/home`}
        /> -->
    </div>
</div>
