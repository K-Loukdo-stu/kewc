<script>
  import CategorySelectionButton from "$components/materials/product/CategorySelectionButton.svelte";
  import Imageholder from "$components/materials/product/Imageholder.svelte";
  import { createEventDispatcher, onMount } from "svelte";
  import NameTextField from "$components/materials/product/NameTextField.svelte";
  import {
    deleteProduct,
    getProduct,
    getProductTypesByChannel,
    updateProduct,
  } from "$providers/actions/kchannel/product";
  import SmfbLoading from "$components/materials/spinners/fbLoading/SMFBLoading.svelte";
  import { fade } from "svelte/transition";
  import CategoryListPopup from "$components/materials/product-type/CategoryListPopup.svelte";
  import AdditionalOptionEditor from "$components/elements/product/add-options/AdditionalOptionEditor.svelte";
  import DeleteComfirmation from "$components/materials/product/edit/DeleteComfirmation.svelte";
  import { uploadProduct } from "$providers/actions/storage/extensions/product";
  const dispatch = createEventDispatcher();

  export let channelId;
  export let productId;
  let isInEditionMode;
  let categorySelectionPopupShown = false;
  let selectedProductType = null;
  let productName = "";
  let productTypeLoaded = false;
  let productTypeLoading = false;
  let productTypes = [];
  let updatedProduct = null;
  let updateProductState = {
    updating: false,
    errMsg: "",
  };
  let product;
  let loadProductState = {
    loading: false,
    loaded: false,
    errMsg: "",
  };
  let productPictureState = {
    file: null,
    base64: "",
    isRequiring: false,
  };
  let deleteProductState = {
    deleting: false,
    deleted: false,
    errMsg: "",
  };

  const onLoadProduct = async () => {
    try {
      loadProductState.loading = true;
      loadProductState.loaded = false;
      loadProductState.errMsg = "";
      const res = await getProduct.load({ productId });
      product = res.data;
      loadProductState.loaded = true;

      // set default
      productName = product["name"];
      selectedProductType = product["productType"];
      return product;
    } catch (err) {
      loadProductState.errMsg = err?.message || "Unable to load";
    } finally {
      loadProductState.loading = false;
    }
  };

  const loadCategories = () => {
    productTypeLoading = true;
    getProductTypesByChannel
      .load({ channel: channelId })
      .then((res) => {
        productTypeLoaded = true;
        productTypes = res["data"];

        if (!selectedProductType) {
          selectedProductType = productTypes?.[0] || null;
        }
      })
      .finally(() => {
        productTypeLoading = false;
      });
  };

  const onSaveProduct = async () => {
    const onSave = async ({ photo }) => {
      try {
        updateProductState.errMsg = "";
        const res = await updateProduct.load({
          id: productId,
          name: productName,
          channel: channelId,
          productType: selectedProductType?.id || "",
          photo: photo,
        });
        updatedProduct = res["data"];

        // init update
        productName = updatedProduct["name"];
        selectedProductType = updatedProduct["productType"];

        dispatch("saved", {
          product: updatedProduct,
        });
      } catch (err) {
        console.log("Err: ", err);
        updateProductState.errMsg = err?.message || "Unable to update";
      } finally {
        updateProductState.updating = false;
      }
    };

    updateProductState.updating = true;

    if (productPictureState.base64) {
      uploadProduct.load({
        name: productPictureState.file?.name ?? "no-name",
        size: productPictureState.file?.size ?? 0,
        base64: productPictureState.base64,
        onComplete: ({ status, response }) => {
          if (status != 201 || !response) {
            updateProductState.errMsg = "Unable to upload the image!";
            return;
          }

          onSave({ photo: response });
        },
        onError: (xmlhttp) => {
          updateProductState.errMsg = "Unable to upload the image!";
          updateProductState.updating = false;
        },
        onProgress: ({ params, loaded, total }) => {},
      });
    } else {
      onSave({ photo: product["photo"] ?? {} });
    }
  };

  const onDeleteProduct = async () => {
    try {
      deleteProductState.deleting = true;
      deleteProductState.deleted = false;
      deleteProductState.errMsg = "";
      isInEditionMode = true;
      await deleteProduct.load({ id: productId });
      deleteProductState.deleted = true;
      dispatch("deleted", { product });
    } catch (err) {
      isInEditionMode = false;
      deleteProductState.errMsg = err.message;
    } finally {
      deleteProductState.deleting = false;
    }
  };

  onMount(() => {
    onLoadProduct().then(() => {
      loadCategories();
    });
  });
</script>

<div class=" relative w-full h-full bg-white">
  <form
    on:submit|preventDefault={() => {
      onSaveProduct();
    }}
    class=" w-full h-full flex flex-col"
  >
    <div
      class=" flex-grow-0 text-center h-11 flex justify-center items-center relative border-b"
    >
      Edit product
      {#if loadProductState.loaded}
        <div class=" absolute top-0 right-0 bottom-0 p-1 flex items-center">
          <button
            class="bg-tertiary-3 text-white rounded-md py-1 px-2 hover:bg-tertiary-2"
            type="submit"
            disabled={updateProductState.updating}
          >
            {#if updateProductState.updating}
              <div class="p-1 px-2"><SmfbLoading color="white" /></div>
            {:else}
              <span>Save</span>
            {/if}
          </button>
        </div>
      {/if}
    </div>

    {#if productTypeLoading}
      <div class=" flex justify-center py-2">
        <SmfbLoading color="gray" />
      </div>
    {/if}

    <div class=" relative w-full flex-grow">
      {#if product}
        <div in:fade class=" absolute inset-0 overflow-y-scroll pb-14">
          <div class=" max-w-md m-auto px-8 flex-grow">
            <div class="flex justify-center p-2 py-4">
              <Imageholder
                imgUrl={product?.["photo"]?.["thumbnail"]?.["url"]}
                bind:isRequiring={productPictureState.isRequiring}
                on:choose={(evt) => {
                  productPictureState.file = evt.detail["file"];
                  productPictureState.base64 = evt.detail["base64"];
                }}
              />
            </div>
            <!-- Error msg -->
            {#if !updateProductState.updating && !!updateProductState.errMsg}
              <div
                in:fade={{ duration: 200 }}
                class=" w-full text-center text-yellow-600 py-2 text-sm pb-3"
              >
                {updateProductState.errMsg}
              </div>
            {/if}
            {#if selectedProductType}
              <div class="py-2">
                <CategorySelectionButton
                  bind:name={selectedProductType.name}
                  on:click={() => (categorySelectionPopupShown = true)}
                />
              </div>
            {/if}
            <div class=" py-2">
              <NameTextField
                bind:value={productName}
                placeholder={"Product name"}
              />
            </div>
          </div>
          <div>
            <AdditionalOptionEditor
              bind:isInEditionMode
              bind:product
              {productId}
            />
          </div>
          <div class="max-w-md m-auto px-8">
            <DeleteComfirmation
              bind:deleted={deleteProductState.deleted}
              bind:errMsg={deleteProductState.errMsg}
              bind:loading={deleteProductState.deleting}
              on:delete={() => onDeleteProduct()}
            />
          </div>
        </div>
      {/if}
      {#if !loadProductState.loading && loadProductState.errMsg}
        <div class=" text-center text-gray-400 p-5 font-semibold">
          {loadProductState.errMsg}
        </div>
      {/if}
    </div>
  </form>

  {#if categorySelectionPopupShown}
    <CategoryListPopup
      on:close={() => (categorySelectionPopupShown = false)}
      on:select={(evt) => {
        selectedProductType = evt.detail;
        categorySelectionPopupShown = false;
      }}
      categories={productTypes}
      selected={selectedProductType}
    />
  {/if}
</div>
