<script>
    import CartAdd from "$components/icons/cart/CartAdd.svelte";
    import { createEventDispatcher, onMount } from "svelte";
    const dispatch = createEventDispatcher();
    export let product;
    export let isAds = false;
  
    let imgLoaded = false;
  </script>
  
  <div class=" flex justify-center items-center pt-2 h-full w-full">
    <a
      class=" flex flex-col relative w-full h-full bg-white shadow-sm rounded-lg"
      href="/web-content/kloukdo/product/{product.id}"
    >
      <button
        on:click={() => dispatch("select", { product })}
        class=" w-full h-full flex flex-col"
      >
        <div class=" relative flex-grow w-full p-2 pb-0">
          <div class="  inset-0 rounded-md">
            <div class="p-1 w-full h-full">
              {#if product.photos[0]}
              <img
                class:hidden={!imgLoaded}
                class=" w-full h-40 rounded-md object-cover"
                src={product.photos[0].url}
                alt=""
                on:load={() => (imgLoaded = true)}
              />
              {/if}
              
            </div>
          </div>
        </div>
        <div class="relative flex-grow-0">
          <div class=" p-1 px-2 flex flex-col text-start">
            <div class="two-line-text">
              <p>{product.name}</p>
            </div>
            <div class=" flex-grow flex">
              {#if product?.price?.hasDiscount}
                <div class=" w-full">
                  <div class=" text-sm line-through text-red-500">
                    {product.price.price}$
                  </div>
                  <div class="font-bold text-2xl text-red-500">
                    {product.price.discountPrice}$
                  </div>
                </div>
              {:else}
                <div class="flex justify-between w-full align-bottom">
                    <div class="font-bold text-2xl text-red-500 py-1">
                      {product?.price?.price ?? ""}$
                    </div>
                    {#if isAds===true}
                      <div>ads</div>
                    {/if}
                </div>
              {/if}
            </div>
          </div>
        </div>
      </button>
  
      <!-- <div class=" absolute right-1 bottom-1 flex">
        <button
          on:click|preventDefault={() => dispatch("addToCart", { product })}
          class="cursor-pointer text-gray-600 p-[6px] bg-gray-100 px-3 rounded-full hover:text-tertiary-3"
        >
          <CartAdd size={18} />
        </button>
      </div> -->
    </a>
  </div>
  