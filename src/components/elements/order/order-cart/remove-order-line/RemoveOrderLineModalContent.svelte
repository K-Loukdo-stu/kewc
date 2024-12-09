<script>
  import { Currency, moneyNumber } from "$components/elements/product/variable";
  import SmfbLoading from "$components/materials/spinners/fbLoading/SMFBLoading.svelte";
  import { clickOutside } from "$lib/utils/click-outside";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let orderLine;
  export let acceptingCurrencyCode = "";
  export let usdExchangeRateInRiel = 1;
  export let errMsg = "";
  export let loading = false;

  $: product = orderLine?.clonedProduct;
  $: basePrice = orderLine?.clonedBasePrice;
  let imgLoaded = false;
</script>

<div
  class=" w-full h-full bg-gray-900/20 flex justify-center items-center px-2"
>
  <div
    use:clickOutside
    on:click_outside={() => {
      dispatch("close");
    }}
    class=" w-full max-w-sm bg-white rounded-md p-4"
  >
    <div class="p-1">
      <div class="flex border rounded-md bg-white">
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
                  >{`${moneyNumber(
                    basePrice.discountPrice,
                    orderLine.currency,
                  )}${Currency[basePrice.currency]?.symbol}`}</span
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
                            orderLine.currency,
                          )}{Currency.KHR.symbol}</span
                        >
                      </div>
                    {/if}
                  </div>
                {/if}
              {/if}
            </div>
          </div>
        </div>
      </div>
    </div>

    {#if errMsg != ""}
      <div class=" mt-1 bg-orange-50 p-2 text-center text-sm text-orange-800">
        {errMsg}
      </div>
    {/if}

    <div class=" h-3"></div>
    <div class="flex">
      <div
        class=" flex items-center flex-grow text-left text-gray-600 font-semibold"
      >
        <button
          on:click={() => {
            dispatch("close");
          }}
          class="border p-4 py-[6px] rounded-md text-gray-600 h-9 flex justify-center items-center"
        >
          Cancel
        </button>
      </div>
      <div>
        <button
          disabled={loading}
          on:click={() => {
            dispatch("remove", { orderLine });
          }}
          class=" disabled:bg-gray-100 w-24 font-semibold bg-red-50 p-4 py-[6px] rounded-md text-red-800 h-9 flex justify-center items-center"
        >
          {#if loading}
            <SmfbLoading color="gray" />
          {:else}
            Remove
          {/if}
        </button>
      </div>
    </div>
  </div>
</div>
