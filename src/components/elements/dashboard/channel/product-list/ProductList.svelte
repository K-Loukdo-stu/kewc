<script>
  import { createEventDispatcher, onMount, tick } from "svelte";
  import ProductListItem from "./ProductListItem.svelte";
  const dispatch = createEventDispatcher();

  export let products = [];
  let selectedProduct;

  $: if (products.length) {
    onSelect(products[0]);
  }

  const onSelect = (product) => {
    selectedProduct = product;
    dispatch("select", { product });
  };

  onMount(() => {
    tick().then(() => {
      if (products?.length > 0) {
        onSelect(products[0]);
      }
    });
  });
</script>

<div class=" w-full h-full flex flex-col gap-y-2">
  {#each products as product}
    <ProductListItem
      {product}
      active={selectedProduct?.id == product.id}
      on:select={() => onSelect(product)}
    />
  {/each}
</div>
