<script>
  import {
    Currency,
    productCurrencies,
  } from "$components/elements/product/variable";

  export let price;
  export let discountPrice;
  export let discountChecked = false;
  export let currency = productCurrencies.KH.code;
  let discountCheckedInput;
  let currencyChecked = false;
</script>

<div class="w-full p-3 bg-gray-100 rounded-xl text-gray-500">
  <div class=" flex">
    <div class="w-20 flex items-center"><span class="px-1">Price</span></div>
    <div class=" flex-grow">
      <input
        bind:value={price}
        class=" disabled:bg-gray-300 rounded-md bg-white p-3 w-full text-center font-bold"
        type="number"
        placeholder="0.0"
        step="0.1"
        required
      />
    </div>
    <div class=" px-2">
      <button
        on:click|preventDefault={() => {
          currencyChecked = !currencyChecked;

          currency = currencyChecked
            ? productCurrencies.USD.code
            : productCurrencies.KH.code;
        }}
        class="px-5 h-full w-[50px] bg-white rounded-md flex items-center justify-center cursor-pointer"
      >
        <span class="font-bold">{Currency[currency].symbol}</span>
      </button>
    </div>
  </div>

  <div class=" flex py-2 pl-1">
    <div class="flex flex-grow">
      <label>
        <div class="flex w-full h-full">
          <div class="flex items-center">
            <input
              class=" w-5 h-5"
              type="checkbox"
              bind:checked={discountChecked}
            />
          </div>
          <button
            on:click|preventDefault={() => {
              // discountCheckedInput?.click();
            }}
            class="flex items-center"
          >
            <span class="pl-2 text-sm {!discountChecked ? 'line-through' : ''}	"
              >Discount to</span
            >
          </button>
        </div>
      </label>
    </div>
    <div class=" flex-grow-0 pr-2">
      <div class="flex max-w-[168px] bg-gray-200 rounded-md overflow-hidden">
        <div class="flex-grow pr-2">
          <div class=" bg-white rounded-md">
            <input
              bind:this={discountCheckedInput}
              bind:value={discountPrice}
              disabled={!discountChecked}
              class="rounded-md p-3 text-center font-bold w-full bg-white disabled:bg-gray-300"
              type="number"
              placeholder="0.0"
              step="0.1"
              required
            />
          </div>
        </div>
        <div class=" px-5 w-[60px] flex items-center justify-center">
          <span class="font-bold">{Currency[currency].symbol}</span>
        </div>
      </div>
    </div>
  </div>
</div>
