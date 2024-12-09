<script>
  import ProductTypeList from "$components/elements/product/ProductTypeList.svelte";
  import ProductList from "$components/elements/channel/product-list/ProductList.svelte";
  import { tick } from "svelte";
  import { fade } from "svelte/transition";
  import { productsByProductType } from "$providers/actions/kchannel/product";
  import { page } from "$app/stores";

  let channelId = $page["params"]["cid"];

  let productTypeListEleHeight;
  let selectedProductType;
  let productTypeListEleTop = 0;
  let productTypeListHidden = false;
  let lastScrollTop = 0;
  let scrollEle;
  let loadProductStates = {
    products: [],
    loading: false,
    errMsg: "",
    loaded: false,
    pageNumber: 0,
  };

  // FlyIn animation
  let previousScrollY = 0;
  let scrollSpeed = 0;
  let previousTimestamp = null;
  let isFlyIn = false;

  const onLoadProducts = async (type) => {
    if (loadProductStates.loading == true) return;
    try {
      const LIMIT = 30;
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

  const scrollToTop = () => {
    tick().then(() => {
      scrollEle?.scrollTo(0, 0);
    });
  };


</script>

<div
  in:fade={{ duration: 100 }}
  class=" relative w-full h-full overflow-y-auto"
>
  <!-- Content -->
  <div
    bind:this={scrollEle}
    style="padding-top: {productTypeListEleHeight}px;"
    class="w-full h-full overflow-y-auto"
    on:scroll={() => {
      var st = scrollEle.scrollTop;

      const currentScrollY = scrollEle.scrollTop;
      const currentTimestamp = performance.now();

      if (previousTimestamp !== null) {
        const timeElapsed = currentTimestamp - previousTimestamp;
        const distance = Math.abs(currentScrollY - previousScrollY);
        scrollSpeed = distance / timeElapsed;
      }

      previousScrollY = currentScrollY;
      previousTimestamp = currentTimestamp;
      if (st > lastScrollTop) {
        // downscroll code
        if (productTypeListEleTop * -1 < productTypeListEleHeight + 10) {
          productTypeListEleTop -= scrollSpeed;
        }
        isFlyIn = false;
      } else if (st < lastScrollTop) {
        if (!isFlyIn) {
         const T = setTimeout(() => {
            productTypeListEleTop = 0;
            if (T) clearTimeout(T);
          }, 500);
        }

        // upscroll code
        isFlyIn = true;
      }
      lastScrollTop = st <= 0 ? 0 : st;
    }}
  >
    <ProductList
      bind:scrollEle
      bind:products={loadProductStates.products}
      bind:pageNumber={loadProductStates.pageNumber}
      bind:loading={loadProductStates.loading}
      bind:loaded={loadProductStates.loaded}
      on:loadMore={() => {
        onLoadProducts(selectedProductType);
      }}
    />
  </div>

  <div
    class:flyIn={isFlyIn}
    class:hidden={productTypeListHidden}
    style="top: {productTypeListEleTop}px;  --currentTop: {productTypeListEleTop}px;"
    class=" absolute inset-0 bottom-auto py-1 p-1"
  >
    <div
      bind:clientHeight={productTypeListEleHeight}
      class=" rounded-lg overflow-hidden"
    >
      <ProductTypeList
        bind:selectedProductType
        bind:channelId
        editMode={false}
        on:select={(evt) => {
          selectedProductType = evt.detail["type"];
          // scroll to top
          scrollToTop();

          loadProductStates.pageNumber = 0;
          loadProductStates.products = [];
          onLoadProducts(selectedProductType);
        }}
      />
    </div>
  </div>
</div>

<style>
  .flyIn {
    animation: fly-in 500ms ease-in-out forwards;
  }

  @keyframes fly-in {
    0% {
      top: var(--currentTop);
    }
    100% {
      top: 0;
    }
  }
</style>
