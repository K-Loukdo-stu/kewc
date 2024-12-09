<script>
  import { createEventDispatcher, onMount } from "svelte";
  import { choiceSelectorTypes } from "../variable";
  import AddItemButton from "$components/materials/product/AddItemButton.svelte";
  import { fade } from "svelte/transition";
  import EditableBasePriceItem from "$components/materials/product/EditableBasePriceItem.svelte";
  import OptionItem from "$components/materials/product/EditableOptionItem.svelte";
  import {
    createProductOption,
    createProductPrice,
    getOptionsByProduct,
    getProductPrices,
  } from "$providers/actions/kchannel/product";
  import { scrollToEle } from "$lib/utils/scroll";
  const dispatch = createEventDispatcher();

  export let product;
  export let productId;
  export let isInEditionMode = false;
  let basePricesLoading = false;
  let basePricesLoaded = false;
  let basePrices = [];
  let options = [];
  let productPriceState = {
    isAdding: false,
    errMsg: "",
  };
  let productOptionsState = {
    loading: false,
    loaded: false,
    errMsg: "",
  };

  const onLoadPrices = async () => {
    try {
      basePricesLoading = true;
      basePricesLoaded = false;
      const res = await getProductPrices.load({ productId });
      basePrices = res.data;
      basePricesLoaded = true;
    } catch (err) {
      // to do
      console.log(err);
    } finally {
      basePricesLoading = false;
    }
  };

  const onLoadProductOptions = async () => {
    try {
      productOptionsState.errMsg = "";
      productOptionsState.loaded = false;
      productOptionsState.loading = true;
      const res = await getOptionsByProduct.load({ product: productId });
      options = res.data;
      productOptionsState.loaded = true;
    } catch (err) {
      productOptionsState.errMsg = err.message;
    } finally {
      productOptionsState.loading = false;
    }
  };

  const onAddBasePrice = async ({ productId }) => {
    try {
      productPriceState.isAdding = true;
      productPriceState.errMsg = "";
      const res = await createProductPrice.load({
        name: "Price",
        price: 0,
        discountPrice: 0,
        hasDiscount: false,
        currency: product?.price?.currency ?? "",
        isMain: false,
        product: productId,
      });
      const newPrice = res.data;
      basePrices = [...basePrices, newPrice];
      scrollToEle({ id: "price" + newPrice.id });
    } catch (err) {
      productPriceState.errMsg = err.message;
    } finally {
      productPriceState.isAdding = false;
    }
  };

  const onAddOption = async ({ productId }) => {
    try {
      productOptionsState.loaded = false;
      productOptionsState.loading = true;
      productOptionsState.errMsg = "";
      const res = await createProductOption.load({
        type: choiceSelectorTypes.SINGLE.type,
        name: "Option",
        product: productId,
      });
      const newOpt = res.data;
      options = [...options, newOpt];
      productOptionsState.loaded = true;
      scrollToEle({ id: "opt" + newOpt.id });
    } catch (err) {
      productOptionsState.errMsg = err.message;
    } finally {
      productOptionsState.loading = false;
    }
  };

  onMount(() => {
    onLoadPrices();
    onLoadProductOptions();
  });
</script>

{#if product}
  <div class=" max-w-md m-auto">
    <div class=" py-2 px-8">
      {#each basePrices as basePrice (basePrice.id)}
        <div id={"price" + basePrice.id} in:fade class=" pb-2">
          <EditableBasePriceItem
            priceId={basePrice.id}
            priceName={basePrice.name}
            priceValue={basePrice.price}
            discountValue={basePrice.discountPrice}
            isDefaultPrice={basePrice.isMain}
            discountChecked={basePrice.hasDiscount}
            currentCurrency={basePrice.currency}
            bind:isInEditionMode
            on:removed={(evt) => {
              const removedPrice = evt.detail.price;
              basePrices = basePrices.filter((p) => p.id != removedPrice.id);
              productPriceState.errMsg = "";
            }}
            on:updated={(evt) => {
              const updatedPrice = evt.detail.price;
              basePrices = basePrices.map((p) =>
                p.id == updatedPrice.id ? (p = updatedPrice) : p
              );

              if (updatedPrice?.isMain) {
                dispatch("basePriceUpdated", { price: updatedPrice });
              }
            }}
            on:cancel={() => {}}
            on:edit={(evt) => {
              const basePrice = evt.detail.basePrice;
              isInEditionMode = true;
              scrollToEle({ id: "price" + basePrice.id });
            }}
            on:endEditing={() => (isInEditionMode = false)}
          />
        </div>
      {/each}
      {#if productPriceState.errMsg}
        <div in:fade class=" text-center text-sm text-warning py-2">
          {productPriceState.errMsg}
        </div>
      {/if}
      <div>
        <AddItemButton
          name={"Base price"}
          bind:loading={productPriceState.isAdding}
          on:add={() => {
            onAddBasePrice({ productId });
          }}
        />
      </div>
    </div>
    <!-- Additional sub-opts -->
    <div class=" flex items-center px-10 py-2 pt-3">
      <div class=" text-sm text-gray-400">Additional options</div>
      <div class="w-4" />
      <div class=" flex-grow">
        <div class=" h-[1px] bg-gray-200" />
      </div>
    </div>
    <div class="py-2 px-8">
      <!-- Opts list -->
      {#each options as option}
        <div id={"opt" + option.id} in:fade class=" py-1">
          <OptionItem
            bind:isInEditionMode
            on:removed={(evt) => {
              const option = evt.detail.option;
              options = options.filter((opt) => opt.id != option.id);
            }}
            on:updated={(evt) => {
              const updatedOption = evt.detail.option;
              options = options.map((opt) =>
                opt.id == updatedOption.id ? (opt = updatedOption) : opt
              );
            }}
            on:edit={() => {
              isInEditionMode = true;
            }}
            on:endEditing={() => {
              isInEditionMode = false;
            }}
            {option}
            name={option.name}
            type={option.type}
            subOptions={option.subOptions}
            currency={product.price.currency}
          />
        </div>
      {/each}

      <!-- Sub-opt add-btn -->
      <div class="pt-2">
        <AddItemButton
          bind:loading={productOptionsState.loading}
          name={"Additional option"}
          on:add={() => {
            onAddOption({ productId: productId });
          }}
        />
      </div>
    </div>
  </div>
{/if}
