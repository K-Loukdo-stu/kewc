<script>
  import { Currency, moneyNumber } from "$components/elements/product/variable";

  export let orderLine;
  export let acceptingCurrencyCode = "";
  export let usdExchangeRateInRiel = 1;

  $: product = orderLine?.clonedProduct;
  $: basePrice = orderLine?.clonedBasePrice;
</script>

<div class="  pb-1 px-0">
  <div class=" rounded-md">
    <div class="rounded-md bg-white flex border">
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
                      <div class=" text-gray-600 pr-[2px]">
                        <!-- <DollarCurrency size={18} /> -->
                        {"="}
                      </div>
                      <span class="text-gray-600">
                        {moneyNumber(
                          parseFloat(orderLine.price) /
                            parseFloat(usdExchangeRateInRiel),
                          Currency.USD.code,
                          { hasSymbol: true },
                        )}</span
                      >
                    </div>
                  {:else}
                    <!-- USD -> KHR -->
                    <div class="rounded-sm px-1 text-sm flex items-center">
                      <div class=" text-gray-600 pr-[2px]">
                        {"="}
                      </div>
                      <span class="text-gray-600"
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
        </div>
      </div>
    </div>
  </div>
</div>
