<script>
  import Trash from "$components/icons/Trash.svelte";
  import PenIcon from "$components/icons/Ordering/Pen.svelte";
  import Order from "$components/icons/Ordering/Order.svelte";
  const imageSrc =
    "data:image/jpeg;base64,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";
  import { createEventDispatcher } from "svelte";
  import { Currency, moneyNumber } from "$components/elements/product/variable";
  const dispatch = createEventDispatcher();

  export let orderLine;
  let imgLoaded = false;
  $: product = orderLine?.clonedProduct;
  $: basePrice = orderLine?.clonedBasePrice;
  $: unavailable = orderLine?.unavailable == true;
</script>

<div class="p-1">
  <div class="rounded-md">
    <div class="rounded-md bg-white flex border items-center h-[75px] p-1">
      <div class="flex-grow-0 pr-2 w-2/12">
        <div
          class="w-12 h-12 border border-gray-200 rounded-md overflow-hidden"
        >
          <img
            src={product?.photo.thumbnail?.url}
            class="w-full h-full object-cover"
          />
        </div>
      </div>
      <div class="flex-grow p-1 w-4/12">
        <div class="text-sm text-gray-700 font-semibold">{product.name}</div>
        <div class="text-sm text-gray-700">
          {#if basePrice}
            {#if basePrice?.hasDiscount}
              <span class="text-sm text-gray-700">
                <span class=" font-semibold"
                  >{`${moneyNumber(
                    basePrice.discountPrice,
                    orderLine.currency,
                  )}${Currency[basePrice.currency]?.symbol}`}</span
                >
              </span>
            {:else}
              <span>
                {`${moneyNumber(basePrice.discountPrice, orderLine.currency)}${
                  Currency[basePrice.currency]?.symbol
                }`}
              </span>
            {/if}
          {/if}

          <span>(Regular)</span>
        </div>
      </div>
      <div class="flex-grow p-2 w-[10%]">
        <div class="text-[0.8rem] text-gray-700 font-semibold">
          x {orderLine?.qty}
        </div>
      </div>
      <div class="flex-grow h-[20px] w-[25%]">
        {#if orderLine?.shortDesc}
          <div
            class="text-xs w-full overflow-hidden text-nowrap text-ellipsis text-gray-500"
          >
            {orderLine.shortDesc}
          </div>
        {/if}
      </div>
      <div class="flex-col relative h-full w-16">
        <div class="h-1/2">
          <!-- <button
            class="absolute right-0 top-0 text-orange-600 hover:text-orange-700 flex items-center"
          >
            <PenIcon />
          </button> -->

          <!-- <div
            class="absolute right-0 top-0 w-10 flex items-center rounded-md justify-center bg-[#F3F3F3] p-1"
          >
            <PenIcon />
          </div> -->
        </div>
        <div class="absolute right-0 bottom-0">3.25$</div>
      </div>
    </div>
  </div>
</div>
