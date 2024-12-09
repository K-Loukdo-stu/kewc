<script>
  import CategorySelectionButton from "$components/materials/product/CategorySelectionButton.svelte";
  import Imageholder from "$components/materials/product/Imageholder.svelte";
  import { createEventDispatcher, onDestroy, onMount } from "svelte";
  import NameTextField from "$components/materials/product/NameTextField.svelte";
  import BasePriceItem from "$components/materials/product/BasePriceItem.svelte";
  import Footer from "$components/materials/product/Footer.svelte";
  import { createProductSteps, Currency, productCurrencies } from "../variable";
  import { getProductTypesByChannel } from "$providers/actions/kchannel/product";
  import SmfbLoading from "$components/materials/spinners/fbLoading/SMFBLoading.svelte";
  import { fade } from "svelte/transition";
  import { createProduct } from "$providers/actions/kchannel/product";
  import CategoryListPopup from "./CategoryListPopup.svelte";
  import { uploadProduct } from "$providers/actions/storage/extensions/product";
  import { EwcDispatch } from "$lib/ewc-dispatch/ewc-dispatch";
  const dispatch = createEventDispatcher();

  export let channelId;
  export let productTypeId;
  let categorySelectionPopupShown = false;
  let selectedCate = null;
  let productName = "";
  let productPictureState = {
    file: null,
    base64: "",
    isRequiring: false,
  };
  let productPrice;
  let discountPrice;
  let hasDiscount = false;
  let currency = productCurrencies.KH.code;
  let productTypeLoaded = false;
  let productTypeLoading = false;
  let productTypes = [];
  let createdProduct = null;
  let createProductState = {
    creating: false,
    created: false,
    errMsg: "",
  };

  const loadCategories = () => {
    productTypeLoading = true;
    getProductTypesByChannel
      .load({ channel: channelId })
      .then((res) => {
        productTypeLoaded = true;
        productTypes = res["data"];

        // Set default producttype
        let index = 0;
        if (productTypeId) {
          const foundIndex = productTypes.findIndex(
            (pt) => pt?.id == productTypeId,
          );
          if (foundIndex >= 0) index = foundIndex;
        }

        selectedCate = productTypes?.[index] || null;
      })
      .finally(() => {
        productTypeLoading = false;
      });
  };

  const onCreateProduct = async () => {
    // Create product after completion
    createProductState.creating = true;
    createProductState.created = false;
    createProductState.errMsg = "";
    uploadProduct.load({
      name: productPictureState.file?.name ?? "no-name",
      size: productPictureState.file?.size ?? 0,
      base64: productPictureState.base64,
      onComplete: async ({ status, response }) => {
        if (status != 201 || !response) {
          createProductState.errMsg = "Unable to upload the image!";
          return;
        }

        // Create product after completion
        try {
          const createProductRes = await createProduct.load({
            name: productName,
            channel: channelId,
            productType: selectedCate?.id || "",
            photo: response,
            price: productPrice,
            discountPrice: discountPrice || 0,
            currency,
            hasDiscount,
          });
          createdProduct = createProductRes["data"];

          dispatch("created", {
            product: createdProduct,
            price: createdProduct["price"],
          });

          createProductState.created = true;
        } catch (err) {
          createProductState.errMsg = err.message;
        } finally {
          createProductState.creating = false;
        }
      },
      onError: (xmlhttp) => {
        createProductState.errMsg = "Unable to upload the image!";
        createProductState.creating = false;
      },
      onProgress: ({ params, loaded, total }) => {},
    });
  };

  onMount(() => {
    loadCategories();
  });

  let T;
  onDestroy(() => {});
</script>

<div class=" relative w-full h-full bg-white">
  <form
    on:submit|preventDefault={() => {
      productPictureState.isRequiring = false;
      // check if picture is undefined
      if (!productPictureState.base64) {
        productPictureState.isRequiring = true;
        return;
      }

      onCreateProduct();
    }}
    class=" w-full h-full flex flex-col"
  >
    <div
      class=" flex-grow-0 text-center h-11 flex justify-center items-center relative border-b"
    >
      New product
      <div class=" absolute top-0 right-0 bottom-0 p-1 flex items-center">
        <button
          class="bg-tertiary-3 text-white rounded-md py-1 px-2 hover:bg-tertiary-2 disabled:bg-gray-300"
          type="submit"
          disabled={createProductState.creating}
        >
          {#if createProductState.creating}
            <div class="p-1 px-2"><SmfbLoading color="white" /></div>
          {:else}
            <span>Create</span>
          {/if}
        </button>
      </div>
    </div>

    {#if productTypeLoading}
      <div class=" flex justify-center py-2">
        <SmfbLoading color="gray" />
      </div>
    {/if}

    <div class=" relative w-full flex-grow">
      {#if productTypeLoaded && !productTypeLoading}
        <div
          in:fade={{ duration: 200 }}
          class=" absolute inset-0 overflow-y-scroll"
        >
          <div class=" max-w-md m-auto px-8 flex-grow">
            <div class="flex justify-center p-2 py-4">
              <Imageholder
                bind:isRequiring={productPictureState.isRequiring}
                on:choose={(evt) => {
                  productPictureState.file = evt.detail["file"];
                  productPictureState.base64 = evt.detail["base64"];
                }}
              />
            </div>

            <!-- Error msg -->
            {#if !createProductState.creating && !!createProductState.errMsg}
              <div
                in:fade={{ duration: 200 }}
                class=" w-full text-center text-yellow-600 py-2 text-sm pb-3"
              >
                {createProductState.errMsg}
              </div>
            {/if}

            <div class="py-2">
              <CategorySelectionButton
                name={selectedCate?.name || "None"}
                on:click={() => (categorySelectionPopupShown = true)}
              />
            </div>
            <div class=" py-2">
              <NameTextField
                bind:value={productName}
                placeholder={"Product name"}
              />
            </div>
            <div class=" py-2">
              <BasePriceItem
                bind:price={productPrice}
                bind:discountPrice
                bind:discountChecked={hasDiscount}
                bind:currency
              />
            </div>
          </div>
        </div>
      {/if}
    </div>
    <div class=" flex flex-grow-0">
      <Footer step={createProductSteps.CREATE} />
    </div>
  </form>

  {#if categorySelectionPopupShown}
    <CategoryListPopup
      on:close={() => (categorySelectionPopupShown = false)}
      on:select={(evt) => {
        selectedCate = evt.detail;
        categorySelectionPopupShown = false;
      }}
      categories={productTypes}
      selected={selectedCate}
    />
  {/if}
</div>
