<script>
  import { page } from "$app/stores";
  import { onMount, tick } from "svelte";
  import { EwcDispatch, EwcFrames } from "$lib/ewc-dispatch/ewc-dispatch";
  import ProductList from "$components/elements/product/product-list/ProductList.svelte";
  import ProductTypeList from "$components/elements/product/ProductTypeList.svelte";
  import ProductTypeHeader from "$components/elements/product/ProductTypeHeader.svelte";
  import { EwcBasicListenerEvents } from "$lib/ewc-dispatch/events/basic";
  import { EwcEvents } from "$lib/ewc-dispatch/events";
  import { productsByProductType } from "$providers/actions/kchannel/product";

  let channelId = $page["params"]["cid"];
  const ewcDispatch = new EwcDispatch(EwcFrames.PRODUCT_MANAGEMENT);

  let scrollEle;
  let productTypeListHeight;
  let selectedProductType;
  let onRemoveProductType;
  let onUpdateProductType;

  let loadProductStates = {
    products: [],
    loading: false,
    errMsg: "",
    loaded: false,
    pageNumber: 0,
  };

  const onEditProduct = (evt) => {
    const product = evt.detail["product"];
    ewcDispatch.publish({
      key: EwcEvents.pub.productManagement.ON_EDIT_PRODUCT,
      data: { product },
    });
  };

  const onLoadProducts = async (type) => {
    if (loadProductStates.loading == true) return;
    try {
      const LIMIT = 8;
      loadProductStates.loading = true;
      loadProductStates.loaded = false;
      const res = await productsByProductType.load({
        channel: channelId,
        productType: type?.id ?? "",
        pageNumber: loadProductStates.pageNumber,
        limit: LIMIT,
      });
      loadProductStates.products = [...loadProductStates.products, ...res.data];

      loadProductStates.loaded = true;
      if (res?.data.length > 0) {
        loadProductStates.pageNumber++;
      }
    } catch (err) {
      loadProductStates.errMsg = err.message;
    } finally {
      loadProductStates.loading = false;
    }
  };

  const addANewProduct = (newProduct) => {
    if (!newProduct) return console.warn("New product is not defined");
    const index = loadProductStates.products.findIndex(
      (p) => p.id == newProduct.id,
    );

    if (index >= 0) {
      loadProductStates.products[index] = newProduct;
    } else {
      loadProductStates.products = [newProduct, ...loadProductStates.products];
    }
  };

  const saveAProduct = (product) => {
    if (!product) return console.warn("New product is not defined");
    const index = loadProductStates.products.findIndex(
      (p) => p.id == product.id,
    );

    if (index >= 0) {
      // check if different product type, remove
      if (
        selectedProductType?.id != "" &&
        product.productType?.id != selectedProductType?.id
      ) {
        removeAProduct(product);
        return;
      }

      loadProductStates.products[index] = product;
    }
  };

  const removeAProduct = (product) => {
    if (!product) return console.warn("Deleting product is not defined");
    loadProductStates.products = loadProductStates.products.filter(
      (p) => p.id != product.id,
    );
  };

  onMount(() => {
    ewcDispatch.setPageLoaded();
    ewcDispatch.listen({ key: EwcBasicListenerEvents.ON_PAGE_RELOAD });
    ewcDispatch.listen({
      key: EwcEvents.lis.createProduct.ON_NEW_PRODUCT_CREATED,
      cb: (props) => {
        if (typeof props.data == "string") {
          try {
            addANewProduct(JSON.parse(props.data));
            return;
          } catch (error) {
            console.error(error);
          }
        }
        addANewProduct(props.data);
      },
    });
    ewcDispatch.listen({
      key: EwcEvents.lis.editProductOptions.ON_DONE_PRODUCT_EDITING,
      cb: (props) => {
        if (typeof props.data == "string") {
          try {
            addANewProduct(JSON.parse(props.data));
            return;
          } catch (error) {
            console.error(error);
          }
        }

        addANewProduct(props.data);
      },
    });

    ewcDispatch.listen({
      key: EwcEvents.lis.editProduct.ON_PRODUCT_SAVED,
      cb: (props) => {
        if (typeof props.data == "string") {
          try {
            saveAProduct(JSON.parse(props.data));
            return;
          } catch (error) {
            console.error(error);
          }
        }

        saveAProduct(props.data);
      },
    });

    ewcDispatch.listen({
      key: EwcEvents.lis.editProduct.ON_PRODUCT_DELETED,
      cb: (props) => {
        if (typeof props.data == "string") {
          try {
            removeAProduct(JSON.parse(props.data));
            return;
          } catch (error) {
            console.error(error);
          }
        }

        removeAProduct(props.data);
      },
    });
  });

  const scrollToTop = () => {
    tick().then(() => {
      scrollEle?.scrollTo(0, 0);
    });
  };
</script>

<div class="flex flex-col relative w-screen h-screen bg-gray-100">
  <div style="height: {50}px;" class=" w-full" />
  <div class=" relative w-full h-full">
    <div
      bind:this={scrollEle}
      class=" absolute inset-0 scrollbar flex-grow overflow-y-auto py-10 pt-2"
    >
      <div class=" max-w-xl m-auto px-2 flex-grow">
        <!-- Product type header menu -->
        <ProductTypeHeader
          hasProduct={loadProductStates.products?.length > 0}
          hasEdit={!!selectedProductType?.id}
          bind:productType={selectedProductType}
          name={selectedProductType?.name ?? ""}
          on:createProduct={() => {
            ewcDispatch.publish({
              key: EwcEvents.pub.productManagement.ON_CREATE_PRODUCT,
              data: { productType: selectedProductType },
            });
          }}
          on:deleted={(evt) => {
            const deletedProductType = evt.detail["productType"];
            onRemoveProductType?.(deletedProductType);
          }}
          on:updated={(evt) => {
            const updatedProductType = evt.detail["productType"];
            onUpdateProductType?.(updatedProductType);
          }}
        />

        <!-- Content -->
        <ProductList
          bind:scrollEle
          bind:products={loadProductStates.products}
          bind:pageNumber={loadProductStates.pageNumber}
          bind:loading={loadProductStates.loading}
          bind:loaded={loadProductStates.loaded}
          on:edit={onEditProduct}
          on:loadMore={() => {
            onLoadProducts(selectedProductType);
          }}
        />
      </div>
    </div>
  </div>
  <!-- Header -->
  <div class="absolute top-0 left-0 right-0">
    <ProductTypeList
      bind:selectedProductType
      bind:height={productTypeListHeight}
      on:setup={(evt) => {
        onRemoveProductType = evt.detail["onRemoveProductType"];
        onUpdateProductType = evt.detail["onUpdateProductType"];
      }}
      on:select={(evt) => {
        selectedProductType = evt.detail["type"];
        // scroll to top
        scrollToTop();

        loadProductStates.pageNumber = 0;
        loadProductStates.products = [];
        onLoadProducts(selectedProductType);

        // Pub to ewc
        ewcDispatch.publish({
          key: EwcEvents.pub.productManagement.ON_PRODUCT_TYPE_SELECTED,
          data: { productType: selectedProductType },
        });
      }}
      on:productTypeCreated={(evt) => {
        const productType = evt.detail["productType"];
        ewcDispatch.publish({
          key: EwcEvents.pub.productManagement.ON_PRODUCT_TYPE_CREATED,
          data: { productType },
        });
      }}
      {channelId}
    />
  </div>
</div>

<style>
  .scrollbar {
    overflow: overlay;
  }

  .scrollbar::-webkit-scrollbar {
    display: block;
    /* width: var(--visible, 0px); */
    width: 4px;
    border-radius: 99%;
  }

  .scrollbar::-webkit-scrollbar-button {
    display: none;
  }

  .scrollbar::-webkit-scrollbar-track {
    background-color: #00000000;
  }

  .scrollbar::-webkit-scrollbar-track-piece {
    background-color: #00000000;
  }

  .scrollbar::-webkit-scrollbar-thumb {
    background-color: #00000010;
    border-radius: 24px;
  }
</style>
