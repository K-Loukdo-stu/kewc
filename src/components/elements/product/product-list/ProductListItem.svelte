<script>
  import PenFill from "$components/icons/pen_tmp/PenFill.svelte";
  import StarFillIcon from "$components/icons/star-icon/StarFillIcon.svelte";
  import StarIcon from "$components/icons/star-icon/StarIcon.svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let product;

  let imgLoaded = false;
  $: isShownOnBoard = product?.showOnMenuBoard ?? false;
</script>

<div class=" flex justify-center items-center w-full h-full">
  <div
    class=" flex flex-col relative w-full  h-full bg-white shadow-sm rounded-lg"
  >
    <div class="relative h-[60%] w-full p-2 pb-0">
      <div class="bg-gray-200 rounded-md w-full h-full">
        <img
          class:hidden={!imgLoaded}
          class=" w-full h-full rounded-md object-cover"
          src={product?.photo?.["thumbnail"]?.["url"] ?? ""}
          alt=""
          draggable="false"
          on:load={() => (imgLoaded = true)}
        />
      </div>
      <div class=" absolute right-2 top-2">
        {#if !isShownOnBoard}
          <button
            on:click={() =>
              dispatch("onShowOnBoard", { product, isShown: true })}
            class=" bg-dark/25 text-white cursor-pointer p-1 hover:bg-gray-100 hover:text-tertiary-3"
          >
            <StarIcon size={18} />
          </button>
        {:else}
          <button
            on:click={() =>
              dispatch("onShowOnBoard", { product, isShown: false })}
            class=" bg-white/25 text-white cursor-pointer p-1 hover:bg-gray-100 hover:text-tertiary-3"
          >
            <div class="text-yellow-400">
              <StarFillIcon size={18} />
            </div>
          </button>
        {/if}
      </div>
    </div>
    <div class="relative flex-grow">
      <div class=" absolute inset-0 p-1 px-2 flex flex-col">
        <div class="two-line-text text-sm">
          <p>{product.name}</p>
        </div>
        <div class=" flex-grow flex">
          {#if product?.price?.hasDiscount}
            <div class=" w-full">
              <div class=" text-xs line-through text-gray-500">
                {product.price.price}$
              </div>
              <div class="font-bold text-xl text-gray-600">
                {product.price.discountPrice}$
              </div>
            </div>
          {:else}
            <div class="font-bold text-xl text-gray-600 py-1">
              {product?.price?.price ?? ""}$
            </div>
          {/if}
        </div>
      </div>
    </div>

    <div class=" absolute right-1 bottom-1 flex flex-col">
      <button
        on:click={() => dispatch("edit", { product })}
        class="cursor-pointer text-gray-600 p-2 hover:bg-gray-100 px-3 rounded-full hover:text-tertiary-3"
      >
        <PenFill size={18} />
      </button>
    </div>
  </div>
</div>

<style>
  .two-line-text {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
