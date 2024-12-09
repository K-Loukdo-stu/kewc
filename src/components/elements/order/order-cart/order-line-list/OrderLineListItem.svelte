<script>
  import { Currency, moneyNumber } from "$components/elements/product/variable";
  import Trash from "$components/icons/Trash.svelte";
  import Info from "$components/icons/info/Info.svelte";
  import QuantitySetter from "$components/materials/order/quantity-setter/QuantitySetter.svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let orderLine;
  export let qtyLoading = false;
  export let acceptingCurrencyCode = "";
  export let usdExchangeRateInRiel = 1;

  $: product = orderLine?.clonedProduct;
  $: basePrice = orderLine?.clonedBasePrice;
  $: unavailable = orderLine?.unavailable == true;
  let imgLoaded = false;
</script>

<div class="  p-1">
  <div class="{unavailable ? 'bg-orange-50  border p-1' : ''} rounded-md">
    <div class="rounded-md bg-white flex border">
      <div class="flex-grow-0 p-1">
        <div
          class=" w-14 h-14 border border-gray-200 rounded-md overflow-hidden"
        >
          <img
            class:hidden={!imgLoaded}
            class="w-full h-full object-cover"
            src={product?.photo.thumbnail?.url}
            alt=""
            on:load={() => (imgLoaded = true)}
          />
        </div>
      </div>
      <div class=" flex-grow p-1">
        {#if product}
          <div class=" truncate text-sm">{product.name}</div>
        {/if}
        {#if basePrice}
          {#if basePrice?.hasDiscount}
            <div class="text-sm text-gray-700">
              <span class=" line-through text-xs text-gray-500"
                >{`${moneyNumber(basePrice.price, orderLine.currency)}${
                  Currency[basePrice.currency]?.symbol
                }`}</span
              >
              <span class=" font-semibold"
                >{`${moneyNumber(basePrice.discountPrice, orderLine.currency)}${
                  Currency[basePrice.currency]?.symbol
                }`}</span
              >
            </div>
          {:else}
            <div class=" text-sm font-semibold text-gray-700">
              {`${moneyNumber(basePrice.price, orderLine.currency)}${
                Currency[basePrice.currency]?.symbol
              }`}
            </div>
          {/if}
        {/if}
        {#if orderLine?.shortDesc}
          <div class=" text-xs text-gray-500">{orderLine.shortDesc}</div>
        {/if}
      </div>
      <div class=" relative flex-grow-0 p-1">
        <div class=" h-full flex flex-col">
          <div class="flex-grow-0">
            {#if orderLine?.price}
              <div class=" text-end">
                {`${moneyNumber(orderLine.price, basePrice.currency)}${
                  Currency[basePrice.currency]?.symbol
                }`}
              </div>
              {#if orderLine.currency !== acceptingCurrencyCode}
                <div class=" flex justify-end">
                  {#if orderLine.currency == Currency.KHR.code}
                    <!-- KHR -> USD -->
                    <div
                      class=" bg-orange-100 rounded-sm px-1 text-sm flex items-center"
                    >
                      <div class=" text-orange-600 pr-[2px]">
                        <!-- <DollarCurrency size={18} /> -->
                        {"="}
                      </div>
                      <span class="text-orange-600">
                        {moneyNumber(
                          parseFloat(orderLine.price) /
                            parseFloat(usdExchangeRateInRiel),
                          orderLine.currency,
                        )}{Currency.USD.symbol}</span
                      >
                    </div>
                  {:else}
                    <!-- USD -> KHR -->
                    <div
                      class=" bg-orange-100 rounded-sm px-1 text-sm flex items-center"
                    >
                      <div class=" text-orange-600 pr-[2px]">
                        <!-- <RielCurrency size={18} /> -->
                        {"="}
                      </div>
                      <span class="text-orange-600"
                        >{moneyNumber(
                          parseFloat(orderLine.price) *
                            parseFloat(usdExchangeRateInRiel),
                          Currency.KHR.code,
                          { hasSymbol: true },
                        )}</span
                      >
                    </div>
                  {/if}
                </div>
              {/if}
            {/if}
          </div>
          <div class="flex-grow flex items-end pt-2">
            <QuantitySetter
              bind:hasDisabled={qtyLoading}
              bind:qty={orderLine.qty}
              on:set={(evt) => {
                dispatch("setQuantity", { qty: evt.detail.qty });
              }}
            />
          </div>
        </div>
      </div>
    </div>
    {#if unavailable}
      <div>
        <div class="flex items-center pt-1 px-2">
          <div class=" text-orange-600 pr-[2px]"><Info size={16} /></div>
          <div class=" flex-grow text-xs text-orange-600 font-semibold">
            No more available
          </div>
          <div>
            <button
              on:click={() => dispatch("remove")}
              class="px-2 text-orange-600 hover:text-orange-700 flex items-center"
            >
              <Trash size={20} />
            </button>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>
