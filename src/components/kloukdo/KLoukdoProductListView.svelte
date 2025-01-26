<script>
    import CartAdd from "$components/icons/cart/CartAdd.svelte";
    import { createEventDispatcher } from "svelte";
    // import { formatDistanceToNow, parseISO, isAfter, subWeeks } from "date-fns";

    const dispatch = createEventDispatcher();
    export let product;
    export let isAds = false;
  
    let imgLoaded = false;

    const formatCreatedAt = (createdAt) => {
        if (!createdAt) return "";
        const createdDate = parseISOString(createdAt)
        // Check if the date is older than 1 week
        // a = timeSince(createdDate);
        return timeSince(createdDate);
    };
    function parseISOString(s) {
        var b = s.split(/\D+/);
        return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
    }
    function timeSince(date) {

        var seconds = Math.floor((new Date() - date) / 1000);

        var interval = seconds / 31536000;

        if (interval > 1) {
        return Math.floor(interval) + " years";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
        return Math.floor(interval) + " months";
        }
        interval = seconds / 86400;
        if (interval > 1) {
        return Math.floor(interval) + " days";
        }
        interval = seconds / 3600;
        if (interval > 1) {
        return Math.floor(interval) + " hours";
        }
        interval = seconds / 60;
        if (interval > 1) {
        return Math.floor(interval) + " minutes";
        }
        return Math.floor(seconds) + " seconds";
    }


</script>
  
<div class=" flex justify-center items-center pt-2 h-42 w-full">
    <a class="relative w-full h-full bg-white shadow-sm rounded-lg"  href="/web-content/kloukdo/product/{product.id}">
      <button
        on:click={() => dispatch("select", { product })}
        class=" w-full h-full flex"
      >
        <div class="p-2">
            {#if product.photos[0]}
                <img
                    class:hidden={!imgLoaded}
                    class=" w-40 h-40 rounded-md object-cover"
                    src={product.photos[0].url}
                    alt=""
                    on:load={() => (imgLoaded = true)}
                />
            {/if}
        </div>
        <div class=" p-1 px-2 flex flex-col text-start text-lg justify-between">
            <div class="">
              <p>{product.name}</p>
            </div>
            <div class=" text-sm">
                <p>{formatCreatedAt(product.createdAt)}</p>
            </div>
            <div class="flex">
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
                    </div>
                {/if}
                {#if isAds===true}
                    <div class="absolute right-2 bottom-2">ads</div>
                {/if}
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
  