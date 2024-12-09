<script>
  import Tag from "$components/icons/tag/Tag.svelte";
  import TotalQuantity from "$components/materials/product/view/TotalQuantity.svelte";
  import ProductBasePriceList from "$components/materials/product/view/base-price-list/ProductBasePriceList.svelte";
  import ProductViewFooter from "$components/materials/product/view/footer/ProductViewFooter.svelte";
  import ProductOptionList from "$components/materials/product/view/option-list/ProductOptionList.svelte";
  import { onMount } from "svelte";
  import { choiceSelectorTypes } from "../variable";
  import {
    getOptionsByProduct,
    getProduct,
    getProductPrices,
  } from "$providers/actions/kchannel/product";
  import SmfbLoading from "$components/materials/spinners/fbLoading/SMFBLoading.svelte";
  import { createEventDispatcher } from "svelte";
  import { createOrderLineByChannel } from "$providers/actions/kchannel/order/order-line";
  const dispatch = createEventDispatcher();

  export let productId;
  let imgLoaded = false;
  let footerHeight;
  let optTotalPriceVal = 0;
  let loadProductState = {
    product: null,
    loading: false,
    errMsg: "",
    loaded: false,
  };
  let productPriceState = {
    prices: [],
    loading: false,
    loaded: false,
    errMsg: "",
  };
  let productOptionsState = {
    options: [],
    loading: false,
    loaded: false,
    errMsg: "",
  };
  let basedPriceVal = 0;
  let orderData = {
    product: null,
    options: [],
    basedPrice: null,
    price: 0,
    quantity: 1,
    totalPrice: 0,
  };

  let createOrderLineState = {
    loading: false,
    loaded: false,
    errMsg: "",
  };

  const onAddToCart = () => {
    onCreateOrderLine();
  };

  const onUpdateBasedPrice = (evt) => {
    basedPriceVal = 0;

    const price = evt.detail.price;
    orderData["basedPrice"] = price;

    if (price.hasDiscount) {
      basedPriceVal = price["discountPrice"];
    } else {
      basedPriceVal = price["price"];
    }
    orderData["price"] = basedPriceVal + optTotalPriceVal;
    orderData["totalPrice"] = orderData["quantity"] * orderData["price"];
  };

  const onUpdateOptions = (evt) => {
    const options = evt.detail.options;
    orderData["options"] = options;

    /**
     * Calucalte prices
     */
    optTotalPriceVal = 0;
    if (options.length) {
      options.forEach((opt) => {
        if (opt.type == choiceSelectorTypes.SINGLE.type) {
          optTotalPriceVal += opt["choice"]["price"];
        } else if (opt.type == choiceSelectorTypes.MULTIPLE.type) {
          let multiOptPrice = 0;
          opt.choices?.map((ch) => (multiOptPrice += ch["price"]));
          optTotalPriceVal += multiOptPrice;
        } else if (opt.type == choiceSelectorTypes.QUANTITY.type) {
          let qtyOptPrice = 0;
          opt.choices?.map(
            (ch) => (qtyOptPrice += ch["price"] * ch["quantity"]),
          );
          optTotalPriceVal += qtyOptPrice;
        }
      });
    }

    orderData["price"] = (optTotalPriceVal + basedPriceVal).toFixed(2);
    orderData["totalPrice"] = orderData["quantity"] * orderData["price"];
  };

  const onLoadProduct = async () => {
    try {
      loadProductState.errMsg = "";
      loadProductState.loading = true;
      loadProductState.loaded = false;
      const res = await getProduct.load({ productId });
      loadProductState.product = res.data;
      orderData["product"] = res.data;
      loadProductState.loaded = true;

      dispatch("productLoaded", { product: res.data });

      // load prices and options
      onLoadPrices();
      onLoadProductOptions();
    } catch (err) {
      loadProductState.errMsg = err.message;
      // to do
    } finally {
      loadProductState.loading = false;
    }
  };

  const onLoadPrices = async () => {
    try {
      productPriceState.loading = true;
      productPriceState.loaded = false;
      const res = await getProductPrices.load({ productId });
      productPriceState.prices = res.data;
      productPriceState.loaded = true;
    } catch (err) {
      // to do
      console.log(err);
      productOptionsState.errMsg = err.message;
    } finally {
      productPriceState.loading = false;
    }
  };

  const onLoadProductOptions = async () => {
    try {
      productOptionsState.errMsg = "";
      productOptionsState.loaded = false;
      productOptionsState.loading = true;
      const res = await getOptionsByProduct.load({ product: productId });
      productOptionsState.options = res.data;
      productOptionsState.loaded = true;
    } catch (err) {
      productOptionsState.errMsg = err.message;
    } finally {
      productOptionsState.loading = false;
    }
  };

  const onCreateOrderLine = async () => {
    const channel = orderData["product"]["channel"];
    const product = orderData["product"];
    try {
      createOrderLineState.loading = true;
      const res = await createOrderLineByChannel.load({
        channel: channel["id"],
        product: product["id"],
        qty: parseInt(orderData["quantity"]),
        price: parseInt(orderData["price"]),
        currency: orderData["basedPrice"]["currency"],
        clonedProduct: product,
        clonedBasePrice: orderData["basedPrice"],
        clonedOptions: orderData["options"],
      });

      dispatch("addedOrderLine", { orderLine: res, channel });
    } catch (error) {
      console.log(error);
      createOrderLineState.errMsg = error.message;
    } finally {
      createOrderLineState.loading = false;
    }
  };

  onMount(() => {
    onLoadProduct();
  });
</script>

<div class=" w-full h-full relative">
  <div
    style="padding-bottom: {footerHeight}px;"
    class=" w-full h-full bg-background overflow-y-auto"
  >
    <!-- Image -->
    <div class=" w-full h-1/3 relative">
      <img
        class="w-full h-full object-cover"
        class:hidden={!imgLoaded}
        src={loadProductState?.product?.photo.thumbnail.url}
        alt=""
        on:load={() => (imgLoaded = true)}
      />
      <div class=" absolute inset-0 bg-gray-700/20" />
    </div>
    {#if loadProductState.loaded}
      <div class=" w-full bg-background">
        <div class="h-2" />
        <div class=" w-full bg-white max-w-md m-auto">
          <div class=" px-4">
            <!-- Info -->
            <div class="w-full py-2">
              <div class=" font-semibold text-lg text-gray-700">
                {loadProductState.product.name}
              </div>
              <div class="h-1" />
              <div class=" text-sm text-gray-700 flex items-center">
                <div><Tag size={16} /></div>
                <div class="w-1" />
                <div class="">
                  {loadProductState.product?.productType?.name || "---"}
                </div>
              </div>
            </div>
            <!-- Product prices -->
            {#if productPriceState.loaded}
              <div class=" py-2">
                {#if productPriceState.prices?.length}
                  <ProductBasePriceList
                    bind:prices={productPriceState.prices}
                    on:select={onUpdateBasedPrice}
                  />
                {/if}
              </div>
            {/if}
          </div>
        </div>
        <!-- Options and sub options -->
        {#if productOptionsState.loaded}
          <div>
            <ProductOptionList
              bind:options={productOptionsState.options}
              on:update={onUpdateOptions}
            />
          </div>
        {/if}
        <div class="h-2" />
        <TotalQuantity
          on:setQuantity={(evt) => {
            orderData["quantity"] = evt.detail.quantity;
            orderData["totalPrice"] = (
              orderData["quantity"] * orderData["price"]
            ).toFixed(2);
          }}
        />
        <div class=" h-8" />
      </div>
    {:else if loadProductState.loading}
      <div class=" flex justify-center py-2">
        <SmfbLoading color="gray" />
      </div>
    {:else if !loadProductState.loading && !loadProductState.product}
      <div class=" text-sm py-4 text-center text-gray-400">No product</div>
    {/if}
  </div>
  <!-- Footer -->
  {#if loadProductState.loaded}
    <div
      bind:clientHeight={footerHeight}
      class=" w-full absolute inset-0 top-auto"
    >
      <ProductViewFooter
        bind:loading={createOrderLineState.loading}
        bind:errMsg={createOrderLineState.errMsg}
        currency={loadProductState.product.price.currency}
        bind:price={orderData.price}
        bind:quantity={orderData.quantity}
        bind:totalPrice={orderData.totalPrice}
        on:addToCart={onAddToCart}
      />
    </div>
  {/if}
</div>
