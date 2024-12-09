<script>
  import {
    Currency,
    productCurrencies,
  } from "$components/elements/product/variable";
  import Pen from "$components/icons/pen_tmp/Pen.svelte";
  import { createEventDispatcher, tick } from "svelte";
  import { fade } from "svelte/transition";
  import SmfbLoading from "../spinners/fbLoading/SMFBLoading.svelte";
  import Trash from "$components/icons/Trash.svelte";
  import {
    deleteProductPrice,
    updateProductPrice,
  } from "$providers/actions/kchannel/product";
  const dispatch = createEventDispatcher();

  export let priceId;
  export let priceName;
  export let priceValue;
  export let discountValue;
  export let isDefaultPrice = true;
  export let discountChecked = false;
  export let currentCurrency = productCurrencies.USD.label;
  export let isInEditionMode = false;
  export let editable = false;
  let priceDeleting = false;
  let priceUpdating = false;
  let priceNameInputEle;
  let discountCheckedInput;
  let priceInputEle;
  let errMsg = "";

  const onDeleteProductPrice = async ({ priceId }) => {
    try {
      priceDeleting = true;
      const res = await deleteProductPrice.load({ priceId });
      const deletedPrice = res.data;
      dispatch("removed", { price: deletedPrice });
      onEndEditing();
    } catch (err) {
      // to do
    } finally {
      priceDeleting = false;
    }
  };

  const onUpdateProductPrice = async (params) => {
    try {
      priceUpdating = true;
      const res = await updateProductPrice.load(params);
      const updatedPrice = res.data;
      dispatch("updated", { price: updatedPrice });
      onEndEditing();
    } catch (err) {
      // to do
    } finally {
      priceUpdating = false;
    }
  };

  const onEdit = () => {
    editable = true;
    dispatch("edit", {
      basePrice: {
        name: priceName,
        price: priceValue,
        discountPrice: discountValue,
        isMain: isDefaultPrice,
        hasDiscount: discountChecked,
        currency: currentCurrency,
      },
    });
    tick().then(() => {
      priceNameInputEle?.focus();
    });
  };

  const onEndEditing = () => {
    editable = false;
    dispatch("endEditing", editable);
  };

  const onSave = () => {
    onUpdateProductPrice({
      id: priceId,
      name: priceName,
      price: priceValue,
      discountPrice: discountValue,
      hasDiscount: discountChecked,
      currency: currentCurrency,
    });
  };
</script>

<div class="w-full p-3 bg-gray-100 rounded-xl text-gray-500">
  <form class=" w-full" on:submit|preventDefault={onSave}>
    <div class=" flex pb-2 items-center">
      <div class=" flex flex-grow items-center">
        {#if isDefaultPrice}
          <div>
            <span class="text-red-300 font-bold">*</span>
          </div>
          <div class="w-2" />
        {/if}
        <div class=" flex-grow">
          {#if editable}
            <div>
              <input
                required
                placeholder="Name"
                bind:this={priceNameInputEle}
                bind:value={priceName}
                class="rounded-md p-3 max-w-[192px] font-bold"
                type="text"
              />
            </div>
          {:else}
            <span class=" font-bold"
              >{priceName == "" ? "Unknown" : priceName}</span
            >
          {/if}
        </div>
        <div class="w-5" />
      </div>
      {#if !editable}
        <div class="">
          <button
            disabled={isInEditionMode}
            class=" cursor-pointer disabled:text-gray-300"
            on:click={onEdit}
          >
            <Pen w={5} h={5} />
          </button>
        </div>
      {:else if !isDefaultPrice}
        <div
          on:click={() => {
            onDeleteProductPrice({ priceId });
          }}
          in:fade={{ delay: 500 }}
          class=""
        >
          <div class="text-gray-500 hover:text-gray-600 cursor-pointer">
            {#if priceDeleting}
              <SmfbLoading color="gray" />
            {:else}
              <Trash />
            {/if}
          </div>
        </div>
      {/if}
    </div>
    <div class=" flex">
      <div class="w-20 flex items-center"><span class="px-1">Price</span></div>
      <div class=" flex-grow">
        <div class=" flex bg-gray-200 rounded-md overflow-hidden">
          <div class=" flex-grow">
            <input
              required
              bind:this={priceInputEle}
              bind:value={priceValue}
              step="0.01"
              placeholder="0.0"
              class="rounded-md p-3 w-full text-center font-bold"
              type="number"
              disabled={!editable}
            />
          </div>
          <div class="">
            <div
              class="px-5 h-full w-[40px] rounded-md flex items-center justify-center"
            >
              <span class="font-bold"
                >{Currency[currentCurrency]?.symbol || "?"}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class=" flex py-2 pl-1">
      <div class="flex flex-grow-0">
        <label>
          <div class="flex w-full h-full">
            <div class="flex items-center pr-2">
              <input
                class=" w-5 h-5"
                type="checkbox"
                bind:checked={discountChecked}
                disabled={!editable}
              />
            </div>
            <div class="flex items-center">
              <span class="text-sm {!discountChecked ? 'line-through' : ''}	"
                >Discount to</span
              >
            </div>
          </div>
        </label>
      </div>
      <div class=" flex-grow pl-2">
        <div class="flex bg-gray-200 rounded-md overflow-hidden">
          <div class="flex-grow">
            <div class=" relative h-12 rounded-md w-full">
              <div class=" absolute inset-0">
                <input
                  placeholder="0.0"
                  bind:this={discountCheckedInput}
                  bind:value={discountValue}
                  step="0.01"
                  class="rounded-md p-3 text-center w-full h-full font-bold"
                  type="number"
                  disabled={!editable || !discountChecked}
                  required
                />
              </div>
            </div>
          </div>
          <div class="w-[40px] flex flex-grow-0 items-center justify-center">
            <span class="font-bold"
              >{Currency[currentCurrency]?.symbol || "?"}</span
            >
          </div>
        </div>
      </div>
    </div>
    <!-- Error/warning alerts -->
    {#if errMsg}
      <div class=" w-full text-center text-sm py-2 text-yellow-600">
        <div><p>{errMsg}</p></div>
      </div>
    {/if}

    <!-- Edit buttons -->
    {#if editable}
      <div in:fade class=" flex items-center">
        <div>
          <button
            on:click={() => {
              editable = false;
              dispatch("cancel");
              onEndEditing();
            }}
            class="bg-gray-200 py-2 px-3 rounded-md cursor-pointer"
            disabled={priceUpdating}
          >
            Cancel
          </button>
        </div>
        <div class="flex-grow" />
        <div>
          {#if priceUpdating}
            <div class="py-2 px-4"><SmfbLoading color="gray" /></div>
          {:else}
            <button
              disabled={priceDeleting}
              type="submit"
              class=" bg-tertiary-3 disabled:bg-gray-200 text-white py-2 px-4 rounded-md cursor-pointer"
            >
              Save
            </button>
          {/if}
        </div>
      </div>
    {/if}
  </form>
</div>
